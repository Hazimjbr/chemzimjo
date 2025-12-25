'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { Achievement } from '@/contexts/GamificationContext';

export default function AchievementToast() {
    const [achievement, setAchievement] = useState<Achievement | null>(null);

    useEffect(() => {
        const handleAchievement = (e: CustomEvent<Achievement>) => {
            setAchievement(e.detail);
            setTimeout(() => setAchievement(null), 5000);
        };

        window.addEventListener('achievement_unlocked', handleAchievement as EventListener);
        return () => window.removeEventListener('achievement_unlocked', handleAchievement as EventListener);
    }, []);

    return (
        <AnimatePresence>
            {achievement && (
                <motion.div
                    initial={{ opacity: 0, y: -100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    className="achievement-toast"
                >
                    <div className="achievement-glow" />
                    <div className="achievement-content">
                        <div className="achievement-icon">
                            <span>{achievement.icon}</span>
                        </div>
                        <div className="achievement-info">
                            <span className="achievement-label">
                                <Trophy size={12} /> إنجاز جديد!
                            </span>
                            <h4 className="achievement-name">{achievement.name}</h4>
                            <p className="achievement-desc">{achievement.description}</p>
                        </div>
                        <button
                            className="close-btn"
                            onClick={() => setAchievement(null)}
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <style jsx>{`
                        .achievement-toast {
                            position: fixed;
                            top: 100px;
                            left: 50%;
                            transform: translateX(-50%);
                            z-index: 9999;
                            min-width: 320px;
                        }
                        
                        .achievement-glow {
                            position: absolute;
                            inset: -10px;
                            background: radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%);
                            animation: pulse 2s ease-in-out infinite;
                            border-radius: 20px;
                        }
                        
                        .achievement-content {
                            position: relative;
                            display: flex;
                            align-items: center;
                            gap: 1rem;
                            padding: 1rem 1.25rem;
                            background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
                            border: 2px solid rgba(251, 191, 36, 0.4);
                            border-radius: 16px;
                            backdrop-filter: blur(20px);
                        }
                        
                        .achievement-icon {
                            width: 50px;
                            height: 50px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
                            border-radius: 12px;
                            font-size: 1.5rem;
                            animation: bounce 0.5s ease;
                        }
                        
                        .achievement-info {
                            flex: 1;
                        }
                        
                        .achievement-label {
                            display: flex;
                            align-items: center;
                            gap: 0.25rem;
                            font-size: 0.7rem;
                            color: #fbbf24;
                            font-weight: 600;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        
                        .achievement-name {
                            margin: 0.25rem 0;
                            font-size: 1rem;
                            font-weight: 700;
                            color: white;
                        }
                        
                        .achievement-desc {
                            margin: 0;
                            font-size: 0.8rem;
                            color: rgba(255, 255, 255, 0.7);
                        }
                        
                        .close-btn {
                            background: none;
                            border: none;
                            color: rgba(255, 255, 255, 0.5);
                            cursor: pointer;
                            padding: 4px;
                            transition: color 0.2s;
                        }
                        
                        .close-btn:hover {
                            color: white;
                        }
                        
                        @keyframes pulse {
                            0%, 100% { opacity: 0.5; transform: scale(1); }
                            50% { opacity: 1; transform: scale(1.05); }
                        }
                        
                        @keyframes bounce {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.2); }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
