/**
 * Image optimization configuration for the portfolio application
 * Centralized configuration for image handling, formats, and optimization settings
 */

export interface ImageConfig {
  // Quality settings
  quality: {
    high: number;
    medium: number;
    low: number;
  };
  
  // Size breakpoints
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
    large: number;
  };
  
  // Format preferences
  formats: {
    preferred: string[];
    fallback: string;
  };
  
  // Lazy loading settings
  lazyLoading: {
    threshold: number;
    rootMargin: string;
    enabled: boolean;
  };
  
  // Placeholder settings
  placeholder: {
    blur: boolean;
    skeleton: boolean;
    color: string;
  };
  
  // Performance settings
  performance: {
    preloadCritical: boolean;
    maxConcurrent: number;
    retryAttempts: number;
  };
}

export const defaultImageConfig: ImageConfig = {
  quality: {
    high: 90,
    medium: 75,
    low: 60,
  },
  
  breakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
    large: 1920,
  },
  
  formats: {
    preferred: ['webp', 'avif'],
    fallback: 'jpg',
  },
  
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
    enabled: true,
  },
  
  placeholder: {
    blur: true,
    skeleton: true,
    color: '#f3f4f6',
  },
  
  performance: {
    preloadCritical: true,
    maxConcurrent: 3,
    retryAttempts: 2,
  },
};

// Critical images that should be preloaded
export const criticalImages = [
  '/portofolioimage.jpg', // About section image
];

// Image optimization presets for different use cases
export const imagePresets = {
  // Hero/About section images
  hero: {
    quality: defaultImageConfig.quality.high,
    sizes: '(max-width: 1024px) 355px, 400px',
    priority: true,
    placeholder: 'blur' as const,
  },
  
  // Project thumbnails
  project: {
    quality: defaultImageConfig.quality.medium,
    sizes: '(max-width: 1024px) 100vw, 50vw',
    priority: false,
    placeholder: 'blur' as const,
  },
  
  // Tech stack icons
  icon: {
    quality: defaultImageConfig.quality.medium,
    sizes: '80px',
    priority: false,
    placeholder: 'empty' as const,
    showLoadingSpinner: false,
  },
  
  // Background images
  background: {
    quality: defaultImageConfig.quality.low,
    sizes: '100vw',
    priority: false,
    placeholder: 'blur' as const,
  },
} as const;

// Responsive image sizes for different containers
export const responsiveSizes = {
  // About section image
  about: {
    mobile: '355px',
    tablet: '355px',
    desktop: '400px',
    large: '400px',
  },
  
  // Project images
  project: {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '50vw',
    large: '50vw',
  },
  
  // Tech icons
  techIcon: {
    mobile: '80px',
    tablet: '80px',
    desktop: '80px',
    large: '80px',
  },
} as const;

// Generate sizes attribute from responsive sizes
export function generateSizes(responsiveSizes: Record<string, string>): string {
  return Object.entries(responsiveSizes)
    .map(([breakpoint, size]) => {
      const breakpointValue = defaultImageConfig.breakpoints[breakpoint as keyof typeof defaultImageConfig.breakpoints];
      return `(max-width: ${breakpointValue}px) ${size}`;
    })
    .join(', ');
}

// Get optimal image configuration based on context
export function getImageConfig(context: keyof typeof imagePresets) {
  const preset = imagePresets[context];
  return {
    ...preset,
    sizes: responsiveSizes[context] ? generateSizes(responsiveSizes[context]) : preset.sizes,
  };
}

// Image format detection and optimization
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  } = {}
): string {
  // In a production environment, this would integrate with:
  // - Cloudinary
  // - ImageKit
  // - Next.js Image Optimization
  // - Custom CDN with image processing
  
  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('f', options.format);
  
  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

// Preload critical images
export function preloadCriticalImages(): void {
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Initialize image optimization
export function initializeImageOptimization(): void {
  // Preload critical images
  if (defaultImageConfig.performance.preloadCritical) {
    preloadCriticalImages();
  }
  
  // Add global image loading optimization
  document.addEventListener('DOMContentLoaded', () => {
    // Add loading="lazy" to all images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  });
}
