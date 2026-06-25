'use client';

import { type CSSProperties } from 'react';

interface SafeImgProps {
  src?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: 'lazy' | 'eager';
  width?: number | string;
  height?: number | string;
}

/**
 * Image with empty-src guard.
 *
 * Renders a placeholder div instead of <img> when src is empty/null/undefined,
 * preventing the browser from downloading the whole page again (the cause of
 * the React warning "An empty string was passed to the src attribute").
 */
export function SafeImg({
  src,
  alt,
  className,
  style,
  loading,
  width,
  height,
}: SafeImgProps) {
  if (!src || src.trim() === '') {
    return (
      <div
        className={`${className ?? ''} dv-safe-img-placeholder`}
        style={style}
        aria-label={alt}
        role="img"
      >
        <span>Нет изображения</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading ?? 'lazy'}
      width={width}
      height={height}
    />
  );
}
