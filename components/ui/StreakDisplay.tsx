'use client';

import { Flame } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';

export default function StreakDisplay() {
    const { streak } = useGamification();

    if (streak.currentStreak === 0) return null;

    return (
        <div className="streak-display">
            <Flame size={16} className="streak-icon" />
            <span className="streak-count">{streak.currentStreak}</span>
            <style jsx>{`
                .streak-display {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.375rem 0.625rem;
                    border-radius: 20px;
                    background: linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%);
                    border: 1px solid rgba(251, 146, 60, 0.3);
                }
                
                :global(.streak-icon) {
                    color: #f97316;
                    animation: flicker 1.5s ease-in-out infinite;
                }
                
                .streak-count {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #fb923c;
                }
                
                @keyframes flicker {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
}
