import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { VideoGrid } from './components/feed/VideoGrid';
import { WatchPage } from './components/watch/WatchPage';
import { SearchResultsView } from './components/views/SearchResultsView';
import { SubscriptionsView } from './components/views/SubscriptionsView';
import { LikedVideosView } from './components/views/LikedVideosView';
import { HistoryView } from './components/views/HistoryView';
import { LibraryView } from './components/views/LibraryView';
import { YourVideosView } from './components/views/YourVideosView';
import { UploadModal } from './components/modals/UploadModal';
import { VoiceSearchModal } from './components/modals/VoiceSearchModal';
import { Toast } from './components/common/Toast';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#f3f4f8] flex flex-col font-sans selection:bg-[#ff0055] selection:text-white">
      {/* Top Fixed Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1 min-w-0">
        {/* Sidebar: In watch view, only renders as overlay drawer when toggled, or standard on other pages */}
        {currentView !== 'watch' ? (
          <Sidebar />
        ) : (
          <Sidebar />
        )}

        {/* Dynamic Route View */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {currentView === 'home' && <VideoGrid />}
          {currentView === 'watch' && <WatchPage />}
          {currentView === 'search-results' && <SearchResultsView />}
          {currentView === 'subscriptions' && <SubscriptionsView />}
          {currentView === 'liked-videos' && <LikedVideosView />}
          {currentView === 'history' && <HistoryView />}
          {currentView === 'library' && <LibraryView />}
          {currentView === 'your-videos' && <YourVideosView />}
        </main>
      </div>

      {/* Interactive Modals & System Toasts */}
      <UploadModal />
      <VoiceSearchModal />
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
