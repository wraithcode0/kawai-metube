import React, { useState } from 'react';
import { 
  Heart, 
  ThumbsDown, 
  Share2, 
  Download, 
  Bookmark, 
  CheckCircle2, 
  Bell, 
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { Video } from '../../types';
import { useApp } from '../../context/AppContext';

interface VideoDetailsProps {
  video: Video;
  onSeek: (seconds: number) => void;
  onOpenShare: () => void;
}

export const VideoDetails: React.FC<VideoDetailsProps> = ({ video, onSeek, onOpenShare }) => {
  const { 
    likedVideoIds, 
    dislikedVideoIds, 
    toggleLikeVideo, 
    toggleDislikeVideo, 
    watchLaterIds, 
    toggleWatchLater, 
    subscribedChannelIds, 
    toggleSubscribeChannel,
    showToast 
  } = useApp();

  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  const isLiked = likedVideoIds.has(video.id);
  const isDisliked = dislikedVideoIds.has(video.id);
  const isSavedWatchLater = watchLaterIds.has(video.id);
  const isSubscribed = subscribedChannelIds.has(video.channel.id);

  const formatLikes = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleDownload = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(15);
    showToast('✨ Preparing Kawaii 1080p stream cache...');
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress(null);
            showToast('🌸 Download complete: saved to offline player!');
          }, 500);
          return 100;
        }
        return prev + 35;
      });
    }, 350);
  };

  return (
    <div className="flex flex-col gap-3.5 py-3 select-none">
      {/* Video Title */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
        {video.title}
      </h1>

      {/* Channel row & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-1">
        {/* Left: Channel Info & Kawaii Subscribe */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] shadow-md">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#0a0d14]"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-white text-sm sm:text-base">
              <span>{video.channel.name}</span>
              {video.channel.verified && (
                <CheckCircle2 className="w-4 h-4 text-[#00f0ff] fill-[#00f0ff]/20" />
              )}
            </div>
            <p className="text-xs text-[#9ba9c4] font-mono">{video.channel.subscribers} subscribers</p>
          </div>

          {/* Cute Subscribe Button */}
          <button
            onClick={() => toggleSubscribeChannel(video.channel.id)}
            id="btn-subscribe"
            className={`ml-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              isSubscribed
                ? 'bg-[#161d30] border border-[#00f0ff]/50 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                : 'bg-gradient-to-r from-[#ff0055] via-[#ff2a85] to-[#00f0ff] text-white hover:scale-105 shadow-[0_0_20px_rgba(255,0,85,0.5)]'
            }`}
          >
            {isSubscribed ? (
              <>
                <Bell className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>SUBSCRIBED (｡♥‿♥｡)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>SUBSCRIBE ♡</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Kawaii Actions Row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Heart Like / Dislike segmented pill */}
          <div className="flex items-center bg-[#161d30] border border-[#202b44] rounded-full overflow-hidden shadow-sm">
            <button
              onClick={() => toggleLikeVideo(video.id)}
              id="btn-like-video"
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-r border-[#202b44] ${
                isLiked 
                  ? 'text-[#ff0055] bg-[#ff0055]/15 shadow-inner' 
                  : 'text-[#f3f4f8] hover:text-[#ff0055] hover:bg-[#1e263d]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#ff0055]' : ''}`} />
              <span>{formatLikes(video.likes)}</span>
            </button>
            <button
              onClick={() => toggleDislikeVideo(video.id)}
              id="btn-dislike-video"
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                isDisliked ? 'text-[#ff0055] bg-[#ff0055]/15' : 'text-[#9ba9c4] hover:text-white hover:bg-[#1e263d]'
              }`}
              title="Dislike"
            >
              <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-[#ff0055]' : ''}`} />
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            id="btn-share-video"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#161d30] hover:bg-[#202b44] border border-[#202b44] hover:border-[#00f0ff]/50 text-white text-xs font-semibold transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="hidden sm:inline">Share ✨</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            id="btn-download-video"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#161d30] hover:bg-[#202b44] border border-[#202b44] hover:border-[#ff0055]/50 text-white text-xs font-semibold transition-all relative overflow-hidden"
          >
            {downloadProgress !== null ? (
              <>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[#ff0055]/30 to-[#00f0ff]/30 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
                <span className="text-xs font-mono text-[#00f0ff] z-10">{downloadProgress}%</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#ff0055]" />
                <span className="hidden sm:inline">Download</span>
              </>
            )}
          </button>

          {/* Save / Watch Later Button */}
          <button
            onClick={() => toggleWatchLater(video.id)}
            id="btn-save-video"
            className={`p-2 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              isSavedWatchLater 
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff2a85] text-white border-transparent shadow-[0_0_12px_#ff0055]' 
                : 'bg-[#161d30] hover:bg-[#202b44] text-[#9ba9c4] hover:text-white border-[#202b44]'
            }`}
            title="Save to Watch Later"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isSavedWatchLater ? 'Saved (◕‿◕)' : 'Save'}</span>
          </button>

          {/* More options button */}
          <button
            onClick={() => showToast('Additional options: Kawaii Clip, Transcript, Report')}
            className="p-2 rounded-full bg-[#161d30] hover:bg-[#202b44] text-[#9ba9c4] hover:text-white transition-colors border border-[#202b44]"
            title="More"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description Box with Red-Blue Accents */}
      <div 
        onClick={() => !isDescExpanded && setIsDescExpanded(true)}
        className={`mt-2 bg-[#121624] hover:bg-[#161d30] p-4 sm:p-5 rounded-3xl text-sm transition-colors border border-[#202b44] cursor-pointer ${
          isDescExpanded ? 'cursor-default' : ''
        }`}
      >
        {/* Views and Timestamp header */}
        <div className="flex items-center gap-2.5 font-bold text-white mb-2 text-xs sm:text-sm">
          <span className="text-[#00f0ff]">{video.views}</span>
          <span className="text-[#9ba9c4]">{video.timestamp}</span>
          {video.tags.map((t, idx) => (
            <span key={idx} className="text-[#ff0055] hidden sm:inline">
              #{t}
            </span>
          ))}
        </div>

        {/* Text body */}
        <div className={`text-[#f3f4f8] whitespace-pre-line leading-relaxed font-sans ${!isDescExpanded ? 'line-clamp-3' : ''}`}>
          {video.description}
        </div>

        {/* Chapters list if present */}
        {video.chapters && video.chapters.length > 0 && isDescExpanded && (
          <div className="mt-4 pt-3 border-t border-[#202b44]">
            <h4 className="font-bold text-[#00f0ff] mb-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff0055]" />
              Video Chapters (Click to Jump)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {video.chapters.map((chap, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSeek(chap.seconds);
                    showToast(`✨ Jumped to chapter: ${chap.title}`);
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-[#161d30] hover:bg-[#1e263d] border border-[#202b44] hover:border-[#00f0ff]/50 text-left transition-colors group"
                >
                  <span className="px-2 py-0.5 rounded-md bg-[#0a0d14] font-mono text-xs text-[#00f0ff] group-hover:text-white font-bold border border-[#202b44]">
                    {chap.timestamp}
                  </span>
                  <span className="text-xs text-[#f3f4f8] truncate font-medium">{chap.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Show more / Show less toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDescExpanded(!isDescExpanded);
          }}
          className="mt-3 text-xs font-bold text-[#00f0ff] hover:text-[#ff0055] flex items-center gap-1 transition-colors"
        >
          {isDescExpanded ? (
            <>
              Show less <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              ...more kawaii info <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
