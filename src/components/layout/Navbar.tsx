import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Mic, 
  Video as VideoIcon, 
  Bell, 
  X, 
  Upload, 
  Radio, 
  Check, 
  Settings, 
  User as UserIcon, 
  LogOut, 
  Sparkles, 
  Heart,
  HelpCircle,
  PlaySquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { searchSuggestions } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const { 
    user, 
    searchQuery, 
    setSearchQuery, 
    setCurrentView, 
    navigateToHome,
    setSidebarCollapsed,
    setMobileSidebarOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsUploadModalOpen,
    setIsVoiceSearchModalOpen,
    videos,
    navigateToWatch
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (createRef.current && !createRef.current.contains(event.target as Node)) {
        setShowCreateMenu(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setCurrentView('search-results');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearch(suggestion);
    setSearchQuery(suggestion);
    setCurrentView('search-results');
    setShowSuggestions(false);
  };

  const filteredSuggestions = searchSuggestions.filter(s => 
    s.toLowerCase().includes(localSearch.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-3 md:px-5 bg-[#0a0d14]/95 backdrop-blur-md border-b border-[#202b44] shadow-md">
      {/* Left: Hamburger & Kawaii Red-Blue Logo */}
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={() => {
            if (window.innerWidth < 1024) {
              setMobileSidebarOpen(prev => !prev);
            } else {
              setSidebarCollapsed(prev => !prev);
            }
          }}
          className="p-2 rounded-full hover:bg-[#1a233a] text-white hover:text-[#00f0ff] transition-colors focus:outline-none"
          title="Toggle Navigation"
          id="btn-toggle-sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button 
          onClick={navigateToHome}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          id="btn-metube-logo"
        >
          {/* Kawaii Dual Gradient Icon */}
          <div className="relative flex items-center justify-center w-8 h-6 bg-gradient-to-tr from-[#ff0055] via-[#ff2a85] to-[#00f0ff] rounded-xl group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,0,85,0.5)]">
            <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[8px] border-l-white ml-0.5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans flex items-center">
            Me<span className="text-gradient-red-blue font-extrabold">Tube</span>
            <span className="text-xs text-[#00f0ff] font-medium ml-1.5 animate-kawaii-float">✨</span>
            <span className="text-[10px] text-[#ff0055] font-bold ml-1 px-1.5 py-0.2 rounded-full bg-[#ff0055]/15 border border-[#ff0055]/30 hidden sm:inline">
              KAWAII
            </span>
          </span>
        </button>
      </div>

      {/* Center: Red & Blue Search Bar */}
      <div className="flex-1 max-w-2xl mx-2 md:mx-6 flex items-center justify-center">
        <div ref={searchRef} className="relative flex items-center w-full max-w-[620px]">
          <form 
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full group"
          >
            <div className="flex items-center flex-1 bg-[#121624] border border-[#202b44] rounded-l-full px-4 py-1.5 focus-within:border-[#00f0ff] focus-within:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all">
              <Search className="w-4 h-4 text-[#9ba9c4] mr-3 hidden sm:block group-focus-within:text-[#00f0ff]" />
              <input
                type="text"
                placeholder="Search Kawaii MeTube (｡♥‿♥｡)"
                id="input-metube-search"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent text-[#f3f4f8] text-[14px] placeholder-[#65738e] focus:outline-none font-medium"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="p-1 hover:text-[#ff0055] text-[#9ba9c4] rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              id="btn-search-submit"
              className="px-6 py-2 bg-gradient-to-r from-[#181f33] to-[#202b44] hover:from-[#ff0055] hover:to-[#00f0ff] hover:text-white border border-l-0 border-[#202b44] rounded-r-full text-[#9ba9c4] transition-all duration-300 flex items-center justify-center group/btn shadow-inner"
              title="Search"
            >
              <Search className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </button>
          </form>

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={() => setIsVoiceSearchModalOpen(true)}
            id="btn-voice-search"
            className="ml-2.5 p-2.5 rounded-full bg-[#161d30] hover:bg-[#ff0055] text-[#00f0ff] hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-[0_0_15px_rgba(255,0,85,0.5)]"
            title="Voice Search (Kawaii Mic)"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (localSearch || filteredSuggestions.length > 0) && (
            <div className="absolute top-12 left-0 right-12 bg-[#161d30] border border-[#202b44] rounded-2xl shadow-2xl py-2 z-50 overflow-hidden animate-fade-in backdrop-blur-md">
              {filteredSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left px-4 py-2 hover:bg-[#202b44] flex items-center gap-3 text-sm text-[#f3f4f8] transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center gap-2">
        {/* Create / Upload Dropdown */}
        <div ref={createRef} className="relative">
          <button
            onClick={() => setShowCreateMenu(prev => !prev)}
            id="btn-create-menu"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ff0055] to-[#ff2a85] hover:from-[#ff2a85] hover:to-[#00f0ff] text-white text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(255,0,85,0.4)] cursor-pointer"
            title="Create"
          >
            <VideoIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline tracking-wide">+ Create ✨</span>
          </button>

          {showCreateMenu && (
            <div className="absolute right-0 top-11 w-52 bg-[#161d30] border border-[#202b44] rounded-2xl shadow-2xl py-1.5 z-50 animate-fade-in">
              <button
                onClick={() => {
                  setShowCreateMenu(false);
                  setIsUploadModalOpen(true);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-[#202b44] flex items-center gap-3 text-sm text-[#f3f4f8] transition-colors"
              >
                <Upload className="w-4 h-4 text-[#ff0055]" />
                <span>Upload kawaii video</span>
              </button>
              <button
                onClick={() => {
                  setShowCreateMenu(false);
                  alert('🔴 Kawaii Live Stream Studio initialized! Camera & microphone feed ready.');
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-[#202b44] flex items-center gap-3 text-sm text-[#f3f4f8] transition-colors"
              >
                <Radio className="w-4 h-4 text-[#00f0ff]" />
                <span>Go live stream</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            id="btn-notifications"
            className="relative p-2 rounded-full hover:bg-[#1a233a] text-white hover:text-[#00f0ff] transition-colors focus:outline-none"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-[#ff0055] to-[#ff2a85] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_#ff0055]">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 sm:w-96 bg-[#161d30] border border-[#202b44] rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#202b44]">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                  Notifications (｡♥‿♥｡)
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-[#00f0ff] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto divide-y divide-[#1f283d]">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationAsRead(notif.id);
                      const targetVid = videos.find(v => v.id === notif.videoId);
                      if (targetVid) {
                        navigateToWatch(targetVid);
                        setShowNotifications(false);
                      }
                    }}
                    className={`flex items-start gap-3 p-3.5 cursor-pointer hover:bg-[#1f283d] transition-colors ${
                      !notif.isRead ? 'bg-[#121624]' : ''
                    }`}
                  >
                    <img
                      src={notif.channelAvatar}
                      alt={notif.channelName}
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-[#00f0ff]/40"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#f3f4f8] leading-relaxed line-clamp-2">
                        <strong className="text-[#00f0ff] font-semibold">{notif.channelName}</strong>{' '}
                        {notif.text}
                      </p>
                      <span className="text-[11px] text-[#9ba9c4] mt-1 block font-mono">
                        {notif.timestamp}
                      </span>
                    </div>
                    <img
                      src={notif.thumbnail}
                      alt="thumbnail"
                      className="w-14 h-9 rounded-lg object-cover flex-shrink-0 border border-[#202b44]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Kawaii Red & Blue Gradient Ring */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => setShowUserMenu(prev => !prev)}
            id="btn-user-profile"
            className="flex items-center p-0.5 rounded-full bg-gradient-to-tr from-[#ff0055] via-[#ff2a85] to-[#00f0ff] hover:scale-105 transition-transform shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            title={user.name}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-[#0a0d14]"
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-11 w-64 bg-[#161d30] border border-[#202b44] rounded-2xl shadow-2xl py-2 z-50 animate-fade-in divide-y divide-[#202b44]">
              <div className="px-4 py-3 flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ff0055]"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user.name}</p>
                  <p className="text-xs text-[#00f0ff] truncate font-mono">{user.handle}</p>
                  <p className="text-[11px] text-[#ff0055] font-semibold mt-0.5">
                    Kawaii Red & Blue Edition ✨
                  </p>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentView('your-videos');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#202b44] flex items-center gap-3 text-xs text-[#f3f4f8]"
                >
                  <UserIcon className="w-4 h-4 text-[#00f0ff]" />
                  <span>Your Kawaii channel</span>
                </button>
                <button
                  onClick={() => {
                    setIsUploadModalOpen(true);
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#202b44] flex items-center gap-3 text-xs text-[#f3f4f8]"
                >
                  <PlaySquare className="w-4 h-4 text-[#ff0055]" />
                  <span>MeTube Studio</span>
                </button>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    alert('Theme: Kawaii Red & Blue Mode active! ✨');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#202b44] flex items-center gap-3 text-xs text-[#f3f4f8]"
                >
                  <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                  <span>Theme: Red & Blue Kawaii</span>
                </button>
                <button
                  onClick={() => {
                    alert('MeTube Help: Keyboard shortcuts active. Space: Play/Pause, T: Theater Mode.');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#202b44] flex items-center gap-3 text-xs text-[#f3f4f8]"
                >
                  <HelpCircle className="w-4 h-4 text-[#9ba9c4]" />
                  <span>Help & Shortcuts</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
