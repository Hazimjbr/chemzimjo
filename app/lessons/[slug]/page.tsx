'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Clock, Target, AlertTriangle, Info, Lightbulb, BookOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { lessons, getLessonById } from '@/lib/lessons-data';

import MoleculeViewer from '@/components/visual/MoleculeViewer';
import EquationAnimator from '@/components/visual/EquationAnimator';
import LessonNotes from '@/components/visual/LessonNotes';
import TextToSpeech from '@/components/visual/TextToSpeech';

interface Props {
    params: Promise<{ slug: string }>;
}

export default function LessonPage({ params }: Props) {
    const { slug } = use(params);
    const lesson = getLessonById(slug);

    if (!lesson) {
        return (
            <>
                <Navbar />
                <main style={{ paddingTop: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h1>الدرس غير موجود</h1>
                        <p>عذراً، لم نتمكن من العثور على الدرس المطلوب.</p>
                        <Link href="/lessons" className="btn btn-primary">العودة للدروس</Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const currentIndex = lessons.findIndex(l => l.id === slug);
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    const getSectionIcon = (type: string) => {
        switch (type) {
            case 'warning': return <AlertTriangle size={20} style={{ color: 'var(--color-warning)' }} />;
            case 'info': return <Info size={20} style={{ color: 'var(--color-base)' }} />;
            case 'example': return <Lightbulb size={20} style={{ color: 'var(--color-neutral)' }} />;
            case 'molecule': return <div style={{ fontSize: '1.25rem' }}>⚛️</div>;
            case 'animation': return <div style={{ fontSize: '1.25rem' }}>🎞️</div>;
            default: return <BookOpen size={20} style={{ color: 'var(--color-primary)' }} />;
        }
    };

    const getSectionStyle = (type: string) => {
        switch (type) {
            case 'warning': return { background: 'rgba(245, 158, 11, 0.1)', borderColor: 'var(--color-warning)' };
            case 'info': return { background: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--color-base)' };
            case 'example': return { background: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--color-neutral)' };
            case 'molecule':
            case 'animation':
                return { background: 'transparent', borderColor: 'transparent', padding: 0 };
            default: return { background: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' };
        }
    };

    // Mark as visited
    if (typeof window !== 'undefined') {
        localStorage.setItem(`lesson-visited-${slug}`, 'true');
    }

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container" style={{ maxWidth: 900 }}>
                        {/* Breadcrumb */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                            <Link href="/" style={{ color: 'var(--color-text-muted)' }}>الرئيسية</Link>
                            <ChevronLeft size={16} />
                            <Link href="/lessons" style={{ color: 'var(--color-text-muted)' }}>الدروس</Link>
                            <ChevronLeft size={16} />
                            <span style={{ color: 'var(--color-primary-light)' }}>{lesson.title}</span>
                        </div>

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card"
                            style={{ marginBottom: 'var(--spacing-xl)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                                <div
                                    className="lesson-card-number"
                                    style={{ width: 72, height: 72, fontSize: '1.75rem' }}
                                >
                                    {lesson.number}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>{lesson.title}</h1>
                                        <TextToSpeech text={lesson.content.map(s => `${s.title}. ${s.content}`).join('. ')} title={lesson.title} />
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                        <span className={`badge ${lesson.difficulty === 'سهل' ? 'badge-neutral' : lesson.difficulty === 'متوسط' ? 'badge-base' : 'badge-acid'}`}>
                                            {lesson.difficulty}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', color: 'var(--color-text-muted)' }}>
                                            <Clock size={16} />
                                            {lesson.duration}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p style={{ fontSize: '1.125rem' }}>{lesson.description}</p>
                        </motion.div>

                        {/* Objectives */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card"
                            style={{ marginBottom: 'var(--spacing-xl)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                <Target size={24} style={{ color: 'var(--color-primary)' }} />
                                <h3 style={{ margin: 0 }}>أهداف الدرس</h3>
                            </div>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                {lesson.objectives.map((obj, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
                                        <span style={{ color: 'var(--color-neutral)', fontWeight: 'bold' }}>✓</span>
                                        <span>{obj}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Content Sections */}
                        {lesson.content.map((section, index) => {
                            if (section.type === 'molecule') {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        style={{ marginBottom: 'var(--spacing-lg)' }}
                                    >
                                        <MoleculeViewer moleculeId={section.content} />
                                    </motion.div>
                                );
                            }

                            if (section.type === 'animation') {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        style={{ marginBottom: 'var(--spacing-lg)' }}
                                    >
                                        {section.content === 'hcl_naoh' && (
                                            <EquationAnimator
                                                reactants={[['HCl', '#ef4444'], ['NaOH', '#3b82f6']]}
                                                products={[['NaCl', '#10b981'], ['H₂O', '#3b82f6']]}
                                            />
                                        )}
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                    style={{
                                        padding: 'var(--spacing-xl)',
                                        borderRadius: 'var(--radius-xl)',
                                        border: '1px solid',
                                        marginBottom: 'var(--spacing-lg)',
                                        ...getSectionStyle(section.type)
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                        {getSectionIcon(section.type)}
                                        <h4 style={{ margin: 0 }}>{section.title}</h4>
                                    </div>
                                    <div style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                                        {section.content}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Chemical Equations */}
                        {lesson.equations && lesson.equations.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card"
                                style={{ marginBottom: 'var(--spacing-xl)' }}
                            >
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>⚗️ المعادلات الكيميائية</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    {lesson.equations.map((eq, i) => (
                                        <div key={i}>
                                            <div className="chemical-equation">
                                                <span className="acid">{eq.reactants}</span>
                                                <span className="arrow">→</span>
                                                <span className="base">{eq.products}</span>
                                            </div>
                                            <p style={{ textAlign: 'center', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>{eq.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Key Points */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card"
                            style={{
                                marginBottom: 'var(--spacing-xl)',
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                                border: '1px solid var(--color-primary)'
                            }}
                        >
                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>📌 النقاط الرئيسية</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                {lesson.keyPoints.map((point, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
                                        <span style={{ color: 'var(--color-primary-light)', fontWeight: 'bold' }}>•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>




                        {/* Notes Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card no-print"
                            style={{ marginBottom: 'var(--spacing-xl)', marginTop: 'var(--spacing-xl)' }}
                        >
                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>📝 ملاحظاتي</h3>
                            <LessonNotes lessonId={lesson.id} />
                        </motion.div>

                        {/* Navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                            {prevLesson ? (
                                <Link
                                    href={`/lessons/${prevLesson.id}`}
                                    className="btn btn-outline"
                                    style={{ flex: 1, justifyContent: 'flex-start' }}
                                >
                                    <ChevronRight size={20} />
                                    الدرس السابق: {prevLesson.title}
                                </Link>
                            ) : <div />}

                            {nextLesson ? (
                                <Link
                                    href={`/lessons/${nextLesson.id}`}
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'flex-end' }}
                                >
                                    الدرس التالي: {nextLesson.title}
                                    <ChevronLeft size={20} />
                                </Link>
                            ) : (
                                <Link href="/quizzes" className="btn btn-primary">
                                    اختبر معلوماتك
                                    <ChevronLeft size={20} />
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            </main >

            <Footer />
        </>
    );
}
