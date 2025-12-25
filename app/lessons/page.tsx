'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Search, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { lessons } from '@/lib/lessons-data';

export default function LessonsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLessons = lessons.filter(lesson =>
        lesson.title.includes(searchQuery) ||
        lesson.description.includes(searchQuery)
    );

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container">
                        <div className="section-header">
                            <h1>الدروس <span className="gradient-text">التعليمية</span></h1>
                            <p>8 دروس شاملة تغطي جميع مواضيع الحموض والقواعد حسب المنهاج الأردني 2025</p>
                        </div>

                        {/* Search Bar */}
                        <div style={{ maxWidth: 500, margin: '0 auto var(--spacing-2xl)', position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="ابحث عن درس..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem 3rem 1rem 1rem',
                                    borderRadius: 'var(--radius-full)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-tertiary)',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                            <Search
                                size={20}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-muted)'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <AnimatePresence>
                                {filteredLessons.length > 0 ? (
                                    filteredLessons.map((lesson, index) => (
                                        <motion.div
                                            key={lesson.id}
                                            className="glass-card"
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.1 }}
                                            style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'flex-start' }}
                                        >
                                            <div
                                                className="lesson-card-number"
                                                style={{
                                                    width: 64,
                                                    height: 64,
                                                    fontSize: '1.5rem',
                                                    flexShrink: 0,
                                                    background: lesson.number <= 3
                                                        ? 'linear-gradient(135deg, var(--color-acid), var(--color-warning))'
                                                        : lesson.number <= 5
                                                            ? 'linear-gradient(135deg, var(--color-neutral), var(--color-base))'
                                                            : 'linear-gradient(135deg, var(--color-base), var(--color-primary))'
                                                }}
                                            >
                                                {lesson.number}
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                                    <h3 style={{ margin: 0 }}>{lesson.title}</h3>
                                                    <span className={`badge ${lesson.difficulty === 'سهل' ? 'badge-neutral' : lesson.difficulty === 'متوسط' ? 'badge-base' : 'badge-acid'}`}>
                                                        {lesson.difficulty}
                                                    </span>
                                                </div>

                                                <p style={{ marginBottom: 'var(--spacing-md)' }}>{lesson.description}</p>

                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                                    {lesson.objectives.slice(0, 3).map((obj, i) => (
                                                        <span key={i} style={{
                                                            fontSize: '0.75rem',
                                                            padding: '0.25rem 0.5rem',
                                                            background: 'var(--color-bg-tertiary)',
                                                            borderRadius: 'var(--radius-sm)'
                                                        }}>
                                                            ✓ {obj}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--color-text-muted)' }}>
                                                        <Clock size={16} />
                                                        <span>{lesson.duration}</span>
                                                    </div>

                                                    <Link href={`/lessons/${lesson.id}`} className="btn btn-primary">
                                                        ابدأ الدرس
                                                        <ChevronLeft size={18} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--color-text-muted)' }}>
                                        <p>لا يوجد دروس تطابق بحثك</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
