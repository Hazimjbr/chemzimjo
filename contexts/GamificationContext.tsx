'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;
    totalDaysActive: number;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: string;
    requirement: {
        type: 'xp' | 'lessons' | 'quizzes' | 'streak' | 'level';
        value: number;
    };
}

export interface DailyChallenge {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    type: 'lesson' | 'quiz' | 'flashcard';
    target: number;
    progress: number;
    completed: boolean;
    expiresAt: string;
}

interface GamificationContextType {
    streak: StreakData;
    achievements: Achievement[];
    unlockedAchievements: string[];
    dailyChallenges: DailyChallenge[];
    checkStreak: () => void;
    unlockAchievement: (id: string) => void;
    updateChallengeProgress: (type: string, amount: number) => void;
}

const defaultStreak: StreakData = {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalDaysActive: 0,
};

// All available achievements
const allAchievements: Achievement[] = [
    { id: 'first-lesson', name: 'البداية', description: 'أكمل أول درس', icon: '📖', requirement: { type: 'lessons', value: 1 } },
    { id: 'five-lessons', name: 'طالب مجتهد', description: 'أكمل 5 دروس', icon: '📚', requirement: { type: 'lessons', value: 5 } },
    { id: 'first-quiz', name: 'اختبر نفسك', description: 'أكمل أول اختبار', icon: '✍️', requirement: { type: 'quizzes', value: 1 } },
    { id: 'perfect-quiz', name: 'درجة كاملة', description: 'احصل على 100% في اختبار', icon: '💯', requirement: { type: 'quizzes', value: 100 } },
    { id: 'xp-100', name: 'جامع النقاط', description: 'اجمع 100 XP', icon: '⭐', requirement: { type: 'xp', value: 100 } },
    { id: 'xp-500', name: 'نجم صاعد', description: 'اجمع 500 XP', icon: '🌟', requirement: { type: 'xp', value: 500 } },
    { id: 'xp-1000', name: 'خبير كيميائي', description: 'اجمع 1000 XP', icon: '🏆', requirement: { type: 'xp', value: 1000 } },
    { id: 'streak-3', name: 'ثلاثة أيام', description: 'حافظ على 3 أيام متتالية', icon: '🔥', requirement: { type: 'streak', value: 3 } },
    { id: 'streak-7', name: 'أسبوع كامل', description: 'حافظ على 7 أيام متتالية', icon: '🔥🔥', requirement: { type: 'streak', value: 7 } },
    { id: 'streak-30', name: 'شهر كامل', description: 'حافظ على 30 يوم متتالي', icon: '🔥🔥🔥', requirement: { type: 'streak', value: 30 } },
    { id: 'level-5', name: 'المستوى 5', description: 'وصلت للمستوى 5', icon: '🎖️', requirement: { type: 'level', value: 5 } },
    { id: 'level-10', name: 'المستوى 10', description: 'وصلت للمستوى 10', icon: '🏅', requirement: { type: 'level', value: 10 } },
];

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
    const [streak, setStreak] = useState<StreakData>(defaultStreak);
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);

    useEffect(() => {
        // Load streak data
        const savedStreak = localStorage.getItem('streakData');
        if (savedStreak) {
            setStreak(JSON.parse(savedStreak));
        }

        // Load achievements
        const savedAchievements = localStorage.getItem('unlockedAchievements');
        if (savedAchievements) {
            setUnlockedAchievements(JSON.parse(savedAchievements));
        }

        // Generate daily challenges
        generateDailyChallenges();

        // Check streak on load
        checkStreak();
    }, []);

    const checkStreak = () => {
        const today = new Date().toDateString();
        const savedStreak = localStorage.getItem('streakData');
        let currentStreakData = savedStreak ? JSON.parse(savedStreak) : defaultStreak;

        if (currentStreakData.lastActiveDate === today) {
            // Already active today
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (currentStreakData.lastActiveDate === yesterdayStr) {
            // Continue streak
            currentStreakData.currentStreak += 1;
            currentStreakData.longestStreak = Math.max(currentStreakData.longestStreak, currentStreakData.currentStreak);
        } else if (currentStreakData.lastActiveDate !== today) {
            // Streak broken
            currentStreakData.currentStreak = 1;
        }

        currentStreakData.lastActiveDate = today;
        currentStreakData.totalDaysActive += 1;

        setStreak(currentStreakData);
        localStorage.setItem('streakData', JSON.stringify(currentStreakData));

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('streak_updated', { detail: currentStreakData }));
    };

    const unlockAchievement = (id: string) => {
        if (!unlockedAchievements.includes(id)) {
            const newUnlocked = [...unlockedAchievements, id];
            setUnlockedAchievements(newUnlocked);
            localStorage.setItem('unlockedAchievements', JSON.stringify(newUnlocked));

            // Show notification
            window.dispatchEvent(new CustomEvent('achievement_unlocked', {
                detail: allAchievements.find(a => a.id === id)
            }));
        }
    };

    const generateDailyChallenges = () => {
        const today = new Date().toDateString();
        const savedChallenges = localStorage.getItem('dailyChallenges');

        if (savedChallenges) {
            const parsed = JSON.parse(savedChallenges);
            if (parsed.date === today) {
                setDailyChallenges(parsed.challenges);
                return;
            }
        }

        // Generate new challenges
        const challenges: DailyChallenge[] = [
            {
                id: 'daily-lesson',
                title: 'درس اليوم',
                description: 'أكمل درس واحد',
                xpReward: 20,
                type: 'lesson',
                target: 1,
                progress: 0,
                completed: false,
                expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
            },
            {
                id: 'daily-quiz',
                title: 'اختبار سريع',
                description: 'أجب على 5 أسئلة',
                xpReward: 30,
                type: 'quiz',
                target: 5,
                progress: 0,
                completed: false,
                expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
            },
            {
                id: 'daily-flashcard',
                title: 'راجع بطاقاتك',
                description: 'راجع 10 بطاقات',
                xpReward: 15,
                type: 'flashcard',
                target: 10,
                progress: 0,
                completed: false,
                expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
            },
        ];

        setDailyChallenges(challenges);
        localStorage.setItem('dailyChallenges', JSON.stringify({ date: today, challenges }));
    };

    const updateChallengeProgress = (type: string, amount: number) => {
        setDailyChallenges(prev => {
            const updated = prev.map(c => {
                if (c.type === type && !c.completed) {
                    const newProgress = c.progress + amount;
                    const completed = newProgress >= c.target;
                    return { ...c, progress: newProgress, completed };
                }
                return c;
            });

            const today = new Date().toDateString();
            localStorage.setItem('dailyChallenges', JSON.stringify({ date: today, challenges: updated }));
            return updated;
        });
    };

    return (
        <GamificationContext.Provider value={{
            streak,
            achievements: allAchievements,
            unlockedAchievements,
            dailyChallenges,
            checkStreak,
            unlockAchievement,
            updateChallengeProgress,
        }}>
            {children}
        </GamificationContext.Provider>
    );
}

export function useGamification() {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification must be used within GamificationProvider');
    }
    return context;
}
