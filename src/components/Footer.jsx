import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-batik-lasem text-white/90 footer-border-batik">
      {/* ✨ MOTIF BATIK OVERLAY - SANGAT HALUS */}
      <div className="absolute inset-0 bg-batik-lasem opacity-100"></div>

      {/* ✨ DARK OVERLAY UNTUK READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* BRAND SECTION - LG: 4 COLUMNS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-xl opacity-40 bg-[#D4AF37] animate-pulse-slow"></div>
                <img
                  src="/images/logo-white.png"
                  alt="Batik Nusantara"
                  className="relative h-12 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/48x48?text=BN";
                  }}
                />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-white">
                Batik <span className="text-[#D4AF37]">Nusantara</span>
              </h2>
            </div>

            <p className="text-white/80 leading-relaxed max-w-md">
              Menghadirkan keindahan batik Indonesia dengan kualitas terbaik dan
              desain modern untuk Anda. Setiap helai kain menceritakan warisan
              budaya yang abadi.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="Facebook"
              >
                <Facebook
                  size={18}
                  className="text-white/90 group-hover:text-white"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="Instagram"
              >
                <Instagram
                  size={18}
                  className="text-white/90 group-hover:text-white"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="Twitter"
              >
                <Twitter
                  size={18}
                  className="text-white/90 group-hover:text-white"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="Youtube"
              >
                <Youtube
                  size={18}
                  className="text-white/90 group-hover:text-white"
                />
              </a>
            </div>
          </div>

          {/* COMPANY LINKS - LG: 2 COLUMNS */}
          <div className="lg:col-span-2">
            <h3 className="font-playfair text-lg font-semibold text-white mb-5 relative inline-block">
              Perusahaan
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Cerita Kami", path: "/#tentang", hash: true },
                { name: "Artisan Partner", path: "/#artisan", hash: true },
                { name: "Keberlanjutan", path: "/#keberlanjutan", hash: true },
                { name: "Karir", path: "/karir" },
                { name: "Blog", path: "/blog" },
              ].map((link, index) => {
                const LinkComponent = link.hash ? HashLink : Link;
                return (
                  <li key={index}>
                    <LinkComponent
                      to={link.path}
                      smooth={link.hash}
                      className="text-white/70 hover:text-[#D4AF37] transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-[#D4AF37]/50 rounded-full group-hover:w-2 transition-all"></span>
                      {link.name}
                    </LinkComponent>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* SUPPORT LINKS - LG: 2 COLUMNS */}
          <div className="lg:col-span-2">
            <h3 className="font-playfair text-lg font-semibold text-white mb-5 relative inline-block">
              Bantuan
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Cara Pemesanan", path: "/cara-pemesanan" },
                { name: "Pengiriman", path: "/pengiriman" },
                { name: "Pengembalian", path: "/pengembalian" },
                { name: "FAQ", path: "/faq" },
                { name: "Syarat & Ketentuan", path: "/syarat-ketentuan" },
                { name: "Kebijakan Privasi", path: "/kebijakan-privasi" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-[#D4AF37] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#D4AF37]/50 rounded-full group-hover:w-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER - LG: 4 COLUMNS */}
          <div className="lg:col-span-4">
            <h3 className="font-playfair text-lg font-semibold text-white mb-5 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <p className="text-white/70 mb-4 text-sm">
              Dapatkan update koleksi terbaru dan penawaran eksklusif langsung
              di email Anda.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex-1 relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Alamat email Anda"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#D4AF37] hover:bg-[#7A6B39] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
              >
                Berlangganan
              </button>
            </form>

            <p className="text-white/50 text-xs mt-4">
              Dengan mendaftar, Anda menyetujui{" "}
              <Link
                to="/syarat-ketentuan"
                className="text-white/80 hover:text-[#D4AF37] underline underline-offset-2"
              >
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link
                to="/kebijakan-privasi"
                className="text-white/80 hover:text-[#D4AF37] underline underline-offset-2"
              >
                Kebijakan Privasi
              </Link>{" "}
              kami.
            </p>
          </div>
        </div>

        {/* CONTACT INFO BAR */}
        <div className="relative py-6 mb-6 border-y border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">ALAMAT</p>
                <p className="text-white/90 text-sm">
                  Jl. Batik Indah No. 123, Yogyakarta
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">TELEPON</p>
                <p className="text-white/90 text-sm">+62 812-3456-7890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">JAM OPERASIONAL</p>
                <p className="text-white/90 text-sm">
                  Senin - Jumat: 08:00 - 17:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT & BOTTOM LINKS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            © {currentYear} Batik Nusantara. All rights reserved. Made with{" "}
            <Heart
              size={14}
              className="inline text-[#D4AF37] fill-current mx-0.5"
            />{" "}
            for Indonesian Heritage
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/syarat-ketentuan"
              className="text-white/60 hover:text-[#D4AF37] text-xs transition-colors"
            >
              Syarat & Ketentuan
            </Link>
            <Link
              to="/kebijakan-privasi"
              className="text-white/60 hover:text-[#D4AF37] text-xs transition-colors"
            >
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
