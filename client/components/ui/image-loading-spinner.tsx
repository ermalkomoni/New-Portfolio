import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';

export interface ImageLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'pulse' | 'dots' | 'skeleton';
  showText?: boolean;
  text?: string;
  className?: string;
  imageType?: 'raster' | 'svg' | 'pdf' | 'unknown';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

const ImageLoadingSpinner: React.FC<ImageLoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  showText = true,
  text = 'Loading...',
  className = '',
  imageType = 'raster',
}) => {
  const getIcon = () => {
    switch (imageType) {
      case 'pdf':
        return <FileText className={sizeClasses[size]} />;
      case 'svg':
        return <ImageIcon className={sizeClasses[size]} />;
      default:
        return <Loader2 className={cn(sizeClasses[size], 'animate-spin')} />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-transparent';
      case 'pulse':
        return 'bg-muted/50 animate-pulse';
      case 'dots':
        return 'bg-muted/50';
      case 'skeleton':
        return 'bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 animate-pulse';
      default:
        return 'bg-muted/50 backdrop-blur-sm';
    }
  };

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full bg-brand-500 animate-bounce',
                size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-1.5 h-1.5' : 'w-2 h-2'
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.6s',
              }}
            />
          ))}
        </div>
        {showText && (
          <span className={cn('ml-2 text-muted-foreground', textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <div className={cn('w-full h-full', getVariantStyles())} />
        <div className="absolute inset-0 flex items-center justify-center">
          {showText && (
            <span className={cn('text-muted-foreground', textSizeClasses[size])}>
              {text}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <div className={cn('flex items-center justify-center p-4 rounded-lg', getVariantStyles())}>
        <div className="text-brand-500">
          {getIcon()}
        </div>
      </div>
      {showText && (
        <span className={cn('text-muted-foreground text-center', textSizeClasses[size])}>
          {text}
        </span>
      )}
    </div>
  );
};

export default ImageLoadingSpinner;
