'use client';

import { motion } from 'framer-motion';
import { BookOpen, Target, Users, Award, Heart, Sparkles, GraduationCap, Beaker } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const features = [
    {
        icon: BookOpen,
        title: '8 دروس شاملة',
        description: 'محتوى تعليمي متكامل يغطي جميع مواضيع الحموض والقواعد حسب المنهاج الأردني'
    },
    {
        icon: Beaker,
        title: 'محاكاة تفاعلية',
        description: 'تجارب افتراضية تفاعلية تساعد على فهم المفاهيم العملية بشكل أعمق'
    },
    {
        icon: GraduationCap,
        title: 'اختبارات ذاتية',
        description: 'أسئلة متنوعة مع شروحات مفصلة لتقييم مستوى الفهم'
    },
    {
        icon: Sparkles,
        title: 'تصميم عصري',
        description: 'واجهة مستخدم حديثة وسهلة الاستخدام تدعم اللغة العربية بالكامل'
    }
];

const goals = [
    'تبسيط المفاهيم الكيميائية المعقدة',
    'توفير تجربة تعليمية تفاعلية وممتعة',
    'مطابقة المحتوى للمنهاج الأردني 2025',
    'دعم التعلم الذاتي للطلاب',
    'توفير أدوات تقييم فعالة'
];

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                {/* Hero Section */}
                <section className="section" style={{ background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div style={{
                                width: 80,
                                height: 80,
                                margin: '0 auto var(--spacing-lg)',
                                borderRadius: 'var(--radius-2xl)',
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-base) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Beaker size={40} color="white" />
                            </div>
                            <h1>
                                عن <span className="gradient-text">الكيمياء التفاعلية</span>
                            </h1>
                            <p style={{ maxWidth: 700, margin: '0 auto', fontSize: '1.125rem' }}>
                                منصة تعليمية متكاملة تهدف إلى تسهيل فهم مادة الحموض والقواعد
                                للطلاب الأردنيين من خلال محتوى تفاعلي ومحاكاة مختبرية افتراضية
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="section">
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-2xl)', alignItems: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                                    <Target size={32} style={{ color: 'var(--color-primary)' }} />
                                    <h2 style={{ margin: 0 }}>رسالتنا</h2>
                                </div>
                                <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                                    نسعى لتقديم تجربة تعليمية فريدة تجعل من دراسة الكيمياء متعة حقيقية.
                                    نؤمن بأن التعلم التفاعلي والمرئي يساعد الطلاب على فهم المفاهيم العلمية
                                    بشكل أعمق وأكثر استدامة.
                                </p>
                                <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                                    تم تصميم هذه المنصة خصيصاً لطلاب المنهاج الأردني 2025،
                                    مع مراعاة احتياجاتهم التعليمية وأساليب التعلم المختلفة.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="glass-card"
                            >
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <Award size={24} style={{ color: 'var(--color-warning)', marginLeft: 'var(--spacing-sm)' }} />
                                    أهدافنا
                                </h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    {goals.map((goal, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}
                                        >
                                            <span style={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: '50%',
                                                background: 'var(--color-neutral)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                flexShrink: 0
                                            }}>
                                                ✓
                                            </span>
                                            {goal}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                    <div className="container">
                        <div className="section-header">
                            <h2>مميزات <span className="gradient-text">المنصة</span></h2>
                            <p>كل ما تحتاجه لفهم الحموض والقواعد في مكان واحد</p>
                        </div>

                        <div className="grid-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card"
                                    style={{ textAlign: 'center' }}
                                >
                                    <div style={{
                                        width: 64,
                                        height: 64,
                                        margin: '0 auto var(--spacing-md)',
                                        borderRadius: 'var(--radius-xl)',
                                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-base) 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <feature.icon size={32} color="white" />
                                    </div>
                                    <h4>{feature.title}</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Curriculum Section */}
                <section className="section">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card"
                            style={{
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                                border: '1px solid var(--color-primary)'
                            }}
                        >
                            <Users size={48} style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }} />
                            <h2>مصمم للمنهاج الأردني 2025</h2>
                            <p style={{ maxWidth: 600, margin: '0 auto var(--spacing-xl)' }}>
                                تم إعداد المحتوى التعليمي بعناية ليتوافق مع متطلبات المنهاج الأردني،
                                مع التركيز على النتاجات التعليمية المطلوبة وتغطية جميع المفاهيم الأساسية.
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/lessons" className="btn btn-primary btn-lg">
                                    ابدأ التعلم
                                </Link>
                                <Link href="/simulations" className="btn btn-outline btn-lg">
                                    جرب المحاكاة
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer CTA */}
                <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            style={{ textAlign: 'center' }}
                        >
                            <Heart size={48} style={{ color: 'var(--color-acid)', marginBottom: 'var(--spacing-md)' }} />
                            <h2>صُنع بحب للتعليم</h2>
                            <p style={{ maxWidth: 500, margin: '0 auto' }}>
                                نأمل أن تساعدك هذه المنصة في رحلتك التعليمية.
                                نتمنى لك التوفيق والنجاح! 🎓
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
