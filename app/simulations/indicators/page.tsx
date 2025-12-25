'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { indicators, getIndicatorColor } from '@/lib/chemistry-utils';

export default function IndicatorsPage() {
    const [selectedPH, setSelectedPH] = useState(7);
    const [selectedIndicator, setSelectedIndicator] = useState(indicators[0]);



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
                            <span style={{ color: 'var(--color-primary-light)' }}>الكواشف</span>
                        </div>

                        <div className="section-header">
                            <h1>محاكاة <span className="gradient-text">الكواشف</span></h1>
                            <p>شاهد كيف تتغير ألوان الكواشف المختلفة حسب درجة الحموضة</p>
                        </div>

                        <div className="simulation-container">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                                {/* Controls */}
                                <div>
                                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>اختر الكاشف</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)' }}>
                                        {indicators.map((ind) => (
                                            <button
                                                key={ind.name}
                                                onClick={() => setSelectedIndicator(ind)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: 'var(--spacing-md)',
                                                    background: selectedIndicator.name === ind.name ? 'var(--color-bg-glass)' : 'var(--color-bg-tertiary)',
                                                    border: selectedIndicator.name === ind.name ? '2px solid var(--color-primary)' : '2px solid transparent',
                                                    borderRadius: 'var(--radius-lg)',
                                                    cursor: 'pointer',
                                                    color: 'var(--color-text-primary)',
                                                    fontFamily: 'inherit',
                                                    textAlign: 'right'
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{ind.nameAr}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                        نطاق التغير: pH {ind.transitionPH[0]} - {ind.transitionPH[1]}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: ind.acidColor, border: '2px solid var(--color-border)' }} />
                                                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: ind.baseColor, border: '2px solid var(--color-border)' }} />
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>حدد قيمة pH</h3>
                                    <div style={{ padding: 'var(--spacing-lg)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                                        <input
                                            type="range"
                                            min="0"
                                            max="14"
                                            step="0.5"
                                            value={selectedPH}
                                            onChange={(e) => setSelectedPH(parseFloat(e.target.value))}
                                            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-sm)' }}>
                                            <span>0</span>
                                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>pH = {selectedPH}</span>
                                            <span>14</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Display */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <motion.div
                                        animate={{ backgroundColor: getIndicatorColor(selectedIndicator, selectedPH) }}
                                        transition={{ duration: 0.5 }}
                                        className="beaker"
                                        style={{
                                            width: 200,
                                            height: 250,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <motion.div
                                            animate={{ backgroundColor: getIndicatorColor(selectedIndicator, selectedPH) }}
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: '70%',
                                                borderRadius: '0 0 17px 17px'
                                            }}
                                        />
                                    </motion.div>

                                    <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
                                        <h4>{selectedIndicator.nameAr}</h4>
                                        <p style={{ margin: 0 }}>
                                            {selectedPH < selectedIndicator.transitionPH[0]
                                                ? 'في الوسط الحمضي'
                                                : selectedPH > selectedIndicator.transitionPH[1]
                                                    ? 'في الوسط القاعدي'
                                                    : 'في منطقة التحول'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Indicator Info Table */}
                            <div style={{ marginTop: 'var(--spacing-2xl)' }}>
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>جدول الكواشف</h3>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>الكاشف</th>
                                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>نطاق pH</th>
                                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>لون حمضي</th>
                                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>لون قاعدي</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {indicators.map((ind) => (
                                                <tr key={ind.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: 'var(--spacing-md)' }}>{ind.nameAr}</td>
                                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>{ind.transitionPH[0]} - {ind.transitionPH[1]}</td>
                                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: ind.acidColor, margin: '0 auto', border: '2px solid var(--color-border)' }} />
                                                    </td>
                                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: ind.baseColor, margin: '0 auto', border: '2px solid var(--color-border)' }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
