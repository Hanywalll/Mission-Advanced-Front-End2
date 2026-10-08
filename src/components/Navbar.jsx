import React from 'react';
import { Video, PlusCircle, BookOpen, Layers, Cpu, Sparkles } from 'lucide-react';

export function Navbar({ onOpenAddModal, totalCourses = 0 }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center gap-6 sm:gap-10">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                <Video className="w-6 h-6 drop-shadow-xs" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-none">
                    video<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">belajar</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <Sparkles className="w-2.5 h-2.5" />
                    v2.0 Redux
                  </span>
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-gray-400 mt-1">
                  Interactive Learning Hub
                </span>
              </div>
            </a>

            {/* Navigasi Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a
                href="#katalog"
                className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200/60"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Koleksi Kelas</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold">
                  {totalCourses}
                </span>
              </a>
              <a
                href="#katalog"
                className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-gray-400" />
                Kategori
              </a>
            </nav>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Redux Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100/80 border border-gray-200 text-xs text-gray-600 font-medium">
              <Cpu className="w-3.5 h-3.5 text-teal-600" />
              <span>Redux Toolkit</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {/* Tambah Kelas Button */}
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Kelas</span>
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-gray-200">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User Avatar"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover ring-2 ring-emerald-500/30"
                />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900 leading-none">Admin Rise</span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1">Lead Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
