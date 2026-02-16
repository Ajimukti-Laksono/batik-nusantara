import React, { useState, useEffect, useMemo } from "react"; // Tambah useMemo
import { useShop } from "../context/ShopContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { productsData, categories, formatPrice } from "../data/products";

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    // clearSearch // if needed, but setSearchQuery("") is enough
  } = useShop();

  // PERBAIKAN: Gunakan useMemo untuk filter agar lebih efisien
  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    // Filter by category - PERBAIKAN: "all" menampilkan semua
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query - PERBAIKAN: Cek jika query kosong
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(query)) ||
          (p.description && p.description.toLowerCase().includes(query)),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max,
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    // Sort products
    let sortedProducts = [...filtered];
    switch (sortBy) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sort bisa diatur di sini, misalnya by id atau popularity
        break;
    }

    return sortedProducts;
  }, [searchQuery, selectedCategory, sortBy, priceRange, selectedRating]); // Tambah dependency

  // Check if coming from category click or search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const search = params.get("search");

    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("all");
    }
    
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery("");
    }
  }, [location.search, setSelectedCategory, setSearchQuery]); // Dependency on location.search string only

  // Reset filters dengan benar
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery(""); // Also clear search
    setSortBy("default");
    setPriceRange({ min: 0, max: 1000000 });
    setSelectedRating(0);
    // Reset URL to /shop to remove query params
    navigate("/shop");
  };



  return (
    <>
      <div className="min-h-screen bg-batik-cream pt-24 pb-12">
        <div className="container-custom">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-batik-dark mb-2">
              {selectedCategory && selectedCategory !== "all"
                ? `Batik ${categories.find((c) => c.id === selectedCategory)?.name}`
                : "Semua Koleksi Batik"}
            </h1>
            <p className="text-batik-brown/70">
              {filteredProducts.length} produk ditemukan
              {searchQuery && searchQuery.trim() !== "" && (
                <span className="ml-2">
                  untuk pencarian: "
                  <span className="text-primary font-semibold">
                    {searchQuery}
                  </span>
                  "
                </span>
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-batik-dark flex items-center gap-2">
                    <Filter size={20} />
                    Filter
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Reset
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-batik-dark mb-3">
                    Kategori
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm text-batik-brown">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-batik-dark mb-3">Harga</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-batik-brown/70">
                        Minimum
                      </label>
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: Number(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-batik-beige rounded-lg text-sm"
                        placeholder="Rp 0"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-batik-brown/70">
                        Maximum
                      </label>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: Number(e.target.value) || 1000000,
                          })
                        }
                        className="w-full px-3 py-2 border border-batik-beige rounded-lg text-sm"
                        placeholder="Rp 1.000.000"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold text-batik-dark mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating}
                          onChange={(e) =>
                            setSelectedRating(Number(e.target.value))
                          }
                          className="w-4 h-4 text-primary"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < rating
                                  ? "text-gold fill-gold"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="text-sm text-batik-brown ml-1">
                            & up
                          </span>
                        </div>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                      <input
                        type="radio"
                        name="rating"
                        value={0}
                        checked={selectedRating === 0}
                        onChange={() => setSelectedRating(0)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-batik-brown">
                        Semua Rating
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden btn btn-outline flex items-center gap-2"
                >
                  <SlidersHorizontal size={18} />
                  Filter & Sort
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3">
                  <label className="text-sm text-batik-brown/70">
                    Urutkan:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border-2 border-batik-beige rounded-lg focus:border-primary focus:outline-none"
                  >
                    <option value="default">Default</option>
                    <option value="name">Nama A-Z</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-batik-cream rounded-full flex items-center justify-center">
                    <ShoppingCart size={48} className="text-batik-brown/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-batik-dark mb-2">
                    Produk Tidak Ditemukan
                  </h3>
                  <p className="text-batik-brown/70 mb-6">
                    {searchQuery && searchQuery.trim() !== ""
                      ? `Tidak ada produk yang cocok dengan "${searchQuery}"`
                      : "Tidak ada produk dalam filter yang dipilih"}
                  </p>
                  <button onClick={resetFilters} className="btn btn-primary">
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="card card-hover overflow-hidden group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Badge */}
                      {product.badge && (
                        <div
                          className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold z-10`}
                        >
                          {product.badge}
                        </div>
                      )}

                      {/* Image */}
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x400?text=Batik+Product";
                          }}
                        />

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                          <button
                            onClick={() => toggleWishlist(product)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                              isInWishlist(product.id)
                                ? "bg-red-500 text-white"
                                : "bg-white text-batik-brown hover:bg-red-500 hover:text-white"
                            }`}
                          >
                            <Heart
                              size={18}
                              fill={
                                isInWishlist(product.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="w-10 h-10 bg-white text-batik-brown hover:bg-primary hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-lg text-batik-dark group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${
                                  i < product.rating
                                    ? "text-gold fill-gold"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-batik-brown/60">
                            ({product.reviews})
                          </span>
                        </div>

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
                          onClick={() => addToCart(product)}
                          className="w-full btn btn-primary group/btn"
                        >
                          <ShoppingCart size={18} className="inline mr-2" />
                          Tambah ke Keranjang
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowFilters(false)}
          ></div>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-batik-dark">
                Filter & Sort
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-batik-cream rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-semibold text-batik-dark mb-3">Kategori</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category-mobile"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-batik-dark mb-3">Harga</h4>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-batik-beige rounded-lg"
                    placeholder="Min"
                    min="0"
                  />
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value) || 1000000,
                      })
                    }
                    className="w-full px-3 py-2 border border-batik-beige rounded-lg"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="font-semibold text-batik-dark mb-3">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating-mobile"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={(e) =>
                          setSelectedRating(Number(e.target.value))
                        }
                        className="w-4 h-4 text-primary"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < rating
                                ? "text-gold fill-gold"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-sm text-batik-brown ml-1">
                          & up
                        </span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating-mobile"
                      value={0}
                      checked={selectedRating === 0}
                      onChange={() => setSelectedRating(0)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm text-batik-brown">
                      Semua Rating
                    </span>
                  </label>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-semibold text-batik-dark mb-3">Urutkan</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-batik-beige rounded-lg"
                >
                  <option value="default">Default</option>
                  <option value="name">Nama A-Z</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="w-full btn btn-secondary"
              >
                Reset Filter
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full btn btn-primary"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setQuickViewProduct(null)}
          ></div>
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-batik-cream transition-colors"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="h-96 rounded-xl overflow-hidden">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=Batik+Product";
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

                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full btn btn-primary"
                >
                  <ShoppingCart size={20} className="inline mr-2" />
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopPage;
