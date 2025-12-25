'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Trophy,
    Clock,
    BookOpen,
    Award,
    TrendingUp,
    Calendar,
    Target,
    CheckCircle,
    XCircle
} from 'lucide-react';
import Link from 'next/link';

interface Student {
    id: string;
    email: string;
    name: string;
    image?: string;
    xp: number;
    level: number;
    title: string;
    completedLessons: string[];
    quizScores: Record<string, number>;
    lastActive: string;
    joinedAt: string;
    totalTimeSpent: number;
}

export default function StudentDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudent();
    }, [id]);

    const fetchStudent = async () => {
        try {
            const res = await fetch(`/api/students/${id}`);
            const data = await res.json();
            setStudent(data);
        } catch (error) {
            console.error('Error fetching student:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('ar-JO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTimeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
        if (diffHours < 24) return `منذ ${diffHours} ساعة`;
        return `منذ ${diffDays} يوم`;
    };

    if (loading) {
        return (
            <div className="admin-loading-content">
                <div className="admin-loading-spinner"></div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="not-found">
                <h2>الطالب غير موجود</h2>
                <Link href="/admin/students">العودة لقائمة الطلاب</Link>
            </div>
        );
    }

    const avgQuizScore = Object.values(student.quizScores).length > 0
        ? Math.round(
            Object.values(student.quizScores).reduce((a, b) => a + b, 0) /
            Object.values(student.quizScores).length * 10
        )
        : 0;

    const allLessons = [
        { id: 'intro-acids-bases', name: 'مقدمة في الحموض والقواعد' },
        { id: 'ph-scale', name: 'مقياس pH' },
        { id: 'indicators', name: 'الكواشف' },
        { id: 'neutralization', name: 'تفاعلات التعادل' },
        { id: 'titration', name: 'المعايرة' },
    ];

    const allQuizzes = [
        { id: 'intro-quiz', name: 'اختبار المقدمة', maxScore: 10 },
        { id: 'ph-quiz', name: 'اختبار pH', maxScore: 10 },
        { id: 'indicators-quiz', name: 'اختبار الكواشف', maxScore: 10 },
        { id: 'neutralization-quiz', name: 'اختبار التعادل', maxScore: 10 },
    ];

    return (
        <div className="student-detail">
            {/* Back Button */}
            <Link href="/admin/students" className="back-link">
                <ArrowRight size={18} />
                العودة لقائمة الطلاب
            </Link>

            {/* Student Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="student-header-card"
            >
                <div className="student-header-content">
                    <img
                        src={student.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                        alt={student.name}
                        className="student-header-avatar"
                    />
                    <div className="student-header-info">
                        <h1 className="student-header-name">{student.name}</h1>
                        <p className="student-header-email">{student.email}</p>
                        <div className="student-header-badges">
                            <span className="header-badge level-badge">
                                <Trophy size={14} />
                                المستوى {student.level}
                            </span>
                            <span className="header-badge title-badge">
                                {student.title}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="student-header-stats">
                    <div className="header-stat">
                        <span className="header-stat-value">{student.xp}</span>
                        <span className="header-stat-label">XP</span>
                    </div>
                    <div className="header-stat">
                        <span className="header-stat-value">{student.completedLessons.length}</span>
                        <span className="header-stat-label">درس</span>
                    </div>
                    <div className="header-stat">
                        <span className="header-stat-value">{Object.keys(student.quizScores).length}</span>
                        <span className="header-stat-label">اختبار</span>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="detail-stats-grid">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="admin-card stat-card"
                >
                    <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                        <TrendingUp size={24} style={{ color: '#8b5cf6' }} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{student.xp} XP</span>
                        <span className="stat-label">نقاط الخبرة</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="admin-card stat-card"
                >
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                        <Target size={24} style={{ color: '#10b981' }} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{avgQuizScore}%</span>
                        <span className="stat-label">معدل الاختبارات</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="admin-card stat-card"
                >
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                        <Clock size={24} style={{ color: '#3b82f6' }} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{student.totalTimeSpent} دقيقة</span>
                        <span className="stat-label">وقت الدراسة</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="admin-card stat-card"
                >
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                        <Calendar size={24} style={{ color: '#f59e0b' }} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{formatTimeAgo(student.lastActive)}</span>
                        <span className="stat-label">آخر نشاط</span>
                    </div>
                </motion.div>
            </div>

            {/* Content Grid */}
            <div className="detail-content-grid">
                {/* Lessons Progress */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="admin-card"
                >
                    <h3 className="admin-card-title">
                        <BookOpen size={20} />
                        تقدم الدروس
                    </h3>
                    <div className="progress-overview">
                        <div className="progress-circle">
                            <svg viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="3"
                                    strokeDasharray={`${(student.completedLessons.length / allLessons.length) * 100}, 100`}
                                />
                                <defs>
                                    <linearGradient id="gradient">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="progress-circle-text">
                                <span className="progress-value">{student.completedLessons.length}</span>
                                <span className="progress-total">/ {allLessons.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className="lessons-list">
                        {allLessons.map((lesson) => {
                            const completed = student.completedLessons.includes(lesson.id);
                            return (
                                <div key={lesson.id} className={`lesson-item ${completed ? 'completed' : ''}`}>
                                    {completed ? (
                                        <CheckCircle size={18} style={{ color: '#10b981' }} />
                                    ) : (
                                        <XCircle size={18} style={{ color: 'rgba(255,255,255,0.3)' }} />
                                    )}
                                    <span>{lesson.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Quiz Results */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="admin-card"
                >
                    <h3 className="admin-card-title">
                        <Award size={20} />
                        نتائج الاختبارات
                    </h3>
                    <div className="quizzes-list">
                        {allQuizzes.map((quiz) => {
                            const score = student.quizScores[quiz.id];
                            const taken = score !== undefined;
                            const percentage = taken ? (score / quiz.maxScore) * 100 : 0;

                            return (
                                <div key={quiz.id} className="quiz-item">
                                    <div className="quiz-info">
                                        <span className="quiz-name">{quiz.name}</span>
                                        {taken ? (
                                            <span className={`quiz-score ${percentage >= 70 ? 'good' : 'needs-work'}`}>
                                                {score} / {quiz.maxScore}
                                            </span>
                                        ) : (
                                            <span className="quiz-not-taken">لم يُجرى</span>
                                        )}
                                    </div>
                                    <div className="admin-progress">
                                        <div
                                            className="admin-progress-fill"
                                            style={{
                                                width: `${percentage}%`,
                                                background: percentage >= 70
                                                    ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                                                    : percentage > 0
                                                        ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                                                        : 'transparent'
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Member Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="admin-card member-info-card"
            >
                <h3 className="admin-card-title">معلومات العضوية</h3>
                <div className="member-info-grid">
                    <div className="member-info-item">
                        <span className="member-info-label">تاريخ الانضمام</span>
                        <span className="member-info-value">{formatDate(student.joinedAt)}</span>
                    </div>
                    <div className="member-info-item">
                        <span className="member-info-label">آخر نشاط</span>
                        <span className="member-info-value">{formatDate(student.lastActive)}</span>
                    </div>
                    <div className="member-info-item">
                        <span className="member-info-label">البريد الإلكتروني</span>
                        <span className="member-info-value">{student.email}</span>
                    </div>
                    <div className="member-info-item">
                        <span className="member-info-label">إجمالي وقت الدراسة</span>
                        <span className="member-info-value">{Math.floor(student.totalTimeSpent / 60)} ساعة {student.totalTimeSpent % 60} دقيقة</span>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
        .student-detail {
          max-width: 1200px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          margin-bottom: 1.5rem;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: white;
        }

        .student-header-card {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .student-header-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .student-header-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid rgba(139, 92, 246, 0.5);
        }

        .student-header-name {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .student-header-email {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.75rem;
        }

        .student-header-badges {
          display: flex;
          gap: 0.75rem;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .level-badge {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #f59e0b;
        }

        .title-badge {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: #8b5cf6;
        }

        .student-header-stats {
          display: flex;
          gap: 2rem;
        }

        .header-stat {
          text-align: center;
        }

        .header-stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .detail-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .detail-content-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .admin-card-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .progress-overview {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .progress-circle {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .progress-circle svg {
          transform: rotate(-90deg);
        }

        .progress-circle-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .progress-value {
          font-size: 2rem;
          font-weight: 700;
          color: white;
        }

        .progress-total {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .lessons-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .lesson-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s;
        }

        .lesson-item.completed {
          color: white;
          background: rgba(16, 185, 129, 0.05);
        }

        .quizzes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quiz-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quiz-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .quiz-name {
          color: white;
          font-weight: 500;
        }

        .quiz-score {
          font-weight: 600;
        }

        .quiz-score.good {
          color: #10b981;
        }

        .quiz-score.needs-work {
          color: #f59e0b;
        }

        .quiz-not-taken {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.875rem;
        }

        .member-info-card {
          margin-bottom: 2rem;
        }

        .member-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .member-info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .member-info-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .member-info-value {
          color: white;
          font-weight: 500;
        }

        .not-found {
          text-align: center;
          padding: 4rem;
          color: white;
        }

        .not-found h2 {
          margin-bottom: 1rem;
        }

        .not-found a {
          color: #8b5cf6;
        }

        @media (max-width: 1024px) {
          .student-header-card {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .student-header-content {
            flex-direction: column;
          }

          .detail-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .detail-content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .detail-stats-grid {
            grid-template-columns: 1fr;
          }

          .member-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
