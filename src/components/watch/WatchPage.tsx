import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VideoPlayer } from './VideoPlayer';
import { VideoDetails } from './VideoDetails';
import { CommentsSection } from './CommentsSection';
import { RelatedVideos } from './RelatedVideos';
import { ShareModal } from '../modals/ShareModal';

export const WatchPage: React.FC = () => {
  const { currentVideo, videos, theaterMode } = useApp();
  const [seekTime, setSeekTime] = useState<number | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fallback to first video if none is set
  const activeVideo = currentVideo || videos[0];

  const handleSeek = (seconds: number) => {
    setSeekTime(seconds);
  };

  if (!activeVideo) return null;

  return (
    <div className="flex-1 bg-[#0a0d14] min-h-[calc(100vh-56px)] text-[#f3f4f8]">
      {/* Theater Mode: Full-width player banner */}
      {theaterMode && (
        <div className="w-full bg-black mb-6">
          <div className="max-w-[1920px] mx-auto">
            <VideoPlayer
              video={activeVideo}
              seekTime={seekTime}
              onSeekComplete={() => setSeekTime(null)}
            />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1800px] mx-auto px-3 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Column */}
          <div className="flex-1 min-w-0">
            {/* Standard Mode Video Player */}
            {!theaterMode && (
              <div className="w-full mb-3">
                <VideoPlayer
                  video={activeVideo}
                  seekTime={seekTime}
                  onSeekComplete={() => setSeekTime(null)}
                />
              </div>
            )}

            {/* Video Details (Title, Channel, Like/Dislike, Subscribe, Description, Chapters) */}
            <VideoDetails
              video={activeVideo}
              onSeek={handleSeek}
              onOpenShare={() => setIsShareModalOpen(true)}
            />

            {/* Comments Section */}
            <CommentsSection videoId={activeVideo.id} />
          </div>

          {/* Up Next / Related Videos Sidebar */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
            <RelatedVideos currentVideoId={activeVideo.id} />
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        videoTitle={activeVideo.title}
        videoId={activeVideo.id}
      />
    </div>
  );
};
