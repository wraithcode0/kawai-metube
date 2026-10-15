import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Send, Mail, Code, Share2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle?: string;
  videoId?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, videoTitle, videoId }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/watch?v=${videoId || 'vid-1'}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    showToast('✨ Kawaii link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { name: 'WhatsApp', color: 'bg-[#25D366]', icon: MessageSquare },
    { name: 'Telegram', color: 'bg-[#229ED9]', icon: Send },
    { name: 'Kawaii Social', color: 'bg-gradient-to-tr from-[#ff0055] to-[#00f0ff]', icon: Share2 },
    { name: 'Email', color: 'bg-[#EA4335]', icon: Mail },
    { name: 'Embed Code', color: 'bg-[#202b44]', icon: Code },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      <div className="relative w-full max-w-md bg-[#121624] border border-[#ff0055]/30 rounded-3xl shadow-[0_0_35px_rgba(255,0,85,0.25)] p-6 z-10 animate-fade-in text-white">
        <div className="flex items-center justify-between pb-3 border-b border-[#202b44]">
          <h3 className="text-base font-bold flex items-center gap-1.5">
            <span>Share Kawaii Video</span>
            <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#161d30] text-[#9ba9c4] hover:text-[#ff0055] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {videoTitle && (
          <p className="text-xs text-[#9ba9c4] my-3 line-clamp-1 italic font-medium">
            "{videoTitle}"
          </p>
        )}

        <div className="flex items-center justify-between gap-2 py-4 overflow-x-auto no-scrollbar">
          {shareOptions.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  handleCopy();
                  onClose();
                }}
                className="flex flex-col items-center gap-1.5 flex-1 min-w-[60px] group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl ${opt.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] text-[#9ba9c4] group-hover:text-white truncate font-bold">
                  {opt.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mt-4 p-2 bg-[#0a0d14] border border-[#202b44] rounded-2xl">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent text-xs text-[#00f0ff] focus:outline-none px-2 select-all font-mono font-medium"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 bg-gradient-to-r from-[#ff0055] to-[#00f0ff] text-white font-bold text-xs rounded-xl transition-all shadow-[0_0_10px_#ff0055] flex items-center gap-1.5 flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied ♡' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};
