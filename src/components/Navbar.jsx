import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Package,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useShop } from "../context/ShopContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, wishlist, logout, user } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchInput)}`);
      setSearchOpen(false);
      setSearchInput("");
    }
  };

  const handleMobileToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCloseMobile = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Koleksi", path: "/#koleksi", hash: true },
    { name: "Tentang", path: "/#tentang", hash: true },
    { name: "Kontak", path: "/#kontak", hash: true },
  ];

  const isActiveLink = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO & BRAND - TAMPIL DI SEMUA LAYAR */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-3 group"
                onClick={handleCloseMobile}
              >
                {/* LOGO WITH GLOW */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-[#684F33] animate-pulse-slow" />
                  <img
                    src="/images/logo.png"
                    alt="Batik Nusantara Logo"
                    className="relative h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(104,79,51,0.65)]"
                  />
                </div>

                {/* ✅ TEKS BRAND - SELALU TAMPIL */}
                <div className="leading-tight">
                  <h1 className="text-primary font-semibold tracking-wide text-base xs:text-lg">
                    Batik Nusantara
                  </h1>
                  <p className="text-[10px] xs:text-xs text-primary-light tracking-widest">
                    Elegansi Budaya Indonesia
                  </p>
                </div>
              </Link>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <nav className="flex items-center gap-10 text-primary font-medium">
                {navLinks.map((link, index) => {
                  const LinkComponent = link.hash ? HashLink : Link;
                  return (
                    <LinkComponent
                      key={index}
                      to={link.path}
                      smooth={link.hash}
                      className={`relative transition ${
                        isActiveLink(link.path)
                          ? "text-secondary after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-secondary"
                          : "hover:text-secondary"
                      }`}
                    >
                      {link.name}
                    </LinkComponent>
                  );
                })}
              </nav>
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-6 text-primary">
              <button
                onClick={() => setSearchOpen(true)}
                className="hover:text-secondary transition"
              >
                <Search size={22} />
              </button>

              <Link
                to="/wishlist"
                className="relative hover:text-secondary transition"
              >
                <Heart size={22} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative hover:text-secondary transition"
              >
                <ShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>

              {!user ? (
                <Link
                  to="/login"
                  className="flex items-center gap-2 border border-primary/20 px-4 py-2 rounded-full hover:border-secondary hover:text-secondary transition"
                >
                  <User size={18} />
                  <span className="text-sm">Masuk</span>
                </Link>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 border border-primary/20 px-4 py-2 rounded-full hover:border-secondary hover:text-secondary transition"
                  >
                    <User size={18} />
                    <span className="text-sm max-w-[100px] truncate">
                      {user.name || "Akun"}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-white border border-primary/10 rounded-xl shadow-lg overflow-hidden z-50">
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 transition text-sm"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Package size={16} />
                        Pesanan Saya
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition text-sm"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={handleMobileToggle}
              className="lg:hidden text-primary ml-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-primary/10 shadow-md">
            <div className="px-6 py-6 space-y-5 text-primary font-medium">
              {navLinks.map((link, index) => {
                const LinkComponent = link.hash ? HashLink : Link;
                return (
                  <LinkComponent
                    key={index}
                    to={link.path}
                    smooth={link.hash}
                    onClick={handleCloseMobile}
                    className="block hover:text-secondary transition"
                  >
                    {link.name}
                  </LinkComponent>
                );
              })}

              <div className="pt-4 border-t border-primary/10 flex items-center gap-6 text-xl">
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    handleCloseMobile();
                  }}
                  className="hover:text-secondary"
                >
                  <Search />
                </button>
                <Link
                  to="/wishlist"
                  onClick={handleCloseMobile}
                  className="hover:text-secondary"
                >
                  <Heart />
                </Link>
                <Link
                  to="/cart"
                  onClick={handleCloseMobile}
                  className="hover:text-secondary"
                >
                  <ShoppingCart />
                </Link>
              </div>

              {!user ? (
                <Link
                  to="/login"
                  onClick={handleCloseMobile}
                  className="inline-flex items-center gap-2 border border-primary/20 px-4 py-2 rounded-full hover:border-secondary hover:text-secondary transition text-sm"
                >
                  <User size={16} />
                  Masuk
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    handleCloseMobile();
                  }}
                  className="inline-flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-32 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-primary/60 hover:text-primary"
            >
              <X size={22} />
            </button>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Cari Produk Batik
            </h3>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
                  size={20}
                />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari batik tulis, kemeja, dress..."
                  className="w-full border border-primary/20 rounded-full pl-12 pr-5 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="mt-5 w-full bg-secondary hover:bg-secondary-dark text-white py-3 rounded-full font-medium transition"
              >
                Cari
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
