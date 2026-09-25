import { useState, useEffect, useCallback } from 'react';
import { courseService } from '../services/api/courseService';

/**
 * Custom Hook: useCourses
 * Mengelola state data kursus, loading, error handling, serta operasi CRUD (GET, ADD, UPDATE, DELETE)
 */
export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Semua Kelas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-low', 'price-high', 'rating'
  const [toast, setToast] = useState(null); // { type: 'success' | 'error' | 'info', message: string }

  // Helper untuk menampilkan notifikasi toast
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Fetch semua kursus dari API (GET)
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getAll();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message || 'Gagal memuat daftar kursus dari API.');
      showToast('Gagal terhubung ke API. Pastikan server mock API berjalan.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Initial load
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Tambah Kursus Baru (ADD / POST)
  const handleAddCourse = async (newCourseData) => {
    setActionLoading(true);
    try {
      const created = await courseService.create(newCourseData);
      setCourses((prev) => [created, ...prev]);
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

  // Update Kursus (UPDATE / PUT)
  const handleUpdateCourse = async (id, updatedData) => {
    setActionLoading(true);
    try {
      const updated = await courseService.update(id, updatedData);
      setCourses((prev) =>
        prev.map((item) => (String(item.id) === String(id) ? { ...item, ...updated } : item))
      );
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

  // Hapus Kursus (DELETE)
  const handleDeleteCourse = async (id) => {
    setActionLoading(true);
    try {
      await courseService.delete(id);
      setCourses((prev) => prev.filter((item) => String(item.id) !== String(id)));
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

  // Filter dan Sorting Data di Client Side untuk responsivitas instan
  const filteredCourses = courses
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
    allCoursesCount: courses.length,
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
    showToast,
    closeToast,
  };
}

export default useCourses;
