'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CountingNumberProps {
  value: number;
  duration?: number;
  format?: 'currency-b' | 'percent' | 'k' | 'default';
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const CountingNumber = ({
  value,
  duration = 2000,
  format = 'default',
}: CountingNumberProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            startAnimation();
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated, value]);

  const startAnimation = () => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = easeOutExpo(progress);
      setCount(easeProgress * value);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const formatValue = (val: number) => {
    if (format === 'percent') return val.toFixed(1);
    if (format === 'currency-b') return val.toFixed(2);
    if (format === 'k') return Math.floor(val);
    if (Number.isInteger(value)) return Math.floor(val);
    return val.toFixed(1);
  };

  return <span ref={elementRef}>{formatValue(count)}</span>;
};
