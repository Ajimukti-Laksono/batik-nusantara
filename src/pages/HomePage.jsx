import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import RamadanPromo from "../components/RamadanPromo";
import Features from "../components/Features";
import SupportSection from "../components/SupportSection";
import { Shield, CheckCircle, Sparkles } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    artisans: 0,
    satisfaction: 0,
  });

  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (aboutInView) {
      setStats({
        customers: 10250,
        products: 125,
        artisans: 89,
        satisfaction: 98,
      });
    }
  }, [aboutInView]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div id="home">
        <Hero />
      </div>

      {/* Shop Preview Section */}
      <div id="shop">
        <Categories />
      </div>

      {/* KOMPONEN RAMADAN PROMO */}
      <RamadanPromo />

      {/* Collection Section */}
      <div id="koleksi">
        <Features />
      </div>

      {/* About Section */}
      <section ref={aboutRef} id="tentang" className="section-padding bg-white">
        <div className="container-custom">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              aboutInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Tentang Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-batik-dark mb-4">
              Menjaga Tradisi, Menciptakan Inovasi
            </h2>
            <p className="text-lg text-batik-brown/70 max-w-3xl mx-auto">
              Batik Nusantara didirikan dengan misi untuk melestarikan seni
              batik tradisional Indonesia sambil menghadirkan sentuhan modern
              yang relevan dengan gaya hidup masa kini.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-batik-dark">
                  Warisan Budaya dengan Sentuhan Modern
                </h3>
                <p className="text-batik-brown/80 leading-relaxed">
                  Setiap produk kami dibuat dengan penuh dedikasi oleh pengrajin
                  berpengalaman yang telah turun-temurun menjaga keaslian motif
                  batik Indonesia.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-batik-cream p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <CountUp end={stats.customers} duration={2} separator="," />
                    +
                  </div>
                  <p className="text-sm text-batik-brown">Pelanggan</p>
                </div>
                <div className="bg-batik-cream p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <CountUp end={stats.products} duration={2} />+
                  </div>
                  <p className="text-sm text-batik-brown">Produk</p>
                </div>
                <div className="bg-batik-cream p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <CountUp end={stats.artisans} duration={2} />+
                  </div>
                  <p className="text-sm text-batik-brown">Pengrajin</p>
                </div>
                <div className="bg-batik-cream p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <CountUp end={stats.satisfaction} duration={2} />%
                  </div>
                  <p className="text-sm text-batik-brown">Kepuasan</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-primary/10 rounded-3xl p-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="text-primary" size={24} />
                    <h4 className="text-xl font-bold text-batik-dark">
                      Visi & Misi Kami
                    </h4>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Melestarikan warisan budaya batik Indonesia",
                      "Mendukung ekonomi pengrajin lokal",
                      "Menghadirkan batik berkualitas premium",
                      "Inovasi desain untuk generasi muda",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 group hover:bg-batik-cream p-2 rounded-lg transition-colors"
                      >
                        <CheckCircle
                          className="text-green-500 flex-shrink-0 mt-1"
                          size={20}
                        />
                        <span className="group-hover:text-primary transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KOMPONEN SUPPORT SECTION */}
      <SupportSection />
    </div>
  );
};

export default HomePage;
