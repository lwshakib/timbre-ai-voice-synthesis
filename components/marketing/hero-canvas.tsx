'use client';

import React, { useEffect, useRef } from 'react';

export const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dots: any[] = [];
    const spacing = 35;
    const mouse = { x: 0, y: 0, radius: 250, isActive: false };

    function resize() {
      if (!canvas) return;
      const width = (canvas.width = window.innerWidth);
      const hero = document.getElementById('hero');
      const height = (canvas.height = hero ? hero.offsetHeight : window.innerHeight);
      initGrid(width, height);
    }

    function initGrid(w: number, h: number) {
      dots.length = 0;
      const cols = Math.floor(w / spacing);
      const rows = Math.floor(h / spacing);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseAlpha: Math.random() * 0.15 + 0.02,
            alpha: 0,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    resize();

    let animationFrameId: number = 0;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bodyStyle = getComputedStyle(document.body);
      const primaryColor = bodyStyle.getPropertyValue('--primary').trim();
      const mutedColor = bodyStyle.getPropertyValue('--muted-foreground').trim();

      const time = Date.now() * 0.001;
      const rect = canvas.getBoundingClientRect();

      dots.forEach((dot) => {
        dot.alpha = dot.baseAlpha + Math.sin(time * 2 + dot.phase) * 0.05;
        let drawRadius = 1;

        if (mouse.isActive) {
          const adjustedMouseX = mouse.x - rect.left;
          const adjustedMouseY = mouse.y - (rect.top + window.scrollY);

          const dx = adjustedMouseX - dot.x;
          const dy = adjustedMouseY - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            dot.alpha += force * 0.5;
            drawRadius += force * 1.5;

            if (Math.random() > 0.95 && dist < 100) {
              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(adjustedMouseX, adjustedMouseY);
              ctx.strokeStyle =
                primaryColor +
                Math.floor(force * 0.2 * 255)
                  .toString(16)
                  .padStart(2, '0');
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        dot.alpha = Math.max(0, Math.min(1, dot.alpha));

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, drawRadius, 0, Math.PI * 2);

        ctx.fillStyle =
          mutedColor +
          Math.floor(dot.alpha * 255)
            .toString(16)
            .padStart(2, '0');
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};
