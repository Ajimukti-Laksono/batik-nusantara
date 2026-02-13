import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/products";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    // Navigate to shop page with category parameter
    navigate(`/shop?category=${categoryId}`);

    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Skip the 'all' category in display
  const displayCategories = categories.filter((cat) => cat.id !== "all");

  // Image mapping for categories
  const imageMap = {
    formal: "/images/categories/formal.jpg",
    casual: "/images/categories/casual.jpg",
    modern: "/images/categories/modern.jpg",
    traditional: "/images/categories/traditional.jpg",
    accessories: "/images/categories/aksesoris.jpg",
  };

  return (
    <section id="koleksi" className="section-padding bg-gradient-to-b from-white via-batik-cream to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-bronze to-secondary bg-clip-text text-transparent">
            Kategori Pilihan
          </h2>
          <p className="text-lg text-batik-brown/80 max-w-2xl mx-auto font-medium">
            Eksplorasi koleksi batik untuk setiap momen istimewa Anda
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {displayCategories.map((category, index) => (
            <div
              key={category.id}
              className="bg-gradient-to-br from-white to-batik-cream/50 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-secondary/10 cursor-pointer group overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="h-72 relative overflow-hidden bg-gradient-to-br from-batik-beige to-batik-sand">
                <img
                  src={imageMap[category.id]}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Category Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-batik-dark/90 via-primary-dark/70 to-transparent p-4">
                  <p className="text-white font-bold text-lg drop-shadow-lg">
                    {category.name}
                  </p>
                </div>

                {/* Hover Overlay dengan gradient mewah */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-bronze/90 to-secondary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className="bg-gradient-to-r from-white to-batik-cream text-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Lihat Koleksi
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6 bg-gradient-to-br from-white to-batik-cream/30">
                <h3 className="text-xl font-bold bg-gradient-to-r from-batik-dark to-primary bg-clip-text text-transparent mb-2 group-hover:from-primary group-hover:to-bronze transition-all">
                  {category.name}
                </h3>
                <p className="text-batik-brown/80 text-sm mb-4 font-medium">
                  {category.description}
                </p>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-center bg-gradient-to-r from-primary to-bronze bg-clip-text text-transparent font-bold text-sm group-hover:gap-2 transition-all"
                >
                  Lihat Koleksi
                  <ArrowRight
                    size={16}
                    className="ml-1 group-hover:translate-x-1 transition-transform text-bronze"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/shop")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-secondary via-gold to-bronze text-white font-bold shadow-xl shadow-secondary/30 hover:shadow-2xl hover:shadow-gold/40 transform hover:scale-105 transition-all duration-300"
          >
            Lihat Semua Kategori
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
