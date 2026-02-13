# 🔧 QUICK FIX GUIDE - Error Solutions

## ❌ Error: `bg-batik-cream` class does not exist

### **SOLUSI 1: Restart Dev Server (RECOMMENDED)**

Tailwind perlu restart untuk membaca warna custom dari config.

```bash
# Stop server (Ctrl+C atau Cmd+C)
# Lalu jalankan lagi
npm run dev
```

✅ **Ini akan fix error!** Tailwind akan reload konfigurasi dan membaca warna `batik`.

---

### **SOLUSI 2: Clear Cache**

Jika restart tidak work:

```bash
# Stop dev server
# Delete node_modules dan reinstall
rm -rf node_modules
npm install
npm run dev
```

---

### **SOLUSI 3: Hard Refresh Browser**

Kadang browser cache perlu di-clear:

- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

---

## 🎨 Warna Sudah Terdefinisi di `tailwind.config.js`

```javascript
colors: {
  batik: {
    cream: '#FAF8F6',   // bg-batik-cream
    beige: '#E5DDD5',   // bg-batik-beige
    brown: '#4A4035',   // text-batik-brown
    dark: '#2C2416',    // text-batik-dark
  }
}
```

Jadi class seperti `bg-batik-cream`, `text-batik-brown` **VALID** dan akan work setelah restart!

---

## ✅ CHECKLIST SETELAH FIX:

- [ ] Stop dev server
- [ ] Jalankan `npm run dev` lagi
- [ ] Refresh browser (hard refresh jika perlu)
- [ ] Error hilang! ✨

---

## 🐛 ERROR LAIN YANG MUNGKIN MUNCUL:

### **1. Module not found: Can't resolve 'react-router-dom'**

**Solusi:**
```bash
npm install react-router-dom
```

### **2. Module not found: Can't resolve 'lucide-react'**

**Solusi:**
```bash
npm install lucide-react
```

### **3. Port 3000 sudah digunakan**

**Solusi:**
```bash
# Edit vite.config.js, ubah port menjadi 3001
server: {
  port: 3001,
}
```

---

## 💡 TIPS:

1. **Selalu restart dev server** setelah:
   - Mengubah `tailwind.config.js`
   - Mengubah `vite.config.js`
   - Install package baru

2. **Check terminal** untuk error messages lengkap

3. **Check browser console** (F12) untuk client-side errors

---

## 📞 JIKA MASIH ERROR:

1. Screenshot error yang muncul
2. Check terminal output
3. Pastikan semua dependencies terinstall
4. Coba delete `node_modules` dan `npm install` ulang

---

**Happy Coding! 🚀**
