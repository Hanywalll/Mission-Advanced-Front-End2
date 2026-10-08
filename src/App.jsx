import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getData } from './services/api';
import { useCourseContext } from './context/CourseContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import CourseModal from './components/CourseModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import CourseDetailModal from './components/CourseDetailModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import ListView from './ListView';
import { Loader2, AlertCircle, RefreshCw, Cpu, Database, CheckCircle2 } from 'lucide-react';

export function App() {
  const reduxCourses = useSelector((state) => state.courses || []);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const {
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
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans text-gray-800 selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Navigation Header */}
      <Navbar onOpenAddModal={handleOpenAddModal} totalCourses={reduxCourses.length || allCoursesCount} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sleek Telemetry & State Monitor Bar */}
        <div className="mb-6 px-4 py-3 bg-white border border-gray-200/80 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Redux Indicator */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>Redux Toolkit Store</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {/* API Endpoint Indicator */}
            <div className="inline-flex items-center gap-1.5 text-gray-600">
              <Database className="w-3.5 h-3.5 text-gray-400" />
              <span>Endpoint:</span>
              <code className="px-2 py-0.5 rounded-lg bg-gray-100 font-mono font-bold text-gray-800">
                {apiUrl}/courses
              </code>
            </div>

            {/* Total Synchronized Items */}
            <div className="hidden sm:inline-flex items-center gap-1 text-gray-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                <strong className="text-gray-900">{reduxCourses.length}</strong> items in global state
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-[11px] text-gray-400">
              CRUD Operations: GET • ADD • EDIT • DELETE
            </span>
            <button
              onClick={async () => {
                try {
                  await getData();
                } catch {
                  // ignore
                }
                fetchCourses();
              }}
              title="Sinkronisasi Ulang Data API"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-emerald-700 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-gray-400 hover:text-emerald-600" />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <HeroBanner onExploreClick={scrollToCatalog} totalCourses={reduxCourses.length} />

        {/* Categories, Search & Filter Section */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalResults={reduxCourses.length}
        />

        {/* Course Grid Area / ListView */}
        {loading ? (
          /* Loading State Skeleton */
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
            <p className="text-base font-bold text-gray-800">Memuat data kelas dari API & Redux...</p>
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
              onClick={async () => {
                try {
                  await getData();
                } catch {
                  // ignore
                }
                fetchCourses();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Coba Muat Ulang
            </button>
          </div>
        ) : (
          /* ListView Component displaying Redux state */
          <ListView
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            viewMode={viewMode}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
            onViewDetail={handleOpenDetailModal}
            onOpenAddModal={handleOpenAddModal}
            onResetFilter={() => {
              setSearchQuery('');
              setSelectedCategory('Semua Kelas');
            }}
          />
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
