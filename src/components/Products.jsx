import React, { useState, useEffect } from "react";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { productsData, formatPrice } from "../data/products";

const Products = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [loadingImages, setLoadingImages] = useState({});

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  } = useShop();

  // Filter products
  useEffect(() => {
    let filtered = productsData;
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  const handleImageError = (productId, e) => {
    console.error(
      `Gambar gagal dimuat untuk produk ${productId}:`,
      e.target.src,
    );
    e.target.src = "/images/placeholder.jpg";
  };

  const handleImageLoad = (productId) => {
    setLoadingImages((prev) => ({ ...prev, [productId]: false }));
  };

  const displayProducts = filteredProducts.slice(0, 8);

  return (
    <>
      <section id="shop" className="section-padding bg-gradient-to-b from-white via-batik-cream to-white">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-bronze to-secondary bg-clip-text text-transparent">
              {searchQuery
                ? `Hasil Pencarian "${searchQuery}"`
                : selectedCategory && selectedCategory !== "all"
                  ? `Produk ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
                  : "Produk Terpopuler"}
            </h2>
            <p className="text-lg text-batik-brown/80 max-w-2xl mx-auto font-medium">
              {filteredProducts.length} produk ditemukan
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-batik-cream rounded-full flex items-center justify-center">
                <ShoppingCart size={48} className="text-batik-brown/30" />
              </div>
              <h3 className="text-2xl font-bold text-batik-dark mb-2">
                Produk Tidak Ditemukan
              </h3>
              <p className="text-batik-brown/70 mb-6">
                Coba kata kunci lain atau lihat semua produk
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="btn btn-primary"
              >
                Lihat Semua Produk
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-gradient-to-br from-white to-batik-cream/50 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-secondary/10 overflow-hidden group transform hover:scale-[1.02] transition-all duration-300 border border-batik-beige/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {product.badge && (
                      <div
                        className={`absolute top-4 left-4 ${product.badgeColor} text-white px-4 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg`}
                      >
                        {product.badge}
                      </div>
                    )}

                    <div className="relative h-80 overflow-hidden">
                      {loadingImages[product.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${loadingImages[product.id] ? "opacity-0" : "opacity-100"}`}
                        onLoad={() => handleImageLoad(product.id)}
                        onError={(e) => handleImageError(product.id, e)}
                        loading="lazy"
                      />

                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <button
                          onClick={() => toggleWishlist(product)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                            isInWishlist(product.id)
                              ? "bg-gradient-to-br from-secondary to-bronze text-white"
                              : "bg-white text-batik-brown hover:bg-gradient-to-br hover:from-secondary-light hover:to-gold hover:text-white"
                          }`}
                        >
                          <Heart
                            size={18}
                            fill={
                              isInWishlist(product.id) ? "currentColor" : "none"
                            }
                          />
                        </button>
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="w-10 h-10 bg-white text-batik-brown hover:bg-gradient-to-br hover:from-primary hover:to-bronze hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-3 bg-gradient-to-br from-white to-batik-cream/30">
                      <h3 className="font-bold text-lg bg-gradient-to-r from-batik-dark to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-bronze transition-all line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < product.rating
                                  ? "text-gold fill-gold"
                                  : "text-batik-beige"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-batik-brown/70 font-medium">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-bronze bg-clip-text text-transparent">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-batik-brown/50 line-through font-medium">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-batik-brown/70 font-medium">
                        Stok: <span className="text-primary font-bold">{product.stock}</span> pcs
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary via-bronze to-secondary text-white font-bold shadow-lg shadow-bronze/20 hover:shadow-xl hover:shadow-secondary/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart size={18} className="inline mr-2" />
                        {product.stock === 0
                          ? "Stok Habis"
                          : "Tambah ke Keranjang"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button className="btn btn-secondary">
                  Lihat Semua Produk ({productsData.length})
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setQuickViewProduct(null)}
          ></div>
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-batik-cream transition-colors"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="h-96 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-batik-dark mb-2">
                    {quickViewProduct.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < quickViewProduct.rating
                              ? "text-gold fill-gold"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-batik-brown/60">
                      ({quickViewProduct.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-lg text-batik-brown/50 line-through">
                        {formatPrice(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-batik-brown/70 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Ukuran:
                    </label>
                    <div className="flex gap-2">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          className="w-12 h-12 border-2 border-batik-beige hover:border-primary rounded-lg font-semibold transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Warna:
                    </label>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-full bg-primary border-2 border-batik-beige hover:border-primary-dark transition-colors"></button>
                      <button className="w-10 h-10 rounded-full bg-batik-dark border-2 border-batik-beige hover:border-primary-dark transition-colors"></button>
                      <button className="w-10 h-10 rounded-full bg-secondary border-2 border-batik-beige hover:border-primary-dark transition-colors"></button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Stok Tersedia:
                    </label>
                    <div className="text-lg font-semibold text-primary">
                      {quickViewProduct.stock} pcs
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full btn btn-primary"
                  disabled={quickViewProduct.stock === 0}
                >
                  <ShoppingCart size={20} className="inline mr-2" />
                  {quickViewProduct.stock === 0
                    ? "Stok Habis"
                    : "Tambah ke Keranjang"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
