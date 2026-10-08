import React from 'react';
import { Sparkles, PlayCircle, Award, Users, CheckCircle, Database, Layers, ArrowUpRight } from 'lucide-react';

export function HeroBanner({ onExploreClick, totalCourses = 0 }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-radial from-slate-900 via-gray-950 to-emerald-950 text-white shadow-2xl border border-white/10 my-6">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-16 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid subtle pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

      <div className="relative px-6 py-12 md:px-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Column Text Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mission 2 • Redux Toolkit & REST API</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-5">
            Revolusi Belajar Digital:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              Interactive Video Platform
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            Tingkatkan keahlian profesional Anda bersama para mentor terbaik industri. Dilengkapi sistem manajemen materi berbasis <strong className="text-white font-semibold">Redux Global State</strong> dan <strong className="text-white font-semibold">REST API Realtime</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:from-emerald-500 active:to-teal-500 text-gray-950 font-bold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 text-gray-950 fill-gray-950/20" />
              <span>Jelajahi Katalog Kelas</span>
              <ArrowUpRight className="w-4 h-4 text-gray-950" />
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-300 font-medium bg-white/5 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sertifikat Resmi & Akses Selamanya</span>
            </div>
          </div>
        </div>

        {/* Right Stats & Highlights Card */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-3 bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Live State Hub
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Synchronized
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1.5">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <span className="text-2xl font-black text-white">{totalCourses || '8+'}</span>
              <span className="text-[11px] text-gray-400 font-medium">Kelas di Redux</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-1.5">
                <Users className="w-4.5 h-4.5" />
              </div>
              <span className="text-2xl font-black text-white">50k+</span>
              <span className="text-[11px] text-gray-400 font-medium">Siswa Aktif</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 border border-emerald-400/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white">State Management</span>
                <span className="text-[10px] text-emerald-300">@reduxjs/toolkit • useSelector</span>
              </div>
            </div>
            <span className="px-2 py-1 rounded-lg bg-emerald-500/30 text-emerald-200 text-[10px] font-mono font-bold">
              Step 3 & 4
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
