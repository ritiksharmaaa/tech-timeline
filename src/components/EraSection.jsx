import TimelineCard from './TimelineCard';

const EraSection = ({ era, eraIndex }) => {
  return (
    <div className="inline-flex items-center gap-6 px-8 first:pl-16 last:pr-16">
      {/* Era Title Card */}
      <div className={`
        flex-shrink-0 w-64 h-[75vh] min-h-[500px] max-h-[700px]
        flex flex-col justify-center items-center
        glass-card rounded-3xl p-6
        ${era.gradient}
        border-l-4 border-cosmic-500
      `}>
        <div className="text-center">
          {/* Era Number */}
          <div className={`
            w-16 h-16 mx-auto mb-6 rounded-full
            bg-gradient-to-br ${era.accentColor}
            flex items-center justify-center
            shadow-lg shadow-cosmic-500/30
          `}>
            <span className="font-display font-bold text-2xl text-white">
              {eraIndex + 1}
            </span>
          </div>

          {/* Era Title */}
          <h2 className="font-display font-bold text-2xl text-white mb-4 era-title">
            {era.eraShort}
          </h2>

          {/* Era Years */}
          <p className="text-sm text-gray-400 font-body">
            {era.era.match(/\(([^)]+)\)/)?.[1] || ''}
          </p>

          {/* Milestone Count */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${era.accentColor}`} />
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {era.milestones.length} milestones
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-deep-space-900/50 to-transparent rounded-b-3xl" />
      </div>

      {/* Milestone Cards */}
      {era.milestones.map((milestone, mIndex) => (
        <TimelineCard
          key={`${eraIndex}-${mIndex}`}
          milestone={milestone}
          eraAccent={era.accentColor}
          index={mIndex}
          isActive={false}
        />
      ))}
    </div>
  );
};

export default EraSection;
