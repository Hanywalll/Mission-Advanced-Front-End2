import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, addData, editData, deleteData } from '../services/api';
import {
  setCourses as setReduxCourses,
  addCourse as addReduxCourse,
  updateCourse as updateReduxCourse,
  deleteCourse as deleteReduxCourse,
  enrollCourse as enrollReduxCourse,
} from '../store/redux/courseReducer';

/**
 * Custom Hook: useCourses
 * Mengintegrasikan State Management Redux Toolkit dengan fungsi API di services/api
 * Sesuai instruksi STEP 3 & STEP 4:
 * - Integrasi Get Data: getData dari services/api + setCourses ke Redux store + useSelector
 * - Integrasi Add, Edit, Delete: memanggil addData, editData, deleteData dari services/api
 */
export function useCourses() {
  const dispatch = useDispatch();
  
  // Mengambil state courses langsung dari Redux Store
  const coursesFromRedux = useSelector((state) => state.courses || []);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Semua Kelas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-low', 'price-high', 'rating'
  const [toast, setToast] = useState(null);

  // Helper Toast Notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // 1. Integrasi Get Data dari folder services/api dan dispatch ke Redux Store
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getData();
      const courseList = Array.isArray(data) ? data : [];
      // Panggil reducer pada Redux untuk menyimpan data hasil dari API ke state global
      dispatch(setReduxCourses(courseList));
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message || 'Gagal memuat daftar kursus dari API.');
      showToast('Gagal terhubung ke API. Pastikan server mock API berjalan.', 'error');
    } finally {
      setLoading(false);
    }
  }, [dispatch, showToast]);

  // Initial load saat komponen pertama kali dirender
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // 2. Integrasi Add Data (POST) menggunakan fungsi Add API dari folder services/api
  const handleAddCourse = async (newCourseData) => {
    setActionLoading(true);
    try {
      const created = await addData(newCourseData);
      // Dispatch ke Redux reducer
      dispatch(addReduxCourse(created));
      showToast(`Kelas "${created.title}" berhasil ditambahkan!`, 'success');
      return { success: true, data: created };
    } catch (err) {
      const msg = err.message || 'Gagal menambahkan kelas baru.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    } finally {
      setActionLoading(false);
    }
  };

  // 2. Integrasi Edit Data (PUT) menggunakan fungsi Edit API dari folder services/api
  const handleUpdateCourse = async (id, updatedData) => {
    setActionLoading(true);
    try {
      const updated = await editData(id, updatedData);
      // Dispatch ke Redux reducer
      dispatch(updateReduxCourse({ id, ...updated }));
      showToast(`Kelas "${updated.title}" berhasil diperbarui!`, 'success');
      return { success: true, data: updated };
    } catch (err) {
      const msg = err.message || 'Gagal memperbarui data kelas.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    } finally {
      setActionLoading(false);
    }
  };

  // 2. Integrasi Delete Data (DELETE) menggunakan fungsi Delete API dari folder services/api
  const handleDeleteCourse = async (id) => {
    setActionLoading(true);
    try {
      await deleteData(id);
      // Dispatch ke Redux reducer
      dispatch(deleteReduxCourse(id));
      showToast('Kelas berhasil dihapus!', 'success');
      return { success: true };
    } catch (err) {
      const msg = err.message || 'Gagal menghapus kelas.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Integrasi Beli / Daftar Kelas (Enroll Course) ke Redux State
  const handleEnrollCourse = (course) => {
    if (!course) return;
    dispatch(enrollReduxCourse(course.id));
    showToast(`🎉 Pembelian berhasil! Anda resmi terdaftar di kelas "${course.title}".`, 'success');
  };

  // Filter dan Sorting Data dari Redux State
  const filteredCourses = coursesFromRedux
    .filter((course) => {
      const matchCategory =
        selectedCategory === 'Semua Kelas' ||
        course.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchSearch =
        searchQuery === '' ||
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'price-low') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === 'price-high') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  return {
    courses: filteredCourses,
    allCourses: coursesFromRedux,
    allCoursesCount: coursesFromRedux.length,
    loading,
    actionLoading,
    error,
    toast,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    fetchCourses,
    handleAddCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    handleEnrollCourse,
    showToast,
    closeToast,
  };
}

export default useCourses;
