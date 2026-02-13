import React from "react";
import { useShop } from "../context/ShopContext";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-batik-cream rounded-full flex items-center justify-center">
              <Heart size={64} className="text-batik-brown/30" />
            </div>
            <h2 className="text-3xl font-bold text-batik-dark">
              Wishlist Kosong
            </h2>
            <p className="text-batik-brown/70 text-lg">
              Simpan produk favoritmu di sini untuk dibeli nanti!
            </p>
            <Link
              to="/"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              Jelajahi Produk
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-batik-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-batik-dark mb-2">
            Wishlist Saya
          </h1>
          <p className="text-batik-brown/70">
            {wishlist.length} produk yang kamu simpan
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/categories/formal.jpg";
                  }}
                />

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-red-500 text-batik-brown hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>

                {/* Badge */}
                {product.badge && (
                  <div
                    className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}
                  >
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-batik-dark line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-batik-brown/50 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product.id);
                  }}
                  className="w-full btn btn-primary group/btn"
                >
                  <ShoppingCart size={18} className="inline mr-2" />
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link to="/" className="btn btn-secondary">
            Lanjut Belanja
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
