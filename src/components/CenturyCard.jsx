// Century divider card component
const CenturyCard = ({ century }) => {
  // Get century name
  const getCenturyName = (c) => {
    const names = {
      1600: 'The Dawn of Discovery',
      1700: 'Age of Enlightenment', 
      1800: 'The Industrial Age',
      1900: 'The Electronic Age',
      2000: 'The Digital Age'
    };
    return names[c] || `${c}s`;
  };

  return (
    <div className="card-snap flex-shrink-0 w-[70vw] md:w-[400px] h-[75vh] md:h-[80vh] max-h-[850px] min-h-[500px] mx-3 md:mx-6 flex items-center justify-center">
      <div className="century-divider text-center px-8">
        {/* Large Century Number */}
        <div className="relative mb-6">
          <span 
            className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter century-number"
            style={{ color: 'var(--text-primary)' }}
          >
            {century}
          </span>
          <span 
            className="text-[3rem] md:text-[4rem] font-light tracking-tight"
            style={{ color: 'var(--text-tertiary)' }}
          >
            s
          </span>
        </div>

        {/* Decorative line */}
        <div className="w-16 h-px mx-auto mb-6" style={{ background: 'var(--border)' }} />

        {/* Century description */}
        <p 
          className="text-sm md:text-base font-medium tracking-wide uppercase"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {getCenturyName(century)}
        </p>
      </div>
    </div>
  );
};

export default CenturyCard;
