'use client';

import React, { useEffect, useRef } from 'react';

export const EchoWavePattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const waves: {
      amplitude: number;
      frequency: number;
      phase: number;
      speed: number;
      color: string;
      lineWidth: number;
    }[] = [
      {
        amplitude: 50,
        frequency: 0.008,
        phase: 0,
        speed: 0.02,
        color: 'rgba(255, 255, 255, 0.15)',
        lineWidth: 1.5,
      },
      {
        amplitude: 70,
        frequency: 0.005,
        phase: 2,
        speed: -0.015,
        color: 'rgba(255, 255, 255, 0.08)',
        lineWidth: 1,
      },
      {
        amplitude: 35,
        frequency: 0.012,
        phase: 4,
        speed: 0.03,
        color: 'rgba(255, 255, 255, 0.2)',
        lineWidth: 2,
      },
      {
        amplitude: 100,
        frequency: 0.003,
        phase: 1,
        speed: 0.01,
        color: 'rgba(255, 255, 255, 0.04)',
        lineWidth: 0.8,
      },
      {
        amplitude: 45,
        frequency: 0.01,
        phase: 3,
        speed: -0.025,
        color: 'rgba(255, 255, 255, 0.12)',
        lineWidth: 1.2,
      },
    ];

    const ripples: {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
    }[] = [];

    // Initialize clean ripple patterns
    for (let i = 0; i < 4; i++) {
      ripples.push({
        x: width * 0.5,
        y: height * 0.5,
        radius: (i * Math.min(width, height)) / 4,
        maxRadius: Math.min(width, height) * 0.8,
        alpha: 1 - i * 0.25,
        speed: 0.8 + Math.random() * 0.4,
      });
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    }

    window.addEventListener('resize', handleResize);

    let animationFrameId: number = 0;
    const timeScale = 0.05;
    let localTime = 0;

    function drawGrid(w: number, h: number) {
      if (!ctx) return;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;

      const gridSize = 40;

      // Draw Grid Lines
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw concentric reference circles at center
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.2, 0, Math.PI * 2);
      ctx.stroke();
    }

    function drawTelemetry(w: number, h: number) {
      if (!ctx) return;

      // Render Technical telemetry markers
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.font = '300 9px Geist Mono, monospace';
      ctx.letterSpacing = '2px';

      // Left-Bottom telemetry
      ctx.fillText('[TIMBRE_ENGINE // ACTIVE]', 40, h - 80);
      ctx.fillText(
        `[FREQUENCY_LOAD // ${(120 + Math.sin(localTime * 2) * 5).toFixed(1)}Hz]`,
        40,
        h - 60
      );

      // Top-Right coordinates
      ctx.fillText(`LOC: Zurich, Switzerland`, w - 240, 60);
      ctx.fillText(`SYS.LATENCY: ${(80 + Math.sin(localTime * 3) * 4).toFixed(0)}ms`, w - 240, 80);

      // Center crosshair
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(w / 2 - 10, h / 2);
      ctx.lineTo(w / 2 + 10, h / 2);
      ctx.moveTo(w / 2, h / 2 - 10);
      ctx.lineTo(w / 2, h / 2 + 10);
      ctx.stroke();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = '#050506'; // Deep technical black backdrop
      ctx.fillRect(0, 0, width, height);

      localTime += timeScale;

      // 1. Draw grid pattern
      drawGrid(width, height);

      // 2. Draw Rippling concentric echo wave rings
      ripples.forEach((ripple) => {
        ripple.radius += ripple.speed;
        if (ripple.radius > ripple.maxRadius) {
          ripple.radius = 0;
          ripple.alpha = 1;
        }

        // Fade out as it approaches max radius
        ripple.alpha = Math.max(0, 1 - ripple.radius / ripple.maxRadius);

        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.08})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.5, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 3. Draw flowing acoustic wave lines
      waves.forEach((wave) => {
        wave.phase += wave.speed;

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;
        ctx.beginPath();

        for (let x = 0; x < width; x++) {
          // Attenuation towards edges to keep wave clean in center
          const borderFade = Math.sin((x / width) * Math.PI);
          const y =
            height / 2 +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude * borderFade * 0.8;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // 4. Render minimal telemetry
      drawTelemetry(width, height);

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
