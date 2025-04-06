# Cafe Finder Lampung

Aplikasi React untuk menemukan dan menjelajahi kafe di Bandar Lampung, Indonesia. Proyek ini dikembangkan sebagai bagian dari tugas Ujian Tengah Semester (UTS) Pemrograman Web.

## Fitur

- **Jelajahi Kafe**: Temukan berbagai kafe di Bandar Lampung
- **Pencarian**: Cari kafe berdasarkan nama, deskripsi, atau lokasi
- **Filter Kategori**: Filter kafe berdasarkan kategori yang berbeda
- **Halaman Detail Kafe**: Lihat informasi lengkap tentang setiap kafe
- **Sistem Favorit**: Simpan dan kelola kafe favorit Anda
- **Desain Responsif**: Dioptimalkan untuk semua ukuran layar
- **UI Interaktif**: Antarmuka yang ramah pengguna dengan umpan balik visual

## Teknologi yang Digunakan

- React 
- React Router
- Context API untuk manajemen state
- Custom Hooks
- Local Storage untuk penyimpanan data
- CSS untuk styling
- PropTypes untuk validasi tipe data

## Struktur Proyek

```
src/
├── components/
│   ├── CafeCard.js           # Komponen untuk menampilkan kafe
│   ├── CafeList.js           # Komponen untuk menampilkan daftar kafe
│   ├── FilterOptions.js      # Komponen filter kategori
│   ├── LoadingSpinner.js     # Indikator loading
│   ├── Navbar.js             # Komponen navigasi
│   └── SearchBar.js          # Komponen input pencarian
├── context/
│   └── FavoritesContext.js   # Mengelola state favorit
├── data/
│   └── cafes.js              # Data lokal kafe
├── hooks/
│   └── useFetch.js           # Custom hook untuk pengambilan data
├── pages/
│   ├── CafeDetailPage.js     # Halaman detail kafe
│   ├── FavoritesPage.js      # Halaman favorit yang tersimpan
│   └── HomePage.js           # Halaman utama
├── assets/
│   └── styles/
│       └── App.css           # Style aplikasi
└── App.js                    # Komponen utama aplikasi
```

## Instalasi

1. Clone repository:
   ```bash
   git clone https://github.com/rifnita/uts_pemrograman_web_122140031.git
   cd uts_pemrograman_web_122140031
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan:
   ```bash
   npm start
   ```

4. Buka browser dan kunjungi `http://localhost:3000`

## Highlight Proyek

Aplikasi ini memenuhi persyaratan untuk tugas UTS:

### 1. Implementasi Komponen (20%)
- Beberapa komponen fungsional dengan hierarki yang tepat
- Penggunaan props yang efisien untuk komunikasi antar komponen
- Implementasi PropTypes untuk validasi
- Manajemen state lokal di komponen

### 2. Penggunaan React Hooks (20%)
- useState untuk state komponen
- useEffect untuk manajemen lifecycle dan side effects
- useCallback untuk optimasi referensi fungsi
- Custom hooks untuk logika yang dapat digunakan kembali

### 3. Manajemen State (15%)
- Context API untuk state aplikasi (favorit)
- Organisasi state yang efisien
- Penyimpanan persisten dengan localStorage

### 4. Routing (15%)
- React Router untuk navigasi halaman
- Routing dinamis dengan parameter
- Navigasi terprogram

### 5. Manajemen Data (15%)
- Organisasi data yang efisien
- Penanganan state loading
- Pengelolaan error

### 6. Desain UI/UX (10%)
- Desain responsif untuk semua perangkat
- Antarmuka pengguna yang intuitif
- Styling yang konsisten

### 7. Struktur Kode (5%)
- Struktur proyek yang terorganisir dengan baik
- Konvensi penamaan yang konsisten
- Komponen yang dapat digunakan kembali

## Author

Dibuat oleh Rifnita Cahyani Hidayat untuk UTS Pemrograman Web ITERA.
