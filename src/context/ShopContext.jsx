import React, { createContext, useState, useContext, useEffect } from "react";
import Notification from "../components/Notification";

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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: "all", name: "Semua Produk", description: "Lihat semua koleksi batik kami" }
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Laravel Backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('http://localhost:8000/api/storefront/products'),
          fetch('http://localhost:8000/api/storefront/categories')
        ]);
        
        const prodData = await prodRes.json();
        const catData = await catRes.json();

        if (prodData.success) {
          const mappedProducts = prodData.data.map(p => {
            const slugify = (text) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const fallbackImage = `/images/products/${slugify(p.name)}.jpg`;
            
            return {
              ...p,
              category: p.category ? p.category.slug : 'lainnya',
              categoryName: p.category ? p.category.name : 'Lainnya',
              image: p.image && !p.image.startsWith('http') 
                ? `http://localhost:8000/storage/${p.image}` 
                : p.image || fallbackImage,
              rating: 5,
              reviews: Math.floor(Math.random() * 100) + 10,
            };
          });
          setProducts(mappedProducts);
        }

        if (catData.success) {
          setCategories([
            { id: "all", name: "Semua Produk", description: "Lihat semua koleksi batik kami" },
            ...catData.data.map(c => ({ id: c.slug, name: c.name, description: c.description }))
          ]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      showNotification(`Jumlah ${product.name} di keranjang ditambah!`, "success");
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ]);
      showNotification(`${product.name} berhasil ditambahkan ke keranjang!`, "success");
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
    const itemToRemove = cart.find((item) => item.id === productId);
    setCart(cart.filter((item) => item.id !== productId));
    if (itemToRemove) {
      showNotification(`${itemToRemove.name} dihapus dari keranjang`, "info");
    } else {
      showNotification("Produk dihapus dari keranjang", "info");
    }
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
      showNotification(`${product.name} dihapus dari wishlist`, "info");
    } else {
      setWishlist([
        ...wishlist,
        { ...product, addedAt: new Date().toISOString() },
      ]);
      showNotification(`${product.name} ditambahkan ke wishlist!`, "success");
    }
  };

  // Hapus dari wishlist
  const removeFromWishlist = (productId) => {
    const itemToRemove = wishlist.find((item) => item.id === productId);
    setWishlist(wishlist.filter((item) => item.id !== productId));
    if (itemToRemove) {
      showNotification(`${itemToRemove.name} dihapus dari wishlist`, "info");
    } else {
      showNotification("Produk dihapus dari wishlist", "info");
    }
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
    products,
    categories,
    loading,

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

  return (
    <ShopContext.Provider value={value}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
    </ShopContext.Provider>
  );
};

// Export ShopContext untuk digunakan di App.jsx
export { ShopContext };
