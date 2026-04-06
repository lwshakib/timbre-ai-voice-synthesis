'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createNoise3D } from 'simplex-noise';

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
  waveYOffset = 250,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: 'slow' | 'fast';
  waveOpacity?: number;
  waveYOffset?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const ntRef = useRef(0);

  const getSpeed = useCallback(() => {
    switch (speed) {
      case 'slow':
        return 0.001;
      case 'fast':
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  const waveColors = colors ?? [
    '#d4b87a', // Gold
    '#c4a86a', // Darker gold
    '#828179', // Muted
    '#111111', // Accent
    '#d4b87a',
  ];

  const drawWave = useCallback(
    (n: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ntRef.current += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < dimensionsRef.current.w; x += 5) {
          const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx.lineTo(x, y + waveYOffset);
        }
        ctx.stroke();
        ctx.closePath();
      }
    },
    [getSpeed, noise, waveColors, waveWidth, waveYOffset]
  );

  const render = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = backgroundFill || 'transparent';
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.clearRect(0, 0, dimensionsRef.current.w, dimensionsRef.current.h);
    drawWave(5);
    animationIdRef.current = requestAnimationFrame(render);
  }, [backgroundFill, drawWave, waveOpacity]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;
    dimensionsRef.current.w = ctx.canvas.width = window.innerWidth;
    dimensionsRef.current.h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    ntRef.current = 0;
    render();
  }, [blur, render]);

  useEffect(() => {
    init();

    const handleResize = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      dimensionsRef.current.w = ctx.canvas.width = window.innerWidth;
      dimensionsRef.current.h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [blur, init]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== 'undefined' &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome')
    );
  }, []);

  return (
    <div className={cn('h-screen flex flex-col items-center justify-center', containerClassName)}>
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn('relative z-10', className)} {...props}>
        {children}
      </div>
    </div>
  );
};
