// Normalize category slug for consistent filtering and routing
export const normalizeCategorySlug = (slug) => {
  if (!slug) return "";
  const s = String(slug).toLowerCase().trim();
  if (s === "all" || s === "semua" || s === "semua-produk") return "all";
  if (s === "formal" || s === "batik-formal") return "batik-formal";
  if (s === "casual" || s === "batik-casual") return "batik-casual";
  if (s === "modern" || s === "batik-modern") return "batik-modern";
  if (s === "traditional" || s === "batik-traditional") return "batik-traditional";
  if (
    s === "accessories" ||
    s === "aksesoris" ||
    s === "aksesoris-batik" ||
    s === "batik-aksesoris"
  ) {
    return "aksesoris-batik";
  }
  return s;
};

// Product data
export const productsData = [
  {
    id: 1,
    name: "Kemeja Batik Parang Modern",
    category: "batik-modern",
    categoryName: "Modern",
    price: 285000,
    originalPrice: 350000,
    rating: 5,
    reviews: 128,
    badge: "Best Seller",
    badgeColor: "bg-gradient-to-r from-gold to-accent",
    description:
      "Kemeja batik dengan motif parang modern yang stylish dan elegan. Cocok untuk acara formal maupun kasual.",
    image: "/images/products/kemeja-batik-parang-modern.jpg",
    stock: 25,
  },
  {
    id: 2,
    name: "Dress Batik Mega Mendung",
    category: "batik-casual",
    categoryName: "Casual",
    price: 425000,
    originalPrice: 550000,
    rating: 5,
    reviews: 95,
    badge: "Hot",
    badgeColor: "bg-gradient-to-r from-bronze to-bronze-dark",
    description:
      "Dress batik dengan motif mega mendung khas Cirebon. Nyaman dipakai untuk berbagai acara.",
    image: "/images/products/dress-batik-megamendung.jpg",
    stock: 18,
  },
  {
    id: 3,
    name: "Blazer Batik Kombinasi",
    category: "batik-formal",
    categoryName: "Formal",
    price: 650000,
    originalPrice: 800000,
    rating: 5,
    reviews: 67,
    badge: "Premium",
    badgeColor: "bg-gradient-to-r from-gold to-accent",
    description:
      "Blazer batik kombinasi dengan bahan premium. Sempurna untuk tampilan profesional.",
    image: "/images/products/blazer-batik-kombinasi.jpg",
    stock: 12,
  },
  {
    id: 4,
    name: "Sarung Batik Tulis Premium",
    category: "batik-traditional",
    categoryName: "Traditional",
    price: 550000,
    originalPrice: 700000,
    rating: 5,
    reviews: 52,
    badge: "Handmade",
    badgeColor: "bg-gradient-to-r from-secondary-light to-secondary",
    description:
      "Sarung batik tulis premium dengan kualitas terbaik. Dibuat oleh pengrajin berpengalaman.",
    image: "/images/products/sarung-batik-tulis-premium.jpg",
    stock: 8,
  },
  {
    id: 5,
    name: "Kemeja Batik Kawung",
    category: "batik-formal",
    categoryName: "Formal",
    price: 320000,
    originalPrice: 400000,
    rating: 4,
    reviews: 89,
    badge: "New",
    badgeColor: "bg-gradient-to-r from-secondary-light to-secondary",
    description:
      "Kemeja batik motif kawung klasik dengan sentuhan modern. Cocok untuk berbagai acara formal.",
    image: "/images/products/kemeja-batik-kawung.jpg",
    stock: 30,
  },
  {
    id: 6,
    name: "Rok Batik Plisket",
    category: "batik-casual",
    categoryName: "Casual",
    price: 275000,
    originalPrice: 350000,
    rating: 5,
    reviews: 73,
    badge: "Trending",
    badgeColor: "bg-gradient-to-r from-bronze to-bronze-dark",
    description:
      "Rok batik plisket dengan desain modern dan nyaman. Perfect untuk tampilan casual chic.",
    image: "/images/products/rok-batik-plisket.jpg",
    stock: 20,
  },
  {
    id: 7,
    name: "Blouse Batik Kombinasi",
    category: "batik-modern",
    categoryName: "Modern",
    price: 295000,
    originalPrice: 380000,
    rating: 5,
    reviews: 91,
    badge: "Popular",
    badgeColor: "bg-gradient-to-r from-secondary to-gold",
    description:
      "Blouse batik kombinasi dengan cutting modern. Elegan dan stylish untuk berbagai kesempatan.",
    image: "/images/products/blouse-batik-kombinasi.jpg",
    stock: 22,
  },
  {
    id: 8,
    name: "Kain Batik Tulis Solo",
    category: "batik-traditional",
    categoryName: "Traditional",
    price: 850000,
    originalPrice: 1200000,
    rating: 5,
    reviews: 41,
    badge: "Limited",
    badgeColor: "bg-gradient-to-r from-bronze to-bronze-dark",
    description:
      "Kain batik tulis asli Solo dengan motif klasik. Warisan budaya dengan kualitas premium.",
    image: "/images/products/kain-batik-tulis-solo.jpg",
    stock: 5,
  },
  {
    id: 9,
    name: "Tas Batik Canvas",
    category: "aksesoris-batik",
    categoryName: "Accessories",
    price: 185000,
    originalPrice: 250000,
    rating: 4,
    reviews: 156,
    badge: "Best Value",
    badgeColor: "bg-gradient-to-r from-gold to-accent",
    description:
      "Tas batik canvas dengan desain etnik modern. Praktis dan stylish untuk aktivitas sehari-hari.",
    image: "/images/products/tas-batik-canvas.jpg",
    stock: 45,
  },
  {
    id: 10,
    name: "Celana Batik Kulot",
    category: "batik-casual",
    categoryName: "Casual",
    price: 265000,
    originalPrice: 340000,
    rating: 5,
    reviews: 84,
    badge: "Comfortable",
    badgeColor: "bg-gradient-to-r from-secondary-light to-secondary",
    description:
      "Celana batik kulot dengan bahan adem dan nyaman. Perfect untuk gaya casual dan chic.",
    image: "/images/products/celana-batik-kulot.jpg",
    stock: 28,
  },
  {
    id: 11,
    name: "Scarf Batik Sutera",
    category: "aksesoris-batik",
    categoryName: "Accessories",
    price: 245000,
    originalPrice: 320000,
    rating: 5,
    reviews: 62,
    badge: "Luxury",
    badgeColor: "bg-pink-500",
    description:
      "Scarf batik sutera premium dengan motif eksklusif. Menambah keanggunan penampilan Anda.",
    image: "/images/products/scarf-batik-sutera.jpg",
    stock: 15,
  },
  {
    id: 12,
    name: "Outer Batik Kimono",
    category: "batik-modern",
    categoryName: "Modern",
    price: 385000,
    originalPrice: 480000,
    rating: 5,
    reviews: 78,
    badge: "Stylish",
    badgeColor: "bg-indigo-500",
    description:
      "Outer batik model kimono dengan desain contemporary. Versatile untuk berbagai gaya.",
    image: "/images/products/outer-batik-kimono.jpg",
    stock: 16,
  },
];

// Categories
export const categories = [
  {
    id: "all",
    name: "Semua Produk",
    description: "Lihat semua koleksi batik kami",
  },
  {
    id: "batik-formal",
    name: "Batik Formal",
    description: "Koleksi batik untuk acara formal",
  },
  {
    id: "batik-casual",
    name: "Batik Casual",
    description: "Batik santai untuk sehari-hari",
  },
  {
    id: "batik-modern",
    name: "Batik Modern",
    description: "Desain batik kontemporer",
  },
  {
    id: "batik-traditional",
    name: "Batik Traditional",
    description: "Batik klasik warisan budaya",
  },
  {
    id: "aksesoris-batik",
    name: "Aksesoris Batik",
    description: "Pelengkap gaya dengan motif batik",
  },
];

// Format price to Indonesian Rupiah
export const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
