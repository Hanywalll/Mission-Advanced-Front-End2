import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';

const CATEGORY_OPTIONS = ['Bisnis', 'Teknologi', 'Desain', 'Pemasaran', 'Pengembangan Diri'];
const LEVEL_OPTIONS = ['Pemula', 'Menengah', 'Mahir', 'Semua Level'];

const DEFAULT_FORM_STATE = {
  title: '',
  category: 'Teknologi',
  description: '',
  price: '',
  originalPrice: '',
  thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  level: 'Pemula',
  duration: '5 Jam',
  totalLessons: 12,
  instructor: {
    name: '',
    title: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  },
};

export function CourseModal({ isOpen, onClose, onSubmit, initialData, isSubmitting }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});

  const isEditMode = Boolean(initialData && initialData.id);

  // Sync form data ketika modal dibuka atau ganti initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'Teknologi',
        description: initialData.description || '',
        price: initialData.price || '',
        originalPrice: initialData.originalPrice || '',
        thumbnail: initialData.thumbnail || DEFAULT_FORM_STATE.thumbnail,
        level: initialData.level || 'Pemula',
        duration: initialData.duration || '5 Jam',
        totalLessons: initialData.totalLessons || 12,
        instructor: {
          name: initialData.instructor?.name || '',
          title: initialData.instructor?.title || '',
          avatar: initialData.instructor?.avatar || DEFAULT_FORM_STATE.instructor.avatar,
        },
      });
    } else {
      setFormData(DEFAULT_FORM_STATE);
    }
    setFormErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('instructor.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Judul kelas wajib diisi';
    if (!formData.description.trim()) errors.description = 'Deskripsi kelas wajib diisi';
    if (!formData.instructor.name.trim()) errors.instructorName = 'Nama instruktur wajib diisi';
    if (!formData.price || Number(formData.price) <= 0) errors.price = 'Harga harus valid (lebih dari 0)';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formData);
  };

  // Quick preset thumbnails
  const handleSelectPresetThumbnail = (url) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
              {isEditMode ? <Save className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-gray-900">
                {isEditMode ? 'Edit Data Kelas (UPDATE API)' : 'Tambah Kelas Baru (ADD API)'}
              </h2>
              <p className="text-xs text-gray-500">
                {isEditMode
                  ? 'Perbarui informasi kelas yang tersimpan pada server API'
                  : 'Tambahkan kursus baru ke database API secara dinamis'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Judul Kelas */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Judul Kelas <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Belajar Next.js & TypeScript Dari Dasar"
              className={`w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                formErrors.title ? 'border-rose-400 bg-rose-50/30' : 'border-gray-200'
              }`}
            />
            {formErrors.title && (
              <p className="text-rose-500 text-xs mt-1">{formErrors.title}</p>
            )}
          </div>

          {/* Kategori & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Tingkat Kesulitan (Level)
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              >
                {LEVEL_OPTIONS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Deskripsi Kelas <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Jelaskan ringkasan materi dan manfaat kursus..."
              className={`w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                formErrors.description ? 'border-rose-400 bg-rose-50/30' : 'border-gray-200'
              }`}
            />
            {formErrors.description && (
              <p className="text-rose-500 text-xs mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* Harga & Diskon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Harga Jual (Rp) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="250000"
                className={`w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                  formErrors.price ? 'border-rose-400 bg-rose-50/30' : 'border-gray-200'
                }`}
              />
              {formErrors.price && (
                <p className="text-rose-500 text-xs mt-1">{formErrors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Harga Coret / Asli (Rp)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="500000"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Instruktur Section */}
          <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Informasi Instruktur
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Nama Instruktur <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="instructor.name"
                  value={formData.instructor.name}
                  onChange={handleChange}
                  placeholder="Misal: Dimas Wicaksono, M.Sc"
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                {formErrors.instructorName && (
                  <p className="text-rose-500 text-xs mt-1">{formErrors.instructorName}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Profesi / Title Instruktur
                </label>
                <input
                  type="text"
                  name="instructor.title"
                  value={formData.instructor.title}
                  onChange={handleChange}
                  placeholder="Misal: Senior Software Architect"
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Durasi & Lessons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Estimasi Durasi
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="6 Jam"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Total Video Pelajaran
              </label>
              <input
                type="number"
                name="totalLessons"
                value={formData.totalLessons}
                onChange={handleChange}
                placeholder="18"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Thumbnail URL & Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              URL Gambar Thumbnail
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Thumbnail Preview Box */}
            {formData.thumbnail && (
              <div className="relative aspect-video w-full max-h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Preview Thumbnail
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan ke API...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{isEditMode ? 'Simpan Perubahan' : 'Tambah Kelas Sekarang'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseModal;
