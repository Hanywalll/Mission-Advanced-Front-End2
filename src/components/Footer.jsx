import React from 'react';
import { Video, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer id="tentang" className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Video className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                video<span className="text-emerald-600">belajar</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Platform edukasi interaktif berbasis video yang menghubungkan para pembelajar dengan
              mentor ahli di berbagai bidang profesional.
            </p>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Kategori Populer
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#kategori" className="hover:text-emerald-600 transition-colors">Bisnis & Finansial</a></li>
              <li><a href="#kategori" className="hover:text-emerald-600 transition-colors">Teknologi & Web Dev</a></li>
              <li><a href="#kategori" className="hover:text-emerald-600 transition-colors">UI/UX & Desain Grafis</a></li>
              <li><a href="#kategori" className="hover:text-emerald-600 transition-colors">Pemasaran Digital</a></li>
            </ul>
          </div>

          {/* Integrasi API Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Arsitektur Aplikasi
            </h4>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 space-y-1.5 font-mono">
              <div>• ReactJS v19</div>
              <div>• Axios REST Client</div>
              <div>• Custom Hooks CRUD</div>
              <div>• Interceptors & .env</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 VideoBelajar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat untuk Penilaian Mission Advance Frontend
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
