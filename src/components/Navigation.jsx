import { useState, useEffect, useRef } from 'react';

const ScrollProgress = ({ scrollProgress, totalEras }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      {/* Progress Bar Container */}
      <div className="glass-card rounded-full px-6 py-3 flex items-center gap-4">
        {/* Era Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalEras }).map((_, index) => {
            const isActive = scrollProgress >= (index / totalEras) && scrollProgress < ((index + 1) / totalEras);
            const isPast = scrollProgress >= ((index + 1) / totalEras);
            
            return (
              <div
                key={index}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${isActive ? 'nav-dot-active w-6' : isPast ? 'bg-cosmic-500' : 'bg-gray-600'}
                `}
              />
            );
          })}
        </div>

        {/* Progress Text */}
        <div className="text-xs text-gray-400 font-body">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </div>
  );
};

const ScrollHint = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
      <div className="flex items-center gap-2 text-gray-400 text-sm font-body">
        <span>Scroll to explore</span>
        <div className="scroll-hint flex items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const KeyboardHint = () => {
  return (
    <div className="fixed top-8 right-8 z-50">
      <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <kbd className="px-2 py-1 bg-deep-space-700 rounded text-xs text-gray-300 font-mono">←</kbd>
          <kbd className="px-2 py-1 bg-deep-space-700 rounded text-xs text-gray-300 font-mono">→</kbd>
        </div>
        <span className="text-xs text-gray-500">Navigate</span>
      </div>
    </div>
  );
};

export { ScrollProgress, ScrollHint, KeyboardHint };
