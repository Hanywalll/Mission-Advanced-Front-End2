import React from 'react';
import { Star, Clock, BookOpen, Edit3, Trash2, Eye, Award, Sparkles } from 'lucide-react';

// Formatter Rupiah Indonesia
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number || 0);
};

// Category Colors Helper
const getCategoryBadgeClass = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('teknologi')) return 'bg-cyan-600 text-white';
  if (cat.includes('desain')) return 'bg-purple-600 text-white';
  if (cat.includes('bisnis')) return 'bg-blue-600 text-white';
  if (cat.includes('pemasaran')) return 'bg-amber-600 text-white';
  if (cat.includes('pengembangan')) return 'bg-rose-600 text-white';
  return 'bg-emerald-600 text-white';
};

export function CourseCard({ course, onEdit, onDelete, onViewDetail, layout = 'grid' }) {
  const {
    title,
    category,
    description,
    instructor,
    rating,
    reviewCount,
    price,
    originalPrice,
    thumbnail,
    level,
    duration,
    totalLessons,
  } = course;

  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  // Render Horizontal List Layout Mode
  if (layout === 'list') {
    return (
      <article className="group bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row overflow-hidden">
        {/* Left Thumbnail */}
        <div className="relative md:w-72 lg:w-80 shrink-0 aspect-video md:aspect-auto overflow-hidden bg-gray-100">
          <img
            src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${getCategoryBadgeClass(category)}`}>
              {category || 'Umum'}
            </span>
            {level && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 backdrop-blur-xs text-white">
                {level}
              </span>
            )}
          </div>
        </div>

        {/* Right Details */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={instructor?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                  alt={instructor?.name || 'Instructor'}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/30"
                />
                <span className="text-xs font-semibold text-gray-800">
                  {instructor?.name || 'Instruktur Profesional'}
                </span>
                <span className="text-[10px] text-gray-400">• {instructor?.title || 'Tutor Ahli'}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onEdit(course)}
                  aria-label="Edit kelas"
                  title="Edit Kelas"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(course)}
                  aria-label="Hapus kelas"
                  title="Hapus Kelas"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3
              onClick={() => onViewDetail(course)}
              className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors cursor-pointer mb-2 leading-snug"
            >
              {title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
              {description}
            </p>
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-gray-900">{rating || '4.9'}</span>
                <span className="text-gray-400 font-normal">({reviewCount || 100}+)</span>
              </div>
              {duration && (
                <span className="flex items-center gap-1 text-gray-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {duration}
                </span>
              )}
              {totalLessons && (
                <span className="flex items-center gap-1 text-gray-500 text-[11px]">
                  <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                  {totalLessons} Materi
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                {originalPrice > price && (
                  <span className="text-[10px] text-gray-400 line-through">
                    {formatRupiah(originalPrice)}
                  </span>
                )}
                <span className="text-base font-extrabold text-emerald-600">
                  {formatRupiah(price)}
                </span>
              </div>
              <button
                onClick={() => onViewDetail(course)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                Detail
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Render Grid Layout Mode (Default)
  return (
    <article className="group bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1.5">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category & Discount Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${getCategoryBadgeClass(category)}`}>
            {category || 'Umum'}
          </span>
          {discountPercent && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-600 text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Level Tag */}
        {level && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 backdrop-blur-xs text-white">
              {level}
            </span>
          </div>
        )}

        {/* Floating Actions on Hover */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(course)}
            aria-label="Edit kelas"
            title="Edit Kelas (UPDATE)"
            className="p-2 rounded-xl bg-white/95 hover:bg-white text-gray-700 hover:text-emerald-600 shadow-md backdrop-blur-xs transition-all cursor-pointer hover:scale-105"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(course)}
            aria-label="Hapus kelas"
            title="Hapus Kelas (DELETE)"
            className="p-2 rounded-xl bg-white/95 hover:bg-rose-50 text-gray-700 hover:text-rose-600 shadow-md backdrop-blur-xs transition-all cursor-pointer hover:scale-105"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Instructor Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <img
              src={instructor?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
              alt={instructor?.name || 'Instructor'}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-bold text-gray-900 truncate">
                {instructor?.name || 'Instruktur Profesional'}
              </span>
              <span className="text-[10px] text-gray-400 truncate">
                {instructor?.title || 'Tutor Ahli'}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetail(course)}
            className="font-extrabold text-gray-900 text-base leading-snug line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer mb-2"
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Metadata & Pricing Footer */}
        <div className="pt-3 border-t border-gray-100">
          {/* Rating and Lessons Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1 font-bold text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-gray-900">{rating || '4.9'}</span>
              <span className="text-gray-400 font-normal">({reviewCount || 100}+)</span>
            </div>

            <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-medium">
              {duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  {duration}
                </span>
              )}
              {totalLessons && (
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-gray-400" />
                  {totalLessons} Video
                </span>
              )}
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              {originalPrice > price && (
                <span className="text-[10px] text-gray-400 line-through">
                  {formatRupiah(originalPrice)}
                </span>
              )}
              <span className="text-base font-black text-emerald-600">
                {formatRupiah(price)}
              </span>
            </div>

            <button
              onClick={() => onViewDetail(course)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              Detail
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
