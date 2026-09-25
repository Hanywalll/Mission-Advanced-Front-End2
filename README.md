# VideoBelajar - ReactJS REST API CRUD Application
> **Mission Advance Frontend ReactJS** - Implementasi API Dinamis (GET, ADD, UPDATE, DELETE) dengan Custom Hooks, Axios Interceptors, dan Environment Variable.

---

## 🎯 Poin Penilaian & Capaian Fitur

Aplikasi ini telah memenuhi seluruh kriteria penilaian yang ditentukan:

| Komponen Penilaian | Status | Implementasi & File Terkait |
| :--- | :---: | :--- |
| **Integrasi API Dinamis** | ✅ Selesai | Mendukung operasi **GET**, **ADD (POST)**, **UPDATE (PUT)**, dan **DELETE** data kursus secara realtime. |
| **Arsitektur Services/API** | ✅ Selesai | Terletak di [`src/services/api/`](file:///c:/laragon/www/mission-advance/src/services/api) : <br>• [`axiosClient.js`](file:///c:/laragon/www/mission-advance/src/services/api/axiosClient.js) : Instance Axios terpusat & Interceptors.<br>• [`courseService.js`](file:///c:/laragon/www/mission-advance/src/services/api/courseService.js) : Fungsi CRUD API. |
| **Axios Interceptors** | ✅ Selesai | Request interceptor (logging & request formatting) & Response interceptor (error handling & status handling terpusat). |
| **Environment Variable (.env)** | ✅ Selesai | Base URL API disimpan pada [`/.env`](file:///c:/laragon/www/mission-advance/.env) (`VITE_API_BASE_URL`) untuk mencegah *hardcoding*. |
| **Custom Hooks React** | ✅ Selesai | [`src/hooks/useCourses.js`](file:///c:/laragon/www/mission-advance/src/hooks/useCourses.js) untuk memisahkan logic fetching, state management, search/filter, dan toast notification dari komponen UI. |
| **Slicing Mockup UI VideoBelajar** | ✅ Selesai | Tampilan responsif & modern sesuai mockup (Hero Banner, Tabs Kategori, Card List, Modal Form Add/Edit, Dialog Delete, Detail View, Toast Notification). |

---

## 📁 Struktur Folder Proyek

```text
mission-advance/
├── .env                         # Konfigurasi Base URL API (VITE_API_BASE_URL)
├── .env.example                 # Template environment variable
├── db.json                      # Database JSON untuk json-server mock API
├── package.json                 # Scripts & dependencies
├── vite.config.js               # Konfigurasi Vite & Tailwind CSS
├── src/
│   ├── components/              # Komponen Slicing UI Modular
│   │   ├── Navbar.jsx           # Header navigasi & tombol Tambah Kelas
│   │   ├── HeroBanner.jsx       # Hero banner interaktif sesuai mockup
│   │   ├── CategoryFilter.jsx   # Filter kategori, pencarian & sorting
│   │   ├── CourseCard.jsx       # Card item dengan aksi Edit & Hapus
│   │   ├── CourseModal.jsx      # Modal Form ADD & UPDATE data ke API
│   │   ├── DeleteConfirmModal.jsx # Konfirmasi dialog sebelum request DELETE
│   │   ├── CourseDetailModal.jsx  # Modal preview detail kelas
│   │   ├── Toast.jsx            # Feedback notification (Success/Error/Info)
│   │   └── Footer.jsx           # Footer platform
│   ├── hooks/
│   │   └── useCourses.js        # Custom Hook untuk manajemen state & API
│   ├── services/
│   │   └── api/
│   │       ├── axiosClient.js   # Instance Axios dengan Interceptors
│   │       └── courseService.js # Fungsi GET, POST, PUT, DELETE
│   ├── App.jsx                  # Main Page Layout
│   ├── main.jsx                 # Entry point React
│   └── index.css                # Styling Tailwind CSS
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Menjalankan Aplikasi & Mock API Bersamaan (Rekomendasi)
Jalankan perintah berikut di terminal:
```bash
npm run dev:all
```
*Perintah ini akan menjalankan Mock API Server pada `http://localhost:5000` dan React App pada `http://localhost:5173` secara bersamaan.*

---

### 2. Menjalankan Secara Terpisah

**Langkah A: Menjalankan Mock Server API (Port 5000)**
```bash
npm run server
```

**Langkah B: Menjalankan React App (Vite)**
```bash
npm run dev
```

---

## 🌐 Menghubungkan ke Cloud MockAPI.io / Firebase

Jika Anda ingin menggunakan endpoint cloud dari **MockAPI.io**:
1. Buat project dan resource `courses` di [mockapi.io](https://mockapi.io/).
2. Buka file `.env` di root folder.
3. Ubah nilai `VITE_API_BASE_URL` dengan endpoint Anda:
   ```env
   VITE_API_BASE_URL=https://66xxxxxx.mockapi.io/api/v1
   ```
4. Restart React dev server (`npm run dev`).

---

## 🛠️ Ringkasan Endpoint API CRUD

| Operasi | HTTP Method | Endpoint | Fungsi Service |
| :--- | :---: | :--- | :--- |
| **GET All** | `GET` | `/courses` | `courseService.getAll(params)` |
| **GET By ID** | `GET` | `/courses/:id` | `courseService.getById(id)` |
| **ADD** | `POST` | `/courses` | `courseService.create(data)` |
| **UPDATE** | `PUT` | `/courses/:id` | `courseService.update(id, data)` |
| **DELETE** | `DELETE` | `/courses/:id` | `courseService.delete(id)` |
