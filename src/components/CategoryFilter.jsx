import React from 'react';
import {
  Search,
  SlidersHorizontal,
  Layers,
  LayoutGrid,
  List,
  X,
  Sparkles,
  Code2,
  Briefcase,
  Palette,
  Megaphone,
  UserCheck,
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Semua Kelas', icon: Sparkles },
  { name: 'Pemasaran', icon: Megaphone },
  { name: 'Desain', icon: Palette },
  { name: 'Pengembangan Diri', icon: UserCheck },
  { name: 'Bisnis', icon: Briefcase },
  { name: 'Teknologi', icon: Code2 },
];

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  totalResults = 0,
}) {
  return (
    <div id="katalog" className="my-8 space-y-5">
      {/* Title Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-gray-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Koleksi Pembelajaran Unggulan
            </h2>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {totalResults} Kelas Tersedia
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Dikelola terpusat dengan Redux Toolkit & terintegrasi API CRUD secara realtime.
          </p>
        </div>

        {/* Search, Sort, and Grid/List Mode Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari kelas, tutor, topik..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full pl-8.5 pr-8 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs appearance-none cursor-pointer transition-all text-gray-700 font-medium"
            >
              <option value="newest">Terbaru</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
            </select>
          </div>

          {/* View Mode Toggle: Grid vs List */}
          {onViewModeChange && (
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                title="Tampilan Grid Kartu"
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-emerald-700 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('list')}
                title="Tampilan Baris ListView"
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-emerald-700 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List View</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Kategori Pill with Category Icons */}
      <div id="kategori" className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map(({ name, icon: IconComponent }) => {
          const isActive = selectedCategory.toLowerCase() === name.toLowerCase();
          return (
            <button
              key={name}
              onClick={() => onSelectCategory(name)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 scale-[1.02]'
                  : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200/80 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span>{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
