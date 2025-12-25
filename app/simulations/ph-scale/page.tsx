'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Info, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { commonSolutions, getPHColor, getPHDescription } from '@/lib/chemistry-utils';

export default function PHScalePage() {
    const [selectedSolution, setSelectedSolution] = useState<typeof commonSolutions[0] | null>(null);
    const [testedSolutions, setTestedSolutions] = useState<string[]>([]);

    const handleTest = (solution: typeof commonSolutions[0]) => {
        setSelectedSolution(solution);
        if (!testedSolutions.includes(solution.name)) {
            setTestedSolutions([...testedSolutions, solution.name]);
        }
    };

    const resetSimulation = () => {
        setSelectedSolution(null);
        setTestedSolutions([]);
    };

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container">
                        {/* Breadcrumb */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                            <Link href="/" style={{ color: 'var(--color-text-muted)' }}>الرئيسية</Link>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            <Link href="/simulations" style={{ color: 'var(--color-text-muted)' }}>المحاكاة</Link>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            <span style={{ color: 'var(--color-primary-light)' }}>مقياس pH</span>
                        </div>

                        <div className="section-header">
                            <h1>محاكاة مقياس <span className="gradient-text">pH</span></h1>
                            <p>اختر مادة من القائمة لاختبار قيمة pH الخاصة بها</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                            {/* Solutions List */}
                            <div className="glass-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                                    <h3 style={{ margin: 0 }}>المواد المتاحة</h3>
                                    <button onClick={resetSimulation} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                        <RotateCcw size={16} />
                                        إعادة
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', maxHeight: 400, overflowY: 'auto' }}>
                                    {commonSolutions.map((solution) => (
                                        <motion.button
                                            key={solution.name}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleTest(solution)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: 'var(--spacing-md)',
                                                background: selectedSolution?.name === solution.name
                                                    ? `${getPHColor(solution.ph)}20`
                                                    : 'var(--color-bg-tertiary)',
                                                border: selectedSolution?.name === solution.name
                                                    ? `2px solid ${getPHColor(solution.ph)}`
                                                    : '2px solid transparent',
                                                borderRadius: 'var(--radius-lg)',
                                                cursor: 'pointer',
                                                textAlign: 'right',
                                                color: 'var(--color-text-primary)',
                                                fontFamily: 'inherit'
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{solution.nameAr}</div>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{solution.formula}</div>
                                            </div>
                                            {testedSolutions.includes(solution.name) && (
                                                <span style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: 'var(--radius-full)',
                                                    background: getPHColor(solution.ph),
                                                    color: solution.ph > 5 && solution.ph < 9 ? '#000' : '#fff',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600
                                                }}>
                                                    pH {solution.ph}
                                                </span>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* pH Meter Display */}
                            <div className="glass-card">
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>جهاز قياس pH</h3>

                                {/* pH Scale */}
                                <div className="ph-meter" style={{ marginBottom: 'var(--spacing-xl)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                        <span className="badge badge-acid">حمضي</span>
                                        <span className="badge badge-neutral">متعادل</span>
                                        <span className="badge badge-base">قاعدي</span>
                                    </div>
                                    <div className="ph-scale-bar" style={{ position: 'relative' }}>
                                        {selectedSolution && (
                                            <motion.div
                                                className="ph-indicator"
                                                initial={{ left: '50%' }}
                                                animate={{ left: `${(selectedSolution.ph / 14) * 100}%` }}
                                                transition={{ type: 'spring', stiffness: 100 }}
                                            />
                                        )}
                                    </div>
                                    <div className="ph-labels">
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(n => (
                                            <span key={n}>{n}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Result Display */}
                                <motion.div
                                    key={selectedSolution?.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: 'var(--spacing-xl)',
                                        borderRadius: 'var(--radius-xl)',
                                        background: selectedSolution ? `${getPHColor(selectedSolution.ph)}20` : 'var(--color-bg-tertiary)',
                                        border: selectedSolution ? `2px solid ${getPHColor(selectedSolution.ph)}` : '2px solid var(--color-border)',
                                        textAlign: 'center'
                                    }}
                                >
                                    {selectedSolution ? (
                                        <>
                                            <div style={{ fontSize: '3rem', fontWeight: 700, color: getPHColor(selectedSolution.ph) }}>
                                                pH = {selectedSolution.ph}
                                            </div>
                                            <div style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>
                                                {selectedSolution.nameAr}
                                            </div>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '0.5rem 1rem',
                                                borderRadius: 'var(--radius-full)',
                                                background: selectedSolution.type === 'acid'
                                                    ? 'var(--color-acid)'
                                                    : selectedSolution.type === 'base'
                                                        ? 'var(--color-base)'
                                                        : 'var(--color-neutral)',
                                                color: 'white',
                                                fontWeight: 600
                                            }}>
                                                {getPHDescription(selectedSolution.ph)}
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ color: 'var(--color-text-muted)' }}>
                                            <Info size={48} style={{ marginBottom: 'var(--spacing-md)', opacity: 0.5 }} />
                                            <p style={{ margin: 0 }}>اختر مادة من القائمة لاختبارها</p>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Progress */}
                                <div style={{ marginTop: 'var(--spacing-lg)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)', fontSize: '0.875rem' }}>
                                        <span>المواد المختبرة</span>
                                        <span>{testedSolutions.length} / {commonSolutions.length}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${(testedSolutions.length / commonSolutions.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="info-box"
                            style={{ marginTop: 'var(--spacing-2xl)' }}
                        >
                            <Info size={24} style={{ color: 'var(--color-base)', flexShrink: 0 }} />
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>💡 هل تعلم؟</h4>
                                <p style={{ margin: 0 }}>
                                    مقياس pH لوغاريتمي، مما يعني أن كل درجة تمثل فرقاً بمقدار 10 أضعاف في تركيز أيونات الهيدروجين.
                                    فمثلاً محلول له pH=3 أكثر حموضة بـ 100 مرة من محلول له pH=5.
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
