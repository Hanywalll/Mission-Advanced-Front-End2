import React from 'react';
import { Search, SlidersHorizontal, Layers } from 'lucide-react';

const CATEGORIES = [
  'Semua Kelas',
  'Pemasaran',
  'Desain',
  'Pengembangan Diri',
  'Bisnis',
  'Teknologi',
];

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div id="katalog" className="my-8 space-y-5">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-600" />
            Koleksi Video Pembelajaran Unggulan
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Jelajahi berbagai pilihan kelas terbaik yang dirancang oleh praktisi profesional.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari kelas atau instruktur..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs appearance-none cursor-pointer transition-all text-gray-700"
            >
              <option value="newest">Terbaru</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs Kategori */}
      <div id="kategori" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200 font-semibold'
                  : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200/80 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
