'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    TrendingUp,
    BookOpen,
    Award,
    Clock,
    Activity,
    ArrowUpRight,
    Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface Analytics {
    totalStudents: number;
    activeToday: number;
    activeThisWeek: number;
    avgXP: number;
    totalLessonsCompleted: number;
    totalQuizzesTaken: number;
    avgQuizScore: number;
    levelDistribution: Record<number, number>;
    topStudents: Array<{
        id: string;
        name: string;
        image?: string;
        xp: number;
        level: number;
    }>;
    recentlyActive: Array<{
        id: string;
        name: string;
        image?: string;
        lastActive: string;
    }>;
}

export default function AdminDashboard() {
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/students');
            const data = await res.json();
            setAnalytics(data.analytics);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
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

    const stats = [
        {
            label: 'إجمالي الطلاب',
            value: analytics?.totalStudents || 0,
            icon: Users,
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.1)',
        },
        {
            label: 'نشطون اليوم',
            value: analytics?.activeToday || 0,
            icon: Activity,
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
        },
        {
            label: 'الدروس المكتملة',
            value: analytics?.totalLessonsCompleted || 0,
            icon: BookOpen,
            color: '#3b82f6',
            bgColor: 'rgba(59, 130, 246, 0.1)',
        },
        {
            label: 'معدل الاختبارات',
            value: `${analytics?.avgQuizScore || 0}%`,
            icon: Award,
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)',
        },
    ];

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">
                        <Sparkles className="admin-title-icon" />
                        مرحباً بك في لوحة الإدارة
                    </h1>
                    <p className="admin-subtitle">إدارة الطلاب ومتابعة تقدمهم</p>
                </div>
                <div className="admin-header-date">
                    {new Date().toLocaleDateString('ar-JO', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="admin-stats-grid">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="admin-card admin-stat-card"
                        >
                            <div className="admin-card-header">
                                <div
                                    className="admin-card-icon"
                                    style={{ background: stat.bgColor }}
                                >
                                    <Icon size={24} style={{ color: stat.color }} />
                                </div>
                                <ArrowUpRight size={16} style={{ color: stat.color }} />
                            </div>
                            <div className="admin-stat-value" style={{
                                background: `linear-gradient(135deg, ${stat.color} 0%, #3b82f6 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                {stat.value}
                            </div>
                            <div className="admin-stat-label">{stat.label}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="admin-content-grid">
                {/* Top Students */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="admin-card"
                >
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">🏆 أفضل الطلاب</h3>
                        <Link href="/admin/students" className="admin-link">
                            عرض الكل
                        </Link>
                    </div>
                    <div className="admin-list">
                        {analytics?.topStudents.map((student, index) => (
                            <Link
                                key={student.id}
                                href={`/admin/students/${student.id}`}
                                className="admin-list-item"
                            >
                                <div className="admin-list-rank" data-rank={index + 1}>
                                    {index + 1}
                                </div>
                                <img
                                    src={student.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                                    alt={student.name}
                                    className="admin-list-avatar"
                                />
                                <div className="admin-list-info">
                                    <span className="admin-list-name">{student.name}</span>
                                    <span className="admin-list-meta">المستوى {student.level}</span>
                                </div>
                                <div className="admin-list-value">
                                    <span className="admin-xp-badge">{student.xp} XP</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Recently Active */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="admin-card"
                >
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">⚡ نشاط حديث</h3>
                        <span className="admin-badge admin-badge-success">
                            <span className="admin-pulse"></span>
                            مباشر
                        </span>
                    </div>
                    <div className="admin-list">
                        {analytics?.recentlyActive.map((student) => (
                            <Link
                                key={student.id}
                                href={`/admin/students/${student.id}`}
                                className="admin-list-item"
                            >
                                <img
                                    src={student.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                                    alt={student.name}
                                    className="admin-list-avatar"
                                />
                                <div className="admin-list-info">
                                    <span className="admin-list-name">{student.name}</span>
                                    <span className="admin-list-meta">
                                        <Clock size={12} />
                                        {formatTimeAgo(student.lastActive)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Level Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="admin-card admin-chart-card"
                >
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">📊 توزيع المستويات</h3>
                    </div>
                    <div className="admin-chart">
                        {Object.entries(analytics?.levelDistribution || {}).map(([level, count]) => {
                            const maxCount = Math.max(...Object.values(analytics?.levelDistribution || {}));
                            const percentage = (count / maxCount) * 100;
                            return (
                                <div key={level} className="admin-chart-bar">
                                    <span className="admin-chart-label">المستوى {level}</span>
                                    <div className="admin-progress">
                                        <motion.div
                                            className="admin-progress-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                            style={{
                                                background: `linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)`
                                            }}
                                        />
                                    </div>
                                    <span className="admin-chart-value">{count} طالب</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="admin-card"
                >
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">📈 إحصائيات سريعة</h3>
                    </div>
                    <div className="admin-quick-stats">
                        <div className="admin-quick-stat">
                            <TrendingUp size={20} style={{ color: '#10b981' }} />
                            <div>
                                <span className="admin-quick-value">{analytics?.avgXP}</span>
                                <span className="admin-quick-label">متوسط XP</span>
                            </div>
                        </div>
                        <div className="admin-quick-stat">
                            <BookOpen size={20} style={{ color: '#3b82f6' }} />
                            <div>
                                <span className="admin-quick-value">{analytics?.totalQuizzesTaken}</span>
                                <span className="admin-quick-label">اختبار منجز</span>
                            </div>
                        </div>
                        <div className="admin-quick-stat">
                            <Users size={20} style={{ color: '#8b5cf6' }} />
                            <div>
                                <span className="admin-quick-value">{analytics?.activeThisWeek}</span>
                                <span className="admin-quick-label">نشطون هذا الأسبوع</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
        .admin-dashboard {
          max-width: 1400px;
          margin: 0 auto;
        }

        .admin-loading-content {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .admin-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .admin-title-icon {
          color: #f59e0b;
        }

        .admin-subtitle {
          color: rgba(255, 255, 255, 0.6);
        }

        .admin-header-date {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .admin-stat-card {
          padding: 1.5rem;
        }

        .admin-content-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .admin-chart-card {
          grid-column: span 2;
        }

        .admin-link {
          color: #8b5cf6;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.3s;
        }

        .admin-link:hover {
          color: #a78bfa;
        }

        .admin-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .admin-list-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .admin-list-item:hover {
          background: rgba(139, 92, 246, 0.1);
          transform: translateX(-4px);
        }

        .admin-list-rank {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          color: white;
        }

        .admin-list-rank[data-rank="1"] {
          background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
        }

        .admin-list-rank[data-rank="2"] {
          background: linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%);
        }

        .admin-list-rank[data-rank="3"] {
          background: linear-gradient(135deg, #b45309 0%, #d97706 100%);
        }

        .admin-list-rank[data-rank="4"],
        .admin-list-rank[data-rank="5"] {
          background: rgba(255, 255, 255, 0.1);
        }

        .admin-list-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(139, 92, 246, 0.3);
        }

        .admin-list-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .admin-list-name {
          color: white;
          font-weight: 600;
        }

        .admin-list-meta {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .admin-list-value {
          color: #8b5cf6;
          font-weight: 600;
        }

        .admin-xp-badge {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
        }

        .admin-pulse {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .admin-chart {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-chart-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .admin-chart-label {
          width: 80px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .admin-chart-value {
          width: 70px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
          text-align: left;
        }

        .admin-quick-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-quick-stat {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }

        .admin-quick-stat > div {
          display: flex;
          flex-direction: column;
        }

        .admin-quick-value {
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .admin-quick-label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        @media (max-width: 1200px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .admin-content-grid {
            grid-template-columns: 1fr;
          }
          
          .admin-chart-card {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .admin-stats-grid {
            grid-template-columns: 1fr;
          }
          
          .admin-header {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
        </div>
    );
}
