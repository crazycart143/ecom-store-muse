export function Marquee() {
    const text = "MINIMALIST / TIMELESS / ESSENTIAL / MODERN / ";
    
    return (
      <div className="bg-accent text-white py-12 overflow-hidden transform -rotate-1 flex">
        <div className="flex animate-marquee-fast whitespace-nowrap shrink-0">
          {Array(4).fill(text).map((t, i) => (
            <span key={i} className="text-6xl md:text-8xl font-black italic mx-4 opacity-90">
              {t}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee-fast whitespace-nowrap shrink-0" aria-hidden="true">
          {Array(4).fill(text).map((t, i) => (
            <span key={`clone-${i}`} className="text-6xl md:text-8xl font-black italic mx-4 opacity-90">
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }
