import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  active: boolean;
  type: 'win' | 'draw' | null;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle';
  opacity: number;
  fade: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ active, type }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Vibrant pastel palette matching the light modern theme
    const colors = [
      '#6366f1', // Indigo
      '#3b82f6', // Blue
      '#10b981', // Emerald
      '#14b8a6', // Teal
      '#ec4899', // Pink
      '#f59e0b', // Amber
      '#8b5cf6', // Violet
    ];

    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];

    const createParticle = (x: number, y: number, isBurst = false): Particle => {
      const angle = isBurst ? Math.random() * Math.PI * 2 : Math.random() * Math.PI + Math.PI; // Upwards or all directions
      const speed = isBurst ? Math.random() * 8 + 4 : Math.random() * 5 + 2;

      return {
        x,
        y,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - (isBurst ? 0 : 2), // upward bias
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
        fade: Math.random() * 0.01 + 0.005,
      };
    };

    // Spawn a burst of particles initially
    if (active) {
      const particleCount = type === 'win' ? 120 : 60;
      for (let i = 0; i < particleCount; i++) {
        // Burst from different screen positions or side borders
        if (type === 'win') {
          // Burst from left and right bottom corners
          particlesRef.current.push(createParticle(50, canvas.height - 50, true));
          particlesRef.current.push(createParticle(canvas.width - 50, canvas.height - 50, true));
        } else {
          // Draw: Float gently from center
          particlesRef.current.push(createParticle(canvas.width / 2, canvas.height / 2, true));
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Continuous gentle trickle if active
      if (active && particlesRef.current.length < 150 && Math.random() < 0.25) {
        if (type === 'win') {
          // Cascade from top or corners
          particlesRef.current.push(createParticle(Math.random() * canvas.width, -10));
        } else {
          // Gentle float up from bottom
          particlesRef.current.push(createParticle(Math.random() * canvas.width, canvas.height + 10));
        }
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        // Update physics
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += type === 'win' ? 0.12 : -0.02; // gravity pulls down for win, floats up for draw
        p.rotation += p.rotationSpeed;
        p.opacity -= p.fade;

        if (p.opacity <= 0 || p.y > canvas.height + 20 || p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          return false;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        if (p.shape === 'circle') {
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        } else if (p.shape === 'square') {
          ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === 'triangle') {
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        return true;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    if (active) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = [];
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active, type]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-700 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};
