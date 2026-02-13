import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";

const InteractiveTestimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sari Dewi",
      role: "Pengusaha Fashion",
      rating: 5,
      content:
        "Batik dari Batik Nusantara selalu menjadi pilihan utama untuk koleksi saya. Kualitasnya premium dan desainnya sangat modern.",
      avatar: "/images/testimonials/sari.jpg",
      purchase: "Kemeja Batik Parang Modern",
    },
    {
      id: 2,
      name: "Budi Santoso",
      role: "Pegawai Negeri",
      rating: 4,
      content:
        "Sangat puas dengan pelayanannya. Produk sesuai gambar, pengiriman cepat, dan packaging rapi. Recommended!",
      avatar: "/images/testimonials/budi.jpg",
      purchase: "Blazer Batik Kombinasi",
    },
    {
      id: 3,
      name: "Maya Wijaya",
      role: "Ibu Rumah Tangga",
      rating: 5,
      content:
        "Beli dress batik untuk acara keluarga. Banyak dapat pujian! Bahannya nyaman dan motifnya sangat cantik.",
      avatar: "/images/testimonials/maya.jpg",
      purchase: "Dress Batik Mega Mendung",
    },
    {
      id: 4,
      name: "Rizki Pratama",
      role: "Mahasiswa",
      rating: 5,
      content:
        "Sebagai generasi muda, saya suka sekali dengan desain batik modernnya. Tidak ketinggalan zaman dan tetap elegan.",
      avatar: "/images/testimonials/rizki.jpg",
      purchase: "Kemeja Batik Kawung",
    },
  ];

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setAutoplay(false);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="absolute top-6 right-6 text-primary/20">
          <Quote size={48} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Testimonial Content */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < activeTestimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-2xl font-playfair text-batik-dark mb-6">
                "{activeTestimonial.content}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {activeTestimonial.avatar ? (
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={24} className="text-primary" />
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-batik-dark">
                    {activeTestimonial.name}
                  </h4>
                  <p className="text-batik-brown/70">
                    {activeTestimonial.role}
                  </p>
                  <p className="text-sm text-primary font-medium mt-1">
                    Beli: {activeTestimonial.purchase}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-batik-beige hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Stats & Controls */}
          <div className="space-y-8">
            <div className="bg-batik-cream rounded-2xl p-6">
              <h4 className="text-lg font-bold text-batik-dark mb-4">
                Statistik Ulasan
              </h4>
              <div className="space-y-4">
                {[
                  {
                    label: "Kepuasan Pelanggan",
                    value: 98,
                    color: "bg-green-500",
                  },
                  {
                    label: "Produk Sesuai Gambar",
                    value: 95,
                    color: "bg-blue-500",
                  },
                  {
                    label: "Kecepatan Pengiriman",
                    value: 92,
                    color: "bg-primary",
                  },
                  {
                    label: "Layanan Customer",
                    value: 96,
                    color: "bg-secondary",
                  },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-batik-brown">{stat.label}</span>
                      <span className="font-bold">{stat.value}%</span>
                    </div>
                    <div className="h-2 bg-batik-beige rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stat.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="btn btn-outline flex items-center gap-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
                Sebelumnya
              </button>

              <button
                onClick={() => setAutoplay(!autoplay)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  autoplay
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {autoplay ? "⏸️ Pause" : "▶️ Play"}
              </button>

              <button
                onClick={handleNext}
                className="btn btn-primary flex items-center gap-2"
                aria-label="Next testimonial"
              >
                Selanjutnya
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Total Testimonials */}
            <div className="text-center">
              <p className="text-batik-brown/70">
                <span className="text-primary font-bold">
                  {testimonials.length}
                </span>{" "}
                ulasan dari pelanggan puas
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between mt-8">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white border border-batik-beige flex items-center justify-center hover:bg-batik-cream"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? "bg-primary" : "bg-batik-beige"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white border border-batik-beige flex items-center justify-center hover:bg-batik-cream"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTestimonial;
