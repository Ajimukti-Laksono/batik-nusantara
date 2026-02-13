import React from "react";
import { useShop } from "../context/ShopContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../data/products";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    showNotification,
  } = useShop();

  const handleCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      showNotification("Silakan login terlebih dahulu untuk checkout", "info");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-batik-cream pt-24 pb-12">
        <div className="container-custom flex flex-col items-center justify-center py-20">
          <div className="w-32 h-32 bg-batik-beige rounded-full flex items-center justify-center mb-8">
            <ShoppingBag size={64} className="text-batik-brown/40" />
          </div>
          <h2 className="text-3xl font-bold text-batik-dark mb-4">
            Keranjang Anda Kosong
          </h2>
          <p className="text-batik-brown/70 mb-8 text-center max-w-md">
            Belum ada produk di keranjang. Yuk, mulai belanja koleksi batik
            kami!
          </p>
          <Link to="/shop" className="btn btn-primary">
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-batik-cream pt-24 pb-12">
      <div className="container-custom">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-batik-dark mb-2">
              Keranjang Belanja
            </h1>
            <p className="text-batik-brown/70">
              {cart.length} produk dalam keranjang
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-2"
          >
            <Trash2 size={18} />
            Kosongkan Keranjang
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/128x128?text=Batik";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-batik-dark mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-batik-brown/60 mb-3">
                      {item.categoryName}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-batik-brown/50 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 p-2"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="flex items-center gap-3 bg-batik-cream rounded-lg p-1">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4 pt-4 border-t border-batik-beige flex justify-between items-center">
                  <span className="text-batik-brown/70">Subtotal:</span>
                  <span className="text-xl font-bold text-batik-dark">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold text-batik-dark mb-6">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-batik-brown">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
                <div className="flex justify-between text-batik-brown">
                  <span>Ongkir</span>
                  <span className="font-semibold">Rp 0</span>
                </div>
                <div className="flex justify-between text-batik-brown">
                  <span className="text-xs">(Akan dihitung saat checkout)</span>
                </div>
                <div className="pt-4 border-t border-batik-beige flex justify-between items-center">
                  <span className="text-lg font-semibold text-batik-dark">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn btn-primary mb-3"
              >
                Checkout
                <ArrowRight size={20} className="inline ml-2" />
              </button>

              <Link
                to="/shop"
                className="w-full btn btn-secondary block text-center"
              >
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
