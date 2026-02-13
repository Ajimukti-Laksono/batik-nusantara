# 📘 PANDUAN INSTALASI & SETUP
## Batik Nusantara - React E-Commerce

---

## 🎯 Langkah-Langkah Instalasi

### 1️⃣ **Persiapan**

Pastikan sistem Anda sudah terinstall:
- ✅ **Node.js** versi 16 atau lebih baru
- ✅ **npm** (biasanya sudah terinstall dengan Node.js)

**Cek versi Node.js:**
```bash
node --version
# Output: v16.0.0 atau lebih tinggi
```

**Cek versi npm:**
```bash
npm --version
# Output: 8.0.0 atau lebih tinggi
```

**Download Node.js:**
Jika belum terinstall, download dari: https://nodejs.org/

---

### 2️⃣ **Extract Project**

1. Extract file **batik-nusantara-react.zip** 
2. Buka folder hasil extract
3. Anda akan melihat struktur folder seperti ini:

```
batik-nusantara-react/
├── src/
├── public/
├── index.html
├── package.json
└── ... (file lainnya)
```

---

### 3️⃣ **Install Dependencies**

Buka **Terminal** atau **Command Prompt** di folder project, lalu jalankan:

```bash
npm install
```

⏰ **Tunggu proses instalasi selesai** (biasanya 2-5 menit)

Anda akan melihat folder baru bernama `node_modules/` yang berisi semua dependencies.

---

### 4️⃣ **Jalankan Development Server**

```bash
npm run dev
```

✅ **Jika berhasil**, Anda akan melihat output seperti:

```
VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.x:3000/
  ➜  press h to show help
```

---

### 5️⃣ **Buka di Browser**

Buka browser dan akses:
```
http://localhost:3000
```

🎉 **Website sudah berjalan!**

---

## 🛠️ Perintah-Perintah Penting

### Development (untuk coding):
```bash
npm run dev
```
- Server akan auto-reload saat file diubah
- Hot Module Replacement (HMR) aktif

### Build Production (untuk deploy):
```bash
npm run build
```
- Menghasilkan folder `dist/` dengan file optimized
- Siap untuk di-upload ke hosting

### Preview Build:
```bash
npm run preview
```
- Melihat hasil build production di local
- Untuk testing sebelum deploy

---

## 🔧 Troubleshooting

### ❌ Error: "command not found: npm"
**Solusi:** Install Node.js terlebih dahulu dari https://nodejs.org/

### ❌ Error saat `npm install`
**Solusi:**
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

### ❌ Port 3000 sudah digunakan
**Solusi:** Edit `vite.config.js`, ubah port:
```javascript
server: {
  port: 3001,  // Ubah ke port lain
}
```

### ❌ Error: "Cannot find module"
**Solusi:**
```bash
npm install
```

### ❌ Website tidak muncul di browser
**Solusi:**
1. Cek apakah dev server masih running
2. Refresh browser (Ctrl+R atau Cmd+R)
3. Clear browser cache
4. Coba browser lain

---

## 📱 Testing Responsive

### Desktop:
- Buka di browser biasa

### Mobile:
- **Chrome DevTools:** Klik kanan > Inspect > Toggle device toolbar (Ctrl+Shift+M)
- **Firefox:** Klik kanan > Inspect Element > Responsive Design Mode (Ctrl+Shift+M)

### Actual Mobile Device:
1. Pastikan laptop dan HP di jaringan WiFi yang sama
2. Lihat Network URL dari terminal (contoh: http://192.168.1.5:3000)
3. Akses URL tersebut dari browser HP

---

## 🎨 Kustomisasi

### Mengubah Warna:
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#8B7355',  // Ubah warna ini
  }
}
```

### Menambah Produk:
Edit `src/components/Products.jsx`:
```javascript
const products = [
  {
    id: 5,
    name: 'Produk Baru',
    price: 500000,
    // ... data lainnya
  }
];
```

### Mengubah Logo/Brand:
Edit `src/components/Navbar.jsx`:
```javascript
<h1 className="...">
  BATIK NUSANTARA  {/* Ubah teks ini */}
</h1>
```

---

## 🚀 Deploy ke Hosting

### Deploy ke Vercel (GRATIS):

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Ikuti instruksi** di terminal

### Deploy ke Netlify (GRATIS):

1. **Buat akun** di https://netlify.com
2. **Drag & drop** folder `dist/` ke Netlify dashboard
3. **Atau gunakan Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy Manual:

1. **Build production:**
```bash
npm run build
```

2. **Upload folder `dist/`** ke hosting (cPanel, FTP, dll)

---

## 📚 Struktur File

```
batik-nusantara-react/
│
├── public/                    # File statis
│
├── src/                       # Source code
│   ├── components/           # Komponen React
│   │   ├── Navbar.jsx       # Navigasi
│   │   ├── Hero.jsx         # Hero section
│   │   ├── Categories.jsx   # Kategori produk
│   │   ├── Products.jsx     # Daftar produk
│   │   └── ...
│   ├── App.jsx              # Main component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global CSS
│
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind config
└── README.md               # Dokumentasi

```

---

## 🎓 Belajar Lebih Lanjut

### React:
- https://react.dev/learn
- Tutorial interaktif & dokumentasi lengkap

### Vite:
- https://vitejs.dev/guide/
- Build tool modern yang super cepat

### Tailwind CSS:
- https://tailwindcss.com/docs
- Utility-first CSS framework

### Lucide Icons:
- https://lucide.dev
- Library icon yang cantik

---

## 💡 Tips Development

### 1. Hot Module Replacement
- Simpan file = auto reload browser
- Tidak perlu refresh manual

### 2. Component Development
- Satu komponen = satu file
- Reusable dan maintainable

### 3. State Management
- Gunakan useState untuk state local
- Gunakan useEffect untuk side effects

### 4. Styling
- Gunakan Tailwind utilities
- Custom classes di tailwind.config.js

### 5. Performance
- Lazy load images
- Code splitting
- Optimize bundle size

---

## 📞 Bantuan

Jika mengalami kesulitan:
1. Cek error message di terminal
2. Cek browser console (F12)
3. Baca dokumentasi di README.md
4. Search error di Google/Stack Overflow

---

## ✅ Checklist Setup

- [ ] Node.js terinstall
- [ ] Project di-extract
- [ ] Dependencies di-install (`npm install`)
- [ ] Dev server berjalan (`npm run dev`)
- [ ] Website terbuka di browser
- [ ] Fitur cart berfungsi
- [ ] Fitur wishlist berfungsi
- [ ] Responsive di mobile

---

## 🎯 Next Steps

Setelah setup berhasil:

1. **Explore kode** di folder `src/components/`
2. **Coba modifikasi** teks, warna, atau konten
3. **Pelajari** struktur komponen React
4. **Eksperimen** dengan fitur baru
5. **Deploy** ke hosting gratis

---

**Selamat Coding! 🚀**

*Made with ❤️ for Indonesian Heritage*
