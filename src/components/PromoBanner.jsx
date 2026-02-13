import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const PromoBanner = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Penawaran Spesial
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Koleksi Ramadan
              <span className="block">Diskon hingga 40%</span>
            </h2>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Sambut bulan suci dengan koleksi batik eksklusif. Penawaran terbatas 
              hanya untuk Anda!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn bg-white text-primary hover:bg-batik-cream group">
                Belanja Sekarang
                <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary">
                Lihat Koleksi
              </button>
            </div>

            {/* Countdown Timer (Optional) */}
            <div className="flex gap-4 pt-6">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm text-white/80">Hari</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                  <p className="text-3xl font-bold">08</p>
                  <p className="text-sm text-white/80">Jam</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                  <p className="text-3xl font-bold">45</p>
                  <p className="text-sm text-white/80">Menit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative h-96 lg:h-[500px]">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles size={40} className="text-white" />
                  </div>
                  <p className="text-white font-semibold text-lg">Koleksi Ramadan 2024</p>
                </div>
              </div>
            </div>

            {/* Floating Discount Badge */}
            <div className="absolute -top-6 -right-6 bg-gold text-white rounded-full w-32 h-32 flex items-center justify-center shadow-2xl animate-float">
              <div className="text-center">
                <p className="text-3xl font-bold">40%</p>
                <p className="text-xs uppercase">OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
