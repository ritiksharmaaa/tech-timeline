import { useState, useEffect, useRef, useCallback } from 'react';
import { timelineData } from './data/timelineData';
import TimelineCard from './components/TimelineCard';
import CenturyCard from './components/CenturyCard';

// Icons
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StopIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
);

// Get century from year string
const getCentury = (yearStr) => {
  const year = parseInt(yearStr);
  return Math.floor(year / 100) * 100;
};

function App() {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCentury, setCurrentCentury] = useState(1600);
  const [theme, setTheme] = useState('dark');
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const timerRef = useRef(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('tech-evolution-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Hide hint after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('tech-evolution-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Flatten milestones
  const allMilestones = timelineData.scientific_evolution_timeline.flatMap(era => 
    era.milestones.map(m => ({ ...m, era: era.era, period: era.period }))
  );

  // Build timeline items with century dividers
  const timelineItems = [];
  let lastCentury = null;
  
  allMilestones.forEach((milestone, idx) => {
    const century = getCentury(milestone.year);
    if (century !== lastCentury) {
      timelineItems.push({ type: 'century', century, id: `century-${century}` });
      lastCentury = century;
    }
    timelineItems.push({ type: 'milestone', data: milestone, index: idx, id: `milestone-${idx}` });
  });

  const totalItems = timelineItems.length + 2; // +2 for intro and end sections

  // Auto-play: scroll one card every 2.5 seconds
  useEffect(() => {
    if (isAutoPlay) {
      timerRef.current = setInterval(() => {
        const container = scrollRef.current;
        if (!container) return;
        
        const cardWidth = window.innerWidth > 768 ? 748 : window.innerWidth * 0.9 + 24;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Check if we've reached the end
        if (container.scrollLeft >= maxScroll - 50) {
          setIsAutoPlay(false);
          return;
        }
        
        // Scroll to next card smoothly
        container.scrollBy({ 
          left: cardWidth, 
          behavior: 'smooth' 
        });
      }, 2500); // Every 2.5 seconds
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAutoPlay]);

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
    setShowHint(false);
  };

  // Handle scroll progress
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const newProgress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    
    setProgress(newProgress);
    
    // Calculate current card and century
    const cardWidth = window.innerWidth > 768 ? 748 : window.innerWidth * 0.9 + 24;
    const introWidth = window.innerWidth;
    const adjustedScroll = Math.max(0, scrollLeft - introWidth * 0.5);
    const index = Math.round(adjustedScroll / cardWidth);
    
    // Find current milestone
    const milestoneItems = timelineItems.filter(item => item.type === 'milestone');
    const currentMilestoneIdx = Math.min(Math.max(0, index), milestoneItems.length - 1);
    setCurrentIndex(currentMilestoneIdx);
    
    // Update century
    if (milestoneItems[currentMilestoneIdx]) {
      const year = milestoneItems[currentMilestoneIdx].data.year;
      setCurrentCentury(getCentury(year));
    }
  }, [timelineItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!scrollRef.current) return;
      
      const container = scrollRef.current;
      const cardWidth = window.innerWidth > 768 ? 748 : window.innerWidth * 0.9 + 24;
      
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse wheel → horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      
      const cardWidth = window.innerWidth > 768 ? 748 : window.innerWidth * 0.9 + 24;
      const direction = e.deltaY > 0 ? 1 : -1;
      container.scrollBy({ 
        left: direction * cardWidth * 0.5, 
        behavior: 'smooth' 
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const totalMilestones = allMilestones.length;

  return (
    <div className="h-screen w-screen overflow-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 header-blur">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          {/* Left - Logo & Title */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="TE Logo" className="w-8 h-8 md:w-9 md:h-9 rounded-lg" />
              <h1 className="text-lg md:text-xl font-semibold tracking-tight header-title">
                Technology Evolution
              </h1>
            </div>
            <div className="hidden sm:flex items-center">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full century-badge">
                {currentCentury}s
              </span>
            </div>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Auto Play Button */}
            <div className="relative">
              <button 
                onClick={toggleAutoPlay}
                className={`icon-btn ${isAutoPlay ? 'active' : ''}`}
                title={isAutoPlay ? 'Stop auto-play' : 'Start auto-play'}
              >
                {isAutoPlay ? <StopIcon /> : <PlayIcon />}
              </button>
              
              {/* Hint tooltip */}
              {showHint && !isAutoPlay && (
                <div className="hint-tooltip">
                  <span>Auto-play</span>
                  <div className="hint-arrow" />
                </div>
              )}
            </div>

            {/* Social Links */}
            <a 
              href="https://github.com/ritiksharmaaa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="icon-btn"
              title="GitHub"
            >
              <GitHubIcon />
            </a>
            <a 
              href="https://www.linkedin.com/in/ritiksharmaaa/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="icon-btn hidden sm:flex"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="icon-btn"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Timeline */}
      <main
        ref={scrollRef}
        onScroll={handleScroll}
        className="timeline-scroll hide-scrollbar h-full items-center"
        style={{ paddingTop: '70px', paddingBottom: '100px' }}
      >
        {/* Intro Section */}
        <div className="intro-section card-snap">
          <div className="text-center max-w-3xl stagger">
            <p className="text-sm font-medium mb-4 tracking-wider uppercase" style={{ color: 'var(--text-tertiary)' }}>
              426 Years of Innovation
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 hero-title">
              The Evolution<br />of Technology
            </h1>
            <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              From the first spark of electricity to the age of artificial intelligence — 
              explore the milestones that shaped our world.
            </p>
            <div className="flex items-center justify-center gap-3" style={{ color: 'var(--text-tertiary)' }}>
              <span className="text-sm">Scroll to explore or</span>
              <button 
                onClick={toggleAutoPlay}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
              >
                <PlayIcon />
                Auto-play
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        {timelineItems.map((item) => {
          if (item.type === 'century') {
            return <CenturyCard key={item.id} century={item.century} />;
          } else {
            return (
              <TimelineCard
                key={item.id}
                milestone={item.data}
                index={item.index}
                total={totalMilestones}
                theme={theme}
              />
            );
          }
        })}

        {/* End Section */}
        <div className="intro-section card-snap">
          <div className="text-center max-w-2xl stagger">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-secondary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 hero-title">
              The Future Awaits
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
              What innovation will you bring to the world?
            </p>
            
            {/* Social footer */}
            <div className="flex items-center justify-center gap-4 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Built by Ritik Sharma</span>
              <a href="https://github.com/ritiksharmaaa" target="_blank" rel="noopener noreferrer" className="icon-btn">
                <GitHubIcon />
              </a>
              <a href="https://www.linkedin.com/in/ritiksharmaaa/" target="_blank" rel="noopener noreferrer" className="icon-btn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bottom-nav rounded-full px-6 py-3 flex items-center gap-6">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="text-xs font-medium tabular-nums min-w-[80px] text-center" style={{ color: 'var(--text-secondary)' }}>
            {currentIndex + 1} of {totalMilestones}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
