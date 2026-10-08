import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseReducer';

/**
 * Konfigurasi Redux Store
 * Sesuai instruksi STEP 3:
 * Mendaftarkan reducer ke dalam file store.js
 */
export const store = configureStore({
  reducer: {
    courses: courseReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
