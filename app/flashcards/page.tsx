'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Copy } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { flashcards } from '@/lib/flashcards-data';

export default function FlashcardsPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcards.length);
        }, 300);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        }, 300);
    };

    const card = flashcards[currentIndex];

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container" style={{ maxWidth: 800 }}>
                        <div className="section-header">
                            <h1>البطاقات <span className="gradient-text">التعليمية</span></h1>
                            <p>راجع المفاهيم الأساسية بطريقة تفاعلية</p>
                        </div>

                        <div style={{ perspective: 1000, height: 400, marginBottom: 'var(--spacing-xl)' }}>
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transformStyle: 'preserve-3d',
                                    cursor: 'pointer'
                                }}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                {/* Front */}
                                <div
                                    className="glass-card"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    <span style={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 20,
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-muted)'
                                    }}>
                                        بطاقة {currentIndex + 1} / {flashcards.length}
                                    </span>

                                    <div style={{
                                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                                        borderRadius: 'var(--radius-full)',
                                        background: card.category === 'acid' ? 'rgba(239, 68, 68, 0.1)' :
                                            card.category === 'base' ? 'rgba(59, 130, 246, 0.1)' :
                                                'rgba(16, 185, 129, 0.1)',
                                        color: card.category === 'acid' ? 'var(--color-acid)' :
                                            card.category === 'base' ? 'var(--color-base)' :
                                                'var(--color-neutral)',
                                        marginBottom: 'var(--spacing-xl)',
                                        fontWeight: 600
                                    }}>
                                        {card.category === 'acid' ? 'حموض' :
                                            card.category === 'base' ? 'قواعد' :
                                                'عام'}
                                    </div>

                                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>
                                        {card.term}
                                    </h2>
                                    <p style={{ color: 'var(--color-text-muted)' }}>اضغط للقلب</p>
                                </div>

                                {/* Back */}
                                <div
                                    className="glass-card"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        background: 'var(--color-bg-tertiary)'
                                    }}
                                >
                                    <h3 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-primary-light)' }}>
                                        {card.term}
                                    </h3>
                                    <p style={{ fontSize: '1.5rem', lineHeight: 1.6, maxWidth: 600 }}>
                                        {card.definition}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-lg)' }}>
                            <button onClick={prevCard} className="btn btn-outline" style={{ minWidth: 150 }}>
                                <ChevronRight size={20} />
                                السابق
                            </button>
                            <button onClick={nextCard} className="btn btn-primary" style={{ minWidth: 150 }}>
                                التالي
                                <ChevronLeft size={20} />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
