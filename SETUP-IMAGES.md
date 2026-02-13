# 🚀 SETUP LENGKAP - BATIK NUSANTARA DENGAN GAMBAR

## ✅ SUDAH SELESAI DIUPDATE:

### Files yang sudah diupdate dengan code lengkap:
1. ✅ **Hero.jsx** - Menggunakan `/images/hero/model-batik.png`
2. ✅ **Categories.jsx** - Menggunakan gambar kategori real
3. ✅ **Products.jsx** - Product grid dengan gambar real

### Files yang masih perlu manual update (COPY CODE DI BAWAH):
4. **CartPage.jsx** 
5. **WishlistPage.jsx**

---

## 📁 STRUKTUR FOLDER (PENTING!)

```
batik-nusantara-react/
├── public/
│   └── images/
│       ├── hero/
│       │   └── model-batik.png        ← TARUH GAMBAR DI SINI
│       └── categories/
│           ├── formal.jpg             ← TARUH GAMBAR DI SINI
│           ├── casual.jpg             ← TARUH GAMBAR DI SINI
│           ├── modern.jpg             ← TARUH GAMBAR DI SINI
│           └── traditional.jpg        ← TARUH GAMBAR DI SINI
└── src/
    ├── components/
    └── pages/
```

---

## 🔧 CODE UNTUK CartPage.jsx

Buka file `src/pages/CartPage.jsx`

**CARI baris sekitar 76 (bagian product image):**

```jsx
<div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center">
  // ... placeholder code
</div>
```

**GANTI DENGAN:**

```jsx
<div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
  {(() => {
    const imageMap = {
      'formal': '/images/categories/formal.jpg',
      'casual': '/images/categories/casual.jpg',
      'modern': '/images/categories/modern.jpg',
      'traditional': '/images/categories/traditional.jpg',
      'accessories': '/images/categories/formal.jpg'
    };
    return (
      <img
        src={imageMap[item.category] || '/images/categories/formal.jpg'}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    );
  })()}
</div>
```

---

## 🔧 CODE UNTUK WishlistPage.jsx

Buka file `src/pages/WishlistPage.jsx`

**CARI baris sekitar 55 (bagian product image):**

```jsx
<div className="relative h-64 bg-gradient-to-br from-secondary/20 to-primary/20">
  // ... placeholder code
</div>
```

**GANTI DENGAN:**

```jsx
<div className="relative h-64 overflow-hidden">
  {(() => {
    const imageMap = {
      'formal': '/images/categories/formal.jpg',
      'casual': '/images/categories/casual.jpg',
      'modern': '/images/categories/modern.jpg',
      'traditional': '/images/categories/traditional.jpg',
      'accessories': '/images/categories/formal.jpg'
    };
    return (
      <img
        src={imageMap[product.category] || '/images/categories/formal.jpg'}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    );
  })()}

  {/* Remove Button */}
  <button
```

---

## 📸 CARA COPY GAMBAR

### Opsi 1: Via Terminal
```bash
# Buat folder jika belum ada
mkdir -p public/images/hero
mkdir -p public/images/categories

# Copy gambar (sesuaikan path)
cp ~/Downloads/model-batik-nusantara.png public/images/hero/model-batik.png
cp ~/Downloads/batik-formal.jpeg public/images/categories/formal.jpg
cp ~/Downloads/batik-casual.jpeg public/images/categories/casual.jpg
cp ~/Downloads/batik-modern.jpeg public/images/categories/modern.jpg
cp ~/Downloads/batik-tradisional.jpeg public/images/categories/traditional.jpg
```

### Opsi 2: Drag & Drop (LEBIH MUDAH!)
1. Buka folder `public` di VS Code Explorer
2. Klik kanan → New Folder → buat `images`
3. Di dalam `images` buat folder `hero` dan `categories`
4. Drag & drop gambar dari Windows Explorer ke folder yang sesuai
5. Rename jika perlu sesuai nama di atas

---

## 🎯 CHECKLIST SETUP:

### 1. Struktur Folder:
- [ ] Folder `public/images/hero/` ada
- [ ] Folder `public/images/categories/` ada

### 2. Copy Gambar:
- [ ] `model-batik.png` ada di `public/images/hero/`
- [ ] `formal.jpg` ada di `public/images/categories/`
- [ ] `casual.jpg` ada di `public/images/categories/`
- [ ] `modern.jpg` ada di `public/images/categories/`
- [ ] `traditional.jpg` ada di `public/images/categories/`

### 3. Update Code:
- [ ] Hero.jsx (sudah otomatis)
- [ ] Categories.jsx (sudah otomatis)
- [ ] Products.jsx (sudah otomatis)
- [ ] CartPage.jsx (copy code di atas)
- [ ] WishlistPage.jsx (copy code di atas)

### 4. Testing:
- [ ] Stop dev server (Ctrl+C)
- [ ] Run `npm run dev`
- [ ] Buka browser http://localhost:3000
- [ ] Hero image muncul ✓
- [ ] Category images muncul ✓
- [ ] Product images muncul ✓
- [ ] Cart images muncul ✓
- [ ] Wishlist images muncul ✓

---

## 🚨 TROUBLESHOOTING:

### Gambar tidak muncul?

**Check 1: Path benar?**
- Harus `/images/hero/model-batik.png` (dengan `/` di depan)
- BUKAN `./images/` atau `../images/`

**Check 2: Nama file match?**
- Extension: `.jpg` vs `.jpeg` harus sama
- Case sensitive di Linux/Mac

**Check 3: Server restart?**
```bash
# Stop server
Ctrl+C

# Start lagi
npm run dev
```

**Check 4: Browser cache?**
```
Hard refresh: Ctrl+Shift+R (Windows/Linux)
atau Cmd+Shift+R (Mac)
```

---

## ✨ HASIL AKHIR:

Setelah semua setup:
- ✅ Hero section dengan foto batik craftsman
- ✅ Categories dengan foto couple batik
- ✅ Products dengan gambar sesuai kategori
- ✅ Cart dengan thumbnail produk
- ✅ Wishlist dengan gambar produk
- ✅ Hover effects yang smooth
- ✅ Professional & production-ready!

---

**Good luck! 🚀**
