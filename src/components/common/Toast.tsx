import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#121624] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-[0_0_25px_rgba(255,0,85,0.35)] border border-[#ff0055]/40 animate-fade-in max-w-md backdrop-blur-md">
      <Sparkles className="w-4 h-4 text-[#00f0ff] animate-kawaii-float flex-shrink-0" />
      <span className="flex-1">{toastMessage}</span>
      <button
        onClick={clearToast}
        className="p-1 hover:bg-[#1e263d] rounded-full text-[#9ba9c4] hover:text-[#ff0055] transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
