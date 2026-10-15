import React from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, Heart, MessageSquare, Plus, Sparkles, Upload } from 'lucide-react';

export const YourVideosView: React.FC = () => {
  const { user, videos, setIsUploadModalOpen, navigateToWatch } = useApp();

  const myVideos = videos.filter(
    (v) => v.channel.handle === user.handle || v.channel.name === user.name
  );

  return (
    <div className="flex-1 bg-[#0a0d14] min-h-[calc(100vh-56px)] p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Channel Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-gradient-to-r from-[#181124] via-[#121624] to-[#111e2e] border border-[#202b44] shadow-[0_0_25px_rgba(255,0,85,0.15)] mb-8">
        <div className="flex items-center gap-5">
          <div className="p-1 rounded-full bg-gradient-to-tr from-[#ff0055] via-[#ff2a85] to-[#00f0ff] shadow-lg">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#0a0d14]"
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <span>{user.name}</span>
              <Sparkles className="w-5 h-5 text-[#00f0ff]" />
            </h1>
            <p className="text-xs text-[#00f0ff] font-mono mt-0.5">{user.handle} • 1.2K subscribers • {myVideos.length} uploads</p>
            <p className="text-xs text-[#9ba9c4] mt-2">Official Creator Channel on MeTube Studio (｡♥‿♥｡)</p>
          </div>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff0055] via-[#ff2a85] to-[#00f0ff] hover:scale-105 text-white font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,0,85,0.4)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          UPLOAD KAWAII VIDEO ✨
        </button>
      </div>

      {/* Videos List / Table */}
      <div className="bg-[#121624] border border-[#202b44] rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-[#202b44] flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Channel Content</span>
            <span className="text-xs text-[#00f0ff] font-mono">({myVideos.length})</span>
          </h2>
          <span className="text-xs text-[#ff0055] font-semibold">Live Creator Metrics</span>
        </div>

        {myVideos.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Upload className="w-12 h-12 text-[#ff0055] mx-auto mb-3 opacity-60 animate-kawaii-float" />
            <h3 className="text-base font-bold text-white mb-1">No videos uploaded yet (◕‿◕)</h3>
            <p className="text-xs text-[#9ba9c4] max-w-sm mx-auto mb-4">
              Share your creations with the MeTube community by publishing your first video.
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff0055] to-[#00f0ff] text-white text-xs font-bold"
            >
              Upload video ✨
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#202b44]">
            {myVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => navigateToWatch(vid)}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 hover:bg-[#161d30] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-32 aspect-video rounded-xl overflow-hidden bg-[#161d30] border border-[#202b44] flex-shrink-0">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 bg-black/85 text-[10px] text-[#00f0ff] font-mono rounded font-bold">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate mb-1">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-[#65738e] line-clamp-1">{vid.description}</p>
                    <span className="text-[11px] text-[#00f0ff] font-semibold">{vid.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-[#9ba9c4] font-mono self-end sm:self-center">
                  <span className="flex items-center gap-1.5" title="Views">
                    <Eye className="w-4 h-4 text-[#00f0ff]" /> {vid.views}
                  </span>
                  <span className="flex items-center gap-1.5" title="Likes">
                    <Heart className="w-4 h-4 text-[#ff0055] fill-[#ff0055]" /> {vid.likes}
                  </span>
                  <span className="flex items-center gap-1.5" title="Comments">
                    <MessageSquare className="w-4 h-4 text-[#ff2a85]" /> {vid.commentsCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
