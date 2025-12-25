'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    ChevronLeft,
    Trophy,
    Clock,
    BookOpen,
    TrendingUp
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

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'xp' | 'name' | 'lastActive'>('xp');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch('/api/students');
            const data = await res.json();
            setStudents(data.students || []);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students
        .filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'xp') return b.xp - a.xp;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'lastActive')
                return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
            return 0;
        });

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

    return (
        <div className="students-page">
            {/* Header */}
            <div className="students-header">
                <div>
                    <h1 className="students-title">👥 إدارة الطلاب</h1>
                    <p className="students-subtitle">
                        {students.length} طالب مسجل
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="students-filters">
                <div className="students-search">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="ابحث عن طالب..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="students-sort">
                    <Filter size={18} />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'xp' | 'name' | 'lastActive')}
                    >
                        <option value="xp">ترتيب حسب: XP</option>
                        <option value="name">ترتيب حسب: الاسم</option>
                        <option value="lastActive">ترتيب حسب: آخر نشاط</option>
                    </select>
                </div>
            </div>

            {/* Students Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="admin-card students-table-card"
            >
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>الطالب</th>
                            <th>المستوى</th>
                            <th>XP</th>
                            <th>الدروس</th>
                            <th>الاختبارات</th>
                            <th>آخر نشاط</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <motion.tr
                                key={student.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <td>
                                    <div className="student-cell">
                                        <img
                                            src={student.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                                            alt={student.name}
                                            className="student-avatar"
                                        />
                                        <div className="student-info">
                                            <span className="student-name">{student.name}</span>
                                            <span className="student-email">{student.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="level-badge">
                                        <Trophy size={14} />
                                        المستوى {student.level}
                                    </div>
                                </td>
                                <td>
                                    <div className="xp-cell">
                                        <TrendingUp size={14} style={{ color: '#10b981' }} />
                                        <span className="xp-value">{student.xp}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="lessons-cell">
                                        <BookOpen size={14} />
                                        {student.completedLessons.length} درس
                                    </div>
                                </td>
                                <td>
                                    <span className="quizzes-count">
                                        {Object.keys(student.quizScores).length} اختبار
                                    </span>
                                </td>
                                <td>
                                    <div className="last-active">
                                        <Clock size={14} />
                                        {formatTimeAgo(student.lastActive)}
                                    </div>
                                </td>
                                <td>
                                    <Link href={`/admin/students/${student.id}`} className="view-btn">
                                        عرض
                                        <ChevronLeft size={16} />
                                    </Link>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            <style jsx>{`
        .students-page {
          max-width: 1400px;
          margin: 0 auto;
        }

        .students-header {
          margin-bottom: 2rem;
        }

        .students-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .students-subtitle {
          color: rgba(255, 255, 255, 0.6);
        }

        .students-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .students-search {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0 1rem;
          transition: all 0.3s;
        }

        .students-search:focus-within {
          border-color: rgba(139, 92, 246, 0.5);
        }

        .students-search svg {
          color: rgba(255, 255, 255, 0.5);
        }

        .students-search input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 0.875rem 0;
          font-size: 0.875rem;
          outline: none;
        }

        .students-search input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .students-sort {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0 1rem;
        }

        .students-sort svg {
          color: rgba(255, 255, 255, 0.5);
        }

        .students-sort select {
          background: transparent;
          border: none;
          color: white;
          padding: 0.875rem 0;
          font-size: 0.875rem;
          outline: none;
          cursor: pointer;
        }

        .students-sort select option {
          background: #1e293b;
          color: white;
        }

        .students-table-card {
          overflow-x: auto;
        }

        .student-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .student-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(139, 92, 246, 0.3);
        }

        .student-info {
          display: flex;
          flex-direction: column;
        }

        .student-name {
          font-weight: 600;
        }

        .student-email {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .level-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #f59e0b;
          padding: 0.375rem 0.75rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .xp-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .xp-value {
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .lessons-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #3b82f6;
        }

        .quizzes-count {
          color: rgba(255, 255, 255, 0.7);
        }

        .last-active {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .view-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: #8b5cf6;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.3s;
        }

        .view-btn:hover {
          background: rgba(139, 92, 246, 0.2);
          transform: translateX(-4px);
        }

        @media (max-width: 768px) {
          .students-filters {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
}
