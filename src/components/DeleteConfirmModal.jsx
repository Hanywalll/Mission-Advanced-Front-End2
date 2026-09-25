import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, course, isDeleting }) {
  if (!isOpen || !course) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Tutup konfirmasi"
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 ring-8 ring-rose-50/50">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h3 id="delete-dialog-title" className="text-lg font-bold text-gray-900 mb-2">
            Hapus Kelas Ini?
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Apakah Anda yakin ingin menghapus kelas <span className="font-semibold text-gray-800">"{course.title}"</span>? Aksi ini akan mengirim request <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-rose-600">DELETE</span> ke API dan data akan dihapus permanen.
          </p>

          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 rounded-xl shadow-md shadow-rose-200 transition-all cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menghapus...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Ya, Hapus Kelas</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
