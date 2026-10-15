import React from 'react';
import { VideoCard } from './VideoCard';
import { CategoryPills } from './CategoryPills';
import { useApp } from '../../context/AppContext';
import { Film } from 'lucide-react';

export const VideoGrid: React.FC = () => {
  const { videos, selectedCategory, setSelectedCategory } = useApp();

  const filteredVideos = videos.filter((vid) => {
    if (selectedCategory === 'All ✨' || selectedCategory === 'All') return true;
    if (selectedCategory.includes('Live')) return vid.isLive || vid.category.includes('Live');
    const cleanCat = selectedCategory.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const cleanVidCat = vid.category.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return (
      cleanVidCat.includes(cleanCat) ||
      cleanCat.includes(cleanVidCat) ||
      vid.tags.some((tag) => tag.toLowerCase().includes(cleanCat))
    );
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0a0d14]">
      {/* Category Pills Bar */}
      <CategoryPills />

      {/* Main Grid View */}
      <div className="p-4 md:p-6 max-w-[2100px] mx-auto w-full">
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-[#121624] border border-[#202b44] flex items-center justify-center text-[#ff0055] mb-4 shadow-[0_0_15px_rgba(255,0,85,0.3)]">
              <Film className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No kawaii videos found (｡•́︿•̀｡)</h3>
            <p className="text-xs text-[#9ba9c4] max-w-sm mb-4">
              There are no videos matching the "{selectedCategory}" category right now.
            </p>
            <button
              onClick={() => setSelectedCategory('All ✨')}
              className="px-5 py-2 bg-gradient-to-r from-[#ff0055] to-[#00f0ff] hover:opacity-90 text-white rounded-full text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,0,85,0.4)]"
            >
              Show all kawaii videos ✨
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-7">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
