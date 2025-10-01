import React, { useCallback } from 'react';
import { useSmoothScrollContext } from './SmoothScrollProvider';

interface SmoothScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  offset?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  to,
  offset = 0,
  duration = 600,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const { scrollToElement } = useSmoothScrollContext();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const targetElement = document.querySelector(to);
    if (targetElement) {
      scrollToElement(targetElement, offset);
    }
    
    if (onClick) {
      onClick(e);
    }
  }, [to, offset, scrollToElement, onClick]);

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`smooth-scroll-link ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

// Utility hook for programmatic scrolling
export const useSmoothScrollTo = () => {
  const { scrollToElement } = useSmoothScrollContext();
  
  return useCallback((selector: string, offset = 0) => {
    const element = document.querySelector(selector);
    if (element) {
      scrollToElement(element, offset);
    }
  }, [scrollToElement]);
};
