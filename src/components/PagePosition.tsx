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
      
      
      if (scrollY < 50) {
        setScrollPosition('top');
      } 
      
      else if (scrollY + windowHeight >= documentHeight - 50) {
        setScrollPosition('bottom');
      } 
      
      else {
        setScrollPosition('middle');
      }
    };

    
    handleScroll();

    
    window.addEventListener('scroll', handleScroll, { passive: true });

    
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
    if (scrollPosition === 'top') return '#6B7280'; 
    return '#00BFFF'; 
  };

  const getDownColor = () => {
    if (scrollPosition === 'bottom') return '#6B7280'; 
    return '#00BFFF'; 
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