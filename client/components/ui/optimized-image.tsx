import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallback?: React.ReactNode;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  showLoadingSpinner?: boolean;
  enableIntersectionObserver?: boolean;
  threshold?: number;
  rootMargin?: string;
}

interface ImageState {
  isLoading: boolean;
  hasError: boolean;
  isLoaded: boolean;
  isInView: boolean;
}


const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes = '100vw',
  loading = 'lazy',
  onLoad,
  onError,
  fallback,
  containerClassName = '',
  objectFit = 'cover',
  aspectRatio,
  showLoadingSpinner = true,
  enableIntersectionObserver = true,
  threshold = 0.1,
  rootMargin = '50px',
}) => {
  const [imageState, setImageState] = useState<ImageState>({
    isLoading: true,
    hasError: false,
    isLoaded: false,
    isInView: false,
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Determine image type and format
  const getImageType = useCallback((src: string) => {
    const extension = src.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'svg':
        return 'svg';
      case 'pdf':
        return 'pdf';
      case 'webp':
        return 'webp';
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'raster';
      default:
        return 'unknown';
    }
  }, []);

  const imageType = getImageType(src);

  // Generate optimized src with quality parameters for supported formats
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    if (imageType === 'svg' || imageType === 'pdf') {
      return originalSrc; // SVGs and PDFs don't need quality optimization
    }
    
    // For raster images, we could add query parameters for optimization
    // This would typically be handled by a CDN or image optimization service
    return originalSrc;
  }, [imageType]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setImageState(prev => ({
      ...prev,
      isLoading: false,
      hasError: false,
      isLoaded: true,
    }));
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setImageState(prev => ({
      ...prev,
      isLoading: false,
      hasError: true,
      isLoaded: false,
    }));
    onError?.();
  }, [onError]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enableIntersectionObserver || priority || loading === 'eager') {
      setImageState(prev => ({ ...prev, isInView: true }));
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageState(prev => ({ ...prev, isInView: true }));
            observerRef.current?.unobserve(container);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enableIntersectionObserver, priority, loading, threshold, rootMargin]);

  // Preload image when in view
  useEffect(() => {
    if (!imageState.isInView || imageState.isLoaded || imageState.hasError) {
      return;
    }

    const img = new Image();
    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = getOptimizedSrc(src);
  }, [imageState.isInView, imageState.isLoaded, imageState.hasError, src, getOptimizedSrc, handleLoad, handleError]);

  // Render loading spinner
  const renderLoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
        <span className="text-xs text-muted-foreground">Loading...</span>
      </div>
    </div>
  );

  // Render error state
  const renderErrorState = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2 text-center p-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <span className="text-sm text-muted-foreground">Failed to load image</span>
        {fallback && <div className="mt-2">{fallback}</div>}
      </div>
    </div>
  );

  // Render placeholder
  const renderPlaceholder = () => {
    if (placeholder === 'blur' && blurDataURL) {
      return (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
          }}
        />
      );
    }

    return (
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse" />
    );
  };

  // Render PDF icon for PDF files
  const renderPdfIcon = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
      <div className="flex flex-col items-center gap-2">
        <FileText className="w-12 h-12 text-brand-500" />
        <span className="text-sm text-muted-foreground">PDF Document</span>
      </div>
    </div>
  );

  // Render SVG icon for SVG files
  const renderSvgIcon = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
      <div className="flex flex-col items-center gap-2">
        <ImageIcon className="w-12 h-12 text-brand-500" />
        <span className="text-sm text-muted-foreground">Vector Graphic</span>
      </div>
    </div>
  );

  const containerStyle = {
    ...(width && { width }),
    ...(height && { height }),
    ...(aspectRatio && { aspectRatio }),
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={containerStyle}
    >
      {/* Placeholder */}
      {imageState.isLoading && !imageState.isLoaded && renderPlaceholder()}

      {/* Loading Spinner */}
      {imageState.isLoading && showLoadingSpinner && renderLoadingSpinner()}

      {/* Error State */}
      {imageState.hasError && renderErrorState()}

      {/* PDF Icon */}
      {imageType === 'pdf' && !imageState.hasError && renderPdfIcon()}

      {/* SVG Icon */}
      {imageType === 'svg' && !imageState.isLoaded && !imageState.hasError && renderSvgIcon()}

      {/* Actual Image */}
      {imageState.isInView && !imageState.hasError && (
        <img
          ref={imgRef}
          src={getOptimizedSrc(src)}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            imageState.isLoaded ? 'opacity-100' : 'opacity-0',
            `object-${objectFit}`,
            className
          )}
          style={{
            width: '100%',
            height: '100%',
          }}
          loading={priority ? 'eager' : loading}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
