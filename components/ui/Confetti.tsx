'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
    life: number;
}

export default function Confetti() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#fbbf24', '#ef4444', '#ec4899'];

        const createParticles = (count: number, originY: number = 0.6) => {
            const newParticles: Particle[] = [];
            for (let i = 0; i < count; i++) {
                newParticles.push({
                    x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                    y: window.innerHeight * originY,
                    vx: (Math.random() - 0.5) * 15,
                    vy: -Math.random() * 15 - 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 10 + 5,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 10,
                    life: 1,
                });
            }
            particlesRef.current.push(...newParticles);
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current = particlesRef.current.filter(p => p.life > 0);

            particlesRef.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.3; // gravity
                p.rotation += p.rotationSpeed;
                p.life -= 0.01;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                ctx.restore();
            });

            if (particlesRef.current.length > 0) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        const handleCelebrate = (e: CustomEvent<{ type: string }>) => {
            const type = e.detail?.type || 'default';
            const count = type === 'achievement' ? 150 : type === 'quiz' ? 100 : 80;
            createParticles(count, type === 'quiz' ? 0.3 : 0.6);

            cancelAnimationFrame(animationRef.current);
            animate();
        };

        window.addEventListener('celebrate', handleCelebrate as EventListener);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('celebrate', handleCelebrate as EventListener);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9998,
            }}
        />
    );
}

// Helper function to trigger celebration
export function celebrate(type: 'lesson' | 'quiz' | 'achievement' | 'default' = 'default') {
    window.dispatchEvent(new CustomEvent('celebrate', { detail: { type } }));
}
