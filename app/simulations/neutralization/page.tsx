'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, Plus, Droplets, Thermometer, FlaskConical, Beaker } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Particle {
    id: string;
    type: 'H' | 'OH' | 'H2O' | 'Na' | 'Cl';
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

const BEAKER_WIDTH = 400;
const BEAKER_HEIGHT = 350;
const PARTICLE_RADIUS = 8;

export default function NeutralizationPage() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [temperature, setTemperature] = useState(25);
    const [waterCount, setWaterCount] = useState(0);
    const [acidAdded, setAcidAdded] = useState(0);
    const [baseAdded, setBaseAdded] = useState(0);
    const animationRef = useRef<number>();

    const getParticleColor = (type: string) => {
        switch (type) {
            case 'H': return '#ef4444'; // Red
            case 'OH': return '#3b82f6'; // Blue
            case 'H2O': return '#8b5cf6'; // Purple
            case 'Na': return '#f59e0b'; // Yellow/Orange
            case 'Cl': return '#22c55e'; // Green
            default: return '#ffffff';
        }
    };

    const getParticleLabel = (type: string) => {
        switch (type) {
            case 'H': return 'H⁺';
            case 'OH': return 'OH⁻';
            case 'H2O': return 'H₂O';
            case 'Na': return 'Na⁺';
            case 'Cl': return 'Cl⁻';
            default: return '';
        }
    };

    const addAcid = useCallback(() => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 3; i++) {
            // H+ ion
            newParticles.push({
                id: `h-${Date.now()}-${i}`,
                type: 'H',
                x: 50 + Math.random() * (BEAKER_WIDTH - 100),
                y: 30 + Math.random() * 30,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 2 + 1,
                size: PARTICLE_RADIUS
            });
            // Cl- ion
            newParticles.push({
                id: `cl-${Date.now()}-${i}`,
                type: 'Cl',
                x: 50 + Math.random() * (BEAKER_WIDTH - 100),
                y: 30 + Math.random() * 30,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 2 + 1,
                size: PARTICLE_RADIUS - 2
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
        setAcidAdded(prev => prev + 3);
    }, []);

    const addBase = useCallback(() => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 3; i++) {
            // OH- ion
            newParticles.push({
                id: `oh-${Date.now()}-${i}`,
                type: 'OH',
                x: 50 + Math.random() * (BEAKER_WIDTH - 100),
                y: 30 + Math.random() * 30,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 2 + 1,
                size: PARTICLE_RADIUS
            });
            // Na+ ion
            newParticles.push({
                id: `na-${Date.now()}-${i}`,
                type: 'Na',
                x: 50 + Math.random() * (BEAKER_WIDTH - 100),
                y: 30 + Math.random() * 30,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 2 + 1,
                size: PARTICLE_RADIUS - 2
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
        setBaseAdded(prev => prev + 3);
    }, []);

    const reset = useCallback(() => {
        setParticles([]);
        setTemperature(25);
        setWaterCount(0);
        setAcidAdded(0);
        setBaseAdded(0);
    }, []);

    // Animation loop
    useEffect(() => {
        const animate = () => {
            setParticles(prev => {
                const updated = prev.map(p => {
                    let newX = p.x + p.vx;
                    let newY = p.y + p.vy;
                    let newVx = p.vx;
                    let newVy = p.vy;

                    // Add gravity
                    newVy += 0.1;

                    // Bounce off walls
                    if (newX <= p.size || newX >= BEAKER_WIDTH - p.size) {
                        newVx = -newVx * 0.8;
                        newX = Math.max(p.size, Math.min(BEAKER_WIDTH - p.size, newX));
                    }
                    if (newY <= p.size || newY >= BEAKER_HEIGHT - p.size) {
                        newVy = -newVy * 0.6;
                        newY = Math.max(p.size, Math.min(BEAKER_HEIGHT - p.size, newY));
                    }

                    // Add friction
                    newVx *= 0.99;
                    newVy *= 0.99;

                    return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
                });

                // Check for H + OH reactions
                const reacted = new Set<string>();
                const newWater: Particle[] = [];

                for (let i = 0; i < updated.length; i++) {
                    for (let j = i + 1; j < updated.length; j++) {
                        const p1 = updated[i];
                        const p2 = updated[j];

                        if (reacted.has(p1.id) || reacted.has(p2.id)) continue;

                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 20) {
                            if ((p1.type === 'H' && p2.type === 'OH') || (p1.type === 'OH' && p2.type === 'H')) {
                                reacted.add(p1.id);
                                reacted.add(p2.id);
                                newWater.push({
                                    id: `water-${Date.now()}-${i}-${j}`,
                                    type: 'H2O',
                                    x: (p1.x + p2.x) / 2,
                                    y: (p1.y + p2.y) / 2,
                                    vx: (p1.vx + p2.vx) / 2,
                                    vy: (p1.vy + p2.vy) / 2,
                                    size: PARTICLE_RADIUS + 2
                                });
                            }
                        }
                    }
                }

                if (newWater.length > 0) {
                    setWaterCount(c => c + newWater.length);
                    setTemperature(t => Math.min(100, t + newWater.length * 3));
                }

                return [...updated.filter(p => !reacted.has(p.id)), ...newWater];
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    // Cooling effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTemperature(t => Math.max(25, t - 0.3));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const getPH = () => {
        const hCount = particles.filter(p => p.type === 'H').length;
        const ohCount = particles.filter(p => p.type === 'OH').length;
        if (hCount > ohCount) return Math.max(1, 7 - (hCount - ohCount) * 0.5);
        if (ohCount > hCount) return Math.min(14, 7 + (ohCount - hCount) * 0.5);
        return 7;
    };

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--color-bg)' }}>
                <section className="section">
                    <div className="container">
                        {/* Breadcrumb */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <Link href="/" style={{ color: 'var(--color-text-muted)' }}>الرئيسية</Link>
                            <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
                            <Link href="/simulations" style={{ color: 'var(--color-text-muted)' }}>المحاكاة</Link>
                            <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
                            <span style={{ color: 'var(--color-primary)' }}>تفاعل التعادل</span>
                        </div>

                        {/* Title */}
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: 12 }}>
                                محاكاة <span className="gradient-text">تفاعل التعادل</span>
                            </h1>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                                HCl + NaOH → NaCl + H₂O
                            </p>
                        </div>

                        {/* Main Content */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 450px 1fr',
                            gap: 24,
                            alignItems: 'start'
                        }}>
                            {/* Left Panel - Controls */}
                            <div className="glass-card" style={{ padding: 24 }}>
                                <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <FlaskConical size={20} />
                                    إضافة المواد
                                </h3>

                                <button
                                    onClick={addAcid}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                        border: 'none',
                                        borderRadius: 12,
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 8,
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <span>+ حمض HCl</span>
                                    <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>أضيف: {acidAdded}</span>
                                </button>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
                                    يضيف أيونات H⁺ (أحمر) و Cl⁻ (أخضر)
                                </p>

                                <button
                                    onClick={addBase}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                        border: 'none',
                                        borderRadius: 12,
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 8,
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <span>+ قاعدة NaOH</span>
                                    <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>أضيف: {baseAdded}</span>
                                </button>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 24 }}>
                                    يضيف أيونات OH⁻ (أزرق) و Na⁺ (برتقالي)
                                </p>

                                <button
                                    onClick={reset}
                                    style={{
                                        width: '100%',
                                        padding: '12px 20px',
                                        background: 'transparent',
                                        border: '2px solid var(--color-border)',
                                        borderRadius: 12,
                                        color: 'var(--color-text)',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8
                                    }}
                                >
                                    <RotateCcw size={16} />
                                    إعادة التجربة
                                </button>

                                {/* Legend */}
                                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-border)' }}>
                                    <h4 style={{ marginBottom: 12, fontSize: '0.95rem' }}>المفتاح</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {[
                                            { color: '#ef4444', label: 'H⁺ أيون الهيدروجين' },
                                            { color: '#3b82f6', label: 'OH⁻ أيون الهيدروكسيد' },
                                            { color: '#8b5cf6', label: 'H₂O جزيء الماء' },
                                            { color: '#f59e0b', label: 'Na⁺ أيون الصوديوم' },
                                            { color: '#22c55e', label: 'Cl⁻ أيون الكلور' },
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{
                                                    width: 14,
                                                    height: 14,
                                                    borderRadius: '50%',
                                                    background: item.color,
                                                    boxShadow: `0 0 8px ${item.color}50`
                                                }} />
                                                <span style={{ fontSize: '0.85rem' }}>{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Center - Beaker */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/* Beaker Container */}
                                <div style={{
                                    width: BEAKER_WIDTH + 20,
                                    height: BEAKER_HEIGHT + 40,
                                    position: 'relative',
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)',
                                    borderRadius: '8px 8px 30px 30px',
                                    border: '3px solid rgba(255,255,255,0.2)',
                                    borderTop: '3px solid rgba(255,255,255,0.3)',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.3), inset 0 0 60px rgba(255,255,255,0.05)'
                                }}>
                                    {/* Water level indicator */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: `${Math.min(80, 20 + particles.length * 2)}%`,
                                        background: 'linear-gradient(180deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.3) 100%)',
                                        transition: 'height 0.5s ease',
                                        borderRadius: '0 0 27px 27px'
                                    }} />

                                    {/* Particles */}
                                    <AnimatePresence>
                                        {particles.map(p => (
                                            <motion.div
                                                key={p.id}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1,
                                                    left: p.x,
                                                    top: p.y
                                                }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{ type: 'spring', damping: 20 }}
                                                style={{
                                                    position: 'absolute',
                                                    width: p.size * 2,
                                                    height: p.size * 2,
                                                    borderRadius: '50%',
                                                    background: `radial-gradient(circle at 30% 30%, ${getParticleColor(p.type)}, ${getParticleColor(p.type)}99)`,
                                                    boxShadow: `0 0 ${p.type === 'H2O' ? 15 : 8}px ${getParticleColor(p.type)}80`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.6rem',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                                    transform: 'translate(-50%, -50%)',
                                                    zIndex: p.type === 'H2O' ? 10 : 5
                                                }}
                                            >
                                                {p.type === 'H2O' && '💧'}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Beaker label */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontSize: '0.75rem',
                                        color: 'rgba(255,255,255,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    }}>
                                        <Beaker size={14} />
                                        وعاء التفاعل
                                    </div>
                                </div>

                                {/* Equation */}
                                <div style={{
                                    marginTop: 20,
                                    padding: '16px 24px',
                                    background: 'var(--color-bg-secondary)',
                                    borderRadius: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    fontSize: '1.1rem',
                                    fontWeight: 500
                                }}>
                                    <span style={{ color: '#ef4444' }}>H⁺</span>
                                    <span>+</span>
                                    <span style={{ color: '#3b82f6' }}>OH⁻</span>
                                    <span style={{ color: 'var(--color-primary)' }}>→</span>
                                    <span style={{ color: '#8b5cf6' }}>H₂O</span>
                                    <span style={{ fontSize: '0.85rem', color: '#ef4444' }}>+ حرارة</span>
                                </div>
                            </div>

                            {/* Right Panel - Stats */}
                            <div className="glass-card" style={{ padding: 24 }}>
                                <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    📊 النتائج
                                </h3>

                                {/* Temperature */}
                                <div style={{
                                    padding: 16,
                                    background: temperature > 30 ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                                    borderRadius: 12,
                                    marginBottom: 16,
                                    border: `1px solid ${temperature > 30 ? 'rgba(239,68,68,0.3)' : 'rgba(59,130,246,0.3)'}`
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <Thermometer size={18} color={temperature > 30 ? '#ef4444' : '#3b82f6'} />
                                        <span style={{ fontSize: '0.9rem' }}>درجة الحرارة</span>
                                    </div>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 'bold',
                                        color: temperature > 30 ? '#ef4444' : 'var(--color-text)'
                                    }}>
                                        {temperature.toFixed(1)}°C
                                    </div>
                                    {temperature > 25 && (
                                        <div style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: 4 }}>
                                            ⚡ تفاعل طارد للحرارة
                                        </div>
                                    )}
                                </div>

                                {/* Water molecules */}
                                <div style={{
                                    padding: 16,
                                    background: 'rgba(139,92,246,0.1)',
                                    borderRadius: 12,
                                    marginBottom: 16,
                                    border: '1px solid rgba(139,92,246,0.3)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <Droplets size={18} color="#8b5cf6" />
                                        <span style={{ fontSize: '0.9rem' }}>جزيئات الماء</span>
                                    </div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                                        {waterCount}
                                    </div>
                                </div>

                                {/* pH */}
                                <div style={{
                                    padding: 16,
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: 12,
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <span style={{ fontSize: '0.9rem' }}>الرقم الهيدروجيني pH</span>
                                    </div>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                        color: getPH() < 7 ? '#ef4444' : getPH() > 7 ? '#3b82f6' : '#22c55e'
                                    }}>
                                        {getPH().toFixed(1)}
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: 8,
                                        background: 'linear-gradient(90deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #8b5cf6)',
                                        borderRadius: 4,
                                        marginTop: 8,
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: -3,
                                            left: `${(getPH() / 14) * 100}%`,
                                            width: 14,
                                            height: 14,
                                            background: 'white',
                                            borderRadius: '50%',
                                            border: '2px solid var(--color-bg)',
                                            transform: 'translateX(-50%)'
                                        }} />
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '0.7rem',
                                        color: 'var(--color-text-muted)',
                                        marginTop: 4
                                    }}>
                                        <span>حمضي (0)</span>
                                        <span>متعادل (7)</span>
                                        <span>قاعدي (14)</span>
                                    </div>
                                </div>

                                {/* Particle counts */}
                                <div style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                    <div>H⁺: {particles.filter(p => p.type === 'H').length}</div>
                                    <div>OH⁻: {particles.filter(p => p.type === 'OH').length}</div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                marginTop: 40,
                                padding: 24,
                                background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))',
                                borderRadius: 16,
                                border: '1px solid rgba(139,92,246,0.3)'
                            }}
                        >
                            <h4 style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                💡 معلومات مهمة
                            </h4>
                            <ul style={{ margin: 0, paddingRight: 20, lineHeight: 1.8 }}>
                                <li>عند تفاعل أيون H⁺ مع أيون OH⁻ يتكون جزيء ماء H₂O</li>
                                <li>التفاعل طارد للحرارة - لاحظ ارتفاع درجة الحرارة</li>
                                <li>أيونات Na⁺ و Cl⁻ تسمى "أيونات متفرجة" لأنها لا تشارك في التفاعل</li>
                                <li>عند التعادل التام (pH = 7) يكون عدد أيونات H⁺ = عدد أيونات OH⁻</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
