# VideoBelajar - ReactJS REST API & Redux Toolkit CRUD Application
> **Mission Advanced Front End 2** - Implementasi State Management Global (Redux Toolkit & React-Redux), Integrasi API Call (GET, ADD, UPDATE, DELETE), Custom Hooks, dan Komponen ListView.

---

## 🎯 Poin Penilaian & Capaian Fitur

Aplikasi ini telah memenuhi seluruh kriteria penilaian yang ditentukan pada **Mission Advanced Front End 2**:

| Komponen Penilaian | Status | Implementasi & File Terkait |
| :--- | :---: | :--- |
| **STEP 3: Implementasi State Management** | ✅ Selesai | Menggunakan library **`@reduxjs/toolkit`** dan **`react-redux`**. <br>• Konfigurasi store di [`src/store/redux/store.js`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/store/redux/store.js) dan [`store/redux/store.js`](file:///c:/laragon/www/mission-advanced-frontEnd2/store/redux/store.js). <br>• Reducer di [`src/store/redux/courseReducer.js`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/store/redux/courseReducer.js) dengan Initial State array kosong (`[]`) dan reducer untuk menyimpan data API ke global state. <br>• Terhubung ke root aplikasi ([`src/main.jsx`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/main.jsx)) menggunakan `<Provider store={store}>`. |
| **STEP 4.1: Integrasi Get Data** | ✅ Selesai | Memanggil fungsi Get API [`getData`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/services/api/index.js) dari folder `services/api`. <br>• Hasil API disimpan ke Redux global state via reducer `setCourses`. <br>• Data ditampilkan di komponen [`ListView`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/ListView.jsx) menggunakan **`useSelector`** dari `react-redux`. |
| **STEP 4.2: Integrasi Add, Edit, Delete** | ✅ Selesai | • **Add:** Menggunakan fungsi `addData` dari `services/api` + update state Redux (`addCourse`). <br>• **Edit:** Menggunakan fungsi `editData` / `updateData` dari `services/api` + update state Redux (`updateCourse`). <br>• **Delete:** Menggunakan fungsi `deleteData` dari `services/api` + update state Redux (`deleteCourse`). |
| **Arsitektur Services/API Terpusat** | ✅ Selesai | Terletak di [`src/services/api/`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/services/api) : <br>• [`axiosClient.js`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/services/api/axiosClient.js) : Axios instance terpusat & Request/Response Interceptors. <br>• [`courseService.js`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/services/api/courseService.js) : Fungsi CRUD API. <br>• [`index.js`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/services/api/index.js) : Ekspor fungsi `getData`, `addData`, `editData`, `deleteData`. |
| **Custom Hooks & Modularity** | ✅ Selesai | [`src/hooks/useCourses.js`](file:///c:/laragon/www/mission-advanced-frontEnd2/src/hooks/useCourses.js) memadukan useDispatch & useSelector Redux dengan error handling, toast notification, dan client filtering/sorting. |
| **UI Responsif VideoBelajar** | ✅ Selesai | Slicing modern Tailwind CSS dengan Hero Banner, Filter Kategori, Search, Modal Form Tambah/Ubah, Konfirmasi Hapus, Detail Modal, dan Toast Alert. |

---

## 📁 Struktur Folder Proyek

```text
mission-advanced-frontEnd2/
├── .env                              # Base URL API (VITE_API_BASE_URL)
├── .env.example                      # Template environment variable
├── db.json                           # Database JSON untuk json-server mock API
├── package.json                      # Dependencies (@reduxjs/toolkit, react-redux, axios, etc.)
├── vite.config.js                    # Konfigurasi Vite & Tailwind CSS
├── store/                            # Root mirror store sesuai instruksi
│   └── redux/
│       ├── store.js                  # Konfigurasi Redux Store
│       └── courseReducer.js          # Reducer Data API
├── src/
│   ├── store/
│   │   └── redux/
│   │       ├── store.js              # Redux Toolkit configureStore
│   │       └── courseReducer.js      # Redux Slice & Reducer (Initial State [], setCourses, etc.)
│   ├── services/
│   │   └── api/
│   │       ├── axiosClient.js        # Axios instance dengan Interceptors
│   │       ├── courseService.js      # Operasi HTTP CRUD
│   │       └── index.js              # Ekspor fungsi: getData, addData, editData, deleteData
│   ├── components/
│   │   ├── Navbar.jsx                # Header navigasi & tombol Tambah Kelas
│   │   ├── HeroBanner.jsx            # Hero banner interaktif
│   │   ├── CategoryFilter.jsx        # Filter kategori, pencarian & sorting
│   │   ├── CourseCard.jsx            # Card item kelas dengan tombol Aksi
│   │   ├── CourseModal.jsx           # Modal dialog Tambah & Edit Kelas
│   │   ├── DeleteConfirmModal.jsx    # Modal dialog konfirmasi Hapus
│   │   ├── CourseDetailModal.jsx     # Modal preview detail kelas
│   │   ├── Toast.jsx                 # Notifikasi status interaktif
│   │   ├── Footer.jsx                # Footer
│   │   └── ListView.jsx              # Komponen ListView list kursus
│   ├── ListView.jsx                  # Komponen ListView (useSelector & getData)
│   ├── hooks/
│   │   └── useCourses.js             # Custom Hook terhubung ke Redux Store & API
│   ├── context/
│   │   └── CourseContext.jsx         # Context Provider wrapper
│   ├── App.jsx                       # Main Page layout
│   ├── main.jsx                      # Root render dibungkus <Provider store={store}>
│   └── index.css                     # Styling Tailwind CSS
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Menjalankan Server Mock API & React Frontend Bersamaan (Rekomendasi)
Jalankan perintah berikut:
```bash
npm run dev:all
```
*Perintah ini secara otomatis menjalankan Mock API Server pada `http://localhost:5000` dan Vite Dev Server pada `http://localhost:5173`.*

---

### 2. Menjalankan Secara Terpisah

**Langkah 1: Menjalankan Mock Server API (Port 5000)**
```bash
npm run server
```

**Langkah 2: Menjalankan Frontend React (Vite)**
```bash
npm run dev
```

Buka browser pada: `http://localhost:5173`

---

## 🧪 Contoh Integrasi Redux & API Call (Sesuai Slide)

### 1. Root Provider (`src/main.jsx`)
```jsx
import { Provider } from 'react-redux';
import store from './store/redux/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### 2. Komponen ListView (`src/ListView.jsx`)
```jsx
import { useSelector } from 'react-redux';
import { getData } from './services/api';

export function ListView() {
  const courses = useSelector((state) => state.courses);
  // Menampilkan data courses...
}
```

### 3. Operasi CRUD di `services/api`
```javascript
import { getData, addData, editData, deleteData } from './services/api';

// GET
const courses = await getData();

// ADD
const newCourse = await addData({ title: 'React Mastery', ... });

// EDIT
const updated = await editData(id, { title: 'Updated Title', ... });

// DELETE
await deleteData(id);
```

---

## 🌐 Environment Variable (.env)

Untuk kebutuhan pengumpulan GitHub / deployment:
```env
VITE_API_BASE_URL=http://localhost:5000
```
Jika menggunakan API publik (MockAPI.io / backend lain), ganti nilai di atas dengan URL API publik yang aktif.
