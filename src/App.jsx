import React, { useState } from 'react';
import { useCourseContext } from './context/CourseContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import CourseCard from './components/CourseCard';
import CourseModal from './components/CourseModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import CourseDetailModal from './components/CourseDetailModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { Loader2, AlertCircle, RefreshCw, Plus, Sparkles, Inbox } from 'lucide-react';

export function App() {
  const {
    courses,
    allCoursesCount,
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
    closeToast,
  } = useCourseContext();

  // State Modal Controls
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourseForDelete, setSelectedCourseForDelete] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState(null);

  // Handlers Modal Add / Edit
  const handleOpenAddModal = () => {
    setSelectedCourseForEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setSelectedCourseForEdit(course);
    setIsAddEditModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedCourseForEdit && selectedCourseForEdit.id) {
      // Operasi UPDATE (PUT / PATCH)
      const res = await handleUpdateCourse(selectedCourseForEdit.id, formData);
      if (res.success) {
        setIsAddEditModalOpen(false);
        setSelectedCourseForEdit(null);
      }
    } else {
      // Operasi ADD (POST)
      const res = await handleAddCourse(formData);
      if (res.success) {
        setIsAddEditModalOpen(false);
      }
    }
  };

  // Handlers Modal Delete
  const handleOpenDeleteModal = (course) => {
    setSelectedCourseForDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCourseForDelete) return;
    const res = await handleDeleteCourse(selectedCourseForDelete.id);
    if (res.success) {
      setIsDeleteModalOpen(false);
      setSelectedCourseForDelete(null);
    }
  };

  // Handlers Modal Detail
  const handleOpenDetailModal = (course) => {
    setSelectedCourseForDetail(course);
    setIsDetailModalOpen(true);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('katalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Navigation Header */}
      <Navbar onOpenAddModal={handleOpenAddModal} totalCourses={allCoursesCount} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner API Status Badge */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-emerald-50/80 border border-emerald-200/60 rounded-2xl text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              API Endpoint:{' '}
              <code className="bg-white/80 px-2 py-0.5 rounded font-mono font-bold text-emerald-700">
                {apiUrl}
              </code>
            </span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Mendukung operasi <span className="font-bold">GET, ADD, UPDATE, DELETE</span> dinamis
          </div>
        </div>

        {/* Hero Section */}
        <HeroBanner onExploreClick={scrollToCatalog} />

        {/* Categories, Search & Filter Section */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Course Grid Area */}
        {loading ? (
          /* Loading State Skeleton */
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
            <p className="text-base font-semibold text-gray-700">Memuat data kelas dari API...</p>
            <p className="text-xs text-gray-400 mt-1">Mengambil respon JSON dari {apiUrl}/courses</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="py-12 px-6 rounded-3xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-rose-900 mb-1">Gagal Menghubungkan ke API</h3>
            <p className="text-xs text-rose-700 mb-4">{error}</p>
            <p className="text-xs text-gray-600 bg-white/70 p-3 rounded-xl mb-4 font-mono">
              Pastikan server berjalan: <br />
              <span className="font-bold text-gray-900">npm run server</span> (port 5000) atau jalankan <span className="font-bold text-gray-900">npm run dev:all</span>
            </p>
            <button
              onClick={fetchCourses}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Coba Muat Ulang
            </button>
          </div>
        ) : courses.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-6 text-center max-w-md mx-auto my-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Tidak Ada Kelas Ditemukan</h3>
            <p className="text-xs text-gray-500 mb-6">
              {searchQuery || selectedCategory !== 'Semua Kelas'
                ? 'Tidak ada kelas yang sesuai dengan filter atau kata kunci pencarian Anda.'
                : 'Belum ada kelas yang terdaftar pada database API.'}
            </p>
            <div className="flex items-center justify-center gap-3">
              {(searchQuery || selectedCategory !== 'Semua Kelas') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Semua Kelas');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Reset Filter
                </button>
              )}
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" /> Tambah Kelas Baru
              </button>
            </div>
          </div>
        ) : (
          /* Course Grid List */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
                onViewDetail={handleOpenDetailModal}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CourseModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setSelectedCourseForEdit(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={selectedCourseForEdit}
        isSubmitting={actionLoading}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCourseForDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        course={selectedCourseForDelete}
        isDeleting={actionLoading}
      />

      <CourseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCourseForDetail(null);
        }}
        course={selectedCourseForDetail}
        onEdit={(course) => {
          setSelectedCourseForEdit(course);
          setIsAddEditModalOpen(true);
        }}
      />
    </div>
  );
}

export default App;
