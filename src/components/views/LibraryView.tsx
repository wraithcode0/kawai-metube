import React from 'react';
import { useApp } from '../../context/AppContext';
import { VideoCard } from '../feed/VideoCard';
import { History, Heart, Clock, Sparkles } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const { videos, historyVideoIds, likedVideoIds, watchLaterIds, setCurrentView } = useApp();

  const historyVideos = historyVideoIds
    .map(id => videos.find(v => v.id === id))
    .filter(Boolean)
    .slice(0, 4);

  const likedVideos = videos
    .filter(v => likedVideoIds.has(v.id))
    .slice(0, 4);

  const watchLaterVideos = videos
    .filter(v => watchLaterIds.has(v.id))
    .slice(0, 4);

  return (
    <div className="flex-1 bg-[#0a0d14] min-h-[calc(100vh-56px)] p-4 sm:p-8 max-w-[2000px] mx-auto space-y-10">
      {/* History Shelf */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-[#ff0055]" />
            <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
              <span>History</span>
              <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('history')}
            className="text-xs font-bold text-[#00f0ff] hover:underline"
          >
            See all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {historyVideos.map((v) => (
            <VideoCard key={v!.id} video={v!} />
          ))}
        </div>
      </div>

      {/* Watch Later Shelf */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#00f0ff]" />
            <h2 className="text-lg font-bold text-white">Watch Later</h2>
          </div>
          <span className="text-xs text-[#00f0ff] font-mono font-bold bg-[#00f0ff]/10 px-2 py-0.5 rounded-full">
            {watchLaterIds.size} videos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {watchLaterVideos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>

      {/* Liked Videos Shelf */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 fill-[#ff0055] text-[#ff0055]" />
            <h2 className="text-lg font-bold text-white">Liked Videos ♡</h2>
          </div>
          <button
            onClick={() => setCurrentView('liked-videos')}
            className="text-xs font-bold text-[#ff0055] hover:underline"
          >
            See all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {likedVideos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
};
