'use client';

import { useGamification } from '@/contexts/GamificationContext';
import { motion } from 'framer-motion';

export default function AchievementsGrid() {
    const { achievements, unlockedAchievements } = useGamification();

    const sortedAchievements = [...achievements].sort((a, b) => {
        const aUnlocked = unlockedAchievements.includes(a.id);
        const bUnlocked = unlockedAchievements.includes(b.id);
        if (aUnlocked && !bUnlocked) return -1;
        if (!aUnlocked && bUnlocked) return 1;
        return 0;
    });

    return (
        <div className="achievements-grid">
            {sortedAchievements.map((achievement, index) => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);

                return (
                    <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                    >
                        <div className="achievement-icon">
                            {isUnlocked ? achievement.icon : '🔒'}
                        </div>
                        <div className="achievement-info">
                            <h4>{achievement.name}</h4>
                            <p>{achievement.description}</p>
                        </div>
                        {isUnlocked && (
                            <div className="unlocked-badge">✓</div>
                        )}
                    </motion.div>
                );
            })}

            <style jsx>{`
                .achievements-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1rem;
                }
                
                .achievement-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 12px;
                    transition: all 0.3s;
                    position: relative;
                }
                
                .achievement-card.unlocked {
                    background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
                    border: 1px solid rgba(251, 191, 36, 0.3);
                }
                
                .achievement-card.locked {
                    background: var(--color-bg-tertiary);
                    border: 1px solid var(--color-border);
                    opacity: 0.6;
                }
                
                .achievement-card.unlocked:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(251, 191, 36, 0.15);
                }
                
                .achievement-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    border-radius: 12px;
                    flex-shrink: 0;
                }
                
                .unlocked .achievement-icon {
                    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
                }
                
                .locked .achievement-icon {
                    background: var(--color-bg-secondary);
                }
                
                .achievement-info {
                    flex: 1;
                    min-width: 0;
                }
                
                .achievement-info h4 {
                    margin: 0 0 0.25rem;
                    font-size: 0.95rem;
                    font-weight: 600;
                }
                
                .unlocked .achievement-info h4 {
                    color: #fbbf24;
                }
                
                .achievement-info p {
                    margin: 0;
                    font-size: 0.8rem;
                    color: var(--color-text-muted);
                }
                
                .unlocked-badge {
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #10b981;
                    border-radius: 50%;
                    color: white;
                    font-size: 0.7rem;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}
