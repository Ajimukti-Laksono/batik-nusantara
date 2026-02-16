import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Notification from "./components/Notification";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));

// Komponen utama App
function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ShopProvider>
        <div className="App min-h-screen flex flex-col">
          {!isOnline && (
            <div className="bg-yellow-500 text-white text-center py-2 px-4">
              ⚠️ Anda sedang offline. Beberapa fitur mungkin terbatas.
            </div>
          )}

          <Navbar />

          <main className="flex-grow">
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-batik-beige border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-batik-brown/70">Memuat halaman...</p>
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                  path="/order-success/:orderId"
                  element={<OrderSuccessPage />}
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />

          {/* Notification ditangani di ShopContext */}
        </div>
      </ShopProvider>
    </Router>
  );
}

export default App;
