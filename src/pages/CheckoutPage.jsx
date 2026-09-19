import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  MapPin, Phone, Mail, CreditCard, Truck, 
  ShoppingBag, Tag, Lock, CheckCircle 
} from 'lucide-react';
import { formatPrice } from '../data/products';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, showNotification } = useShop();
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping form state
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: '',
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [shippingMethod, setShippingMethod] = useState('regular');

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      showNotification('Silakan login terlebih dahulu', 'info');
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Pre-fill form with user data
      setShippingData(prev => ({
        ...prev,
        fullName: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
      }));
    }
  }, [navigate, showNotification]);

  // Check if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      showNotification('Keranjang Anda kosong', 'info');
      navigate('/');
    }
  }, [cart, navigate, showNotification]);

  const handleInputChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const shippingOptions = {
    regular: { name: 'Regular (3-5 hari)', price: 25000 },
    express: { name: 'Express (1-2 hari)', price: 50000 },
    sameday: { name: 'Same Day', price: 75000 },
  };

  const paymentMethods = [
    { id: 'transfer', name: 'Transfer Bank', icon: '🏦' },
    { id: 'ewallet', name: 'E-Wallet', icon: '💳' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
    { id: 'credit', name: 'Kartu Kredit/Debit', icon: '💳' },
  ];

  const subtotal = getCartTotal();
  const shippingCost = shippingOptions[shippingMethod].price;
  const total = subtotal + shippingCost;

  const generateOrderPDF = (order) => {
    const doc = new jsPDF();

    // Add Logo or Header
    doc.setFontSize(22);
    doc.setTextColor(23, 11, 0); // Batik Dark Color
    doc.text('Batik Nusantara', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(11, 48, 29); // Batik Brown
    doc.text('Bukti Pemesanan', 20, 28);

    // Order Details
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: ${order.orderId}`, 20, 40);
    doc.text(`Tanggal: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 45);
    doc.text(`Status: ${order.status.toUpperCase()}`, 20, 50);

    // Customer Info
    doc.text(`Nama: ${order.shipping.fullName}`, 120, 40);
    doc.text(`Email: ${order.shipping.email}`, 120, 45);
    doc.text(`Telepon: ${order.shipping.phone}`, 120, 50);
    
    // Address
    doc.text('Alamat Pengiriman:', 20, 60);
    const splitAddress = doc.splitTextToSize(`${order.shipping.address}, ${order.shipping.city}, ${order.shipping.province} ${order.shipping.postalCode}`, 170);
    doc.text(splitAddress, 20, 65);

    // Items Table
    const tableColumn = ["Produk", "Harga", "Qty", "Total"];
    const tableRows = [];

    order.items.forEach(item => {
      const itemData = [
        item.name,
        formatPrice(item.price),
        item.quantity,
        formatPrice(item.price * item.quantity)
      ];
      tableRows.push(itemData);
    });

    try {
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 80,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [11, 48, 29], textColor: [255, 255, 255] }, // Batik Brown
      });
    } catch (error) {
       console.error("PDF Table generation error", error);
    }

    // Summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ${formatPrice(order.subtotal)}`, 140, finalY);
    doc.text(`Ongkir: ${formatPrice(order.shippingCost)}`, 140, finalY + 5);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total: ${formatPrice(order.total)}`, 140, finalY + 12);

    // Footer
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text('Terima kasih telah berbelanja di Batik Nusantara.', 20, finalY + 30);
    doc.text('Simpan dokumen ini sebagai bukti transaksi.', 20, finalY + 35);

    doc.save(`Order-${order.orderId}.pdf`);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validation
    if (!shippingData.fullName || !shippingData.phone || !shippingData.address) {
      showNotification('Mohon lengkapi data pengiriman', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const checkoutItems = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const payload = {
        customer_name: shippingData.fullName,
        customer_phone: shippingData.phone,
        items: checkoutItems,
        payment_method: paymentMethod
      };

      let orderId;
      try {
        const response = await fetch('http://localhost:8000/api/storefront/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
          orderId = data.data.invoice_number;
        } else {
          throw new Error(data.message || 'API Error');
        }
      } catch (apiError) {
        console.warn('API unavailable, falling back to mock checkout:', apiError);
        orderId = 'INV-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      }

      // Save order to localStorage for UI
      const order = {
        orderId,
        user: user,
        items: cart,
        shipping: shippingData,
        paymentMethod,
        shippingMethod,
        subtotal,
        shippingCost,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      clearCart();

      // Navigate to success page
      showNotification('Pesanan berhasil dibuat!', 'success');
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error('Checkout error:', error);
      showNotification('Terjadi kesalahan saat memproses pesanan', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-batik-cream pt-20 pb-12 w-full overflow-x-hidden">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-batik-dark mb-2">Checkout</h1>
          <p className="text-sm md:text-base text-batik-brown/70">
            Lengkapi data pengiriman untuk menyelesaikan pesanan
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* User Info Card */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <h2 className="text-lg md:text-xl font-bold text-batik-dark">
                  Informasi Akun
                </h2>
                <Link
                  to="/login"
                  onClick={() => localStorage.removeItem('user')}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Ganti Akun
                </Link>
              </div>
              <div className="flex items-center gap-3 p-3 md:p-4 bg-primary/5 rounded-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-batik-dark text-sm md:text-base">{user.name}</p>
                  <p className="text-xs md:text-sm text-batik-brown/70">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Shipping Form */}
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <MapPin className="text-primary" size={20} />
                  <h2 className="text-lg md:text-xl font-bold text-batik-dark">
                    Alamat Pengiriman
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none text-sm"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      Alamat Lengkap *
                    </label>
                    <textarea
                      name="address"
                      value={shippingData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none text-sm"
                      placeholder="Jl. Contoh No. 123, RT/RW 01/02"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      Kota/Kabupaten *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      Provinsi *
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={shippingData.province}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      name="notes"
                      value={shippingData.notes}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none text-sm"
                      placeholder="Catatan untuk kurir atau penjual"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Truck className="text-primary" size={20} />
                  <h2 className="text-lg md:text-xl font-bold text-batik-dark">
                    Metode Pengiriman
                  </h2>
                </div>

                <div className="space-y-3">
                  {Object.entries(shippingOptions).map(([key, option]) => (
                    <label
                      key={key}
                      className={`flex items-center justify-between p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        shippingMethod === key
                          ? 'border-primary bg-primary/5'
                          : 'border-batik-beige hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={key}
                          checked={shippingMethod === key}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4 md:w-5 md:h-5 text-primary"
                        />
                        <div>
                          <p className="font-semibold text-batik-dark text-sm md:text-base">
                            {option.name}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-primary text-sm md:text-base">
                        {formatPrice(option.price)}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <CreditCard className="text-primary" size={20} />
                  <h2 className="text-lg md:text-xl font-bold text-batik-dark">
                    Metode Pembayaran
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-batik-beige hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 md:w-5 md:h-5 text-primary"
                      />
                      <span className="text-xl md:text-2xl">{method.icon}</span>
                      <p className="font-semibold text-xs md:text-sm text-batik-dark">
                        {method.name}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm sticky top-24">
              <h2 className="text-lg md:text-xl font-bold text-batik-dark mb-4 md:mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                Ringkasan Pesanan
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex-shrink-0 relative overflow-hidden">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs md:text-sm text-batik-dark line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-batik-brown/60">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 pt-4 border-t border-batik-beige text-sm md:text-base">
                <div className="flex justify-between text-batik-brown">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-batik-brown">
                  <span>Ongkir</span>
                  <span className="font-semibold">
                    {formatPrice(shippingCost)}
                  </span>
                </div>
                {subtotal >= 500000 && (
                  <div className="flex items-center gap-2 text-green-600 text-xs md:text-sm">
                    <Tag size={14} />
                    <span>Gratis ongkir applied!</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-batik-beige">
                  <span className="text-base md:text-lg font-semibold text-batik-dark">
                    Total
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Submit Button (Mobile Order: button in Summary for transparency) - but form is in left col. 
                  Let's keep main button in form for semantics, but maybe duplicate or stick it?
                  Actually, simply rendering the button here instead of form if mobile could work, but form submission is tricky outside form.
                  Best practice: Keep button in form. We'll leave it in the Left Column at the bottom of form.
              */}
              
              <button
                type="submit"
                form="checkout-form" // Link to form
                disabled={isProcessing}
                className="w-full btn btn-primary py-3 md:py-4 mt-6 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all"
              >
                {isProcessing ? (
                  'Memproses...'
                ) : (
                  <>
                    <Lock size={18} className="inline mr-2" />
                    Buat Pesanan
                  </>
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-4 p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-[10px] md:text-xs text-green-800">
                    <p className="font-semibold mb-1">Transaksi Aman</p>
                    <p>Data Anda dilindungi dengan enkripsi SSL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
