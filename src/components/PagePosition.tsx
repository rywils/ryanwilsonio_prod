import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

type ScrollPosition = 'top' | 'middle' | 'bottom';

function PagePosition() {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>('top');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // At the top (within 50px)
      if (scrollY < 50) {
        setScrollPosition('top');
      } 
      // At the bottom (within 50px of the bottom)
      else if (scrollY + windowHeight >= documentHeight - 50) {
        setScrollPosition('bottom');
      } 
      // In the middle
      else {
        setScrollPosition('middle');
      }
    };

    // Check position on mount
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const getUpColor = () => {
    if (scrollPosition === 'top') return '#6B7280'; // gray when at top
    return '#00BFFF'; // active blue otherwise
  };

  const getDownColor = () => {
    if (scrollPosition === 'bottom') return '#6B7280'; // gray when at bottom
    return '#00BFFF'; // active blue otherwise
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={scrollToTop}
        disabled={scrollPosition === 'top'}
        className="p-2 rounded-full hover:bg-accent/50 transition-all hover:scale-110 active:scale-90 flex items-center justify-center disabled:cursor-not-allowed"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} color={getUpColor()} />
      </button>
      
      <button
        onClick={scrollToBottom}
        disabled={scrollPosition === 'bottom'}
        className="p-2 rounded-full hover:bg-accent/50 transition-all hover:scale-110 active:scale-90 flex items-center justify-center disabled:cursor-not-allowed"
        aria-label="Scroll to bottom"
      >
        <ArrowDown size={20} color={getDownColor()} />
      </button>
    </div>
  );
}

export default PagePosition;