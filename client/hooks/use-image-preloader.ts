import { useState, useEffect, useCallback } from 'react';
import { preloadImages } from '@/lib/image-utils';

export interface UseImagePreloaderOptions {
  priority?: string[];
  delay?: number;
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export interface UseImagePreloaderReturn {
  isPreloading: boolean;
  progress: number;
  loadedCount: number;
  totalCount: number;
  errors: string[];
  preloadImages: (srcs: string[]) => Promise<void>;
}

export function useImagePreloader(options: UseImagePreloaderOptions = {}): UseImagePreloaderReturn {
  const {
    priority = [],
    delay = 0,
    onProgress,
    onComplete,
    onError,
  } = options;

  const [isPreloading, setIsPreloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const preloadImages = useCallback(async (srcs: string[]) => {
    if (srcs.length === 0) return;

    setIsPreloading(true);
    setProgress(0);
    setLoadedCount(0);
    setTotalCount(srcs.length);
    setErrors([]);

    try {
      // Add delay if specified
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Sort images by priority
      const sortedSrcs = [...srcs].sort((a, b) => {
        const aPriority = priority.includes(a) ? 0 : 1;
        const bPriority = priority.includes(b) ? 0 : 1;
        return aPriority - bPriority;
      });

      // Preload images with progress tracking
      const results = await Promise.allSettled(
        sortedSrcs.map(async (src, index) => {
          try {
            await preloadImages([src]);
            setLoadedCount(prev => {
              const newCount = prev + 1;
              const newProgress = (newCount / totalCount) * 100;
              setProgress(newProgress);
              onProgress?.(newCount, totalCount);
              return newCount;
            });
          } catch (error) {
            setErrors(prev => [...prev, src]);
            throw error;
          }
        })
      );

      // Check for errors
      const failedResults = results.filter(result => result.status === 'rejected');
      if (failedResults.length > 0) {
        const error = new Error(`${failedResults.length} images failed to load`);
        onError?.(error);
      }

      onComplete?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsPreloading(false);
    }
  }, [priority, delay, totalCount, onProgress, onComplete, onError]);

  return {
    isPreloading,
    progress,
    loadedCount,
    totalCount,
    errors,
    preloadImages,
  };
}
