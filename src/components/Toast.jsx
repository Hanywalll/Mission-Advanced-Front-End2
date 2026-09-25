import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <aside
      aria-label="Notifikasi status"
      className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short shadow-2xl rounded-2xl p-4 transition-all"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${
          isSuccess
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : isError
            ? 'bg-rose-50 border-rose-300 text-rose-900'
            : 'bg-blue-50 border-blue-300 text-blue-900'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-600 shrink-0" />}

        <p className="flex-1 pr-2">{toast.message}</p>

        <button
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="p-1 rounded-lg hover:bg-black/5 text-gray-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

export default Toast;
