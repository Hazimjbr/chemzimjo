'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, RotateCcw, Droplet, Play, Pause } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TitrationPage() {
    const [drops, setDrops] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const equivalencePoint = 25;
    const maxDrops = 50;

    const ph = drops < equivalencePoint
        ? 1 + (drops / equivalencePoint) * 6
        : 7 + ((drops - equivalencePoint) / (maxDrops - equivalencePoint)) * 7;

    const liquidColor = ph < 8.2
        ? '#f0f5ff' // Almost clear/white for acid
        : `hsl(300, ${Math.min(100, (ph - 8.2) * 40)}%, 75%)`; // Pink/Purple for base

    const addDrop = () => {
        if (drops < maxDrops) {
            setDrops(d => d + 1);
            if (drops + 1 === equivalencePoint) {
                setShowResult(true);
            }
        }
    };

    const reset = () => {
        setDrops(0);
        setShowResult(false);
        setIsRunning(false);
    };

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
                            <span style={{ color: 'var(--color-primary-light)' }}>المعايرة</span>
                        </div>

                        <div className="section-header">
                            <h1>محاكاة <span className="gradient-text">المعايرة</span></h1>
                            <p>أضف قاعدة NaOH إلى الحمض HCl وراقب نقطة التعادل</p>
                        </div>

                        <div className="simulation-container">
                            <div className="simulation-header">
                                <h3 style={{ margin: 0 }}>معايرة HCl بـ NaOH</h3>
                                <button onClick={reset} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                    <RotateCcw size={16} />
                                    إعادة
                                </button>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '3rem', padding: '2rem 0' }}>
                                {/* Burette */}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>السحاحة (NaOH)</div>
                                    <div style={{
                                        width: 40,
                                        height: 200,
                                        background: 'linear-gradient(to bottom, var(--color-base) 0%, var(--color-base) 50%, transparent 50%)',
                                        border: '2px solid var(--color-border)',
                                        borderRadius: '4px 4px 0 0',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: -30,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: 4,
                                            height: 30,
                                            background: 'var(--color-border)'
                                        }} />
                                    </div>
                                    <div style={{ marginTop: '2rem', fontSize: '1rem' }}>
                                        القطرات: <strong>{drops}</strong>
                                    </div>
                                </div>

                                {/* Flask */}
                                <div style={{ textAlign: 'center' }}>
                                    <div className="beaker" style={{ width: 180, height: 220 }}>
                                        <motion.div
                                            className="beaker-liquid"
                                            animate={{
                                                height: `${50 + drops}%`,
                                                backgroundColor: liquidColor
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        {showResult && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    background: 'var(--color-neutral)',
                                                    color: 'white',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.875rem',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                نقطة التعادل! 🎉
                                            </motion.div>
                                        )}
                                    </div>
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                        الدورق (HCl + فينولفثالين)
                                    </div>
                                </div>

                                {/* Controls & Info */}
                                <div className="glass-card" style={{ width: 250 }}>
                                    <h4 style={{ marginBottom: 'var(--spacing-md)' }}>التحكم</h4>

                                    <button
                                        onClick={addDrop}
                                        disabled={drops >= maxDrops}
                                        className="btn btn-base"
                                        style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
                                    >
                                        <Droplet size={18} />
                                        أضف قطرة
                                    </button>

                                    <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span>pH الحالي:</span>
                                            <span style={{
                                                fontWeight: 'bold',
                                                color: ph < 7 ? 'var(--color-acid)' : ph > 7 ? 'var(--color-base)' : 'var(--color-neutral)'
                                            }}>
                                                {ph.toFixed(1)}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>الحالة:</span>
                                            <span style={{
                                                fontWeight: 'bold',
                                                color: ph < 7 ? 'var(--color-acid)' : ph > 7 ? 'var(--color-base)' : 'var(--color-neutral)'
                                            }}>
                                                {ph < 6.5 ? 'حمضي' : ph > 7.5 ? 'قاعدي' : 'متعادل'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Equation */}
                            <div className="chemical-equation" style={{ marginTop: 'var(--spacing-xl)' }}>
                                <span className="acid">HCl</span>
                                <span>+</span>
                                <span className="base">NaOH</span>
                                <span className="arrow">→</span>
                                <span className="neutral">NaCl</span>
                                <span>+</span>
                                <span className="neutral">H₂O</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
