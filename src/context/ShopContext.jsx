import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const ShopContext = createContext();

// Custom hook untuk menggunakan context
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Load data dari localStorage saat pertama kali load
  useEffect(() => {
    const savedCart = localStorage.getItem("batik-cart");
    const savedWishlist = localStorage.getItem("batik-wishlist");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("batik-cart");
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
        localStorage.removeItem("batik-wishlist");
      }
    }
  }, []);

  // Simpan cart ke localStorage saat berubah
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("batik-cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("batik-cart");
    }
  }, [cart]);

  // Simpan wishlist ke localStorage saat berubah
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("batik-wishlist", JSON.stringify(wishlist));
    } else {
      localStorage.removeItem("batik-wishlist");
    }
  }, [wishlist]);

  // PERBAIKAN: Tambahkan function untuk clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Fungsi untuk menambahkan produk ke cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
      showNotification("Jumlah produk di keranjang ditambah!", "success");
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ]);
      showNotification("Produk berhasil ditambahkan ke keranjang!", "success");
    }
  };

  // Update quantity di cart
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // Hapus produk dari cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    showNotification("Produk dihapus dari keranjang", "info");
  };

  // Kosongkan cart
  const clearCart = () => {
    setCart([]);
    showNotification("Keranjang dikosongkan", "info");
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);

    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      showNotification("Produk dihapus dari wishlist", "info");
    } else {
      setWishlist([
        ...wishlist,
        { ...product, addedAt: new Date().toISOString() },
      ]);
      showNotification("Produk ditambahkan ke wishlist!", "success");
    }
  };

  // Hapus dari wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
    showNotification("Produk dihapus dari wishlist", "info");
  };

  // Cek apakah produk ada di wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Tampilkan notifikasi
  const showNotification = (message, type = "success") => {
    // Hapus notifikasi sebelumnya jika ada
    setNotification(null);

    // Tampilkan notifikasi baru setelah delay kecil
    setTimeout(() => {
      setNotification({ message, type });

      // Auto close setelah 3 detik
      setTimeout(() => {
        clearNotification();
      }, 3000);
    }, 10);
  };

  // Hapus notifikasi
  const clearNotification = () => {
    setNotification(null);
  };

  // Hitung total harga cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Hitung total item di cart
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Nilai yang akan disediakan oleh context
  const value = {
    // State
    cart,
    wishlist,
    notification,
    searchQuery,
    selectedCategory,

    // Setters
    setSearchQuery,
    setSelectedCategory,
    clearSearch, // PERBAIKAN: Tambahkan ini

    // Cart functions
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,

    // Wishlist functions
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,

    // Notification functions
    showNotification,
    clearNotification,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

// Export ShopContext untuk digunakan di App.jsx
export { ShopContext };
