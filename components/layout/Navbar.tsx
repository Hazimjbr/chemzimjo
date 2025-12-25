'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FlaskConical, Flame, Award, Sparkles, Sun, Moon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import AuthButton from '@/components/auth/AuthButton';
import { useTheme } from '@/contexts/ThemeContext';
import { getUserProgress, LEVEL_THRESHOLDS } from '@/lib/gamification';
import { useEffect } from 'react';

const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/lessons', label: 'الدروس' },
    { href: '/simulations', label: 'المحاكاة' },
    { href: '/quizzes', label: 'الاختبارات' },
    { href: '/flashcards', label: 'البطاقات' },
    { href: '/dashboard', label: 'لوحة التقدم' },
    { href: '/glossary', label: 'المصطلحات' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { data: session } = useSession();
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const progress = getUserProgress();
        setXp(progress.xp);
        setLevel(progress.level);

        const streakData = localStorage.getItem('streakData');
        if (streakData) {
            setStreak(JSON.parse(streakData).currentStreak || 0);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                {/* Logo */}
                <Link href="/" className="navbar-logo">
                    <FlaskConical size={28} />
                    <span className="logo-text gradient-text">الكيمياء التفاعلية</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-container">
                    <ul className="navbar-menu desktop-menu">
                        {navLinks.map((link, index) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`navbar-link ${pathname === link.href ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                                {index < navLinks.length - 1 && <span className="nav-separator">•</span>}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Section - Stats & Actions */}
                <div className="navbar-actions">
                    {/* Gamification Stats (Desktop) */}
                    {session && (
                        <div className="stats-group">
                            {streak > 0 && (
                                <div className="stat-badge streak">
                                    <Flame size={14} />
                                    <span>{streak}</span>
                                </div>
                            )}
                            <div className="stat-badge xp">
                                <Award size={14} />
                                <span>Lv.{level}</span>
                                <span className="xp-count">{xp} XP</span>
                            </div>
                        </div>
                    )}

                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Auth Button */}
                    <AuthButton />

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`mobile-link ${pathname === link.href ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}

                {/* Mobile Stats */}
                {session && (
                    <div className="mobile-stats">
                        {streak > 0 && (
                            <div className="stat-badge streak">
                                <Flame size={14} />
                                <span>{streak} أيام</span>
                            </div>
                        )}
                        <div className="stat-badge xp">
                            <Award size={14} />
                            <span>المستوى {level}</span>
                            <span className="xp-count">{xp} XP</span>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    background: rgba(10, 14, 23, 0.95);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--color-border);
                }
                
                .navbar-inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 64px;
                    gap: 1rem;
                }
                
                .navbar-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-text-primary);
                    text-decoration: none;
                    flex-shrink: 0;
                }
                
                .logo-text {
                    font-weight: 700;
                    font-size: 1.1rem;
                }
                
                .nav-container {
                    display: none;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    padding: 0.25rem 0.5rem;
                }
                
                @media (min-width: 1024px) {
                    .nav-container {
                        display: block;
                    }
                }
                
                .desktop-menu {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                
                .desktop-menu li {
                    display: flex;
                    align-items: center;
                }
                
                .nav-separator {
                    color: var(--color-text-muted);
                    opacity: 0.4;
                    font-size: 0.5rem;
                    margin: 0 0.25rem;
                }
                
                .navbar-link {
                    padding: 0.5rem 0.75rem;
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 500;
                    border-radius: 8px;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                
                .navbar-link:hover {
                    color: #fff;
                    background: rgba(139, 92, 246, 0.15);
                }
                
                .navbar-link.active {
                    color: #a78bfa;
                    background: rgba(139, 92, 246, 0.2);
                    font-weight: 600;
                }
                
                .navbar-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .stats-group {
                    display: none;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                @media (min-width: 768px) {
                    .stats-group {
                        display: flex;
                    }
                }
                
                .stat-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.35rem 0.6rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .stat-badge.streak {
                    background: rgba(251, 146, 60, 0.15);
                    border: 1px solid rgba(251, 146, 60, 0.3);
                    color: #fb923c;
                }
                
                .stat-badge.xp {
                    background: rgba(139, 92, 246, 0.15);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    color: #a78bfa;
                }
                
                .xp-count {
                    opacity: 0.8;
                    margin-right: 0.25rem;
                }
                
                .icon-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fbbf24;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .icon-btn:hover {
                    background: rgba(255, 255, 255, 0.12);
                }
                
                .mobile-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    color: var(--color-text-primary);
                    cursor: pointer;
                    padding: 0.25rem;
                }
                
                @media (min-width: 1024px) {
                    .mobile-toggle {
                        display: none;
                    }
                }
                
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 64px;
                    left: 0;
                    right: 0;
                    background: var(--color-bg-secondary);
                    border-bottom: 1px solid var(--color-border);
                    padding: 1rem;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .mobile-menu.open {
                    display: flex;
                }
                
                @media (min-width: 1024px) {
                    .mobile-menu {
                        display: none !important;
                    }
                }
                
                .mobile-link {
                    padding: 0.75rem 1rem;
                    color: var(--color-text-secondary);
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.2s;
                }
                
                .mobile-link:hover,
                .mobile-link.active {
                    color: var(--color-primary-light);
                    background: rgba(139, 92, 246, 0.1);
                }
                
                .mobile-stats {
                    display: flex;
                    gap: 0.5rem;
                    padding: 0.75rem 1rem;
                    border-top: 1px solid var(--color-border);
                    margin-top: 0.5rem;
                }
                
                @media (max-width: 640px) {
                    .logo-text {
                        display: none;
                    }
                }
            `}</style>
        </nav>
    );
}
