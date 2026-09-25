import React from 'react';
import { Video, PlusCircle, BookOpen, User, Sparkles } from 'lucide-react';

export function Navbar({ onOpenAddModal, totalCourses }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo Brand */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">
                  video<span className="text-emerald-600">belajar</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 mt-1">
                  E-Learning Platform
                </span>
              </div>
            </a>

            {/* Navigasi Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a
                href="#katalog"
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                Koleksi Video ({totalCourses})
              </a>
              <a
                href="#kategori"
                className="hover:text-gray-900 transition-colors"
              >
                Kategori
              </a>
              <a
                href="#tentang"
                className="hover:text-gray-900 transition-colors"
              >
                Tentang Kami
              </a>
            </nav>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Kelas</span>
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-gray-800">Admin Rise</span>
                <span className="text-[10px] text-gray-400">Instructor Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
