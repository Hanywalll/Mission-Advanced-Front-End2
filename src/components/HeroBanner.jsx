import React from 'react';
import { Sparkles, PlayCircle, Award, Users, CheckCircle } from 'lucide-react';

export function HeroBanner({ onExploreClick }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-950 text-white shadow-xl my-6">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative px-6 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Column Text Content */}
        <div className="max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Platform Pembelajaran Interaktif No. #1
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Revolusi Pembelajaran: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Temukan Ilmu Baru
            </span>{' '}
            melalui Video Interaktif!
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video interaktif dari para
            ahli terkemuka di bidang Bisnis, Teknologi, Desain, dan Pemasaran.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-gray-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 text-gray-950" />
              <span>Jelajahi Semua Kelas</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Sertifikat Resmi & Akses Selamanya
            </div>
          </div>
        </div>

        {/* Right Stats Card Widget */}
        <div className="w-full md:w-auto shrink-0 grid grid-cols-2 gap-3 sm:gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white">50.000+</span>
            <span className="text-xs text-gray-400">Student Aktif</span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white">100+</span>
            <span className="text-xs text-gray-400">Instruktur Expert</span>
          </div>

          <div className="col-span-2 p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-semibold text-emerald-300">REST API Connected</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-200/80">CRUD Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
