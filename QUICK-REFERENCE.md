# ⚡ QUICK REFERENCE - CODE CHANGES

## 🎯 SUPER SIMPLE UPDATES:

### 1. FIND & REPLACE IN MULTIPLE FILES:

**Open these files:**
- `src/components/Products.jsx`
- `src/pages/ShopPage.jsx` (sudah done!)
- `src/pages/CartPage.jsx`
- `src/pages/WishlistPage.jsx`

**In VS Code:**
1. Press `Ctrl+Shift+H` (Find in Files)
2. Find: `imageMap[product.category]`
3. Replace: `product.image`
4. Replace All in these files!

**For CartPage.jsx specifically:**
- Find: `imageMap[item.category]`
- Replace: `item.image`

**DONE!** ✅

---

### 2. NAVBAR.JSX - ONE LINE CHANGE:

**File:** `src/components/Navbar.jsx`

**Find line 57 (in handleSearch function):**
```javascript
setIsSearchOpen(false);
```

**Add ONE line after it:**
```javascript
setIsSearchOpen(false);
setSearchInput(''); // ← ADD THIS LINE
```

**DONE!** ✅

---

### 3. PRODUCTS.JS - FULL FILE:

**File:** `src/data/products.js`

**Replace entire file with code from first response!**
(File sudah complete dengan semua product images)

---

### 4. FEATURES.JSX - FULL FILE:

**File:** `src/components/Features.jsx`

**Replace entire file with code that includes:**
- Section ID "tentang"
- Section ID "kontak"
- Contact information

**DONE!** ✅

---

## 📁 IMAGE SETUP (MANUAL):

### Option A: Drag & Drop in VS Code
1. Open VS Code
2. Navigate to `public/images/products/`
3. Drag all 12 images from Windows Explorer
4. Rename from `.jpeg` to `.jpg`

### Option B: Manual Copy
```
Copy from uploads folder:
outer-batik-kimono.jpeg → public/images/products/outer-batik-kimono.jpg
scarf-batik-sutera.jpeg → public/images/products/scarf-batik-sutera.jpg
celana-batik-kulot.jpeg → public/images/products/celana-batik-kulot.jpg
tas-batik-canvas.jpeg → public/images/products/tas-batik-canvas.jpg
kain-batik-tulis-solo.jpeg → public/images/products/kain-batik-tulis-solo.jpg
blouse-batik-kombinasi.jpeg → public/images/products/blouse-batik-kombinasi.jpg
rok-batik-plisket.jpeg → public/images/products/rok-batik-plisket.jpg
kemeja-batik-kawung.jpeg → public/images/products/kemeja-batik-kawung.jpg
sarung-batik-tulis-premium.jpeg → public/images/products/sarung-batik-tulis-premium.jpg
blazer-batik-kombinasi.jpeg → public/images/products/blazer-batik-kombinasi.jpg
dress-batik-megamendung.jpeg → public/images/products/dress-batik-megamendung.jpg
kemeja-batik-parang-modern.jpeg → public/images/products/kemeja-batik-parang-modern.jpg
```

---

## 🔄 TESTING AFTER UPDATE:

```bash
# 1. Stop server
Ctrl+C

# 2. Start server
npm run dev

# 3. Test
http://localhost:3000/shop
```

**Check:**
- [ ] Product images show (not placeholders)
- [ ] Cart shows product images
- [ ] Wishlist shows product images
- [ ] Search clears after submit
- [ ] "Tentang" link scrolls to Features section
- [ ] "Kontak" link scrolls to Contact section

---

## ⏱️ TIME ESTIMATE:

- Copy images: **2 minutes**
- Update products.js: **30 seconds** (copy-paste)
- Find & Replace in files: **1 minute**
- Update Navbar: **30 seconds**
- Update Features.jsx: **30 seconds** (copy-paste)
- Testing: **2 minutes**

**TOTAL: ~7 minutes!** ⚡

---

## 🎯 PRIORITY ORDER:

1. **HIGH PRIORITY:**
   - [ ] Copy images to public/images/products/
   - [ ] Update products.js (for image paths)
   - [ ] Find & Replace in Products/Cart/Wishlist

2. **MEDIUM PRIORITY:**
   - [ ] Update Navbar (search clear)
   - [ ] Update Features.jsx (sections)

3. **ALREADY DONE:**
   - [x] ShopPage.jsx ✅
   - [x] Categories.jsx ✅

---

## 💡 TROUBLESHOOTING:

**Images not showing?**
1. Check path: `/images/products/kemeja-batik-parang-modern.jpg`
2. Check file exists in `public/images/products/`
3. Restart dev server
4. Hard refresh browser (Ctrl+Shift+R)

**Search not clearing?**
1. Check if `setSearchInput('')` is added
2. Restart dev server

**Scroll not working?**
1. Check if Features.jsx has `id="tentang"` and `id="kontak"`
2. Clear cache

---

**THAT'S IT!** 🎉

Simple find & replace + copy paste = DONE!
