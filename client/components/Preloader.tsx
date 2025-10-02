import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // SVG path definitions matching the original
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    const initial = "M0,1005S175,995,500,995s500,5,500,5V0H0Z";

    // Set initial state
    gsap.set(textRef.current, { opacity: 1, y: 0 });
    gsap.set(svgRef.current, { attr: { d: initial } });

    // Text animation - fade out and move up (matching original timing)
    tl.to(textRef.current, {
      delay: 1.5,
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.easeOut"
    });

    // SVG path morphing sequence (matching original)
    tl.to(svgRef.current, {
      duration: 0.5,
      attr: { d: curve },
      ease: "power2.easeIn"
    }).to(svgRef.current, {
      duration: 0.5,
      attr: { d: flat },
      ease: "power2.easeOut"
    });

    // Container exit animation (matching original)
    tl.to(preloaderRef.current, {
      y: -1500,
      duration: 0.8,
      ease: "power2.easeInOut"
    });

    // Final cleanup
    tl.to(preloaderRef.current, {
      zIndex: -1,
      display: "none",
      duration: 0.1,
      onComplete: onComplete
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[99999999999999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, hsl(var(--brand-950)) 0%, hsl(var(--background)) 50%)'
      }}
    >
      {/* SVG Background - matching original design */}
      <svg 
        ref={svgRef}
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute top-0 w-screen h-[110vh] fill-[#050709]"
      >
        <path 
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        />
      </svg>

      {/* Loading Text - matching website typography */}
      <div 
        ref={textRef}
        className="relative z-20 text-xl font-extralight tracking-[15px] uppercase text-white"
        style={{
          fontFamily: 'inherit', // Uses the website's font family
          fontSize: '20px',
          fontWeight: '200',
          letterSpacing: '15px'
        }}
      >
        <span className="animate-loading-letter" style={{ animationDelay: '0s' }}>L</span>
        <span className="animate-loading-letter" style={{ animationDelay: '0.1s' }}>o</span>
        <span className="animate-loading-letter" style={{ animationDelay: '0.2s' }}>a</span>
        <span className="animate-loading-letter" style={{ animationDelay: '0.3s' }}>d</span>
        <span className="animate-loading-letter" style={{ animationDelay: '0.4s' }}>i</span>
        <span className="animate-loading-letter" style={{ animationDelay: '0.5s' }}>n</span>
        <span className="animate-loading-letter" style={{ animationDelay: '0.6s' }}>g</span>
      </div>
    </div>
  );
};

export default Preloader;
