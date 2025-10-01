import React from 'react';
import { SmoothScrollLink, useSmoothScrollTo } from './SmoothScrollLink';

export const SmoothScrollDemo: React.FC = () => {
  const scrollTo = useSmoothScrollTo();

  const handleProgrammaticScroll = () => {
    scrollTo('#about', 100);
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Smooth Scroll Demo</h2>
      
      <div className="space-y-2">
        <p className="text-white/80">
          Click the links below to see smooth scrolling in action:
        </p>
        
        <div className="flex flex-wrap gap-4">
          <SmoothScrollLink 
            to="#about" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Scroll to About
          </SmoothScrollLink>
          
          <SmoothScrollLink 
            to="#experience" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Scroll to Experience
          </SmoothScrollLink>
          
          <SmoothScrollLink 
            to="#projects" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Scroll to Projects
          </SmoothScrollLink>
          
          <button
            onClick={handleProgrammaticScroll}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Programmatic Scroll
          </button>
        </div>
      </div>
    </div>
  );
};
