import React, { useState } from 'react';
import { X, Upload, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/mockData';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, uploadVideo } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Anime & Kawaii 🌸');
  const [duration, setDuration] = useState('12:30');
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80');

  if (!isUploadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    uploadVideo({
      title: title.trim(),
      description: description.trim() || 'Uploaded with love to MeTube Kawaii Studio. (｡♥‿♥｡)',
      category,
      duration: duration.trim() || '08:45',
      durationSeconds: 525,
      videoUrl: videoUrl.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      tags: [category, 'Kawaii', 'MeTube', 'Creator'],
    });

    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setIsUploadModalOpen(false)} 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#121624] border border-[#ff0055]/30 rounded-3xl shadow-[0_0_40px_rgba(255,0,85,0.25)] z-10 animate-fade-in text-white overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#202b44]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] flex items-center justify-center">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-1.5">
              <span>Upload to MeTube Studio</span>
              <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            </h2>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#161d30] text-[#9ba9c4] hover:text-[#ff0055]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#00f0ff] uppercase tracking-wider mb-1.5">
              Video Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. ✨ Ultimate Lofi Coding Speedrun in React 19"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0a0d14] border border-[#202b44] rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#ff0055] uppercase tracking-wider mb-1.5">
              Description (｡♥‿♥｡)
            </label>
            <textarea
              rows={3}
              placeholder="Tell your viewers all the kawaii details and chapters..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0a0d14] border border-[#202b44] rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff0055] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#9ba9c4] uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0a0d14] border border-[#202b44] rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              >
                {categories.filter(c => !c.includes('All')).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#9ba9c4] uppercase tracking-wider mb-1.5">
                Duration
              </label>
              <input
                type="text"
                placeholder="12:30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#0a0d14] border border-[#202b44] rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#00f0ff] uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Thumbnail URL</span>
              <span className="text-[10px] text-[#ff0055] font-mono">Kawaii Presets Available</span>
            </label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full bg-[#0a0d14] border border-[#202b44] rounded-2xl px-4 py-2 text-xs text-[#9ba9c4] focus:outline-none focus:border-[#00f0ff] mb-2"
            />
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { name: '🌸 Anime Lofi', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80' },
                { name: '💙 Cyber Neon', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80' },
                { name: '✨ AI Synth', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80' },
                { name: '🎮 Gaming', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80' },
              ].map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setThumbnailUrl(p.url)}
                  className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-colors whitespace-nowrap ${
                    thumbnailUrl === p.url ? 'bg-gradient-to-r from-[#ff0055] to-[#00f0ff] border-transparent text-white' : 'bg-[#161d30] border-[#202b44] text-[#9ba9c4] hover:text-white'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#202b44]">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#161d30] text-[#9ba9c4] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              id="btn-confirm-upload"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#ff0055] via-[#ff2a85] to-[#00f0ff] hover:scale-105 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,0,85,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              Publish Video ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
