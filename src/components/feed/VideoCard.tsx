import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, MoreVertical, Clock, Heart, Share2, Radio, Sparkles } from 'lucide-react';
import { Video } from '../../types';
import { useApp } from '../../context/AppContext';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { navigateToWatch, toggleWatchLater, toggleLikeVideo, watchLaterIds, likedVideoIds, showToast } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isSavedWatchLater = watchLaterIds.has(video.id);
  const isLiked = likedVideoIds.has(video.id);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `?v=${video.id}`);
    showToast('✨ Kawaii video link copied to clipboard!');
    setShowMenu(false);
  };

  return (
    <div 
      onClick={() => navigateToWatch(video)}
      className="flex flex-col gap-3 group cursor-pointer select-none p-2 rounded-3xl hover:bg-[#121624] border border-transparent hover:border-[#202b44] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300"
      id={`video-card-${video.id}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#161d30] shadow-md border border-[#202b44] group-hover:border-[#00f0ff]/50 transition-all duration-300">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Live Badge or Duration Badge */}
        {video.isLive ? (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff0055] to-[#ff2a85] text-white text-[10px] font-bold tracking-wider uppercase shadow-[0_0_10px_#ff0055]">
            <Radio className="w-3 h-3 animate-live" />
            LIVE ✨
          </div>
        ) : (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/85 border border-[#202b44] text-[#00f0ff] text-xs font-bold font-mono tracking-tight">
            {video.duration}
          </div>
        )}

        {/* Quick action overlay on hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchLater(video.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
              isSavedWatchLater ? 'bg-[#ff0055] text-white' : 'bg-black/75 hover:bg-black text-[#00f0ff]'
            }`}
            title={isSavedWatchLater ? 'Remove from Watch Later' : 'Watch Later'}
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Metadata Row */}
      <div className="flex gap-3 px-1 items-start">
        {/* Channel Avatar with Dual Ring */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            navigateToWatch(video);
          }}
          className="flex-shrink-0 cursor-pointer"
        >
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#ff0055] to-[#00f0ff]">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-[#0a0d14]"
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="flex-1 min-w-0 pr-1">
          {/* Title */}
          <h3 
            className="text-[14px] font-bold text-[#f3f4f8] group-hover:text-[#00f0ff] line-clamp-2 leading-snug tracking-tight mb-1 transition-colors"
            title={video.title}
          >
            {video.title}
          </h3>

          {/* Channel Name */}
          <div className="flex items-center gap-1 text-[12px] text-[#9ba9c4] group-hover:text-white transition-colors">
            <span className="truncate font-semibold">{video.channel.name}</span>
            {video.channel.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff] flex-shrink-0 fill-[#00f0ff]/20" />
            )}
          </div>

          {/* Views & Timestamp */}
          <div className="text-[11px] text-[#65738e] flex items-center gap-1 font-mono mt-0.5">
            <span className="text-[#9ba9c4]">{video.views}</span>
            <span>•</span>
            <span>{video.timestamp}</span>
          </div>
        </div>

        {/* Three dots menu */}
        <div ref={menuRef} className="relative flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(prev => !prev);
            }}
            className="p-1.5 rounded-full text-transparent group-hover:text-[#9ba9c4] hover:text-white hover:bg-[#161d30] transition-all"
            title="Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-7 w-48 bg-[#161d30] border border-[#202b44] rounded-2xl shadow-2xl py-1.5 z-30 animate-fade-in text-xs text-[#f3f4f8]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchLater(video.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-[#202b44] flex items-center gap-3 transition-colors"
              >
                <Clock className="w-4 h-4 text-[#00f0ff]" />
                <span>{isSavedWatchLater ? 'Remove from Watch later' : 'Save to Watch later'}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikeVideo(video.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-[#202b44] flex items-center gap-3 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#ff0055] text-[#ff0055]' : 'text-[#9ba9c4]'}`} />
                <span>{isLiked ? 'Unlike (｡♥‿♥｡)' : 'Like kawaii video'}</span>
              </button>
              <button
                onClick={handleShare}
                className="w-full text-left px-3.5 py-2 hover:bg-[#202b44] flex items-center gap-3 transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#ff0055]" />
                <span>Share ✨</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
