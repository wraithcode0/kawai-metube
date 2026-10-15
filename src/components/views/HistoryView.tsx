import React from 'react';
import { useApp } from '../../context/AppContext';
import { History, Trash2, CheckCircle2, Sparkles } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { videos, historyVideoIds, navigateToWatch, showToast } = useApp();

  const historyVideos = historyVideoIds
    .map(id => videos.find(v => v.id === id))
    .filter(Boolean);

  return (
    <div className="flex-1 bg-[#0a0d14] min-h-[calc(100vh-56px)] p-4 sm:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#202b44]">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-[#ff0055]" />
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Watch History</span>
            <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          </h2>
        </div>

        <button
          onClick={() => showToast('Watch history cleared ✨')}
          className="text-xs text-[#9ba9c4] hover:text-[#ff0055] flex items-center gap-1.5 transition-colors font-semibold"
        >
          <Trash2 className="w-4 h-4" />
          Clear all history
        </button>
      </div>

      {historyVideos.length === 0 ? (
        <div className="text-center py-20 text-[#9ba9c4]">
          <p className="text-base text-white font-medium mb-1">Your watch history is clean (◕‿◕)</p>
          <p className="text-xs">Videos that you watch will appear here automatically.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {historyVideos.map((video) => {
            if (!video) return null;
            return (
              <div
                key={video.id}
                onClick={() => navigateToWatch(video)}
                className="flex flex-col sm:flex-row gap-4 p-3 rounded-2xl hover:bg-[#121624] border border-transparent hover:border-[#202b44] group cursor-pointer transition-all"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-60 aspect-video rounded-xl overflow-hidden bg-[#161d30] border border-[#202b44] flex-shrink-0 group-hover:border-[#00f0ff]/50">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/85 text-[#00f0ff] text-[11px] font-mono font-bold">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white group-hover:text-[#00f0ff] line-clamp-2 mb-1.5 leading-snug transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#9ba9c4] mb-2">
                    <span className="font-semibold">{video.channel.name}</span>
                    {video.channel.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" />}
                    <span>•</span>
                    <span className="font-mono">{video.views}</span>
                  </div>
                  <p className="text-xs text-[#65738e] line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
