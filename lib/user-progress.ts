// User Progress Service - Save/Load progress from Firestore
import { db } from './firebase';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp,
    increment
} from 'firebase/firestore';

export interface UserProgress {
    userId: string;
    email: string;
    name: string;
    avatar?: string;
    xp: number;
    level: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;
    completedLessons: string[];
    quizScores: Record<string, number>;
    unlockedAchievements: string[];
    dailyChallenges: {
        date: string;
        completed: string[];
    };
    createdAt?: any;
    updatedAt?: any;
}

// Get or create user progress
export async function getUserProgressFromDB(userId: string, userInfo?: { email?: string; name?: string; image?: string }): Promise<UserProgress | null> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data() as UserProgress;
        } else if (userInfo) {
            // Create new user
            const newProgress: UserProgress = {
                userId,
                email: userInfo.email || '',
                name: userInfo.name || '',
                avatar: userInfo.image || '',
                xp: 0,
                level: 1,
                currentStreak: 0,
                longestStreak: 0,
                lastActiveDate: new Date().toISOString().split('T')[0],
                completedLessons: [],
                quizScores: {},
                unlockedAchievements: [],
                dailyChallenges: {
                    date: new Date().toISOString().split('T')[0],
                    completed: []
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            await setDoc(userRef, newProgress);
            return newProgress;
        }
        return null;
    } catch (error) {
        console.error('Error getting user progress:', error);
        return null;
    }
}

// Update XP
export async function addXP(userId: string, amount: number): Promise<void> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data() as UserProgress;
            const newXP = data.xp + amount;
            const newLevel = calculateLevel(newXP);

            await updateDoc(userRef, {
                xp: newXP,
                level: newLevel,
                updatedAt: serverTimestamp()
            });
        }
    } catch (error) {
        console.error('Error adding XP:', error);
    }
}

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

// Complete a lesson
export async function completeLessonInDB(userId: string, lessonId: string): Promise<void> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data() as UserProgress;
            if (!data.completedLessons.includes(lessonId)) {
                await updateDoc(userRef, {
                    completedLessons: [...data.completedLessons, lessonId],
                    xp: data.xp + 25, // 25 XP per lesson
                    updatedAt: serverTimestamp()
                });
            }
        }
    } catch (error) {
        console.error('Error completing lesson:', error);
    }
}

// Save quiz score
export async function saveQuizScore(userId: string, quizId: string, score: number, totalQuestions: number): Promise<void> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data() as UserProgress;
            const percentage = Math.round((score / totalQuestions) * 100);

            // Only update if better score
            const currentScore = data.quizScores[quizId] || 0;
            if (percentage > currentScore) {
                const xpEarned = score * 10; // 10 XP per correct answer

                await updateDoc(userRef, {
                    [`quizScores.${quizId}`]: percentage,
                    xp: data.xp + xpEarned,
                    updatedAt: serverTimestamp()
                });
            }
        }
    } catch (error) {
        console.error('Error saving quiz score:', error);
    }
}

// Update streak
export async function updateStreak(userId: string): Promise<{ currentStreak: number; isNewDay: boolean }> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data() as UserProgress;
            const today = new Date().toISOString().split('T')[0];
            const lastActive = data.lastActiveDate;

            let newStreak = data.currentStreak;
            let isNewDay = false;

            if (lastActive !== today) {
                isNewDay = true;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (lastActive === yesterdayStr) {
                    // Consecutive day
                    newStreak = data.currentStreak + 1;
                } else {
                    // Streak broken
                    newStreak = 1;
                }

                const longestStreak = Math.max(newStreak, data.longestStreak);

                await updateDoc(userRef, {
                    currentStreak: newStreak,
                    longestStreak,
                    lastActiveDate: today,
                    updatedAt: serverTimestamp()
                });
            }

            return { currentStreak: newStreak, isNewDay };
        }
        return { currentStreak: 0, isNewDay: false };
    } catch (error) {
        console.error('Error updating streak:', error);
        return { currentStreak: 0, isNewDay: false };
    }
}

// Unlock achievement
export async function unlockAchievement(userId: string, achievementId: string): Promise<boolean> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data() as UserProgress;
            if (!data.unlockedAchievements.includes(achievementId)) {
                await updateDoc(userRef, {
                    unlockedAchievements: [...data.unlockedAchievements, achievementId],
                    xp: data.xp + 50, // 50 XP per achievement
                    updatedAt: serverTimestamp()
                });
                return true; // Achievement newly unlocked
            }
        }
        return false;
    } catch (error) {
        console.error('Error unlocking achievement:', error);
        return false;
    }
}
