'use client';

import { useState, useEffect } from 'react';
import { Award, Sparkles } from 'lucide-react';
import { getUserProgress, UserProgress, LEVEL_THRESHOLDS } from '@/lib/gamification';

export default function XPProgressBar() {
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        setProgress(getUserProgress());

        const handleUpdate = () => setProgress(getUserProgress());
        window.addEventListener('xp_updated', handleUpdate);
        window.addEventListener('storage', handleUpdate);

        return () => {
            window.removeEventListener('xp_updated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    if (!progress) return null;

    // Calculate progress to next level
    const currentLevelXP = LEVEL_THRESHOLDS[progress.level - 1] || 0;
    const nextLevelXP = LEVEL_THRESHOLDS[progress.level] || progress.xp + 100;
    const xpInCurrentLevel = progress.xp - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    const percentage = Math.min(100, (xpInCurrentLevel / xpNeededForLevel) * 100);

    return (
        <div className="xp-progress-container">
            <div className="xp-level">
                <Award size={14} className="level-icon" />
                <span>{progress.level}</span>
            </div>
            <div className="xp-bar-wrapper">
                <div className="xp-bar">
                    <div
                        className="xp-bar-fill"
                        style={{ width: `${percentage}%` }}
                    >
                        <Sparkles size={10} className="sparkle" />
                    </div>
                </div>
                <span className="xp-text">{progress.xp} XP</span>
            </div>
            <style jsx>{`
                .xp-progress-container {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.375rem 0.75rem;
                    border-radius: 20px;
                    background: rgba(139, 92, 246, 0.1);
                    border: 1px solid rgba(139, 92, 246, 0.25);
                }
                
                .xp-level {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #a78bfa;
                    font-weight: 700;
                    font-size: 0.75rem;
                }
                
                :global(.level-icon) {
                    color: #a78bfa;
                }
                
                .xp-bar-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .xp-bar {
                    width: 60px;
                    height: 6px;
                    background: rgba(139, 92, 246, 0.2);
                    border-radius: 3px;
                    overflow: hidden;
                }
                
                .xp-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%);
                    border-radius: 3px;
                    position: relative;
                    transition: width 0.5s ease;
                }
                
                :global(.sparkle) {
                    position: absolute;
                    right: 2px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: white;
                    animation: sparkle 1s ease-in-out infinite;
                }
                
                .xp-text {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: #a78bfa;
                    min-width: 45px;
                }
                
                @keyframes sparkle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @media (max-width: 640px) {
                    .xp-bar-wrapper {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}
