import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from './services/api';
import { setCourses } from './store/redux/courseReducer';
import CourseCard from './components/CourseCard';
import { Inbox, Plus } from 'lucide-react';

/**
 * Komponen ListView
 * Sesuai instruksi STEP 4:
 * - Menampilkan data di komponen ListView menggunakan useSelector dari react-redux
 * - Menggunakan fungsi Get API (getData) dari folder services/api
 */
export function ListView({
  selectedCategory = 'Semua Kelas',
  searchQuery = '',
  sortBy = 'newest',
  onEdit,
  onDelete,
  onViewDetail,
  onOpenAddModal,
  onResetFilter,
}) {
  const dispatch = useDispatch();
  // Mengambil data kursus dari global state Redux
  const reduxCourses = useSelector((state) => state.courses || []);

  // Memastikan data dimuat dari API ke Redux jika belum ada
  useEffect(() => {
    if (!reduxCourses || reduxCourses.length === 0) {
      getData()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            dispatch(setCourses(data));
          }
        })
        .catch((err) => {
          console.error('Error fetching data in ListView:', err);
        });
    }
  }, [dispatch, reduxCourses]);

  // Filter & Urutkan data dari Redux
  const filteredCourses = reduxCourses
    .filter((course) => {
      const matchCategory =
        selectedCategory === 'Semua Kelas' ||
        course.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchSearch =
        !searchQuery ||
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

  if (filteredCourses.length === 0) {
    return (
      <div className="py-16 px-6 text-center max-w-md mx-auto my-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Tidak Ada Kelas Ditemukan</h3>
        <p className="text-xs text-gray-500 mb-6">
          {searchQuery || selectedCategory !== 'Semua Kelas'
            ? 'Tidak ada kelas yang sesuai dengan filter atau kata kunci pencarian Anda.'
            : 'Belum ada data kelas yang terdaftar pada state Redux.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          {(searchQuery || selectedCategory !== 'Semua Kelas') && onResetFilter && (
            <button
              onClick={onResetFilter}
              className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          )}
          {onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah Kelas Baru
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
}

export default ListView;
