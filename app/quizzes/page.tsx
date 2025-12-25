'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { quizzes } from '@/lib/quiz-data';
import { lessons } from '@/lib/lessons-data';

export default function QuizzesPage() {
    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container">
                        <div className="section-header">
                            <h1>الاختبارات <span className="gradient-text">الذاتية</span></h1>
                            <p>اختبر معلوماتك في مادة الحموض والقواعد</p>
                        </div>

                        <div className="grid-2">
                            {quizzes.map((quiz, index) => {
                                const lesson = lessons.find(l => l.id === quiz.lessonId);
                                return (
                                    <motion.div
                                        key={quiz.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link href={`/quizzes/${quiz.id}`} style={{ textDecoration: 'none' }}>
                                            <div className="glass-card" style={{ height: '100%', cursor: 'pointer' }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--spacing-md)',
                                                    marginBottom: 'var(--spacing-md)'
                                                }}>
                                                    <div style={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: 'var(--radius-lg)',
                                                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-base) 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '1.25rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {lesson?.number || '?'}
                                                    </div>
                                                    <div>
                                                        <h3 style={{ margin: 0 }}>{quiz.title}</h3>
                                                        {lesson && (
                                                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                                                {lesson.title}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    gap: 'var(--spacing-lg)',
                                                    marginBottom: 'var(--spacing-lg)',
                                                    color: 'var(--color-text-muted)',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <CheckCircle size={16} />
                                                        {quiz.questions.length} أسئلة
                                                    </span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <Clock size={16} />
                                                        ~{quiz.questions.length * 2} دقائق
                                                    </span>
                                                </div>

                                                <div className="btn btn-primary" style={{ width: '100%' }}>
                                                    ابدأ الاختبار
                                                    <ChevronLeft size={20} />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Coming Soon */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-card"
                            style={{
                                marginTop: 'var(--spacing-2xl)',
                                textAlign: 'center',
                                background: 'var(--color-bg-tertiary)'
                            }}
                        >
                            <h3>🎯 اختبار شامل</h3>
                            <p>اختبار شامل يغطي جميع دروس الحموض والقواعد - قريباً!</p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
