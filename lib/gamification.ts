'use client';

// Gamification Constants
export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];
export const LEVEL_TITLES = [
    "مبتدئ",
    "طالب كيمياء",
    "باحث في المختبر",
    "مساعد مختبر",
    "كيميائي ناشئ",
    "كيميائي محترف",
    "خبير تفاعلات",
    "عالم ذرة",
    "بروفيسور",
    "نوبل في الكيمياء",
    "أسطورة العلوم"
];

// Events that award XP
export const XP_EVENTS = {
    READ_LESSON: 50,
    COMPLETE_QUIZ: 100,
    PERFECT_SCORE: 50,
    USE_SIMULATION: 30,
    DAILY_LOGIN: 20
};

export interface UserProgress {
    xp: number;
    level: number;
    title: string;
    nextLevelXp: number;
    progressPercent: number;
}

export const getUserProgress = (): UserProgress => {
    if (typeof window === 'undefined') return { xp: 0, level: 1, title: LEVEL_TITLES[0], nextLevelXp: 100, progressPercent: 0 };

    const xp = parseInt(localStorage.getItem('user_xp') || '0');
    let level = 1;

    // Calculate Level
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (xp >= LEVEL_THRESHOLDS[i]) {
            level = i + 1;
        } else {
            break;
        }
    }

    const currentLevelXp = LEVEL_THRESHOLDS[level - 1] || 0;
    const nextLevelXp = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    const xpInLevel = xp - currentLevelXp;
    const requiredXp = nextLevelXp - currentLevelXp;
    const progressPercent = Math.min(100, Math.round((xpInLevel / requiredXp) * 100));

    return {
        xp,
        level,
        title: LEVEL_TITLES[level - 1] || LEVEL_TITLES[LEVEL_TITLES.length - 1],
        nextLevelXp,
        progressPercent
    };
};

export const addXP = (amount: number): { newXp: number, leveledUp: boolean } => {
    if (typeof window === 'undefined') return { newXp: 0, leveledUp: false };

    const current = getUserProgress();
    const newXp = current.xp + amount;
    localStorage.setItem('user_xp', newXp.toString());

    const newStats = getUserProgress();
    const leveledUp = newStats.level > current.level;

    // Trigger visual feedback event if needed?
    // For now just return the state
    return { newXp, leveledUp };
};
