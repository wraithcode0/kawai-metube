import React, { useState } from 'react';
import { 
  Heart, 
  ThumbsDown, 
  Pin, 
  Smile, 
  ArrowDownUp, 
  MoreVertical,
  CornerDownRight,
  Send,
  Sparkles
} from 'lucide-react';
import { Comment } from '../../types';
import { useApp } from '../../context/AppContext';

interface CommentsSectionProps {
  videoId: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ videoId }) => {
  const { user, comments, addComment, toggleCommentLike } = useApp();
  const [newCommentText, setNewCommentText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const currentComments: Comment[] = comments[videoId] || [];

  const sortedComments = [...currentComments].sort((a, b) => {
    if (a.isPinned) return -1;
    if (b.isPinned) return 1;
    if (sortBy === 'top') {
      return b.likes - a.likes;
    }
    return 0;
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      addComment(videoId, newCommentText);
      setNewCommentText('');
      setIsInputFocused(false);
    }
  };

  const handlePostReply = (commentId: string) => {
    if (!replyText.trim()) return;
    addComment(videoId, `@Reply to comment #${commentId.slice(0, 5)}: ${replyText}`);
    setReplyText('');
    setActiveReplyId(null);
  };

  return (
    <div className="mt-6 pt-5 border-t border-[#202b44] select-none" id="comments-section">
      {/* Header: Total Comments & Sort by */}
      <div className="flex items-center gap-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span>{sortedComments.length} Comments</span>
          <span className="text-xs text-[#00f0ff] font-normal">✨ (◕‿◕)</span>
        </h3>

        {/* Sort by Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(prev => !prev)}
            className="flex items-center gap-2 text-xs font-bold text-[#00f0ff] hover:text-[#ff0055] transition-colors"
          >
            <ArrowDownUp className="w-4 h-4" />
            <span>Sort by</span>
          </button>

          {showSortMenu && (
            <div className="absolute left-0 top-8 w-36 bg-[#161d30] border border-[#202b44] rounded-2xl shadow-2xl py-1 z-30 animate-fade-in text-xs">
              <button
                onClick={() => {
                  setSortBy('top');
                  setShowSortMenu(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-[#202b44] transition-colors ${
                  sortBy === 'top' ? 'text-[#00f0ff] font-bold bg-[#1e263d]' : 'text-[#9ba9c4]'
                }`}
              >
                Top comments
              </button>
              <button
                onClick={() => {
                  setSortBy('newest');
                  setShowSortMenu(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-[#202b44] transition-colors ${
                  sortBy === 'newest' ? 'text-[#00f0ff] font-bold bg-[#1e263d]' : 'text-[#9ba9c4]'
                }`}
              >
                Newest first
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post New Comment Box */}
      <div className="flex items-start gap-4 mb-8">
        <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] flex-shrink-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#0a0d14]"
          />
        </div>
        <form onSubmit={handleSubmitComment} className="flex-1">
          <textarea
            placeholder="Add a kawaii comment... (｡♥‿♥｡)"
            id="input-add-comment"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            rows={isInputFocused ? 3 : 1}
            className="w-full bg-[#121624] text-sm text-[#f3f4f8] rounded-2xl p-3 border border-[#202b44] focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.25)] focus:outline-none transition-all resize-none placeholder-[#65738e]"
          />

          {isInputFocused && (
            <div className="flex items-center justify-between mt-2.5 animate-fade-in">
              <div className="flex items-center gap-1">
                {['🌸', '✨', '(｡♥‿♥｡)', '💖', '🔥'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setNewCommentText(prev => prev + ' ' + emoji)}
                    className="px-2 py-1 rounded-lg bg-[#161d30] hover:bg-[#202b44] text-xs transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewCommentText('');
                    setIsInputFocused(false);
                  }}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#9ba9c4] hover:text-white hover:bg-[#161d30] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  id="btn-submit-comment"
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    newCommentText.trim()
                      ? 'bg-gradient-to-r from-[#ff0055] to-[#00f0ff] text-white shadow-[0_0_15px_rgba(255,0,85,0.4)] cursor-pointer'
                      : 'bg-[#161d30] text-[#65738e] cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  Comment ♡
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-5">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3.5 group p-2.5 rounded-2xl hover:bg-[#121624] transition-colors">
            <img
              src={comment.userAvatar}
              alt={comment.userName}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-[#00f0ff]/30"
            />
            <div className="flex-1 min-w-0">
              {/* Pinned Badge if applicable */}
              {comment.isPinned && (
                <div className="flex items-center gap-1.5 text-xs text-[#ff0055] font-bold mb-1">
                  <Pin className="w-3 h-3 text-[#ff0055]" />
                  <span>Pinned by creator ✨</span>
                </div>
              )}

              {/* Author & Timestamp */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white hover:text-[#00f0ff] transition-colors">
                  {comment.userName}
                </span>
                <span className="text-[11px] text-[#65738e] font-mono">
                  {comment.timestamp}
                </span>
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-[#f3f4f8] leading-relaxed break-words font-sans">
                {comment.text}
              </p>

              {/* Engagement Heart Thumbs & Reply */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => toggleCommentLike(comment.id, videoId)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors p-1 rounded-full ${
                    comment.isLiked ? 'text-[#ff0055]' : 'text-[#9ba9c4] hover:text-[#ff0055]'
                  }`}
                  title="Like"
                >
                  <Heart className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} />
                  <span>{comment.likes > 0 ? comment.likes : ''}</span>
                </button>

                <button
                  className="p-1 rounded-full text-[#9ba9c4] hover:text-white transition-colors"
                  title="Dislike"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                  className="text-xs font-semibold text-[#00f0ff] hover:underline px-2 py-0.5 rounded-full"
                >
                  Reply ♡
                </button>
              </div>

              {/* Nested Reply Input */}
              {activeReplyId === comment.id && (
                <div className="flex items-start gap-3 mt-3 ml-2 pl-3 border-l-2 border-[#00f0ff]/40 animate-fade-in">
                  <CornerDownRight className="w-4 h-4 text-[#00f0ff] mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Reply to ${comment.userName}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full bg-[#161d30] border border-[#202b44] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => {
                          setActiveReplyId(null);
                          setReplyText('');
                        }}
                        className="px-3 py-1 text-xs text-[#9ba9c4] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePostReply(comment.id)}
                        disabled={!replyText.trim()}
                        className="px-4 py-1 text-xs font-bold bg-gradient-to-r from-[#ff0055] to-[#00f0ff] text-white rounded-full hover:opacity-90 disabled:opacity-50"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-[#161d30] text-[#9ba9c4] hover:text-white transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
