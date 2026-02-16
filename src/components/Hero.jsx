import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background Pattern with Parallax */}
      <div 
        className="absolute inset-0 -z-10 transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow [animation-delay:1s]"></div>
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 shadow-sm hover:shadow-md transition-shadow cursor-default">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Koleksi Terbaru 2024
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-batik-dark leading-tight">
              Pesona Batik
              <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-bronze to-secondary animate-gradient-x">Warisan Nusantara</span>
            </h1>

            <p className="text-lg md:text-xl text-batik-brown/70 leading-relaxed max-w-xl">
              Temukan keindahan batik autentik Indonesia dengan desain modern
              yang memukau. Setiap kain menceritakan kisah budaya yang kaya dan
              elegansi yang abadi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/shop")}
                className="btn btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Jelajahi Koleksi
                  <ArrowRight
                    size={20}
                    className="inline ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => navigate("/shop?category=traditional")}
                className="btn btn-secondary group hover:scale-105 transition-transform duration-300"
              >
                Koleksi Premium
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-batik-beige">
              {[
                { value: "500+", label: "Produk Batik" },
                { value: "10K+", label: "Pelanggan" },
                { value: "4.9★", label: "Rating" }
              ].map((stat, idx) => (
                <div key={idx} className="group hover:-translate-y-1 transition-transform duration-300 cursor-default">
                  <p className="text-3xl font-bold text-primary group-hover:text-secondary transition-colors">{stat.value}</p>
                  <p className="text-sm text-batik-brown/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative lg:h-[600px] animate-fade-in lg:block hidden">
            <div 
              className="relative w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
            >
              {/* Main Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/hero/model-batik.png"
                  alt="Model Batik Nusantara"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
              </div>

              {/* Floating Cards with distinct parallax */}
              <div 
                className="absolute -left-8 top-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl animate-float border border-white/50"
                style={{ transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)` }}
              >
                <p className="text-sm text-batik-brown/60 mb-1">Batik Tulis</p>
                <p className="text-2xl font-bold text-primary">Premium</p>
              </div>

              <div 
                className="absolute -right-8 bottom-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl animate-float [animation-delay:1.5s] border border-white/50"
                style={{ transform: `translate(${mousePosition.x * -1.2}px, ${mousePosition.y * -1.2}px)` }}
              >
                <p className="text-sm text-batik-brown/60 mb-1">
                  Gratis Ongkir
                </p>
                <p className="text-2xl font-bold text-primary">Se-Indonesia</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse [animation-delay:2s]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
