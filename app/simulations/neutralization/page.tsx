'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, Plus, Calculator, Thermometer } from 'lucide-react';
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
}

export default function NeutralizationPage() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [temperature, setTemperature] = useState(25);
    const [reactionCount, setReactionCount] = useState(0);

    // Initialize container dimensions
    const width = 300;
    const height = 400;

    const addAcid = () => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 5; i++) {
            newParticles.push({
                id: Math.random().toString(),
                type: 'H',
                x: Math.random() * width,
                y: 0,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2 + 2
            });
            newParticles.push({
                id: Math.random().toString(),
                type: 'Cl',
                x: Math.random() * width,
                y: 0,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2 + 2
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
    };

    const addBase = () => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 5; i++) {
            newParticles.push({
                id: Math.random().toString(),
                type: 'OH',
                x: Math.random() * width,
                y: 0,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2 + 2
            });
            newParticles.push({
                id: Math.random().toString(),
                type: 'Na',
                x: Math.random() * width,
                y: 0,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2 + 2
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
    };

    const reset = () => {
        setParticles([]);
        setTemperature(25);
        setReactionCount(0);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => {
                let nextParticles = prev.map(p => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    vx: (p.x + p.vx < 0 || p.x + p.vx > width) ? -p.vx : p.vx,
                    vy: (p.y + p.vy < 0 || p.y + p.vy > height) ? -p.vy : p.vy,
                }));

                // Check collisions and reactions
                const newWater: Particle[] = [];
                const reactedIds = new Set<string>();

                for (let i = 0; i < nextParticles.length; i++) {
                    for (let j = i + 1; j < nextParticles.length; j++) {
                        const p1 = nextParticles[i];
                        const p2 = nextParticles[j];

                        if (reactedIds.has(p1.id) || reactedIds.has(p2.id)) continue;

                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 20) { // Collision radius
                            if ((p1.type === 'H' && p2.type === 'OH') || (p1.type === 'OH' && p2.type === 'H')) {
                                reactedIds.add(p1.id);
                                reactedIds.add(p2.id);
                                newWater.push({
                                    id: Math.random().toString(),
                                    type: 'H2O',
                                    x: (p1.x + p2.x) / 2,
                                    y: (p1.y + p2.y) / 2,
                                    vx: (p1.vx + p2.vx) / 2,
                                    vy: (p1.vy + p2.vy) / 2
                                });
                            }
                        }
                    }
                }

                if (newWater.length > 0) {
                    setReactionCount(c => c + newWater.length);
                    setTemperature(t => Math.min(100, t + newWater.length * 2));
                }

                return [
                    ...nextParticles.filter(p => !reactedIds.has(p.id)),
                    ...newWater
                ];
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Cooling effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTemperature(t => Math.max(25, t - 0.5));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                            <Link href="/" style={{ color: 'var(--color-text-muted)' }}>الرئيسية</Link>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            <Link href="/simulations" style={{ color: 'var(--color-text-muted)' }}>المحاكاة</Link>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            <span style={{ color: 'var(--color-primary)' }}>تفاعل التعادل</span>
                        </div>

                        <div className="section-header">
                            <h1>محاكاة <span className="gradient-text">تفاعل التعادل</span></h1>
                            <p>شاهد تفاعل أيونات الهيدروجين مع أيونات الهيدروكسيد لتكوين الماء</p>
                        </div>

                        <div className="simulation-container">
                            <div className="simulation-header">
                                <h3 style={{ margin: 0 }}>تفاعل HCl مع NaOH</h3>
                                <button onClick={reset} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                    <RotateCcw size={16} />
                                    إعادة
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 250px', gap: 'var(--spacing-xl)' }}>
                                {/* Controls */}
                                <div className="glass-card">
                                    <h4 style={{ marginBottom: 'var(--spacing-lg)' }}>إضافة المواد</h4>

                                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                        <button onClick={addAcid} className="btn btn-acid" style={{ width: '100%', justifyContent: 'space-between' }}>
                                            <span>حمض (HCl)</span>
                                            <Plus size={20} />
                                        </button>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                                            يضيف أيونات H⁺ (أحمر) و Cl⁻ (أخضر)
                                        </p>
                                    </div>

                                    <div>
                                        <button onClick={addBase} className="btn btn-base" style={{ width: '100%', justifyContent: 'space-between' }}>
                                            <span>قاعدة (NaOH)</span>
                                            <Plus size={20} />
                                        </button>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                                            يضيف أيونات OH⁻ (أزرق) و Na⁺ (أصفر)
                                        </p>
                                    </div>

                                    <div style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                                        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>المفتاح</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-acid)' }} />
                                                <span style={{ fontSize: '0.875rem' }}>أيون الهيدروجين (H⁺)</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-base)' }} />
                                                <span style={{ fontSize: '0.875rem' }}>أيون الهيدروكسيد (OH⁻)</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary)' }} />
                                                <span style={{ fontSize: '0.875rem' }}>جزيء ماء (H₂O)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Simulation View */}
                                <div style={{
                                    height: 400,
                                    background: 'var(--color-bg-tertiary)',
                                    borderRadius: 'var(--radius-xl)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <AnimatePresence>
                                        {particles.map(p => (
                                            <motion.div
                                                key={p.id}
                                                initial={{ scale: 0 }}
                                                animate={{
                                                    x: p.x,
                                                    y: p.y,
                                                    scale: 1,
                                                    boxShadow: p.type === 'H2O' ? '0 0 10px var(--color-primary)' : 'none'
                                                }}
                                                exit={{ scale: 0 }}
                                                style={{
                                                    position: 'absolute',
                                                    width: p.type === 'H2O' ? 16 : 10,
                                                    height: p.type === 'H2O' ? 16 : 10,
                                                    borderRadius: '50%',
                                                    background:
                                                        p.type === 'H' ? 'var(--color-acid)' :
                                                            p.type === 'OH' ? 'var(--color-base)' :
                                                                p.type === 'H2O' ? 'var(--color-primary)' :
                                                                    p.type === 'Na' ? '#f1c40f' : '#2ecc71',
                                                    zIndex: p.type === 'H2O' ? 10 : 1
                                                }}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Stats */}
                                <div className="glass-card">
                                    <h4 style={{ marginBottom: 'var(--spacing-lg)' }}>النتائج</h4>

                                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: '0.5rem' }}>
                                            <Thermometer size={20} color={temperature > 30 ? 'var(--color-acid)' : 'var(--color-primary)'} />
                                            <span>درجة الحرارة</span>
                                        </div>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                            {temperature.toFixed(1)}°C
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                            تفاعل التعادل طارد للحرارة
                                        </p>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: '0.5rem' }}>
                                            <Calculator size={20} />
                                            <span>جزيئات الماء الناتجة</span>
                                        </div>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                            {reactionCount}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="chemical-equation" style={{ marginTop: 'var(--spacing-xl)' }}>
                                <span className="acid">H⁺</span>
                                <span>+</span>
                                <span className="base">OH⁻</span>
                                <span className="arrow">→</span>
                                <span className="neutral">H₂O</span>
                                <span style={{ marginRight: 'var(--spacing-lg)', fontSize: '0.875rem', color: 'var(--color-acid)' }}>
                                    + حرارة
                                </span>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="info-box"
                            style={{ marginTop: 'var(--spacing-2xl)' }}
                        >
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>💡 معلومة مهمة</h4>
                                <p style={{ margin: 0 }}>
                                    الأيونات الأخرى (Na⁺ و Cl⁻) تسمى "أيونات متفرجة" لأنها لا تشارك في تكوين الماء،
                                    لكنها تبقى ذائبة في المحلول لتكوين الملح (NaCl).
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
