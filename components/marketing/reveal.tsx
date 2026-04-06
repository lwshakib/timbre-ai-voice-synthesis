'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  trigger?: string;
  delay?: number;
}

export const Reveal = ({ children, className, trigger, delay = 0 }: RevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={cn(
        isVisible ? 'is-visible' : 'opacity-0 translate-y-6 transition-all duration-700',
        className
      )}
      style={{ transitionDelay: `${delay}s` }}
      data-trigger={trigger}
    >
      {children}
    </div>
  );
};
