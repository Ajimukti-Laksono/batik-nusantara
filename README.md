# 🎨 BATIK NUSANTARA - React E-Commerce (V2.0)

> **Full-Featured Modern React Application - Elegansi Budaya Indonesia**

Website e-commerce **LENGKAP dan FUNGSIONAL** untuk produk batik Indonesia, dibangun dengan **React**, **Vite**, **Tailwind CSS**, dan **React Router**.

---

## ✨ **FITUR LENGKAP YANG SUDAH BERFUNGSI!**

### 🛒 **Shopping Features (FULLY WORKING!)**
- ✅ **Add to Cart** - Tambah produk ke keranjang
- ✅ **Shopping Cart Page** - Halaman keranjang lengkap
- ✅ **Quantity Control** - Tambah/kurangi jumlah produk
- ✅ **Remove from Cart** - Hapus produk dari keranjang
- ✅ **Clear Cart** - Kosongkan keranjang
- ✅ **Price Calculation** - Hitung subtotal, ongkir, dan total
- ✅ **Free Shipping** - Gratis ongkir untuk belanja > Rp 500.000
- ✅ **localStorage Persistence** - Data tersimpan meskipun refresh

### ❤️ **Wishlist Features (FULLY WORKING!)**
- ✅ **Add/Remove Wishlist** - Simpan produk favorit
- ✅ **Wishlist Page** - Halaman wishlist lengkap
- ✅ **Move to Cart** - Pindah dari wishlist ke cart
- ✅ **Wishlist Counter** - Badge count di navbar

### 🔍 **Search & Filter (FULLY WORKING!)**
- ✅ **Search Products** - Cari produk by nama/kategori/deskripsi
- ✅ **Filter by Category** - Filter produk per kategori
- ✅ **Real-time Results** - Hasil langsung update
- ✅ **Empty State** - Pesan jika produk tidak ditemukan

### 🎨 **UI/UX Features**
- ✅ **React Router** - Multi-page navigation
- ✅ **Responsive Design** - Mobile, tablet, desktop perfect
- ✅ **Notification System** - Toast notifications
- ✅ **Loading States** - Smooth user experience
- ✅ **Animations** - Tailwind animations
- ✅ **Quick View Modal** - Lihat detail produk cepat

### 📊 **Data Management**
- ✅ **12 Products** - Data produk lengkap dengan detail
- ✅ **6 Categories** - Kategori batik yang terorganisir
- ✅ **Context API** - Global state management
- ✅ **LocalStorage** - Data persistence
- ✅ **Price Formatting** - Format Rupiah Indonesia

---

## 🚀 Tech Stack

### Core:
- ⚛️ **React 18** - UI Library
- ⚡ **Vite** - Build tool & dev server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **Lucide React** - Beautiful icon library

### Features:
- 🛒 Shopping Cart with localStorage
- ❤️ Wishlist functionality
- 🔍 Search functionality
- 📱 Fully Responsive Design
- 🎭 Smooth Animations
- 🎨 Modern UI/UX
- ⚡ Fast Performance

---

## 📁 Project Structure

```
batik-nusantara-react/
│
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   │   ├── Navbar.jsx       # Navigation with cart/wishlist
│   │   ├── Hero.jsx         # Hero section
│   │   ├── Categories.jsx   # Category filter
│   │   ├── PromoBanner.jsx  # Promo section
│   │   ├── Products.jsx     # Product grid with search
│   │   ├── Features.jsx     # Features section
│   │   ├── Footer.jsx       # Footer
│   │   └── Notification.jsx # Toast notifications
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Landing page
│   │   ├── CartPage.jsx     # Shopping cart (FUNCTIONAL!)
│   │   └── WishlistPage.jsx # Wishlist (FUNCTIONAL!)
│   ├── context/             # React Context
│   │   └── ShopContext.jsx  # Global state management
│   ├── data/                # Data
│   │   └── products.js      # Product data (12 products)
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind config
├── .env.example            # Environment variables
└── README.md               # Documentation
```

---

## 🎯 Key Features

### ✅ Implemented:

1. **Modern UI/UX**
   - Clean and professional design
   - Smooth animations and transitions
   - Mobile-first responsive layout
   - Indonesian batik color palette

2. **Shopping Features**
   - Add to cart functionality
   - Wishlist (save favorites)
   - Quick view modal
   - Product filtering (ready for expansion)

3. **User Experience**
   - Search functionality
   - Notification system
   - Smooth scroll navigation
   - Mobile menu
   - LocalStorage persistence

4. **Components**
   - 8 reusable React components
   - Props-based data flow
   - State management with hooks
   - Event handling

5. **Performance**
   - Fast Vite dev server
   - Optimized builds
   - Lazy loading ready
   - Efficient re-renders

---

## 🚀 Getting Started

### Prerequisites:
- Node.js 16+ installed
- npm or yarn

### Installation:

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "lucide-react": "^0.294.0"
}
```

### Dev Dependencies:
```json
{
  "vite": "^5.0.8",
  "@vitejs/plugin-react": "^4.2.1",
  "tailwindcss": "^3.3.6",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32"
}
```

---

## 🎨 Tailwind Configuration

### Custom Colors:
```javascript
colors: {
  primary: '#8B7355',      // Main brown
  secondary: '#D4A574',    // Beige
  accent: '#C9A882',       // Light brown
  gold: '#D4AF37',         // Gold for ratings
  batik: {
    cream: '#FAF8F6',
    beige: '#E5DDD5',
    brown: '#4A4035',
    dark: '#2C2416',
  }
}
```

### Custom Animations:
- `fade-in` - Fade in animation
- `slide-up` - Slide up animation
- `float` - Floating animation

---

## 🧩 Component Overview

### 1. **Navbar**
- Sticky navigation
- Mobile menu
- Search modal
- Cart & wishlist counters
- Scroll effects

### 2. **Hero**
- Eye-catching hero section
- Call-to-action buttons
- Statistics display
- Floating cards
- Gradient background

### 3. **Categories**
- 5 product categories
- Hover effects
- Responsive grid
- Click to view collections

### 4. **PromoBanner**
- Promotional content
- Countdown timer
- Gradient background
- Call-to-action

### 5. **Products**
- Product grid
- Add to cart
- Wishlist toggle
- Quick view modal
- Rating display
- Price formatting

### 6. **Features**
- 4 key features
- Icon display
- Hover animations

### 7. **Footer**
- Newsletter subscription
- Social links
- Footer navigation
- Copyright info

### 8. **Notification**
- Toast notifications
- Auto-dismiss
- Multiple types (success, error, info)

---

## 💡 Usage Examples

### Add to Cart:
```javascript
const addToCart = (product) => {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    setCart(cart.map(item => 
      item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  } else {
    setCart([...cart, { ...product, quantity: 1 }]);
  }
};
```

### Toggle Wishlist:
```javascript
const toggleWishlist = (product) => {
  const isInWishlist = wishlist.some(item => item.id === product.id);
  
  if (isInWishlist) {
    setWishlist(wishlist.filter(item => item.id !== product.id));
  } else {
    setWishlist([...wishlist, product]);
  }
};
```

### Show Notification:
```javascript
const showNotification = (message, type = 'success') => {
  setNotification({ message, type });
  setTimeout(() => setNotification(null), 3000);
};
```

---

## 🎨 Customization

### Change Colors:
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR',
    dark: '#YOUR_DARK_COLOR',
  }
}
```

### Add New Components:
1. Create file in `src/components/`
2. Import in `App.jsx`
3. Use component in JSX

### Modify Products:
Edit the `products` array in `Products.jsx`

---

## 🔄 State Management

Currently using **React Hooks**:
- `useState` - Local component state
- `useEffect` - Side effects & lifecycle
- LocalStorage for persistence

### Future Enhancement:
- Context API for global state
- Redux Toolkit (optional)
- React Query for data fetching

---

## 📱 Responsive Design

### Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive using Tailwind's responsive utilities.

---

## ⚡ Performance Optimization

### Implemented:
- ✅ Vite for fast builds
- ✅ Code splitting ready
- ✅ Optimized images (placeholder system)
- ✅ Efficient re-renders
- ✅ Lazy loading ready

### Future:
- [ ] React.memo for expensive components
- [ ] useMemo & useCallback
- [ ] Image lazy loading
- [ ] Code splitting
- [ ] PWA features

---

## 🚀 Deployment

### Build for Production:
```bash
npm run build
```

### Deploy to Vercel:
```bash
vercel
```

### Deploy to Netlify:
```bash
netlify deploy --prod
```

### Deploy to GitHub Pages:
Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## 📋 Roadmap

### ✅ Phase 1: Landing Page (DONE)
- [x] Modern UI with React
- [x] Responsive design
- [x] Shopping cart
- [x] Wishlist
- [x] Basic interactions

### 🔄 Phase 2: Enhanced Features (NEXT)
- [ ] Product detail pages
- [ ] Advanced filtering
- [ ] Search with results
- [ ] User authentication
- [ ] Profile page

### ⏳ Phase 3: Backend Integration
- [ ] REST API integration
- [ ] Database connectivity
- [ ] Payment gateway
- [ ] Order management
- [ ] Admin dashboard

### 🎯 Phase 4: Advanced Features
- [ ] Real-time notifications
- [ ] Chat support
- [ ] Recommendations
- [ ] Reviews & ratings system
- [ ] Social sharing

---

## 🐛 Known Issues

- Images are placeholders (will be replaced with actual images)
- Search doesn't filter products yet (UI only)
- Cart doesn't have checkout flow yet
- No backend integration yet

---

## 🤝 Contributing

This is a progressive development project. Suggestions and improvements are welcome!

---

## 📝 Best Practices

### Code Quality:
- ✅ Component-based architecture
- ✅ Props for data flow
- ✅ Clean and readable code
- ✅ Consistent naming conventions
- ✅ Proper file organization

### React Best Practices:
- ✅ Functional components
- ✅ Hooks for state management
- ✅ PropTypes ready
- ✅ Key props in lists
- ✅ Avoid inline functions in JSX

### Styling:
- ✅ Tailwind utility classes
- ✅ Custom Tailwind configuration
- ✅ Responsive design
- ✅ Consistent spacing
- ✅ Reusable utility classes

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

## 📄 License

© 2024 Batik Nusantara. All rights reserved.

---

## 🙏 Credits

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Design**: Custom (Indonesian Batik Theme)

---

## 📞 Support

For questions or support:
- Email: support@batiknusantara.com
- Website: www.batiknusantara.com

---

**Made with ❤️ for Indonesian Heritage**

*Batik Nusantara - Elegansi Budaya Indonesia*
