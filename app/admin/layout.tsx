'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    LogOut,
    ChevronRight,
    FlaskConical
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const sidebarLinks = [
    { href: '/admin', label: 'نظرة عامة', icon: LayoutDashboard },
    { href: '/admin/students', label: 'الطلاب', icon: Users },
    { href: '/admin/analytics', label: 'التحليلات', icon: BarChart3 },
    { href: '/admin/settings', label: 'الإعدادات', icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAdmin, isLoading, user } = useAdmin();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push('/');
        }
    }, [isAdmin, isLoading, router]);

    if (isLoading) {
        return (
            <div className="admin-loading">
                <div className="admin-loading-spinner"></div>
                <p>جاري التحميل...</p>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <Link href="/" className="admin-logo">
                        <FlaskConical size={28} />
                        <span>لوحة الإدارة</span>
                    </Link>
                </div>

                <nav className="admin-nav">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`admin-nav-link ${isActive ? 'active' : ''}`}
                            >
                                <Icon size={20} />
                                <span>{link.label}</span>
                                {isActive && <ChevronRight size={16} className="admin-nav-arrow" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="admin-sidebar-footer">
                    <div className="admin-user-info">
                        {user?.image && (
                            <img src={user.image} alt={user.name || ''} className="admin-user-avatar" />
                        )}
                        <div className="admin-user-details">
                            <span className="admin-user-name">{user?.name}</span>
                            <span className="admin-user-role">مشرف</span>
                        </div>
                    </div>
                    <button onClick={() => signOut()} className="admin-logout-btn">
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {children}
            </main>

            <style jsx global>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }

        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #0f172a;
          color: white;
          gap: 1rem;
        }

        .admin-loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(139, 92, 246, 0.2);
          border-top-color: #8b5cf6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .admin-sidebar {
          width: 280px;
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          z-index: 100;
        }

        .admin-sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
          text-decoration: none;
        }

        .admin-logo svg {
          color: #8b5cf6;
        }

        .admin-nav {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .admin-nav-link:hover {
          background: rgba(139, 92, 246, 0.1);
          color: white;
        }

        .admin-nav-link.active {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          color: white;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        .admin-nav-arrow {
          position: absolute;
          left: 1rem;
          opacity: 0.7;
        }

        .admin-sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .admin-user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .admin-user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(139, 92, 246, 0.5);
        }

        .admin-user-details {
          display: flex;
          flex-direction: column;
        }

        .admin-user-name {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .admin-user-role {
          color: #8b5cf6;
          font-size: 0.75rem;
        }

        .admin-logout-btn {
          padding: 0.5rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .admin-logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .admin-main {
          flex: 1;
          margin-right: 280px;
          padding: 2rem;
          min-height: 100vh;
        }

        /* Admin Cards */
        .admin-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .admin-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
        }

        .admin-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .admin-card-title {
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .admin-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .admin-stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        /* Admin Table */
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          text-align: right;
          padding: 1rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          font-size: 0.875rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-table td {
          padding: 1rem;
          color: white;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .admin-table tr:hover td {
          background: rgba(139, 92, 246, 0.05);
        }

        /* Progress Bar */
        .admin-progress {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .admin-progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        /* Badges */
        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .admin-badge-success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .admin-badge-warning {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .admin-badge-purple {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .admin-sidebar {
            width: 80px;
          }
          
          .admin-sidebar span,
          .admin-user-details,
          .admin-nav-arrow {
            display: none;
          }
          
          .admin-nav-link {
            justify-content: center;
            padding: 1rem;
          }
          
          .admin-main {
            margin-right: 80px;
          }
        }
      `}</style>
        </div>
    );
}
