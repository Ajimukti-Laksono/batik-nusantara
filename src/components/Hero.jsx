import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Sparkles size={16} />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Koleksi Terbaru 2024
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-batik-dark leading-tight">
              Pesona Batik
              <span className="block text-gradient">Warisan Nusantara</span>
            </h1>

            <p className="text-lg md:text-xl text-batik-brown/70 leading-relaxed max-w-xl">
              Temukan keindahan batik autentik Indonesia dengan desain modern
              yang memukau. Setiap kain menceritakan kisah budaya yang kaya dan
              elegansi yang abadi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/shop")}
                className="btn btn-primary group"
              >
                Jelajahi Koleksi
                <ArrowRight
                  size={20}
                  className="inline ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => navigate("/shop?category=traditional")}
                className="btn btn-secondary"
              >
                Koleksi Premium
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-batik-beige">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-batik-brown/60">Produk Batik</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-batik-brown/60">Pelanggan</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4.9★</p>
                <p className="text-sm text-batik-brown/60">Rating</p>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative lg:h-[600px] animate-fade-in">
            <div className="relative w-full h-full">
              {/* Main Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero/model-batik.png"
                  alt="Model Batik Nusantara"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-20 bg-white p-6 rounded-2xl shadow-xl animate-float hidden lg:block">
                <p className="text-sm text-batik-brown/60 mb-1">Batik Tulis</p>
                <p className="text-2xl font-bold text-primary">Premium</p>
              </div>

              <div className="absolute -right-8 bottom-20 bg-white p-6 rounded-2xl shadow-xl animate-float [animation-delay:1.5s] hidden lg:block">
                <p className="text-sm text-batik-brown/60 mb-1">
                  Gratis Ongkir
                </p>
                <p className="text-2xl font-bold text-primary">Se-Indonesia</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
