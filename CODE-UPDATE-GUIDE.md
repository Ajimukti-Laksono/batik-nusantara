# 🔄 COMPLETE CODE UPDATE GUIDE

## 📋 DAFTAR FILE YANG PERLU DIUPDATE:

1. ✅ `src/data/products.js` - Product data dengan image paths
2. ✅ `src/pages/ShopPage.jsx` - Sudah diupdate
3. ⚠️ `src/components/Products.jsx` - Perlu update image
4. ⚠️ `src/pages/CartPage.jsx` - Perlu update image  
5. ⚠️ `src/pages/WishlistPage.jsx` - Perlu update image
6. ⚠️ `src/components/Navbar.jsx` - Fix search clear
7. ⚠️ `src/components/Features.jsx` - Add sections

---

## 📝 FILE UPDATES:

### 1. PRODUCTS.JS - SUDAH COMPLETE DI ATAS ✅

### 2. SHOPPAGE.JSX - SUDAH COMPLETE DI ATAS ✅

---

### 3. PRODUCTS.JSX - UPDATE IMAGE SOURCE

**Buka file:** `src/components/Products.jsx`

**CARI baris 115 (bagian product image):**
```jsx
<img
  src={imageMap[product.category] || '/images/categories/formal.jpg'}
```

**GANTI MENJADI:**
```jsx
<img
  src={product.image}
```

**CARI baris 226 (Quick View modal image):**
```jsx
<img
  src={imageMap[quickViewProduct.category] || '/images/categories/formal.jpg'}
```

**GANTI MENJADI:**
```jsx
<img
  src={quickViewProduct.image}
```

**ATAU LEBIH MUDAH:**
Hapus seluruh blok `imageMap` di awal component (sekitar line 20-26) karena tidak dipakai lagi.

---

### 4. CARTPAGE.JSX - UPDATE IMAGE

**Buka file:** `src/pages/CartPage.jsx`

**CARI sekitar line 76-94 (product image section):**
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

**GANTI MENJADI:**
```jsx
<div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
  <img
    src={item.image}
    alt={item.name}
    className="w-full h-full object-cover"
  />
</div>
```

---

### 5. WISHLISTPAGE.JSX - UPDATE IMAGE

**Buka file:** `src/pages/WishlistPage.jsx`

**CARI sekitar line 55-77 (product image section):**
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
```

**GANTI MENJADI:**
```jsx
<div className="relative h-64 overflow-hidden">
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  />
```

---

### 6. NAVBAR.JSX - FIX SEARCH CLEAR

**Buka file:** `src/components/Navbar.jsx`

**CARI function handleSearch (sekitar line 51-66):**
```javascript
const handleSearch = (e) => {
  e.preventDefault();
  if (searchInput.trim()) {
    setSearchQuery(searchInput);
    setSelectedCategory('all');
    navigate('/shop');
    setIsSearchOpen(false);
  }
};
```

**GANTI MENJADI:**
```javascript
const handleSearch = (e) => {
  e.preventDefault();
  if (searchInput.trim()) {
    setSearchQuery(searchInput);
    setSelectedCategory('all');
    navigate('/shop');
    setIsSearchOpen(false);
    setSearchInput(''); // Clear input after search
  }
};
```

**TAMBAHKAN function baru setelah handleSearch:**
```javascript
const handleClearSearch = () => {
  setSearchQuery('');
  setSearchInput('');
  setSelectedCategory('all');
};
```

---

### 7. FEATURES.JSX - ADD ID SECTIONS

Ini file yang paling besar, saya sudah buat complete version di response sebelumnya.

File ini perlu diganti SELURUHNYA karena menambahkan:
- Section ID "tentang"
- Section ID "kontak"
- Contact information
- Social media links

**LIHAT CODE COMPLETE di response sebelumnya untuk Features.jsx**

---

## 📁 COPY IMAGES

### Buat folder:
```bash
mkdir -p public/images/products
```

### Rename dan copy images:

```bash
# Dari folder uploads, rename ke products:
outer-batik-kimono.jpeg → outer-batik-kimono.jpg
scarf-batik-sutera.jpeg → scarf-batik-sutera.jpg
celana-batik-kulot.jpeg → celana-batik-kulot.jpg
tas-batik-canvas.jpeg → tas-batik-canvas.jpg
kain-batik-tulis-solo.jpeg → kain-batik-tulis-solo.jpg
blouse-batik-kombinasi.jpeg → blouse-batik-kombinasi.jpg
rok-batik-plisket.jpeg → rok-batik-plisket.jpg
kemeja-batik-kawung.jpeg → kemeja-batik-kawung.jpg
sarung-batik-tulis-premium.jpeg → sarung-batik-tulis-premium.jpg
blazer-batik-kombinasi.jpeg → blazer-batik-kombinasi.jpg
dress-batik-megamendung.jpeg → dress-batik-megamendung.jpg
kemeja-batik-parang-modern.jpeg → kemeja-batik-parang-modern.jpg
```

### Copy semua ke:
```
public/images/products/
```

---

## ✅ CHECKLIST UPDATE:

### Files:
- [ ] products.js ✅ (code di atas)
- [ ] ShopPage.jsx ✅ (sudah complete)
- [ ] Products.jsx ⚠️ (update 2 lines)
- [ ] CartPage.jsx ⚠️ (update 1 section)
- [ ] WishlistPage.jsx ⚠️ (update 1 section)
- [ ] Navbar.jsx ⚠️ (update 1 function)
- [ ] Features.jsx ⚠️ (replace entire file)

### Images:
- [ ] Create public/images/products/
- [ ] Copy 12 product images
- [ ] Rename from .jpeg to .jpg

---

## 🚀 TESTING:

1. **Product Images:**
   - [ ] Shop page shows real images
   - [ ] Homepage (if Products shown) shows real images
   - [ ] Cart shows product images
   - [ ] Wishlist shows product images
   - [ ] Quick view modal shows images

2. **Search:**
   - [ ] Search works
   - [ ] After search, input clears
   - [ ] Can search again without clearing manually

3. **Scroll:**
   - [ ] Click "Tentang" in navbar → scrolls to Features
   - [ ] Click "Kontak" in navbar → scrolls to Contact section

---

## 💡 TIPS:

**Cara cepat update semua:**

1. Buka setiap file di VS Code
2. Use Find & Replace (Ctrl+H)
3. Find: `imageMap[product.category]`
4. Replace: `product.image`
5. Replace All!

**Untuk CartPage:**
- Find: `imageMap[item.category]`
- Replace: `item.image`

---

## 📥 SUMMARY:

- ✅ **products.js** - Complete code provided
- ✅ **ShopPage.jsx** - Complete code provided  
- ⚠️ **Products.jsx** - Simple find/replace
- ⚠️ **CartPage.jsx** - Simple find/replace
- ⚠️ **WishlistPage.jsx** - Simple find/replace
- ⚠️ **Navbar.jsx** - Add 1 line + 1 function
- ⚠️ **Features.jsx** - Complete code provided (previous response)

**SEMUA BISA DILAKUKAN DENGAN FIND & REPLACE!** 🎯
