import React from 'react';
import { useApp } from '../../context/AppContext';
import { channels } from '../../data/mockData';
import { VideoCard } from '../feed/VideoCard';
import { Tv, Sparkles } from 'lucide-react';

export const SubscriptionsView: React.FC = () => {
  const { videos, subscribedChannelIds } = useApp();

  const subscribedVideos = videos.filter((v) =>
    subscribedChannelIds.has(v.channel.id)
  );

  return (
    <div className="flex-1 bg-[#0a0d14] min-h-[calc(100vh-56px)] p-4 sm:p-6 max-w-[2100px] mx-auto">
      {/* Channels Ribbon */}
      <div className="mb-8 p-4 rounded-3xl bg-[#121624] border border-[#202b44]">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Tv className="w-5 h-5 text-[#00f0ff]" />
          <span>Subscribed Channels (｡♥‿♥｡)</span>
        </h2>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1">
          {Object.values(channels).map((ch) => {
            const isSub = subscribedChannelIds.has(ch.id);
            if (!isSub) return null;

            return (
              <div
                key={ch.id}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 group cursor-pointer w-20 text-center"
              >
                <div className="relative">
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    <img
                      src={ch.avatar}
                      alt={ch.name}
                      className="w-13 h-13 rounded-full object-cover border-2 border-[#0a0d14]"
                    />
                  </div>
                  {ch.id === 'ch-lofigirl' && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#ff0055] border-2 border-[#0a0d14] rounded-full shadow-[0_0_8px_#ff0055]" />
                  )}
                </div>
                <span className="text-xs text-[#9ba9c4] group-hover:text-white truncate w-full font-medium">
                  {ch.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Latest Feed from Subscriptions */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>Latest uploads</span>
          <Sparkles className="w-4 h-4 text-[#ff0055]" />
        </h3>
        {subscribedVideos.length === 0 ? (
          <div className="text-center py-16 text-[#9ba9c4]">
            <p>No new uploads from your subscribed channels.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subscribedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
