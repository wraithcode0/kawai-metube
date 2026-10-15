import React, { createContext, useContext, useState } from 'react';
import { Video, Comment, NotificationItem, UserProfile } from '../types';
import { initialVideos, initialComments, mockNotifications, currentUser } from '../data/mockData';

export type AppView = 
  | 'home'
  | 'watch'
  | 'subscriptions'
  | 'library'
  | 'history'
  | 'your-videos'
  | 'liked-videos'
  | 'search-results';

interface AppContextType {
  user: UserProfile;
  videos: Video[];
  currentVideo: Video | null;
  currentView: AppView;
  selectedCategory: string;
  searchQuery: string;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  comments: Record<string, Comment[]>;
  notifications: NotificationItem[];
  likedVideoIds: Set<string>;
  dislikedVideoIds: Set<string>;
  historyVideoIds: string[];
  watchLaterIds: Set<string>;
  subscribedChannelIds: Set<string>;
  isUploadModalOpen: boolean;
  isVoiceSearchModalOpen: boolean;
  toastMessage: string | null;
  theaterMode: boolean;
  
  // Actions
  setCurrentView: (view: AppView) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  setMobileSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setIsUploadModalOpen: (open: boolean) => void;
  setIsVoiceSearchModalOpen: (open: boolean) => void;
  setTheaterMode: (theater: boolean | ((prev: boolean) => boolean)) => void;
  
  // Video navigation & actions
  navigateToWatch: (video: Video) => void;
  navigateToHome: () => void;
  toggleLikeVideo: (videoId: string) => void;
  toggleDislikeVideo: (videoId: string) => void;
  toggleWatchLater: (videoId: string) => void;
  toggleSubscribeChannel: (channelId: string) => void;
  addComment: (videoId: string, text: string) => void;
  toggleCommentLike: (commentId: string, videoId: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  uploadVideo: (newVideo: Omit<Video, 'id' | 'views' | 'viewsCount' | 'timestamp' | 'likes' | 'dislikes' | 'commentsCount' | 'channel'>) => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<UserProfile>(currentUser);
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All ✨');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [theaterMode, setTheaterMode] = useState<boolean>(false);

  // User engagement state
  const [likedVideoIds, setLikedVideoIds] = useState<Set<string>>(new Set(['vid-2', 'vid-5', 'vid-8', 'vid-12']));
  const [dislikedVideoIds, setDislikedVideoIds] = useState<Set<string>>(new Set());
  const [historyVideoIds, setHistoryVideoIds] = useState<string[]>(['vid-1', 'vid-2', 'vid-3', 'vid-7']);
  const [watchLaterIds, setWatchLaterIds] = useState<Set<string>>(new Set(['vid-6', 'vid-9']));
  const [subscribedChannelIds, setSubscribedChannelIds] = useState<Set<string>>(
    new Set(['ch-fireship', 'ch-lofigirl', 'ch-veritasium', 'ch-theo', 'ch-kurzgesagt'])
  );

  // Modals & Feedback
  const [comments, setComments] = useState<Record<string, Comment[]>>(initialComments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isVoiceSearchModalOpen, setIsVoiceSearchModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const clearToast = () => setToastMessage(null);

  const navigateToWatch = (video: Video) => {
    setCurrentVideo(video);
    setCurrentView('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add to history if not duplicate head
    setHistoryVideoIds((prev) => {
      const filtered = prev.filter((id) => id !== video.id);
      return [video.id, ...filtered];
    });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedCategory('All ✨');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLikeVideo = (videoId: string) => {
    setLikedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
        showToast('Removed from Liked videos');
      } else {
        next.add(videoId);
        // remove dislike if present
        setDislikedVideoIds((d) => {
          const dNext = new Set(d);
          dNext.delete(videoId);
          return dNext;
        });
        showToast('Added to Liked videos');
      }
      return next;
    });

    // Update video likes count optimistically
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === videoId) {
          const isCurrentlyLiked = likedVideoIds.has(videoId);
          return {
            ...v,
            likes: isCurrentlyLiked ? Math.max(0, v.likes - 1) : v.likes + 1,
            isLiked: !isCurrentlyLiked,
          };
        }
        return v;
      })
    );
  };

  const toggleDislikeVideo = (videoId: string) => {
    setDislikedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
        // remove like if present
        setLikedVideoIds((l) => {
          const lNext = new Set(l);
          lNext.delete(videoId);
          return lNext;
        });
        showToast('Feedback recorded');
      }
      return next;
    });
  };

  const toggleWatchLater = (videoId: string) => {
    setWatchLaterIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
        showToast('Removed from Watch Later');
      } else {
        next.add(videoId);
        showToast('Saved to Watch Later');
      }
      return next;
    });
  };

  const toggleSubscribeChannel = (channelId: string) => {
    setSubscribedChannelIds((prev) => {
      const next = new Set(prev);
      if (next.has(channelId)) {
        next.delete(channelId);
        showToast('Subscription removed');
      } else {
        next.add(channelId);
        showToast('Subscribed to channel!');
      }
      return next;
    });
  };

  const addComment = (videoId: string, text: string) => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: `c-user-${Date.now()}`,
      videoId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text: text.trim(),
      timestamp: 'Just now',
      likes: 0,
      dislikes: 0,
      isLiked: false,
    };

    setComments((prev) => {
      const existing = prev[videoId] || [];
      return {
        ...prev,
        [videoId]: [newComment, ...existing],
      };
    });

    // Update video comment count
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId ? { ...v, commentsCount: v.commentsCount + 1 } : v
      )
    );

    showToast('Comment posted successfully');
  };

  const toggleCommentLike = (commentId: string, videoId: string) => {
    setComments((prev) => {
      const list = prev[videoId] || [];
      return {
        ...prev,
        [videoId]: list.map((c) => {
          if (c.id === commentId) {
            const nextLiked = !c.isLiked;
            return {
              ...c,
              isLiked: nextLiked,
              likes: nextLiked ? c.likes + 1 : Math.max(0, c.likes - 1),
            };
          }
          return c;
        }),
      };
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const uploadVideo = (
    newVidData: Omit<
      Video,
      'id' | 'views' | 'viewsCount' | 'timestamp' | 'likes' | 'dislikes' | 'commentsCount' | 'channel'
    >
  ) => {
    const newVideo: Video = {
      ...newVidData,
      id: `vid-custom-${Date.now()}`,
      views: '1 view',
      viewsCount: 1,
      timestamp: 'Just now',
      likes: 1,
      dislikes: 0,
      commentsCount: 0,
      channel: {
        id: 'ch-user-alex',
        name: user.name,
        handle: user.handle,
        avatar: user.avatar,
        verified: true,
        subscribers: '1.2K',
        subscribersCount: 1200,
        description: 'Creator channel for Alex Rivera on MeTube.',
      },
    };

    setVideos((prev) => [newVideo, ...prev]);
    setIsUploadModalOpen(false);
    showToast('🎉 Video published successfully to MeTube!');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        videos,
        currentVideo,
        currentView,
        selectedCategory,
        searchQuery,
        sidebarCollapsed,
        mobileSidebarOpen,
        comments,
        notifications,
        likedVideoIds,
        dislikedVideoIds,
        historyVideoIds,
        watchLaterIds,
        subscribedChannelIds,
        isUploadModalOpen,
        isVoiceSearchModalOpen,
        toastMessage,
        theaterMode,
        setCurrentView,
        setSelectedCategory,
        setSearchQuery,
        setSidebarCollapsed,
        setMobileSidebarOpen,
        setIsUploadModalOpen,
        setIsVoiceSearchModalOpen,
        setTheaterMode,
        navigateToWatch,
        navigateToHome,
        toggleLikeVideo,
        toggleDislikeVideo,
        toggleWatchLater,
        toggleSubscribeChannel,
        addComment,
        toggleCommentLike,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        uploadVideo,
        showToast,
        clearToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
