'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Activity, BookOpen, Trophy, Award } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { lessons } from '@/lib/lessons-data';
import { quizzes } from '@/lib/quiz-data';

export default function DashboardPage() {
    const [progress, setProgress] = useState({
        completedLessons: 0,
        totalLessons: lessons.length,
        completedQuizzes: 0,
        totalQuizzes: quizzes.length,
        averageScore: 0
    });

    const [lessonStatus, setLessonStatus] = useState<Record<string, boolean>>({});
    const [quizScores, setQuizScores] = useState<Record<string, number>>({});

    useEffect(() => {
        // Load data from local storage
        let visitedLessons = 0;
        const status: Record<string, boolean> = {};

        lessons.forEach(lesson => {
            const isVisited = localStorage.getItem(`lesson-visited-${lesson.id}`) === 'true';
            if (isVisited) visitedLessons++;
            status[lesson.id] = isVisited;
        });

        let takenQuizzes = 0;
        let totalScore = 0;
        const scores: Record<string, number> = {};

        quizzes.forEach(quiz => {
            const score = localStorage.getItem(`quiz-score-${quiz.id}`);
            if (score) {
                takenQuizzes++;
                totalScore += parseInt(score) / quiz.questions.length * 100;
                scores[quiz.id] = parseInt(score);
            }
        });

        setProgress({
            completedLessons: visitedLessons,
            totalLessons: lessons.length,
            completedQuizzes: takenQuizzes,
            totalQuizzes: quizzes.length,
            averageScore: takenQuizzes > 0 ? Math.round(totalScore / takenQuizzes) : 0
        });

        setLessonStatus(status);
        setQuizScores(scores);
    }, []);

    const lessonPercentage = Math.round((progress.completedLessons / progress.totalLessons) * 100);
    const quizPercentage = Math.round((progress.completedQuizzes / progress.totalQuizzes) * 100);

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container">
                        <div className="section-header">
                            <h1>لوحة <span className="gradient-text">التقدم</span></h1>
                            <p>تابع مسيرتك التعليمية وإنجازاتك</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid-3" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card"
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
                                    <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)' }}>
                                        <BookOpen size={32} style={{ color: 'var(--color-base)' }} />
                                    </div>
                                </div>
                                <h3>الدروس المكتملة</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-base)' }}>
                                    {progress.completedLessons} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/ {progress.totalLessons}</span>
                                </div>
                                <div className="progress-bar" style={{ marginTop: 'var(--spacing-md)' }}>
                                    <div className="progress-bar-fill" style={{ width: `${lessonPercentage}%`, background: 'var(--color-base)' }} />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass-card"
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
                                    <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)' }}>
                                        <Activity size={32} style={{ color: 'var(--color-primary)' }} />
                                    </div>
                                </div>
                                <h3>الاختبارات المنجزة</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                    {progress.completedQuizzes} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/ {progress.totalQuizzes}</span>
                                </div>
                                <div className="progress-bar" style={{ marginTop: 'var(--spacing-md)' }}>
                                    <div className="progress-bar-fill" style={{ width: `${quizPercentage}%`, background: 'var(--color-primary)' }} />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="glass-card"
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
                                    <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)' }}>
                                        <Trophy size={32} style={{ color: 'var(--color-warning)' }} />
                                    </div>
                                </div>
                                <h3>معدل الدرجات</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-warning)' }}>
                                    {progress.averageScore}%
                                </div>
                                <div className="progress-bar" style={{ marginTop: 'var(--spacing-md)' }}>
                                    <div className="progress-bar-fill" style={{ width: `${progress.averageScore}%`, background: 'var(--color-warning)' }} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Progress */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--spacing-xl)' }}>
                            {/* Lessons List */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass-card"
                            >
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>سجل الدروس</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    {lessons.map(lesson => (
                                        <div key={lesson.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: 'var(--spacing-md)',
                                            background: 'var(--color-bg-tertiary)',
                                            borderRadius: 'var(--radius-lg)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                                <div style={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '50%',
                                                    background: lessonStatus[lesson.id] ? 'var(--color-success)' : 'var(--color-bg-secondary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {lessonStatus[lesson.id] ? '✓' : ''}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{lesson.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{lesson.duration}</div>
                                                </div>
                                            </div>
                                            <Link href={`/lessons/${lesson.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                                                {lessonStatus[lesson.id] ? 'مراجعة' : 'ابدا'}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Quizzes List */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-card"
                            >
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>سجل الاختبارات</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    {quizzes.map(quiz => (
                                        <div key={quiz.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: 'var(--spacing-md)',
                                            background: 'var(--color-bg-tertiary)',
                                            borderRadius: 'var(--radius-lg)'
                                        }}>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{quiz.title}</div>
                                                {quizScores[quiz.id] !== undefined ? (
                                                    <div style={{
                                                        fontSize: '0.875rem',
                                                        color: quizScores[quiz.id] >= quiz.questions.length * 0.7 ? 'var(--color-success)' : 'var(--color-warning)',
                                                        fontWeight: 600
                                                    }}>
                                                        أفضل نتيجة: {quizScores[quiz.id]} / {quiz.questions.length}
                                                    </div>
                                                ) : (
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                        لم يتم إجراؤه
                                                    </div>
                                                )}
                                            </div>
                                            <Link href={`/quizzes/${quiz.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                                                {quizScores[quiz.id] !== undefined ? 'إعادة' : 'ابدأ'}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
