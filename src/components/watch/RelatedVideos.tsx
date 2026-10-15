import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, MoreVertical, Radio, Sparkles } from 'lucide-react';

interface RelatedVideosProps {
  currentVideoId: string;
}

export const RelatedVideos: React.FC<RelatedVideosProps> = ({ currentVideoId }) => {
  const { videos, navigateToWatch } = useApp();
  const [filter, setFilter] = useState<'All ✨' | 'Channel 🌸' | 'Related 💙'>('All ✨');

  const currentVideo = videos.find(v => v.id === currentVideoId);

  const relatedList = videos.filter((v) => {
    if (v.id === currentVideoId) return false;
    if (filter === 'Channel 🌸' && currentVideo) {
      return v.channel.id === currentVideo.channel.id;
    }
    if (filter === 'Related 💙' && currentVideo) {
      return v.category === currentVideo.category;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-3 select-none" id="related-videos-sidebar">
      {/* Quick Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['All ✨', 'Related 💙', 'Channel 🌸'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              filter === tab
                ? 'bg-gradient-to-r from-[#ff0055] to-[#00f0ff] text-white shadow-[0_0_12px_rgba(255,0,85,0.4)]'
                : 'bg-[#161d30] text-[#9ba9c4] hover:text-white border border-[#202b44]'
            }`}
          >
            {tab === 'Channel 🌸' && currentVideo ? `From ${currentVideo.channel.name.slice(0, 10)}...` : tab}
          </button>
        ))}
      </div>

      {/* Vertical list of compact horizontal video cards */}
      <div className="space-y-2.5">
        {relatedList.map((video) => (
          <div
            key={video.id}
            onClick={() => navigateToWatch(video)}
            className="flex gap-2.5 p-1.5 rounded-2xl hover:bg-[#121624] border border-transparent hover:border-[#202b44] group cursor-pointer transition-all duration-200"
          >
            {/* Thumbnail */}
            <div className="relative w-40 sm:w-44 aspect-video rounded-xl overflow-hidden bg-[#161d30] border border-[#202b44] flex-shrink-0 group-hover:border-[#00f0ff]/50">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {video.isLive ? (
                <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff0055] to-[#ff2a85] text-white text-[9px] font-bold shadow-md">
                  <Radio className="w-2.5 h-2.5 animate-live" />
                  LIVE ✨
                </div>
              ) : (
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/85 text-[#00f0ff] text-[10px] font-mono font-bold">
                  {video.duration}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-1">
              <h4 
                className="text-xs sm:text-[13px] font-bold text-[#f3f4f8] group-hover:text-[#00f0ff] line-clamp-2 leading-snug tracking-tight mb-1 transition-colors"
                title={video.title}
              >
                {video.title}
              </h4>
              <div className="flex items-center gap-1 text-[11px] text-[#9ba9c4]">
                <span className="truncate">{video.channel.name}</span>
                {video.channel.verified && (
                  <CheckCircle2 className="w-3 h-3 text-[#00f0ff] flex-shrink-0" />
                )}
              </div>
              <div className="text-[10px] text-[#65738e] mt-0.5 font-mono">
                <span>{video.views}</span>
                <span className="mx-1">•</span>
                <span>{video.timestamp}</span>
              </div>
            </div>

            <button
              onClick={(e) => e.stopPropagation()}
              className="opacity-0 group-hover:opacity-100 p-1 text-[#9ba9c4] hover:text-[#00f0ff] transition-opacity self-start"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
