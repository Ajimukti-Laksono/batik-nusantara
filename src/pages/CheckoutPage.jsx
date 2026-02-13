import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  MapPin, Phone, Mail, CreditCard, Truck, 
  ShoppingBag, Tag, Lock, CheckCircle 
} from 'lucide-react';
import { formatPrice } from '../data/products';

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
    { id: 'ewallet', name: 'E-Wallet (OVO, GoPay, Dana)', icon: '💳' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
    { id: 'credit', name: 'Kartu Kredit/Debit', icon: '💳' },
  ];

  const subtotal = getCartTotal();
  const shippingCost = shippingOptions[shippingMethod].price;
  const total = subtotal + shippingCost;

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validation
    if (!shippingData.fullName || !shippingData.phone || !shippingData.address) {
      showNotification('Mohon lengkapi data pengiriman', 'error');
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const orderId = 'ORD-' + Date.now();
      
      // Save order to localStorage (in production, send to backend)
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
      setIsProcessing(false);
    }, 2000);
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-batik-cream pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-batik-dark mb-2">Checkout</h1>
          <p className="text-batik-brown/70">
            Lengkapi data pengiriman untuk menyelesaikan pesanan
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-batik-dark">
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
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-batik-dark">{user.name}</p>
                  <p className="text-sm text-batik-brown/70">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Shipping Form */}
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="text-primary" size={24} />
                  <h2 className="text-xl font-bold text-batik-dark">
                    Alamat Pengiriman
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Alamat Lengkap *
                    </label>
                    <textarea
                      name="address"
                      value={shippingData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                      placeholder="Jl. Contoh No. 123, RT/RW 01/02"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Kota/Kabupaten *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Provinsi *
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={shippingData.province}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      name="notes"
                      value={shippingData.notes}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-4 py-3 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                      placeholder="Catatan untuk kurir atau penjual"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Truck className="text-primary" size={24} />
                  <h2 className="text-xl font-bold text-batik-dark">
                    Metode Pengiriman
                  </h2>
                </div>

                <div className="space-y-3">
                  {Object.entries(shippingOptions).map(([key, option]) => (
                    <label
                      key={key}
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                          className="w-5 h-5 text-primary"
                        />
                        <div>
                          <p className="font-semibold text-batik-dark">
                            {option.name}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-primary">
                        {formatPrice(option.price)}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="text-primary" size={24} />
                  <h2 className="text-xl font-bold text-batik-dark">
                    Metode Pembayaran
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                        className="w-5 h-5 text-primary"
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <p className="font-semibold text-sm text-batik-dark">
                        {method.name}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  'Memproses Pesanan...'
                ) : (
                  <>
                    <Lock size={20} className="inline mr-2" />
                    Buat Pesanan
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-batik-dark mb-6 flex items-center gap-2">
                <ShoppingBag size={24} className="text-primary" />
                Ringkasan Pesanan
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-batik-dark line-clamp-1">
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
              <div className="space-y-3 pt-4 border-t border-batik-beige">
                <div className="flex justify-between text-batik-brown">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-batik-brown">
                  <span>Ongkir ({shippingOptions[shippingMethod].name})</span>
                  <span className="font-semibold">
                    {formatPrice(shippingCost)}
                  </span>
                </div>
                {subtotal >= 500000 && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Tag size={16} />
                    <span>Gratis ongkir applied!</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-batik-beige">
                  <span className="text-lg font-semibold text-batik-dark">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-green-800">
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
