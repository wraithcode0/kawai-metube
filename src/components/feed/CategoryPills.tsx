import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/mockData';

export const CategoryPills: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -250 : 250;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="sticky top-14 z-30 bg-[#0a0d14]/95 backdrop-blur-md py-3 px-4 border-b border-[#202b44]/70 flex items-center shadow-sm">
      {/* Left Chevron */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="mr-2 p-1.5 rounded-full hover:bg-[#161d30] text-[#00f0ff] bg-[#0a0d14] border border-[#202b44] shadow-md transition-all flex-shrink-0"
          title="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Pills Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth flex-1"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'bg-gradient-to-r from-[#ff0055] via-[#ff2a85] to-[#00f0ff] text-white shadow-[0_0_15px_rgba(255,0,85,0.4)] scale-105'
                  : 'bg-[#161d30] text-[#9ba9c4] hover:text-white hover:border-[#00f0ff]/50 border border-[#202b44]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Right Chevron */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="ml-2 p-1.5 rounded-full hover:bg-[#161d30] text-[#00f0ff] bg-[#0a0d14] border border-[#202b44] shadow-md transition-all flex-shrink-0"
          title="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
