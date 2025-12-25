'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

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

interface UserData {
    userId: string;
    email: string;
    name: string;
    avatar: string;
    xp: number;
    level: number;
    streak: StreakData;
    completedLessons: string[];
    quizScores: Record<string, number>;
    unlockedAchievements: string[];
    dailyChallenges: { date: string; challenges: DailyChallenge[] };
}

interface GamificationContextType {
    streak: StreakData;
    achievements: Achievement[];
    unlockedAchievements: string[];
    dailyChallenges: DailyChallenge[];
    xp: number;
    level: number;
    completedLessons: string[];
    quizScores: Record<string, number>;
    isLoading: boolean;
    checkStreak: () => void;
    unlockAchievement: (id: string) => void;
    updateChallengeProgress: (type: string, amount: number) => void;
    addXP: (amount: number) => void;
    completeLesson: (lessonId: string) => void;
    saveQuizScore: (quizId: string, score: number) => void;
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

function calculateLevel(xp: number): number {
    if (xp >= 5000) return 10;
    if (xp >= 3500) return 9;
    if (xp >= 2500) return 8;
    if (xp >= 1800) return 7;
    if (xp >= 1200) return 6;
    if (xp >= 800) return 5;
    if (xp >= 500) return 4;
    if (xp >= 300) return 3;
    if (xp >= 150) return 2;
    return 1;
}

export function GamificationProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [streak, setStreak] = useState<StreakData>(defaultStreak);
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
    const [xp, setXP] = useState(0);
    const [level, setLevel] = useState(1);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [quizScores, setQuizScores] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    // Get user ID from session email
    useEffect(() => {
        if (session?.user?.email) {
            // Use email as document ID (sanitized)
            const id = session.user.email.replace(/[.#$[\]]/g, '_');
            setUserId(id);
        } else {
            setUserId(null);
            setIsLoading(false);
        }
    }, [session]);

    // Load user data from Firestore
    useEffect(() => {
        if (!userId) return;

        const loadUserData = async () => {
            setIsLoading(true);
            try {
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data() as UserData;
                    setStreak(data.streak || defaultStreak);
                    setXP(data.xp || 0);
                    setLevel(data.level || 1);
                    setCompletedLessons(data.completedLessons || []);
                    setQuizScores(data.quizScores || {});
                    setUnlockedAchievements(data.unlockedAchievements || []);

                    // Load daily challenges
                    const today = new Date().toDateString();
                    if (data.dailyChallenges?.date === today) {
                        setDailyChallenges(data.dailyChallenges.challenges);
                    } else {
                        generateDailyChallenges();
                    }
                } else {
                    // Create new user document
                    const newUserData: UserData = {
                        userId: userId,
                        email: session?.user?.email || '',
                        name: session?.user?.name || '',
                        avatar: session?.user?.image || '',
                        xp: 0,
                        level: 1,
                        streak: defaultStreak,
                        completedLessons: [],
                        quizScores: {},
                        unlockedAchievements: [],
                        dailyChallenges: { date: '', challenges: [] }
                    };
                    await setDoc(userRef, {
                        ...newUserData,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp()
                    });
                    generateDailyChallenges();
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                // Fallback to localStorage
                loadFromLocalStorage();
            }
            setIsLoading(false);
        };

        loadUserData();
    }, [userId, session]);

    const loadFromLocalStorage = () => {
        const savedStreak = localStorage.getItem('streakData');
        if (savedStreak) setStreak(JSON.parse(savedStreak));

        const savedAchievements = localStorage.getItem('unlockedAchievements');
        if (savedAchievements) setUnlockedAchievements(JSON.parse(savedAchievements));

        const savedXP = localStorage.getItem('xp');
        if (savedXP) {
            const xpVal = parseInt(savedXP);
            setXP(xpVal);
            setLevel(calculateLevel(xpVal));
        }

        const savedLessons = localStorage.getItem('completedLessons');
        if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));

        generateDailyChallenges();
    };

    const saveToFirestore = useCallback(async (updates: Partial<UserData>) => {
        if (!userId) {
            // Save to localStorage if not logged in
            if (updates.streak) localStorage.setItem('streakData', JSON.stringify(updates.streak));
            if (updates.xp !== undefined) localStorage.setItem('xp', updates.xp.toString());
            if (updates.completedLessons) localStorage.setItem('completedLessons', JSON.stringify(updates.completedLessons));
            if (updates.unlockedAchievements) localStorage.setItem('unlockedAchievements', JSON.stringify(updates.unlockedAchievements));
            return;
        }

        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error saving to Firestore:', error);
        }
    }, [userId]);

    const checkStreak = useCallback(() => {
        const today = new Date().toDateString();

        if (streak.lastActiveDate === today) {
            return; // Already active today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        let newStreak = { ...streak };

        if (streak.lastActiveDate === yesterdayStr) {
            // Continue streak
            newStreak.currentStreak += 1;
            newStreak.longestStreak = Math.max(newStreak.longestStreak, newStreak.currentStreak);
        } else if (streak.lastActiveDate !== today) {
            // Streak broken
            newStreak.currentStreak = 1;
        }

        newStreak.lastActiveDate = today;
        newStreak.totalDaysActive += 1;

        setStreak(newStreak);
        saveToFirestore({ streak: newStreak });

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('streak_updated', { detail: newStreak }));
    }, [streak, saveToFirestore]);

    const unlockAchievement = useCallback((id: string) => {
        if (!unlockedAchievements.includes(id)) {
            const newUnlocked = [...unlockedAchievements, id];
            setUnlockedAchievements(newUnlocked);
            saveToFirestore({ unlockedAchievements: newUnlocked });

            // Show notification
            window.dispatchEvent(new CustomEvent('achievement_unlocked', {
                detail: allAchievements.find(a => a.id === id)
            }));
        }
    }, [unlockedAchievements, saveToFirestore]);

    const addXP = useCallback((amount: number) => {
        const newXP = xp + amount;
        const newLevel = calculateLevel(newXP);

        setXP(newXP);
        setLevel(newLevel);
        saveToFirestore({ xp: newXP, level: newLevel });

        // Check for XP achievements
        if (newXP >= 100) unlockAchievement('xp-100');
        if (newXP >= 500) unlockAchievement('xp-500');
        if (newXP >= 1000) unlockAchievement('xp-1000');
        if (newLevel >= 5) unlockAchievement('level-5');
        if (newLevel >= 10) unlockAchievement('level-10');
    }, [xp, saveToFirestore, unlockAchievement]);

    const completeLesson = useCallback((lessonId: string) => {
        if (!completedLessons.includes(lessonId)) {
            const newCompleted = [...completedLessons, lessonId];
            setCompletedLessons(newCompleted);
            saveToFirestore({ completedLessons: newCompleted });

            // Add XP
            addXP(25);

            // Check achievements
            if (newCompleted.length >= 1) unlockAchievement('first-lesson');
            if (newCompleted.length >= 5) unlockAchievement('five-lessons');

            // Update daily challenge
            updateChallengeProgress('lesson', 1);
        }
    }, [completedLessons, saveToFirestore, addXP, unlockAchievement]);

    const saveQuizScore = useCallback((quizId: string, score: number) => {
        const currentScore = quizScores[quizId] || 0;
        if (score > currentScore) {
            const newScores = { ...quizScores, [quizId]: score };
            setQuizScores(newScores);
            saveToFirestore({ quizScores: newScores });

            // Add XP based on score
            addXP(Math.round(score / 10));

            // Check achievements
            if (Object.keys(newScores).length >= 1) unlockAchievement('first-quiz');
            if (score === 100) unlockAchievement('perfect-quiz');

            // Update daily challenge
            updateChallengeProgress('quiz', 1);
        }
    }, [quizScores, saveToFirestore, addXP, unlockAchievement]);

    const generateDailyChallenges = () => {
        const today = new Date().toDateString();

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
        if (userId) {
            saveToFirestore({ dailyChallenges: { date: today, challenges } });
        } else {
            localStorage.setItem('dailyChallenges', JSON.stringify({ date: today, challenges }));
        }
    };

    const updateChallengeProgress = useCallback((type: string, amount: number) => {
        setDailyChallenges(prev => {
            const updated = prev.map(c => {
                if (c.type === type && !c.completed) {
                    const newProgress = c.progress + amount;
                    const completed = newProgress >= c.target;
                    if (completed && !c.completed) {
                        // Add XP reward
                        addXP(c.xpReward);
                    }
                    return { ...c, progress: newProgress, completed };
                }
                return c;
            });

            const today = new Date().toDateString();
            if (userId) {
                saveToFirestore({ dailyChallenges: { date: today, challenges: updated } });
            } else {
                localStorage.setItem('dailyChallenges', JSON.stringify({ date: today, challenges: updated }));
            }
            return updated;
        });
    }, [userId, saveToFirestore, addXP]);

    // Check streak on mount
    useEffect(() => {
        if (!isLoading && streak.lastActiveDate) {
            checkStreak();
        }
    }, [isLoading]);

    return (
        <GamificationContext.Provider value={{
            streak,
            achievements: allAchievements,
            unlockedAchievements,
            dailyChallenges,
            xp,
            level,
            completedLessons,
            quizScores,
            isLoading,
            checkStreak,
            unlockAchievement,
            updateChallengeProgress,
            addXP,
            completeLesson,
            saveQuizScore,
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
