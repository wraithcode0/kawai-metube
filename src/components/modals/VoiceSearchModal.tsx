import React, { useEffect, useState } from 'react';
import { X, Mic, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VoiceSearchModal: React.FC = () => {
  const { isVoiceSearchModalOpen, setIsVoiceSearchModalOpen, setSearchQuery, setCurrentView } = useApp();
  const [status, setStatus] = useState('Listening... (｡♥‿♥｡)');

  useEffect(() => {
    if (isVoiceSearchModalOpen) {
      setStatus('Listening... (｡♥‿♥｡)');
      const timer = setTimeout(() => {
        setStatus('Say something like "React 19" or "Lofi Girl" ✨');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVoiceSearchModalOpen]);

  if (!isVoiceSearchModalOpen) return null;

  const handleSimulateVoice = (phrase: string) => {
    setStatus(`Heard: "${phrase}" ✨`);
    setTimeout(() => {
      setSearchQuery(phrase);
      setCurrentView('search-results');
      setIsVoiceSearchModalOpen(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={() => setIsVoiceSearchModalOpen(false)} 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      <div className="relative w-full max-w-sm bg-[#121624] border border-[#00f0ff]/40 rounded-3xl shadow-[0_0_35px_rgba(0,240,255,0.3)] p-6 z-10 animate-fade-in text-white text-center flex flex-col items-center">
        <button
          onClick={() => setIsVoiceSearchModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#161d30] text-[#9ba9c4] hover:text-[#ff0055]"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold mb-6 flex items-center gap-1.5">
          <span>{status}</span>
        </h3>

        {/* Pulsing Kawaii Red & Blue Mic Ring */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute w-28 h-28 rounded-full bg-[#ff0055]/20 animate-ping" />
          <div className="absolute w-20 h-20 rounded-full bg-[#00f0ff]/30 animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff0055] via-[#ff2a85] to-[#00f0ff] flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,0,85,0.6)]">
            <Mic className="w-8 h-8" />
          </div>
        </div>

        <p className="text-xs text-[#9ba9c4] mb-4">
          Click any kawaii prompt below to search:
        </p>

        {/* Quick Sample Prompts */}
        <div className="flex flex-wrap justify-center gap-2">
          {['Lofi Girl 🌸', 'Cyberpunk Red & Blue 💙', 'React 19', 'MKBHD Studio ✨'].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSimulateVoice(prompt)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#161d30] hover:bg-gradient-to-r hover:from-[#ff0055] hover:to-[#00f0ff] hover:text-white text-[#9ba9c4] border border-[#202b44] transition-all"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
