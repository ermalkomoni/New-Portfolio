/**
 * Image optimization utilities for the portfolio application
 * Provides functions for image format detection, optimization, and responsive sizing
 */

export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'svg' | 'pdf' | 'gif' | 'avif';

export interface ImageOptimizationOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: ImageFormat;
  progressive?: boolean;
  blur?: number;
}

export interface ResponsiveImageSizes {
  mobile: string;
  tablet: string;
  desktop: string;
  large: string;
}

/**
 * Detects the image format from a file path or URL
 */
export function getImageFormat(src: string): ImageFormat | null {
  const extension = src.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'png':
      return 'png';
    case 'jpg':
    case 'jpeg':
      return 'jpg';
    case 'webp':
      return 'webp';
    case 'svg':
      return 'svg';
    case 'pdf':
      return 'pdf';
    case 'gif':
      return 'gif';
    case 'avif':
      return 'avif';
    default:
      return null;
  }
}

/**
 * Checks if an image format supports quality optimization
 */
export function supportsQualityOptimization(format: ImageFormat | null): boolean {
  if (!format) return false;
  return ['png', 'jpg', 'webp', 'avif'].includes(format);
}

/**
 * Checks if an image format is vector-based
 */
export function isVectorFormat(format: ImageFormat | null): boolean {
  if (!format) return false;
  return format === 'svg';
}

/**
 * Checks if an image format is a document
 */
export function isDocumentFormat(format: ImageFormat | null): boolean {
  if (!format) return false;
  return format === 'pdf';
}

/**
 * Generates responsive image sizes for different breakpoints
 */
export function getResponsiveSizes(
  baseWidth: number,
  baseHeight: number,
  aspectRatio?: number
): ResponsiveImageSizes {
  const ratio = aspectRatio || baseWidth / baseHeight;
  
  return {
    mobile: `(max-width: 640px) ${Math.min(640, baseWidth)}px`,
    tablet: `(max-width: 1024px) ${Math.min(1024, baseWidth)}px`,
    desktop: `(max-width: 1280px) ${Math.min(1280, baseWidth)}px`,
    large: `${baseWidth}px`,
  };
}

/**
 * Generates a sizes attribute string for responsive images
 */
export function generateSizesAttribute(sizes: ResponsiveImageSizes): string {
  return Object.values(sizes).join(', ');
}

/**
 * Creates a blur data URL for placeholder images
 */
export function createBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Generates optimized image URL with query parameters
 * This would typically integrate with a CDN or image optimization service
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const format = getImageFormat(src);
  
  // For SVGs and PDFs, return original URL
  if (isVectorFormat(format) || isDocumentFormat(format)) {
    return src;
  }
  
  // For other formats, you could add optimization parameters
  // This is a placeholder - in production, you'd integrate with services like:
  // - Cloudinary
  // - ImageKit
  // - Next.js Image Optimization
  // - Custom CDN with image processing
  
  const params = new URLSearchParams();
  
  if (options.quality && supportsQualityOptimization(format)) {
    params.set('q', options.quality.toString());
  }
  
  if (options.width) {
    params.set('w', options.width.toString());
  }
  
  if (options.height) {
    params.set('h', options.height.toString());
  }
  
  if (options.format && options.format !== format) {
    params.set('f', options.format);
  }
  
  if (options.progressive) {
    params.set('pr', '1');
  }
  
  if (options.blur) {
    params.set('blur', options.blur.toString());
  }
  
  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

/**
 * Preloads an image for better performance
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preloads multiple images
 */
export function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(srcs.map(preloadImage));
}

/**
 * Calculates the optimal image dimensions for a container
 */
export function calculateOptimalDimensions(
  containerWidth: number,
  containerHeight: number,
  imageAspectRatio: number,
  objectFit: 'cover' | 'contain' | 'fill' = 'cover'
): { width: number; height: number } {
  const containerAspectRatio = containerWidth / containerHeight;
  
  switch (objectFit) {
    case 'cover':
      if (imageAspectRatio > containerAspectRatio) {
        return {
          width: containerWidth,
          height: containerWidth / imageAspectRatio,
        };
      } else {
        return {
          width: containerHeight * imageAspectRatio,
          height: containerHeight,
        };
      }
      
    case 'contain':
      if (imageAspectRatio > containerAspectRatio) {
        return {
          width: containerWidth,
          height: containerWidth / imageAspectRatio,
        };
      } else {
        return {
          width: containerHeight * imageAspectRatio,
          height: containerHeight,
        };
      }
      
    case 'fill':
    default:
      return {
        width: containerWidth,
        height: containerHeight,
      };
  }
}

/**
 * Generates a WebP fallback chain for better browser support
 */
export function getWebPFallbackChain(src: string): string[] {
  const format = getImageFormat(src);
  
  if (format === 'webp') {
    // If already WebP, try to find fallback formats
    const baseSrc = src.replace(/\.webp$/i, '');
    return [
      src, // WebP (preferred)
      `${baseSrc}.jpg`, // JPG fallback
      `${baseSrc}.png`, // PNG fallback
    ];
  }
  
  if (format === 'jpg' || format === 'jpeg') {
    const baseSrc = src.replace(/\.(jpg|jpeg)$/i, '');
    return [
      `${baseSrc}.webp`, // WebP (preferred)
      src, // Original JPG
    ];
  }
  
  if (format === 'png') {
    const baseSrc = src.replace(/\.png$/i, '');
    return [
      `${baseSrc}.webp`, // WebP (preferred)
      src, // Original PNG
    ];
  }
  
  return [src]; // No fallback available
}

/**
 * Checks if the browser supports WebP format
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Gets the best supported image format for the current browser
 */
export async function getBestSupportedFormat(src: string): Promise<string> {
  const format = getImageFormat(src);
  
  if (format === 'webp') {
    return src; // Already WebP
  }
  
  if (format === 'jpg' || format === 'jpeg' || format === 'png') {
    const webPSupported = await supportsWebP();
    if (webPSupported) {
      const baseSrc = src.replace(/\.(jpg|jpeg|png)$/i, '');
      return `${baseSrc}.webp`;
    }
  }
  
  return src; // Return original if WebP not supported or not applicable
}

/**
 * Generates a low-quality placeholder for images
 */
export function generateLQIP(src: string, width: number = 20, height: number = 20): string {
  // This is a simplified LQIP generator
  // In production, you'd use a more sophisticated approach
  return createBlurDataURL(width, height);
}

/**
 * Image loading states for better UX
 */
export enum ImageLoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

/**
 * Hook for managing image loading state
 */
export function useImageLoading(src: string) {
  const [state, setState] = React.useState<ImageLoadingState>(ImageLoadingState.IDLE);
  
  React.useEffect(() => {
    if (!src) {
      setState(ImageLoadingState.IDLE);
      return;
    }
    
    setState(ImageLoadingState.LOADING);
    
    const img = new Image();
    img.onload = () => setState(ImageLoadingState.LOADED);
    img.onerror = () => setState(ImageLoadingState.ERROR);
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return state;
}

// Re-export React for the hook
import React from 'react';
