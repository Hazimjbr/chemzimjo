'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AchievementsGrid from '@/components/gamification/AchievementsGrid';
import { Trophy, Medal, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AchievementsPage() {
    const [unlockedCount, setUnlockedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('unlockedAchievements');
        if (saved) {
            setUnlockedCount(JSON.parse(saved).length);
        }
        setTotalCount(12); // Total achievements
    }, []);

    const percentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
                <div className="container" style={{ padding: '2rem 1.5rem' }}>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-header"
                        style={{ marginBottom: '2rem' }}
                    >
                        <h1 className="gradient-text" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                            <Trophy size={36} />
                            الإنجازات
                        </h1>
                        <p>اجمع الإنجازات واكسب المكافآت بإكمال التحديات</p>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '2rem'
                        }}
                    >
                        <div className="glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                            <Medal size={32} style={{ color: '#fbbf24', marginBottom: '0.5rem' }} />
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.25rem', color: '#fbbf24' }}>
                                {unlockedCount}
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>إنجاز مُفتح</p>
                        </div>

                        <div className="glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                            <Target size={32} style={{ color: '#8b5cf6', marginBottom: '0.5rem' }} />
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.25rem', color: '#8b5cf6' }}>
                                {totalCount - unlockedCount}
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>إنجاز متبقي</p>
                        </div>

                        <div className="glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                            <div style={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background: `conic-gradient(#10b981 ${percentage * 3.6}deg, var(--color-bg-tertiary) 0deg)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 0.5rem'
                            }}>
                                <div style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    background: 'var(--color-bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: '#10b981'
                                }}>
                                    {percentage}%
                                </div>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>نسبة الإكمال</p>
                        </div>
                    </motion.div>

                    {/* Achievements Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 style={{ marginBottom: '1.5rem' }}>جميع الإنجازات</h2>
                        <AchievementsGrid />
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
