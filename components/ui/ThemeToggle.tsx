'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun size={18} className="theme-icon" />
            ) : (
                <Moon size={18} className="theme-icon" />
            )}
            <style jsx>{`
                .theme-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: var(--color-text);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .theme-toggle:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateY(-1px);
                }
                
                :global(.theme-icon) {
                    color: #fbbf24;
                }
            `}</style>
        </button>
    );
}
