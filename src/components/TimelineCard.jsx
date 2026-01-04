import { useState } from 'react';

// Skeleton placeholder component - shown when image fails or doesn't exist
const SkeletonPlaceholder = ({ year }) => (
  <div className="w-full h-full placeholder-gradient flex items-center justify-center relative overflow-hidden">
    {/* Large year watermark */}
    <span 
      className="text-[10rem] md:text-[14rem] font-bold opacity-[0.04] select-none absolute leading-none"
      style={{ color: 'var(--text-primary)' }}
    >
      {year.toString().slice(0, 4)}
    </span>
    
    {/* Animated skeleton lines */}
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute top-[20%] left-[10%] right-[30%] h-px skeleton-line"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute top-[35%] left-[20%] right-[20%] h-px skeleton-line"
        style={{ animationDelay: '0.2s' }}
      />
      <div 
        className="absolute top-[50%] left-[15%] right-[25%] h-px skeleton-line"
        style={{ animationDelay: '0.4s' }}
      />
      <div 
        className="absolute top-[65%] left-[25%] right-[15%] h-px skeleton-line"
        style={{ animationDelay: '0.6s' }}
      />
      <div 
        className="absolute top-[80%] left-[10%] right-[35%] h-px skeleton-line"
        style={{ animationDelay: '0.8s' }}
      />
    </div>

    {/* Subtle grid pattern */}
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(var(--text-primary) 1px, transparent 1px),
          linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />
  </div>
);

const TimelineCard = ({ milestone, index, total, theme }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasImage = milestone.image && !imageError;
  const showSkeleton = !milestone.image || imageError || !imageLoaded;

  return (
    <div
      className={`
        card-snap timeline-card flex-shrink-0 
        w-[90vw] md:w-[650px] lg:w-[700px] 
        h-[75vh] md:h-[80vh] max-h-[850px] min-h-[500px]
        rounded-2xl md:rounded-3xl overflow-hidden
        mx-3 md:mx-6
        relative
      `}
    >
      {/* Background - Image or Skeleton */}
      <div className="card-image absolute inset-0">
        {milestone.image && !imageError ? (
          <>
            {/* Show skeleton while loading */}
            {!imageLoaded && <SkeletonPlaceholder year={milestone.year} />}
            
            {/* Actual image */}
            <img
              src={`${import.meta.env.BASE_URL}${milestone.image}`}
              alt={milestone.event}
              className={`absolute inset-0 transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          // No image - show skeleton permanently
          <SkeletonPlaceholder year={milestone.year} />
        )}
        
        {/* Overlay for text readability */}
        <div className="card-overlay" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 lg:p-10">
        {/* Top - Year and Era */}
        <div className="flex items-start justify-between gap-4">
          <span className="year-badge">{milestone.year}</span>
          <span className="era-indicator max-w-[160px] text-right leading-tight">
            {milestone.era.replace(/^[IVX]+\.\s*/, '')}
          </span>
        </div>

        {/* Bottom - Content */}
        <div className="stagger">
          {/* Card number indicator */}
          <div className="mb-4">
            <span 
              className="text-xs font-medium tracking-wider uppercase"
              style={{ color: hasImage && imageLoaded ? 'rgba(255,255,255,0.5)' : 'var(--text-tertiary)' }}
            >
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Event Title */}
          <h2 
            className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-tight"
            style={{ color: hasImage && imageLoaded ? '#ffffff' : 'var(--text-primary)' }}
          >
            {milestone.event}
          </h2>

          {/* Innovator */}
          {milestone.innovator && (
            <p 
              className="text-base md:text-lg mb-4 font-medium"
              style={{ color: hasImage && imageLoaded ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}
            >
              {milestone.innovator}
            </p>
          )}

          {/* Impact */}
          <p 
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: hasImage && imageLoaded ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}
          >
            {milestone.impact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
