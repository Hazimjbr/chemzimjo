'use client';

import { useGamification } from '@/contexts/GamificationContext';
import { CheckCircle2, Circle, Gift, Flame } from 'lucide-react';

export default function DailyChallenges() {
    const { dailyChallenges, streak } = useGamification();

    const totalXP = dailyChallenges
        .filter(c => c.completed)
        .reduce((sum, c) => sum + c.xpReward, 0);

    const allCompleted = dailyChallenges.every(c => c.completed);

    return (
        <div className="daily-challenges">
            <div className="challenges-header">
                <div className="header-title">
                    <Gift size={20} className="header-icon" />
                    <h3>تحديات اليوم</h3>
                </div>
                {streak.currentStreak > 0 && (
                    <div className="streak-badge">
                        <Flame size={14} />
                        <span>{streak.currentStreak} أيام</span>
                    </div>
                )}
            </div>

            <div className="challenges-list">
                {dailyChallenges.map((challenge) => (
                    <div
                        key={challenge.id}
                        className={`challenge-item ${challenge.completed ? 'completed' : ''}`}
                    >
                        <div className="challenge-check">
                            {challenge.completed ? (
                                <CheckCircle2 size={20} className="check-done" />
                            ) : (
                                <Circle size={20} className="check-pending" />
                            )}
                        </div>
                        <div className="challenge-info">
                            <h4>{challenge.title}</h4>
                            <p>{challenge.description}</p>
                            <div className="challenge-progress">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${Math.min(100, (challenge.progress / challenge.target) * 100)}%`
                                    }}
                                />
                            </div>
                        </div>
                        <div className="challenge-reward">
                            <span>+{challenge.xpReward}</span>
                            <small>XP</small>
                        </div>
                    </div>
                ))}
            </div>

            {allCompleted && (
                <div className="bonus-banner">
                    🎉 أحسنت! أكملت جميع التحديات اليوم! +{totalXP} XP
                </div>
            )}

            <style jsx>{`
                .daily-challenges {
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border);
                    border-radius: 16px;
                    padding: 1.5rem;
                    backdrop-filter: blur(12px);
                }
                
                .challenges-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.25rem;
                }
                
                .header-title {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .header-title h3 {
                    margin: 0;
                    font-size: 1.1rem;
                }
                
                :global(.header-icon) {
                    color: #fbbf24;
                }
                
                .streak-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.25rem 0.625rem;
                    background: linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%);
                    border: 1px solid rgba(251, 146, 60, 0.3);
                    border-radius: 20px;
                    color: #fb923c;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .challenges-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .challenge-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.875rem;
                    background: var(--color-bg-tertiary);
                    border-radius: 12px;
                    transition: all 0.2s;
                }
                
                .challenge-item.completed {
                    opacity: 0.7;
                }
                
                .challenge-check {
                    flex-shrink: 0;
                }
                
                :global(.check-done) {
                    color: #10b981;
                }
                
                :global(.check-pending) {
                    color: var(--color-text-muted);
                }
                
                .challenge-info {
                    flex: 1;
                    min-width: 0;
                }
                
                .challenge-info h4 {
                    margin: 0 0 0.125rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                }
                
                .challenge-info p {
                    margin: 0 0 0.5rem;
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                }
                
                .challenge-progress {
                    height: 4px;
                    background: var(--color-bg-secondary);
                    border-radius: 2px;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #8b5cf6 0%, #10b981 100%);
                    border-radius: 2px;
                    transition: width 0.5s ease;
                }
                
                .challenge-reward {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0.375rem 0.75rem;
                    background: rgba(139, 92, 246, 0.15);
                    border-radius: 8px;
                    flex-shrink: 0;
                }
                
                .challenge-reward span {
                    font-weight: 700;
                    color: #a78bfa;
                    font-size: 0.9rem;
                }
                
                .challenge-reward small {
                    font-size: 0.65rem;
                    color: var(--color-text-muted);
                }
                
                .bonus-banner {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    border-radius: 10px;
                    text-align: center;
                    font-weight: 600;
                    color: #10b981;
                    font-size: 0.9rem;
                }
            `}</style>
        </div>
    );
}
