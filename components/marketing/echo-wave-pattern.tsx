'use client';

import React, { useEffect, useRef } from 'react';

interface Capsule {
  trackC: number;
  x: number;
  speed: number;
  length: number;
  thickness: number;
  opacity: number;
}

export const EchoWavePattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Denser grid spacing matching the logo's diagonal aesthetic
    const trackSpacing = 45;
    const capsules: Capsule[] = [];

    // Initialize clean sliding capsules on specific diagonal tracks
    function initCapsules() {
      capsules.length = 0;
      const numTracks = Math.ceil((width + height) / trackSpacing);

      for (let i = 0; i < numTracks; i++) {
        const trackC = i * trackSpacing;

        // Increased density: almost every track gets capsules
        const numCapsulesOnTrack = Math.random() > 0.25 ? (Math.random() > 0.75 ? 2 : 1) : 0;

        for (let j = 0; j < numCapsulesOnTrack; j++) {
          capsules.push({
            trackC,
            x: Math.random() * (width + 300) - 150,
            speed: 0.12 + Math.random() * 0.38, // Slow, elegant motion
            length: 60 + Math.random() * 220, // Sleek capsules
            thickness: Math.random() > 0.65 ? 2.2 : 1.1, // Ultra-fine lines
            opacity: 0.04 + Math.random() * 0.12, // soft premium opacity
          });
        }
      }
    }

    initCapsules();

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      initCapsules();
    }

    window.addEventListener('resize', handleResize);

    let animationFrameId = 0;

    function animate() {
      if (!ctx || !canvas) return;

      // Deep technical charcoal background matching platform theme
      ctx.fillStyle = '#050506';
      ctx.fillRect(0, 0, width, height);

      // --- 1. Clean Radial Vignette ---
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, '#0a0a0d');
      gradient.addColorStop(1, '#020203');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // --- 2. Render Static Diagonal Guide Tracks ---
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
      ctx.lineWidth = 0.5;

      const numTracks = Math.ceil((width + height) / trackSpacing);
      for (let i = 0; i < numTracks; i++) {
        const c = i * trackSpacing;
        ctx.beginPath();
        ctx.moveTo(0, c);
        ctx.lineTo(c, 0);
        ctx.stroke();
      }

      // --- 3. Render Infinitely Sliding Capsules (Corner-to-Corner) ---
      capsules.forEach((capsule) => {
        // Move along the diagonal track (x increases, y decreases = slides bottom-left to top-right)
        capsule.x += capsule.speed;
        const y = capsule.trackC - capsule.x;

        // Wrap around smoothly once the capsule completely exits the rendering bounds
        const exitThreshold = capsule.length + 150;
        if (capsule.x > capsule.trackC + exitThreshold || capsule.x > width + exitThreshold) {
          capsule.x = -capsule.length - 100;
        }

        // Draw the sleek capsule with rounded caps
        ctx.strokeStyle = `rgba(255, 255, 255, ${capsule.opacity})`;
        ctx.lineWidth = capsule.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();

        const halfLen = capsule.length / 2;
        // Slope = -1 (dy/dx = -1), so angle is -45 degrees
        const dx = halfLen * Math.cos(Math.PI / 4);
        const dy = halfLen * Math.sin(Math.PI / 4);

        ctx.moveTo(capsule.x - dx, y + dy);
        ctx.lineTo(capsule.x + dx, y - dy);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    />
  );
};
