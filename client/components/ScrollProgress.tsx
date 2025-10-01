import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = '',
  color = '#3b82f6',
  height = 2,
  showPercentage = false
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Initial calculation
    updateScrollProgress();

    // Add scroll listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div className={`scroll-progress-container ${className}`}>
      <div
        className="scroll-indicator"
        style={{
          backgroundColor: color,
          height: `${height}px`,
          transform: `scaleX(${scrollProgress / 100})`,
        }}
      />
      {showPercentage && (
        <div className="absolute top-4 right-4 text-sm text-white/60 font-mono">
          {Math.round(scrollProgress)}%
        </div>
      )}
    </div>
  );
};
