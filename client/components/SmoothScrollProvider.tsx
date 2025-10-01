import React, { createContext, useContext, ReactNode } from 'react';
import { useSmoothScroll, SmoothScrollOptions } from '@/hooks/use-smooth-scroll';

interface SmoothScrollContextType {
  scrollTo: (element: Element, x: number, y: number) => void;
  scrollToElement: (target: Element, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: SmoothScrollOptions;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ 
  children, 
  options = {} 
}) => {
  const smoothScroll = useSmoothScroll(options);

  return (
    <SmoothScrollContext.Provider value={smoothScroll}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScrollContext = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScrollContext must be used within a SmoothScrollProvider');
  }
  return context;
};

// Higher-order component for easy integration
export const withSmoothScroll = <P extends object>(
  Component: React.ComponentType<P>,
  options?: SmoothScrollOptions
) => {
  return (props: P) => (
    <SmoothScrollProvider options={options}>
      <Component {...props} />
    </SmoothScrollProvider>
  );
};
