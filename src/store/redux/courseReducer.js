import { createSlice } from '@reduxjs/toolkit';

/**
 * Reducer untuk Data API
 * Sesuai instruksi STEP 3:
 * - Initial State: State awal berupa array kosong yang nantinya akan diisi dengan data API.
 * - Reducer untuk Data API: Menangani data hasil dari API dan menyimpannya ke dalam state global.
 */
const initialState = [];

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    // Reducer untuk menangani data hasil dari API dan menyimpannya ke dalam state global
    setCourses: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : [];
    },
    // Reducer untuk menambahkan data baru (Add API)
    addCourse: (state, action) => {
      state.unshift(action.payload);
    },
    // Reducer untuk memperbarui data yang ada (Edit API)
    updateCourse: (state, action) => {
      const index = state.findIndex((item) => String(item.id) === String(action.payload.id));
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    // Reducer untuk menghapus data (Delete API)
    deleteCourse: (state, action) => {
      return state.filter((item) => String(item.id) !== String(action.payload));
    },
    // Reducer untuk status Beli/Daftar Kelas (Enroll Course)
    enrollCourse: (state, action) => {
      const target = state.find((item) => String(item.id) === String(action.payload));
      if (target) {
        target.isEnrolled = true;
      }
    },
  },
});

// Export actions
export const {
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
} = courseSlice.actions;

// Aliases agar fleksibel sesuai variasi penamaan aksi
export const setData = setCourses;
export const addDataAction = addCourse;
export const updateDataAction = updateCourse;
export const deleteDataAction = deleteCourse;

// Export default reducer
export default courseSlice.reducer;
