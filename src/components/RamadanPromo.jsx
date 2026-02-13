import React from "react";

const RamadanPromo = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-batik-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF8E7] to-[#F5E6D3] border-2 border-[#C7A03B]/20 shadow-2xl p-8 md:p-12">
          {/* BADGE DISKON FLOATING */}
          <div className="badge-floating">
            <div className="flex flex-col items-center justify-center">
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                DISKON
              </span>
              <span className="text-white font-black text-3xl leading-tight">
                40%
              </span>
              <span className="text-white text-[10px] font-bold uppercase">
                OFF
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex">
                <span className="badge-ramadan">✦ KOLEKSI RAMADAN 2024 ✦</span>
              </div>

              <h2 className="title-ramadan">Diskon hingga 40%</h2>

              <p className="text-[#0F5959]/80 text-lg leading-relaxed">
                Sambut bulan suci dengan koleksi batik eksklusif. Penawaran
                terbatas hanya untuk Anda!
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="btn-ramadan-primary">
                  Belanja Sekarang →
                </button>
                <button className="btn-ramadan-secondary">Lihat Koleksi</button>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <div className="badge-online-pulse">
                  <span></span>
                  <span></span>
                </div>
                <span className="text-[#0F5959] font-medium">
                  Tim kami online
                </span>
                <span className="text-[#7C9A8F] text-sm">· Siap membantu</span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F5959]/10 to-[#2D5A4B]/10 rounded-full blur-3xl" />
                <div className="discount-circle w-48 h-48 lg:w-64 lg:h-64 flex flex-col items-center justify-center relative z-10">
                  <span className="text-white/90 text-sm font-bold uppercase tracking-widest">
                    HEMAT
                  </span>
                  <span className="text-white font-black text-5xl lg:text-6xl leading-tight">
                    40%
                  </span>
                  <span className="text-white text-base font-bold uppercase">
                    OFF
                  </span>
                  <span className="text-white/80 text-xs mt-2">
                    *S&K Berlaku
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RamadanPromo;
