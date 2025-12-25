// Students Data Store
// Simulated database for student progress tracking

export interface StudentProgress {
    id: string;
    email: string;
    name: string;
    image?: string;
    xp: number;
    level: number;
    title: string;
    completedLessons: string[];
    quizScores: Record<string, number>;
    lastActive: string;
    joinedAt: string;
    totalTimeSpent: number; // in minutes
}

// In-memory store (in production, use a real database)
let studentsData: Map<string, StudentProgress> = new Map();

// Initialize with some demo data
const demoStudents: StudentProgress[] = [
    {
        id: '1',
        email: 'student1@example.com',
        name: 'أحمد محمد',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
        xp: 450,
        level: 3,
        title: 'باحث في المختبر',
        completedLessons: ['intro-acids-bases', 'ph-scale'],
        quizScores: { 'intro-quiz': 8, 'ph-quiz': 7 },
        lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        totalTimeSpent: 180,
    },
    {
        id: '2',
        email: 'student2@example.com',
        name: 'فاطمة علي',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
        xp: 820,
        level: 5,
        title: 'كيميائي ناشئ',
        completedLessons: ['intro-acids-bases', 'ph-scale', 'indicators', 'neutralization'],
        quizScores: { 'intro-quiz': 10, 'ph-quiz': 9, 'indicators-quiz': 8 },
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
        totalTimeSpent: 320,
    },
    {
        id: '3',
        email: 'student3@example.com',
        name: 'محمد خالد',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed',
        xp: 150,
        level: 2,
        title: 'طالب كيمياء',
        completedLessons: ['intro-acids-bases'],
        quizScores: { 'intro-quiz': 6 },
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        totalTimeSpent: 45,
    },
    {
        id: '4',
        email: 'student4@example.com',
        name: 'نور الهدى',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noor',
        xp: 1200,
        level: 6,
        title: 'كيميائي محترف',
        completedLessons: ['intro-acids-bases', 'ph-scale', 'indicators', 'neutralization', 'titration'],
        quizScores: { 'intro-quiz': 10, 'ph-quiz': 10, 'indicators-quiz': 9, 'neutralization-quiz': 10 },
        lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
        totalTimeSpent: 520,
    },
    {
        id: '5',
        email: 'student5@example.com',
        name: 'عمر سعيد',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
        xp: 280,
        level: 2,
        title: 'طالب كيمياء',
        completedLessons: ['intro-acids-bases', 'ph-scale'],
        quizScores: { 'intro-quiz': 7 },
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        totalTimeSpent: 95,
    },
];

// Initialize demo data
demoStudents.forEach(student => {
    studentsData.set(student.id, student);
});

// API Functions
export function getAllStudents(): StudentProgress[] {
    return Array.from(studentsData.values());
}

export function getStudentById(id: string): StudentProgress | undefined {
    return studentsData.get(id);
}

export function getStudentByEmail(email: string): StudentProgress | undefined {
    return Array.from(studentsData.values()).find(s => s.email === email);
}

export function updateStudent(id: string, data: Partial<StudentProgress>): StudentProgress | null {
    const student = studentsData.get(id);
    if (!student) return null;

    const updated = { ...student, ...data };
    studentsData.set(id, updated);
    return updated;
}

export function addStudent(student: Omit<StudentProgress, 'id'>): StudentProgress {
    const id = Date.now().toString();
    const newStudent = { ...student, id };
    studentsData.set(id, newStudent);
    return newStudent;
}

// Analytics Functions
export function getAnalytics() {
    const students = getAllStudents();
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const activeToday = students.filter(s => new Date(s.lastActive) > oneDayAgo).length;
    const activeThisWeek = students.filter(s => new Date(s.lastActive) > oneWeekAgo).length;

    const totalXP = students.reduce((sum, s) => sum + s.xp, 0);
    const avgXP = students.length > 0 ? Math.round(totalXP / students.length) : 0;

    const totalLessonsCompleted = students.reduce((sum, s) => sum + s.completedLessons.length, 0);
    const totalQuizzesTaken = students.reduce((sum, s) => sum + Object.keys(s.quizScores).length, 0);

    const avgQuizScore = (() => {
        let totalScore = 0;
        let totalQuizzes = 0;
        students.forEach(s => {
            Object.values(s.quizScores).forEach(score => {
                totalScore += score;
                totalQuizzes++;
            });
        });
        return totalQuizzes > 0 ? Math.round((totalScore / totalQuizzes) * 10) : 0;
    })();

    const levelDistribution = students.reduce((acc, s) => {
        acc[s.level] = (acc[s.level] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    return {
        totalStudents: students.length,
        activeToday,
        activeThisWeek,
        avgXP,
        totalLessonsCompleted,
        totalQuizzesTaken,
        avgQuizScore,
        levelDistribution,
        topStudents: [...students].sort((a, b) => b.xp - a.xp).slice(0, 5),
        recentlyActive: [...students].sort((a, b) =>
            new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        ).slice(0, 5),
    };
}
