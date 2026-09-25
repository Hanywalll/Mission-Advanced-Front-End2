import React from 'react';
import { X, Star, Clock, BookOpen, CheckCircle, ShieldCheck, Share2, Play } from 'lucide-react';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number || 0);
};

export function CourseDetailModal({ isOpen, onClose, course, onEdit }) {
  if (!isOpen || !course) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-detail-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Banner Preview */}
        <div className="relative aspect-video max-h-72 w-full bg-slate-900 overflow-hidden">
          <img
            src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'}
            alt={course.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white">
                {course.category}
              </span>
              <h2 id="course-detail-title" className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {course.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup detail"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100">
            {/* Instructor */}
            <div className="flex items-center gap-3">
              <img
                src={course.instructor?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={course.instructor?.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900">{course.instructor?.name}</h4>
                <p className="text-xs text-gray-500">{course.instructor?.title}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.rating || 5.0}</span>
                <span className="text-gray-400 font-normal">({course.reviewCount || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{course.duration || '4 Jam'}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <BookOpen className="w-4 h-4" />
                <span>{course.totalLessons || 10} Materi</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">Tentang Kelas Ini</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* What you'll learn */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Materi yang Akan Dipelajari:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Pemahaman konsep fundamental & studi kasus
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Hands-on project siap portofolio
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Akses seumur hidup dan forum diskusi
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Sertifikat kelulusan terverifikasi
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Pricing & CTA */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/70">
          <div>
            {course.originalPrice > course.price && (
              <span className="text-xs text-gray-400 line-through block">
                {formatRupiah(course.originalPrice)}
              </span>
            )}
            <span className="text-2xl font-black text-emerald-600">
              {formatRupiah(course.price)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onEdit(course);
              }}
              className="px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Edit Kelas (API)
            </button>
            <button
              onClick={() => {
                alert(`Membeli kelas "${course.title}". Fitur Checkout Pembayaran.`);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" /> Beli & Mulai Belajar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailModal;
