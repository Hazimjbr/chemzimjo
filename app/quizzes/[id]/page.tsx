'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getQuizById } from '@/lib/quiz-data';

interface Props {
    params: Promise<{ id: string }>;
}

export default function QuizPage({ params }: Props) {
    const { id } = use(params);
    const quiz = getQuizById(id);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    if (!quiz) {
        return (
            <>
                <Navbar />
                <main style={{ paddingTop: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h1>الاختبار غير موجود</h1>
                        <Link href="/quizzes" className="btn btn-primary">العودة للاختبارات</Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const question = quiz.questions[currentQuestion];

    const handleAnswer = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
        setShowResult(true);

        const newAnswers = [...answers];
        newAnswers[currentQuestion] = index;
        setAnswers(newAnswers);

        if (index === question.correctIndex) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setIsFinished(true);
        }
    };

    const restart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnswers([]);
        setIsFinished(false);
    };

    const percentage = Math.round((score / quiz.questions.length) * 100);

    if (isFinished) {
        return (
            <>
                <Navbar />
                <main style={{ paddingTop: 100, minHeight: '80vh' }}>
                    <section className="section">
                        <div className="container" style={{ maxWidth: 600 }}>
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="glass-card"
                                style={{ textAlign: 'center' }}
                            >
                                <Trophy size={80} style={{ color: percentage >= 70 ? 'var(--color-success)' : 'var(--color-warning)', marginBottom: 'var(--spacing-lg)' }} />

                                <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    {percentage >= 70 ? '🎉 أحسنت!' : '💪 حاول مجدداً'}
                                </h1>

                                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: 'var(--spacing-lg)' }}>
                                    {score} / {quiz.questions.length}
                                </div>

                                <div className="progress-bar" style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
                                </div>

                                <p style={{ marginBottom: 'var(--spacing-xl)' }}>
                                    {percentage >= 90 ? 'ممتاز! أنت متمكن من هذه المادة.' :
                                        percentage >= 70 ? 'جيد جداً! استمر في التعلم.' :
                                            percentage >= 50 ? 'جيد! راجع الدرس مرة أخرى.' :
                                                'راجع الدرس وحاول مجدداً.'}
                                </p>

                                <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
                                    <button onClick={restart} className="btn btn-outline">
                                        <RotateCcw size={18} />
                                        أعد المحاولة
                                    </button>
                                    <Link href="/quizzes" className="btn btn-primary">
                                        اختبارات أخرى
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    // Save score when finished
    if (isFinished) {
        const stored = localStorage.getItem(`quiz-score-${id}`);
        const currentBest = stored ? parseInt(stored) : 0;
        if (score > currentBest) {
            localStorage.setItem(`quiz-score-${id}`, score.toString());
        }
    }

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container" style={{ maxWidth: 700 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                            <Link href="/" style={{ color: 'var(--color-text-muted)' }}>الرئيسية</Link>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            <Link href="/quizzes" style={{ color: 'var(--color-text-muted)' }}>الاختبارات</Link>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            <span style={{ color: 'var(--color-primary-light)' }}>{quiz.title}</span>
                        </div>

                        {/* Progress */}
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                <span>السؤال {currentQuestion + 1} من {quiz.questions.length}</span>
                                <span>النتيجة: {score}</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-bar-fill" style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }} />
                            </div>
                        </div>

                        {/* Question */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="glass-card"
                            >
                                <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>{question.question}</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    {question.options.map((option, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: showResult ? 1 : 1.02 }}
                                            whileTap={{ scale: showResult ? 1 : 0.98 }}
                                            onClick={() => handleAnswer(index)}
                                            className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} ${showResult && index === question.correctIndex ? 'correct' : ''} ${showResult && selectedAnswer === index && index !== question.correctIndex ? 'incorrect' : ''}`}
                                            style={{ cursor: showResult ? 'default' : 'pointer' }}
                                        >
                                            <span style={{ fontWeight: 600 }}>{String.fromCharCode(1571 + index)}.</span>
                                            <span style={{ flex: 1 }}>{option}</span>
                                            {showResult && index === question.correctIndex && <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />}
                                            {showResult && selectedAnswer === index && index !== question.correctIndex && <XCircle size={20} style={{ color: 'var(--color-acid)' }} />}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Explanation */}
                                {showResult && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="info-box"
                                        style={{ marginTop: 'var(--spacing-xl)' }}
                                    >
                                        <div>
                                            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>💡 التفسير</h4>
                                            <p style={{ margin: 0 }}>{question.explanation}</p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Next Button */}
                                {showResult && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}
                                    >
                                        <button onClick={nextQuestion} className="btn btn-primary btn-lg">
                                            {currentQuestion < quiz.questions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                                            <ChevronLeft size={20} />
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
