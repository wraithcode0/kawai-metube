import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, SlidersHorizontal, Search, Sparkles } from 'lucide-react';

export const SearchResultsView: React.FC = () => {
  const { searchQuery, videos, navigateToWatch } = useApp();

  const query = searchQuery.toLowerCase().trim();
  const searchResults = videos.filter((v) => {
    if (!query) return true;
    return (
      v.title.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query) ||
      v.channel.name.toLowerCase().includes(query) ||
      v.category.toLowerCase().includes(query) ||
      v.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex-1 bg-[#0a0d14] min-h-[calc(100vh-56px)] p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Search Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#202b44]">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-[#ff0055]" />
            Results for <span className="text-[#00f0ff]">"{searchQuery}"</span>
            <Sparkles className="w-4 h-4 text-[#ff0055]" />
          </h2>
          <p className="text-xs text-[#9ba9c4] mt-1 font-mono">
            Found {searchResults.length} kawaii videos matching your search
          </p>
        </div>

        <button 
          onClick={() => alert('Kawaii Filters: Upload date (Any, Today, This week), Type (Video, Channel, Anime), Duration (< 4 min, 4-20 min, > 20 min).')}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161d30] hover:bg-[#202b44] border border-[#202b44] text-xs font-bold text-[#00f0ff] transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Results List */}
      {searchResults.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-white font-bold mb-2">No results found (｡•́︿•̀｡)</p>
          <p className="text-xs text-[#9ba9c4]">
            Try searching for "React 19", "Lofi Girl", "Cyberpunk", or "Fireship"!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((video) => (
            <div
              key={video.id}
              onClick={() => navigateToWatch(video)}
              className="flex flex-col sm:flex-row gap-4 p-3 rounded-2xl hover:bg-[#121624] border border-transparent hover:border-[#202b44] cursor-pointer transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative w-full sm:w-80 md:w-96 aspect-video rounded-xl overflow-hidden bg-[#161d30] border border-[#202b44] flex-shrink-0 group-hover:border-[#00f0ff]/50">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/85 text-[#00f0ff] text-xs font-mono font-bold">
                  {video.duration}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex-1 min-w-0 py-1">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00f0ff] line-clamp-2 leading-snug mb-1 transition-colors">
                  {video.title}
                </h3>

                <div className="text-xs text-[#9ba9c4] mb-3 flex items-center gap-1 font-mono">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>{video.timestamp}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#ff0055] to-[#00f0ff]">
                    <img
                      src={video.channel.avatar}
                      alt={video.channel.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-[#9ba9c4] hover:text-white font-semibold truncate">
                    {video.channel.name}
                  </span>
                  {video.channel.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                  )}
                </div>

                <p className="text-xs text-[#65738e] line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
