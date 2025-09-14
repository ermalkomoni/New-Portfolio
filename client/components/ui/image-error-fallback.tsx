import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, RefreshCw, Image as ImageIcon, FileText } from 'lucide-react';
import { Button } from './button';

export interface ImageErrorFallbackProps {
  onRetry?: () => void;
  className?: string;
  imageType?: 'raster' | 'svg' | 'pdf' | 'unknown';
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRetryButton?: boolean;
  customMessage?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

const ImageErrorFallback: React.FC<ImageErrorFallbackProps> = ({
  onRetry,
  className = '',
  imageType = 'raster',
  alt = 'Failed to load image',
  size = 'md',
  showRetryButton = true,
  customMessage,
}) => {
  const getIcon = () => {
    switch (imageType) {
      case 'pdf':
        return <FileText className={sizeClasses[size]} />;
      case 'svg':
        return <ImageIcon className={sizeClasses[size]} />;
      default:
        return <AlertCircle className={sizeClasses[size]} />;
    }
  };

  const getDefaultMessage = () => {
    switch (imageType) {
      case 'pdf':
        return 'Failed to load PDF document';
      case 'svg':
        return 'Failed to load vector graphic';
      default:
        return 'Failed to load image';
    }
  };

  const message = customMessage || getDefaultMessage();

  return (
    <div className={cn(
      'flex flex-col items-center justify-center gap-3 p-6 bg-muted/50 backdrop-blur-sm rounded-lg',
      className
    )}>
      <div className="text-destructive">
        {getIcon()}
      </div>
      
      <div className="text-center space-y-1">
        <p className={cn('text-muted-foreground font-medium', textSizeClasses[size])}>
          {message}
        </p>
        {alt && (
          <p className={cn('text-muted-foreground/70', textSizeClasses[size === 'xl' ? 'lg' : 'sm'])}>
            {alt}
          </p>
        )}
      </div>

      {showRetryButton && onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ImageErrorFallback;
