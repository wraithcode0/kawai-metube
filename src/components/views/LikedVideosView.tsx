import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Play, Trash2, CheckCircle2, Sparkles } from 'lucide-react';

export const LikedVideosView: React.FC = () => {
  const { videos, likedVideoIds, navigateToWatch, toggleLikeVideo } = useApp();

  const likedList = videos.filter((v) => likedVideoIds.has(v.id));

  return (
    <div className="flex-1 bg-[#0a0d14] min-h-[calc(100vh-56px)] p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Kawaii Hero Card */}
        <div className="w-full lg:w-96 rounded-3xl p-6 bg-gradient-to-b from-[#2e0e1e] via-[#161d30] to-[#0e1220] border border-[#ff0055]/30 shadow-[0_0_30px_rgba(255,0,85,0.25)] flex-shrink-0">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-5 shadow-lg bg-black/40 border border-[#202b44]">
            {likedList[0] ? (
              <img
                src={likedList[0].thumbnailUrl}
                alt="Liked Videos Artwork"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-[#161d30]">
                <Heart className="w-12 h-12 text-[#ff0055] fill-current" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
              <Heart className="w-14 h-14 text-white fill-[#ff0055] drop-shadow-[0_0_15px_#ff0055]" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
            <span>Liked Videos</span>
            <Sparkles className="w-5 h-5 text-[#00f0ff]" />
          </h2>
          <p className="text-sm font-semibold text-[#00f0ff] mb-1">Alex Rivera ♡</p>
          <p className="text-xs text-[#9ba9c4] mb-6 font-mono">{likedList.length} kawaii videos • Updated today</p>

          {likedList[0] && (
            <button
              onClick={() => navigateToWatch(likedList[0])}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff0055] via-[#ff2a85] to-[#00f0ff] text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,85,0.5)] hover:scale-105 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Play all (｡♥‿♥｡)
            </button>
          )}
        </div>

        {/* Right List of Videos */}
        <div className="flex-1 w-full space-y-2">
          {likedList.length === 0 ? (
            <div className="py-20 text-center text-[#9ba9c4]">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#ff0055]" />
              <p className="text-base font-bold text-white mb-1">No liked videos yet</p>
              <p className="text-xs">Heart videos you enjoy and they will show up here! ✨</p>
            </div>
          ) : (
            likedList.map((video, index) => (
              <div
                key={video.id}
                onClick={() => navigateToWatch(video)}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#121624] border border-transparent hover:border-[#202b44] group cursor-pointer transition-all"
              >
                {/* Index number */}
                <span className="w-6 text-center text-xs font-mono font-bold text-[#65738e] group-hover:text-[#00f0ff]">
                  #{index + 1}
                </span>

                {/* Thumbnail */}
                <div className="relative w-36 sm:w-44 aspect-video rounded-xl overflow-hidden bg-[#161d30] border border-[#202b44] flex-shrink-0 group-hover:border-[#00f0ff]/50">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/85 text-[10px] text-[#00f0ff] font-mono font-bold">
                    {video.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00f0ff] line-clamp-1 mb-1 transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#9ba9c4]">
                    <span>{video.channel.name}</span>
                    {video.channel.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" />}
                  </div>
                  <div className="text-[11px] text-[#65738e] mt-0.5 font-mono">
                    {video.views} • {video.timestamp}
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLikeVideo(video.id);
                  }}
                  className="p-2 rounded-full hover:bg-[#161d30] text-[#65738e] hover:text-[#ff0055] transition-colors"
                  title="Remove from Liked"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
