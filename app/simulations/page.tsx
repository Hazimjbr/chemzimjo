'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Beaker, TestTube, Droplets, Flame, ChevronLeft, Atom } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const simulations = [
    {
        id: 'molecules',
        title: 'مكتبة الجزيئات ثلاثية الأبعاد',
        description: 'استكشف أكثر من 20 جزيء كيميائي بتقنية العرض ثلاثي الأبعاد التفاعلية',
        icon: Atom,
        color: 'var(--color-primary)',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        isNew: true
    },
    {
        id: 'ph-scale',
        title: 'محاكاة مقياس pH',
        description: 'اختبر pH لمواد مختلفة وشاهد كيف يتغير اللون على المقياس',
        icon: Beaker,
        color: 'var(--color-primary)',
        gradient: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-base) 100%)'
    },
    {
        id: 'titration',
        title: 'محاكاة المعايرة',
        description: 'أجرِ تجربة معايرة افتراضية وحدد نقطة التعادل',
        icon: TestTube,
        color: 'var(--color-neutral)',
        gradient: 'linear-gradient(135deg, var(--color-neutral) 0%, var(--color-base) 100%)'
    },
    {
        id: 'indicators',
        title: 'محاكاة الكواشف',
        description: 'شاهد كيف تتغير ألوان الكواشف المختلفة حسب pH',
        icon: Droplets,
        color: 'var(--color-acid)',
        gradient: 'linear-gradient(135deg, var(--color-acid) 0%, var(--color-warning) 100%)'
    },
    {
        id: 'neutralization',
        title: 'محاكاة تفاعل التعادل',
        description: 'شاهد ما يحدث عند تفاعل حمض مع قاعدة',
        icon: Flame,
        color: 'var(--color-warning)',
        gradient: 'linear-gradient(135deg, var(--color-warning) 0%, var(--color-acid) 100%)'
    }
];

export default function SimulationsPage() {
    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container">
                        <div className="section-header">
                            <h1>المحاكاة <span className="gradient-text">التفاعلية</span></h1>
                            <p>تجارب افتراضية تفاعلية لفهم مفاهيم الحموض والقواعد بشكل عملي</p>
                        </div>

                        <div className="grid-2">
                            {simulations.map((sim, index) => (
                                <motion.div
                                    key={sim.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/simulations/${sim.id}`} style={{ textDecoration: 'none' }}>
                                        <div
                                            className="glass-card"
                                            style={{
                                                cursor: 'pointer',
                                                height: '100%',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div style={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: 'var(--radius-xl)',
                                                background: sim.gradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: 'var(--spacing-lg)'
                                            }}>
                                                <sim.icon size={40} style={{ color: 'white' }} />
                                            </div>

                                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{sim.title}</h3>
                                            <p style={{ marginBottom: 'var(--spacing-lg)' }}>{sim.description}</p>

                                            <div className="btn btn-primary" style={{ width: '100%' }}>
                                                ابدأ المحاكاة
                                                <ChevronLeft size={20} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Info Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="info-box"
                            style={{ marginTop: 'var(--spacing-2xl)' }}
                        >
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>💡 نصيحة</h4>
                                <p style={{ margin: 0 }}>
                                    المحاكاة التفاعلية تساعدك على فهم المفاهيم بشكل أفضل.
                                    ننصحك بتجربة كل محاكاة بعد دراسة الدرس المتعلق بها.
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
