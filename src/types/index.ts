export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner?: string;
  verified: boolean;
  subscribers: string;
  subscribersCount: number;
  description?: string;
  isSubscribed?: boolean;
}

export interface Chapter {
  title: string;
  timestamp: string;
  seconds: number;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  isPinned?: boolean;
  isCreator?: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  durationSeconds: number;
  views: string;
  viewsCount: number;
  timestamp: string;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  category: string;
  tags: string[];
  channel: Channel;
  commentsCount: number;
  chapters?: Chapter[];
  isLive?: boolean;
  youtubeId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  email: string;
}

export interface NotificationItem {
  id: string;
  channelName: string;
  channelAvatar: string;
  text: string;
  timestamp: string;
  thumbnail: string;
  isRead: boolean;
  videoId: string;
}
