import React from 'react';
import { 
  Home, 
  Flame, 
  Tv, 
  FolderLock, 
  History, 
  Video as VideoIcon, 
  Clock, 
  Heart, 
  Gamepad2, 
  Music, 
  Radio, 
  Compass, 
  Settings, 
  HelpCircle, 
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { AppView } from '../../context/AppContext';
import { channels } from '../../data/mockData';

export const Sidebar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    sidebarCollapsed, 
    setSidebarCollapsed,
    mobileSidebarOpen, 
    setMobileSidebarOpen,
    setSelectedCategory,
    subscribedChannelIds,
    likedVideoIds,
    historyVideoIds,
    watchLaterIds
  } = useApp();

  const handleNav = (view: AppView, category?: string) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileSidebarOpen(false);
    setSidebarCollapsed(false);
  };

  const navItemClass = (isActive: boolean) =>
    `flex items-center gap-5 px-3.5 py-2.5 rounded-2xl cursor-pointer text-sm font-semibold transition-all duration-200 ${
      isActive 
        ? 'bg-gradient-to-r from-[#ff0055]/25 to-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
        : 'hover:bg-[#161d30] text-[#9ba9c4] hover:text-white'
    }`;

  const renderSidebarContent = () => (
    <div className="w-60 h-[calc(100vh-56px)] overflow-y-auto px-3 py-3 space-y-4 select-none text-[#f3f4f8] text-sm font-sans">
      {/* Primary Section */}
      <div className="space-y-1">
        <button
          onClick={() => handleNav('home', 'All ✨')}
          className={`w-full ${navItemClass(currentView === 'home')}`}
        >
          <Home className="w-5 h-5 text-[#ff0055]" />
          <span>Home ✨</span>
        </button>

        <button
          onClick={() => handleNav('home', 'Live 🔴')}
          className="w-full flex items-center gap-5 px-3.5 py-2.5 rounded-2xl cursor-pointer text-sm hover:bg-[#161d30] text-[#9ba9c4] hover:text-[#00f0ff] transition-colors font-medium"
        >
          <Flame className="w-5 h-5 text-[#ff0055]" />
          <span>Shorts 🔥</span>
        </button>

        <button
          onClick={() => handleNav('subscriptions')}
          className={`w-full ${navItemClass(currentView === 'subscriptions')}`}
        >
          <Tv className="w-5 h-5 text-[#00f0ff]" />
          <span>Subscriptions 🌸</span>
        </button>
      </div>

      <div className="border-t border-[#202b44] my-2" />

      {/* Library / "You" Section */}
      <div className="space-y-1">
        <div className="px-3.5 py-1 flex items-center justify-between text-xs font-bold text-[#ff0055] uppercase tracking-wider">
          <span>You (｡♥‿♥｡)</span>
        </div>

        <button
          onClick={() => handleNav('library')}
          className={`w-full ${navItemClass(currentView === 'library')}`}
        >
          <FolderLock className="w-5 h-5 text-[#00f0ff]" />
          <span>Library</span>
        </button>

        <button
          onClick={() => handleNav('history')}
          className={`w-full ${navItemClass(currentView === 'history')}`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center gap-5">
              <History className="w-5 h-5 text-[#ff0055]" />
              <span>History</span>
            </span>
            <span className="text-xs text-[#00f0ff] font-mono px-1.5 py-0.5 rounded-md bg-[#00f0ff]/10">
              {historyVideoIds.length}
            </span>
          </div>
        </button>

        <button
          onClick={() => handleNav('your-videos')}
          className={`w-full ${navItemClass(currentView === 'your-videos')}`}
        >
          <VideoIcon className="w-5 h-5 text-[#00f0ff]" />
          <span>Your Videos</span>
        </button>

        <button
          onClick={() => handleNav('library')}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer text-sm hover:bg-[#161d30] text-[#9ba9c4] hover:text-white transition-colors"
        >
          <span className="flex items-center gap-5">
            <Clock className="w-5 h-5 text-[#ff0055]" />
            <span>Watch Later</span>
          </span>
          <span className="text-xs text-[#ff0055] font-mono px-1.5 py-0.5 rounded-md bg-[#ff0055]/10">
            {watchLaterIds.size}
          </span>
        </button>

        <button
          onClick={() => handleNav('liked-videos')}
          className={`w-full ${navItemClass(currentView === 'liked-videos')}`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center gap-5">
              <Heart className="w-5 h-5 fill-[#ff0055] text-[#ff0055]" />
              <span>Liked Videos</span>
            </span>
            <span className="text-xs text-[#ff0055] font-mono px-1.5 py-0.5 rounded-md bg-[#ff0055]/10">
              {likedVideoIds.size}
            </span>
          </div>
        </button>
      </div>

      <div className="border-t border-[#202b44] my-2" />

      {/* Subscriptions List */}
      <div className="space-y-1">
        <div className="px-3.5 py-1 text-xs font-bold text-[#00f0ff] uppercase tracking-wider flex items-center justify-between">
          <span>Subscriptions</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ff0055]" />
        </div>

        {Object.values(channels).map((ch) => {
          const isSubscribed = subscribedChannelIds.has(ch.id);
          if (!isSubscribed) return null;

          return (
            <button
              key={ch.id}
              onClick={() => handleNav('subscriptions')}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl hover:bg-[#161d30] cursor-pointer text-sm text-[#9ba9c4] hover:text-white transition-colors group"
            >
              <div className="flex items-center gap-3.5 truncate">
                <img
                  src={ch.avatar}
                  alt={ch.name}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0 ring-2 ring-transparent group-hover:ring-[#00f0ff] transition-all"
                />
                <span className="truncate group-hover:text-[#f3f4f8] text-xs font-medium">{ch.name}</span>
              </div>
              {ch.id === 'ch-lofigirl' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff0055] animate-live flex-shrink-0 shadow-[0_0_8px_#ff0055]" title="Live streaming" />
              )}
            </button>
          );
        })}
      </div>

      <div className="border-t border-[#202b44] my-2" />

      {/* Explore Section */}
      <div className="space-y-1">
        <div className="px-3.5 py-1 text-xs font-bold text-[#9ba9c4] uppercase tracking-wider">
          <span>Explore Kawaii ✨</span>
        </div>

        <button
          onClick={() => handleNav('home', 'Anime & Kawaii 🌸')}
          className="w-full flex items-center gap-5 px-3.5 py-2 rounded-2xl cursor-pointer text-sm hover:bg-[#161d30] text-[#9ba9c4] hover:text-[#ff0055] transition-colors"
        >
          <Sparkles className="w-5 h-5 text-[#ff0055]" />
          <span>Anime & Kawaii 🌸</span>
        </button>

        <button
          onClick={() => handleNav('home', 'Gaming 🎮')}
          className="w-full flex items-center gap-5 px-3.5 py-2 rounded-2xl cursor-pointer text-sm hover:bg-[#161d30] text-[#9ba9c4] hover:text-[#00f0ff] transition-colors"
        >
          <Gamepad2 className="w-5 h-5 text-[#00f0ff]" />
          <span>Gaming 🎮</span>
        </button>

        <button
          onClick={() => handleNav('home', 'Music 🎵')}
          className="w-full flex items-center gap-5 px-3.5 py-2 rounded-2xl cursor-pointer text-sm hover:bg-[#161d30] text-[#9ba9c4] hover:text-[#ff0055] transition-colors"
        >
          <Music className="w-5 h-5 text-[#ff0055]" />
          <span>Music 🎵</span>
        </button>

        <button
          onClick={() => handleNav('home', 'Lofi Cafe ☕')}
          className="w-full flex items-center gap-5 px-3.5 py-2 rounded-2xl cursor-pointer text-sm hover:bg-[#161d30] text-[#9ba9c4] hover:text-[#00f0ff] transition-colors"
        >
          <Radio className="w-5 h-5 text-[#00f0ff]" />
          <span>Lofi Beats ☕</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="pt-4 px-3 text-[11px] text-[#65738e] leading-relaxed select-none">
        <p className="text-[#ff0055] font-semibold mb-1">MeTube Red & Blue Kawaii</p>
        <p>© 2026 MeTube LLC (◕‿◕) ♡</p>
      </div>
    </div>
  );

  // If in watch view and not mobile drawer open, do not occupy screen width
  if (currentView === 'watch') {
    return (
      <>
        {(mobileSidebarOpen || sidebarCollapsed) && (
          <div className="fixed inset-0 z-50">
            <div 
              onClick={() => {
                setMobileSidebarOpen(false);
                setSidebarCollapsed(false);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            />
            <div className="fixed top-0 left-0 bottom-0 w-64 bg-[#0a0d14] border-r border-[#202b44] shadow-2xl z-50 flex flex-col">
              <div className="flex items-center justify-between h-14 px-4 border-b border-[#202b44]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-7 h-5 bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] rounded-lg">
                    <div className="w-0 h-0 border-y-[3px] border-y-transparent border-l-[6px] border-l-white ml-0.5" />
                  </div>
                  <span className="text-base font-bold text-white">MeTube ✨</span>
                </div>
                <button 
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    setSidebarCollapsed(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-[#161d30] text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {renderSidebarContent()}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Mini rail sidebar (desktop collapsed mode)
  if (sidebarCollapsed) {
    return (
      <aside className="hidden lg:flex flex-col items-center w-[74px] h-[calc(100vh-56px)] sticky top-14 bg-[#0a0d14] py-3 space-y-6 flex-shrink-0 z-40 select-none border-r border-[#202b44]">
        <button
          onClick={() => handleNav('home', 'All ✨')}
          className={`flex flex-col items-center justify-center w-16 py-2.5 rounded-2xl text-[10px] font-semibold transition-colors ${
            currentView === 'home' ? 'text-[#00f0ff] bg-[#161d30] border border-[#00f0ff]/30' : 'text-[#9ba9c4] hover:text-white'
          }`}
          title="Home"
        >
          <Home className="w-5 h-5 mb-1 text-[#ff0055]" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav('subscriptions')}
          className={`flex flex-col items-center justify-center w-16 py-2.5 rounded-2xl text-[10px] font-semibold transition-colors ${
            currentView === 'subscriptions' ? 'text-[#00f0ff] bg-[#161d30] border border-[#00f0ff]/30' : 'text-[#9ba9c4] hover:text-white'
          }`}
          title="Subscriptions"
        >
          <Tv className="w-5 h-5 mb-1 text-[#00f0ff]" />
          <span>Subs</span>
        </button>

        <button
          onClick={() => handleNav('library')}
          className={`flex flex-col items-center justify-center w-16 py-2.5 rounded-2xl text-[10px] font-semibold transition-colors ${
            currentView === 'library' ? 'text-[#00f0ff] bg-[#161d30] border border-[#00f0ff]/30' : 'text-[#9ba9c4] hover:text-white'
          }`}
          title="You"
        >
          <FolderLock className="w-5 h-5 mb-1 text-[#ff0055]" />
          <span>You</span>
        </button>

        <button
          onClick={() => handleNav('liked-videos')}
          className={`flex flex-col items-center justify-center w-16 py-2.5 rounded-2xl text-[10px] font-semibold transition-colors ${
            currentView === 'liked-videos' ? 'text-[#00f0ff] bg-[#161d30] border border-[#00f0ff]/30' : 'text-[#9ba9c4] hover:text-white'
          }`}
          title="Liked"
        >
          <Heart className="w-5 h-5 mb-1 fill-[#ff0055] text-[#ff0055]" />
          <span>Liked</span>
        </button>
      </aside>
    );
  }

  return (
    <>
      <aside className="hidden lg:block w-60 h-[calc(100vh-56px)] sticky top-14 bg-[#0a0d14] flex-shrink-0 z-40 border-r border-[#202b44]">
        {renderSidebarContent()}
      </aside>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-[#0a0d14] border-r border-[#202b44] shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between h-14 px-4 border-b border-[#202b44]">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-5 bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] rounded-lg">
                  <div className="w-0 h-0 border-y-[3px] border-y-transparent border-l-[6px] border-l-white ml-0.5" />
                </div>
                <span className="text-base font-bold text-white">MeTube ✨</span>
              </div>
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#161d30] text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {renderSidebarContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
