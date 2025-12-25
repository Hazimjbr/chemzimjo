// مكتبة بيانات الجزيئات الكيميائية ثلاثية الأبعاد
// Comprehensive 3D Molecule Data Library

export interface AtomData {
    id: string;
    element: string;
    symbol: string;
    atomicNumber: number;
    color: string;
    size: number;
    x: number;
    y: number;
    z: number;
    charge?: number; // للأيونات
}

export interface BondData {
    source: number;
    target: number;
    type: 'single' | 'double' | 'triple' | 'ionic';
}

export interface MoleculeData {
    id: string;
    name: string;
    nameEn: string;
    formula: string;
    category: 'strong-acid' | 'weak-acid' | 'strong-base' | 'weak-base' | 'salt' | 'water' | 'ion';
    description: string;
    pH?: number;
    atoms: AtomData[];
    bonds: BondData[];
}

// ألوان العناصر حسب المعايير العلمية
export const elementColors: Record<string, string> = {
    H: '#FFFFFF',   // أبيض - هيدروجين
    O: '#FF0D0D',   // أحمر - أكسجين
    N: '#3050F8',   // أزرق - نيتروجين
    C: '#909090',   // رمادي - كربون
    S: '#FFFF30',   // أصفر - كبريت
    P: '#FF8000',   // برتقالي - فوسفور
    Cl: '#1FF01F',  // أخضر فاتح - كلور
    Na: '#AB5CF2',  // بنفسجي - صوديوم
    K: '#8F40D4',   // بنفسجي غامق - بوتاسيوم
    Ca: '#3DFF00',  // أخضر ليموني - كالسيوم
    Mg: '#8AFF00',  // أخضر فاتح - مغنيسيوم
    F: '#90E050',   // أخضر فاتح - فلور
    Br: '#A62929',  // بني محمر - بروم
    I: '#940094',   // بنفسجي غامق - يود
};

// أحجام الذرات النسبية (بالبيكومتر، مقسومة للتناسب)
export const atomicRadii: Record<string, number> = {
    H: 25,
    O: 48,
    N: 56,
    C: 70,
    S: 88,
    P: 98,
    Cl: 79,
    Na: 167,
    K: 196,
    Ca: 174,
    Mg: 136,
    F: 42,
    Br: 94,
    I: 115,
};

// مكتبة الجزيئات الشاملة
export const moleculesLibrary: MoleculeData[] = [
    // ================== الحموض القوية ==================
    {
        id: 'hcl',
        name: 'حمض الهيدروكلوريك',
        nameEn: 'Hydrochloric Acid',
        formula: 'HCl',
        category: 'strong-acid',
        description: 'حمض قوي يستخدم في الصناعة والمختبرات. يتفكك كلياً في الماء.',
        pH: 0,
        atoms: [
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -1.2, y: 0, z: 0 },
            { id: 'cl1', element: 'كلور', symbol: 'Cl', atomicNumber: 17, color: elementColors.Cl, size: atomicRadii.Cl, x: 1.2, y: 0, z: 0 },
        ],
        bonds: [{ source: 0, target: 1, type: 'single' }]
    },
    {
        id: 'hno3',
        name: 'حمض النيتريك',
        nameEn: 'Nitric Acid',
        formula: 'HNO₃',
        category: 'strong-acid',
        description: 'حمض قوي مؤكسد، يستخدم في صناعة الأسمدة والمتفجرات.',
        pH: 0,
        atoms: [
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.5, y: 1.2, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: -1.5, y: 0.5, z: 0 },
            { id: 'n1', element: 'نيتروجين', symbol: 'N', atomicNumber: 7, color: elementColors.N, size: atomicRadii.N, x: 0, y: 0, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.2, y: 1, z: 0 },
            { id: 'o3', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.2, y: -1, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'single' },
            { source: 1, target: 2, type: 'single' },
            { source: 2, target: 3, type: 'double' },
            { source: 2, target: 4, type: 'single' },
        ]
    },
    {
        id: 'h2so4',
        name: 'حمض الكبريتيك',
        nameEn: 'Sulfuric Acid',
        formula: 'H₂SO₄',
        category: 'strong-acid',
        description: 'ملك الحموض - أهم حمض صناعي، يستخدم في البطاريات والأسمدة.',
        pH: 0,
        atoms: [
            { id: 's1', element: 'كبريت', symbol: 'S', atomicNumber: 16, color: elementColors.S, size: atomicRadii.S, x: 0, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: 1.5, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: -1.5, z: 0 },
            { id: 'o3', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.5, y: 0, z: 0 },
            { id: 'o4', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: -1.5, y: 0, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 2.5, y: 0.5, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.5, y: 0.5, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'double' },
            { source: 0, target: 2, type: 'double' },
            { source: 0, target: 3, type: 'single' },
            { source: 0, target: 4, type: 'single' },
            { source: 3, target: 5, type: 'single' },
            { source: 4, target: 6, type: 'single' },
        ]
    },
    {
        id: 'hbr',
        name: 'حمض الهيدروبروميك',
        nameEn: 'Hydrobromic Acid',
        formula: 'HBr',
        category: 'strong-acid',
        description: 'حمض قوي يستخدم في التفاعلات العضوية.',
        pH: 0,
        atoms: [
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -1.4, y: 0, z: 0 },
            { id: 'br1', element: 'بروم', symbol: 'Br', atomicNumber: 35, color: elementColors.Br, size: atomicRadii.Br, x: 1.4, y: 0, z: 0 },
        ],
        bonds: [{ source: 0, target: 1, type: 'single' }]
    },

    // ================== الحموض الضعيفة ==================
    {
        id: 'ch3cooh',
        name: 'حمض الخليك (الخل)',
        nameEn: 'Acetic Acid',
        formula: 'CH₃COOH',
        category: 'weak-acid',
        description: 'حمض الخل - موجود في الخل الطبيعي بنسبة 5%.',
        pH: 2.4,
        atoms: [
            { id: 'c1', element: 'كربون', symbol: 'C', atomicNumber: 6, color: elementColors.C, size: atomicRadii.C, x: -1.5, y: 0, z: 0 },
            { id: 'c2', element: 'كربون', symbol: 'C', atomicNumber: 6, color: elementColors.C, size: atomicRadii.C, x: 0.5, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.5, y: 1.2, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.5, y: -1.2, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.2, y: 1, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.2, y: -0.5, z: 0.9 },
            { id: 'h3', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.2, y: -0.5, z: -0.9 },
            { id: 'h4', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 2.5, y: -1.2, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'single' },
            { source: 1, target: 2, type: 'double' },
            { source: 1, target: 3, type: 'single' },
            { source: 0, target: 4, type: 'single' },
            { source: 0, target: 5, type: 'single' },
            { source: 0, target: 6, type: 'single' },
            { source: 3, target: 7, type: 'single' },
        ]
    },
    {
        id: 'h2co3',
        name: 'حمض الكربونيك',
        nameEn: 'Carbonic Acid',
        formula: 'H₂CO₃',
        category: 'weak-acid',
        description: 'حمض ضعيف ينتج من ذوبان CO₂ في الماء. موجود في المشروبات الغازية.',
        pH: 4.7,
        atoms: [
            { id: 'c1', element: 'كربون', symbol: 'C', atomicNumber: 6, color: elementColors.C, size: atomicRadii.C, x: 0, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: 1.5, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.3, y: -0.75, z: 0 },
            { id: 'o3', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: -1.3, y: -0.75, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 2.2, y: -1.2, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.2, y: -1.2, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'double' },
            { source: 0, target: 2, type: 'single' },
            { source: 0, target: 3, type: 'single' },
            { source: 2, target: 4, type: 'single' },
            { source: 3, target: 5, type: 'single' },
        ]
    },
    {
        id: 'h3po4',
        name: 'حمض الفوسفوريك',
        nameEn: 'Phosphoric Acid',
        formula: 'H₃PO₄',
        category: 'weak-acid',
        description: 'حمض متعدد البروتونات، يستخدم في صناعة الأسمدة والمشروبات الغازية.',
        pH: 1.5,
        atoms: [
            { id: 'p1', element: 'فوسفور', symbol: 'P', atomicNumber: 15, color: elementColors.P, size: atomicRadii.P, x: 0, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: 1.6, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.4, y: -0.8, z: 0 },
            { id: 'o3', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: -1.4, y: -0.8, z: 0 },
            { id: 'o4', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: -0.8, z: 1.4 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 2.2, y: -1.3, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.2, y: -1.3, z: 0 },
            { id: 'h3', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 0, y: -1.3, z: 2.2 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'double' },
            { source: 0, target: 2, type: 'single' },
            { source: 0, target: 3, type: 'single' },
            { source: 0, target: 4, type: 'single' },
            { source: 2, target: 5, type: 'single' },
            { source: 3, target: 6, type: 'single' },
            { source: 4, target: 7, type: 'single' },
        ]
    },
    {
        id: 'hf',
        name: 'حمض الهيدروفلوريك',
        nameEn: 'Hydrofluoric Acid',
        formula: 'HF',
        category: 'weak-acid',
        description: 'حمض ضعيف لكنه خطير جداً، يستخدم في حفر الزجاج.',
        pH: 3.2,
        atoms: [
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -1, y: 0, z: 0 },
            { id: 'f1', element: 'فلور', symbol: 'F', atomicNumber: 9, color: elementColors.F, size: atomicRadii.F, x: 1, y: 0, z: 0 },
        ],
        bonds: [{ source: 0, target: 1, type: 'single' }]
    },

    // ================== القواعد القوية ==================
    {
        id: 'naoh',
        name: 'هيدروكسيد الصوديوم',
        nameEn: 'Sodium Hydroxide',
        formula: 'NaOH',
        category: 'strong-base',
        description: 'الصودا الكاوية - قاعدة قوية تستخدم في صناعة الصابون.',
        pH: 14,
        atoms: [
            { id: 'na1', element: 'صوديوم', symbol: 'Na', atomicNumber: 11, color: elementColors.Na, size: atomicRadii.Na, x: -1.8, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0.5, y: 0, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 1.8, y: 0, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'ionic' },
            { source: 1, target: 2, type: 'single' },
        ]
    },
    {
        id: 'koh',
        name: 'هيدروكسيد البوتاسيوم',
        nameEn: 'Potassium Hydroxide',
        formula: 'KOH',
        category: 'strong-base',
        description: 'البوتاس الكاوي - يستخدم في صناعة الصابون السائل.',
        pH: 14,
        atoms: [
            { id: 'k1', element: 'بوتاسيوم', symbol: 'K', atomicNumber: 19, color: elementColors.K, size: atomicRadii.K, x: -2, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0.5, y: 0, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 1.8, y: 0, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'ionic' },
            { source: 1, target: 2, type: 'single' },
        ]
    },
    {
        id: 'caoh2',
        name: 'هيدروكسيد الكالسيوم',
        nameEn: 'Calcium Hydroxide',
        formula: 'Ca(OH)₂',
        category: 'strong-base',
        description: 'الجير المطفأ - يستخدم في البناء ومعالجة المياه.',
        pH: 12.4,
        atoms: [
            { id: 'ca1', element: 'كالسيوم', symbol: 'Ca', atomicNumber: 20, color: elementColors.Ca, size: atomicRadii.Ca, x: 0, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: -1.8, y: 0, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.8, y: 0, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.8, y: 0.5, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 2.8, y: 0.5, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'ionic' },
            { source: 0, target: 2, type: 'ionic' },
            { source: 1, target: 3, type: 'single' },
            { source: 2, target: 4, type: 'single' },
        ]
    },
    {
        id: 'mgoh2',
        name: 'هيدروكسيد المغنيسيوم',
        nameEn: 'Magnesium Hydroxide',
        formula: 'Mg(OH)₂',
        category: 'strong-base',
        description: 'حليب المغنيسيا - يستخدم كمضاد للحموضة وملين.',
        pH: 10.5,
        atoms: [
            { id: 'mg1', element: 'مغنيسيوم', symbol: 'Mg', atomicNumber: 12, color: elementColors.Mg, size: atomicRadii.Mg, x: 0, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: -1.6, y: 0, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.6, y: 0, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -2.5, y: 0.5, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 2.5, y: 0.5, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'ionic' },
            { source: 0, target: 2, type: 'ionic' },
            { source: 1, target: 3, type: 'single' },
            { source: 2, target: 4, type: 'single' },
        ]
    },

    // ================== القواعد الضعيفة ==================
    {
        id: 'nh3',
        name: 'الأمونيا',
        nameEn: 'Ammonia',
        formula: 'NH₃',
        category: 'weak-base',
        description: 'غاز الأمونيا - قاعدة ضعيفة تستخدم في التنظيف والأسمدة.',
        pH: 11.6,
        atoms: [
            { id: 'n1', element: 'نيتروجين', symbol: 'N', atomicNumber: 7, color: elementColors.N, size: atomicRadii.N, x: 0, y: 0.4, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 0, y: -1, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 0.9, y: 0.9, z: 0 },
            { id: 'h3', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -0.9, y: 0.9, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'single' },
            { source: 0, target: 2, type: 'single' },
            { source: 0, target: 3, type: 'single' },
        ]
    },
    {
        id: 'nh4oh',
        name: 'هيدروكسيد الأمونيوم',
        nameEn: 'Ammonium Hydroxide',
        formula: 'NH₄OH',
        category: 'weak-base',
        description: 'محلول الأمونيا في الماء - يستخدم في التنظيف.',
        pH: 11.1,
        atoms: [
            { id: 'n1', element: 'نيتروجين', symbol: 'N', atomicNumber: 7, color: elementColors.N, size: atomicRadii.N, x: -1, y: 0, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -1.8, y: 0.8, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -1.8, y: -0.8, z: 0 },
            { id: 'h3', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -0.2, y: 0.8, z: 0 },
            { id: 'h4', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -0.2, y: -0.8, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.5, y: 0, z: 0 },
            { id: 'h5', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 2.5, y: 0, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'single' },
            { source: 0, target: 2, type: 'single' },
            { source: 0, target: 3, type: 'single' },
            { source: 0, target: 4, type: 'single' },
            { source: 5, target: 6, type: 'single' },
        ]
    },

    // ================== الماء والأيونات ==================
    {
        id: 'h2o',
        name: 'الماء',
        nameEn: 'Water',
        formula: 'H₂O',
        category: 'water',
        description: 'جزيء الماء - مذيب عالمي، متعادل الحموضة.',
        pH: 7,
        atoms: [
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: -0.3, z: 0 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -0.95, y: 0.5, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 0.95, y: 0.5, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'single' },
            { source: 0, target: 2, type: 'single' },
        ]
    },
    {
        id: 'h3o',
        name: 'أيون الهيدرونيوم',
        nameEn: 'Hydronium Ion',
        formula: 'H₃O⁺',
        category: 'ion',
        description: 'أيون موجب ينتج عند إذابة الحموض في الماء.',
        atoms: [
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: 0, z: 0, charge: 1 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 0, y: 1.2, z: 0 },
            { id: 'h2', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 1.04, y: -0.6, z: 0 },
            { id: 'h3', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: -1.04, y: -0.6, z: 0 },
        ],
        bonds: [
            { source: 0, target: 1, type: 'single' },
            { source: 0, target: 2, type: 'single' },
            { source: 0, target: 3, type: 'single' },
        ]
    },
    {
        id: 'oh',
        name: 'أيون الهيدروكسيد',
        nameEn: 'Hydroxide Ion',
        formula: 'OH⁻',
        category: 'ion',
        description: 'أيون سالب ينتج عند إذابة القواعد في الماء.',
        atoms: [
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: 0, z: 0, charge: -1 },
            { id: 'h1', element: 'هيدروجين', symbol: 'H', atomicNumber: 1, color: elementColors.H, size: atomicRadii.H, x: 1.2, y: 0, z: 0 },
        ],
        bonds: [{ source: 0, target: 1, type: 'single' }]
    },

    // ================== الأملاح ==================
    {
        id: 'nacl',
        name: 'ملح الطعام',
        nameEn: 'Sodium Chloride',
        formula: 'NaCl',
        category: 'salt',
        description: 'ملح الطعام - ينتج من تفاعل حمض مع قاعدة (تعادل).',
        pH: 7,
        atoms: [
            { id: 'na1', element: 'صوديوم', symbol: 'Na', atomicNumber: 11, color: elementColors.Na, size: atomicRadii.Na, x: -1.5, y: 0, z: 0, charge: 1 },
            { id: 'cl1', element: 'كلور', symbol: 'Cl', atomicNumber: 17, color: elementColors.Cl, size: atomicRadii.Cl, x: 1.5, y: 0, z: 0, charge: -1 },
        ],
        bonds: [{ source: 0, target: 1, type: 'ionic' }]
    },
    {
        id: 'nano3',
        name: 'نترات الصوديوم',
        nameEn: 'Sodium Nitrate',
        formula: 'NaNO₃',
        category: 'salt',
        description: 'ملح يستخدم في الأسمدة والمتفجرات.',
        pH: 7,
        atoms: [
            { id: 'na1', element: 'صوديوم', symbol: 'Na', atomicNumber: 11, color: elementColors.Na, size: atomicRadii.Na, x: -2.5, y: 0, z: 0, charge: 1 },
            { id: 'n1', element: 'نيتروجين', symbol: 'N', atomicNumber: 7, color: elementColors.N, size: atomicRadii.N, x: 0, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1, y: 1.2, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1, y: -1.2, z: 0 },
            { id: 'o3', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: -1, y: 0, z: 0 },
        ],
        bonds: [
            { source: 0, target: 4, type: 'ionic' },
            { source: 1, target: 2, type: 'double' },
            { source: 1, target: 3, type: 'single' },
            { source: 1, target: 4, type: 'single' },
        ]
    },
    {
        id: 'na2so4',
        name: 'كبريتات الصوديوم',
        nameEn: 'Sodium Sulfate',
        formula: 'Na₂SO₄',
        category: 'salt',
        description: 'ملح يستخدم في صناعة الورق والمنظفات.',
        pH: 7,
        atoms: [
            { id: 'na1', element: 'صوديوم', symbol: 'Na', atomicNumber: 11, color: elementColors.Na, size: atomicRadii.Na, x: -3, y: 1, z: 0, charge: 1 },
            { id: 'na2', element: 'صوديوم', symbol: 'Na', atomicNumber: 11, color: elementColors.Na, size: atomicRadii.Na, x: 3, y: 1, z: 0, charge: 1 },
            { id: 's1', element: 'كبريت', symbol: 'S', atomicNumber: 16, color: elementColors.S, size: atomicRadii.S, x: 0, y: 0, z: 0 },
            { id: 'o1', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: 1.5, z: 0 },
            { id: 'o2', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 0, y: -1.5, z: 0 },
            { id: 'o3', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: 1.5, y: 0, z: 0 },
            { id: 'o4', element: 'أكسجين', symbol: 'O', atomicNumber: 8, color: elementColors.O, size: atomicRadii.O, x: -1.5, y: 0, z: 0 },
        ],
        bonds: [
            { source: 0, target: 6, type: 'ionic' },
            { source: 1, target: 5, type: 'ionic' },
            { source: 2, target: 3, type: 'double' },
            { source: 2, target: 4, type: 'double' },
            { source: 2, target: 5, type: 'single' },
            { source: 2, target: 6, type: 'single' },
        ]
    },
    {
        id: 'kcl',
        name: 'كلوريد البوتاسيوم',
        nameEn: 'Potassium Chloride',
        formula: 'KCl',
        category: 'salt',
        description: 'ملح يستخدم كبديل لملح الطعام وفي الأسمدة.',
        pH: 7,
        atoms: [
            { id: 'k1', element: 'بوتاسيوم', symbol: 'K', atomicNumber: 19, color: elementColors.K, size: atomicRadii.K, x: -1.6, y: 0, z: 0, charge: 1 },
            { id: 'cl1', element: 'كلور', symbol: 'Cl', atomicNumber: 17, color: elementColors.Cl, size: atomicRadii.Cl, x: 1.6, y: 0, z: 0, charge: -1 },
        ],
        bonds: [{ source: 0, target: 1, type: 'ionic' }]
    },
];

// دوال مساعدة
export function getMoleculeById(id: string): MoleculeData | undefined {
    return moleculesLibrary.find(m => m.id === id);
}

export function getMoleculesByCategory(category: MoleculeData['category']): MoleculeData[] {
    return moleculesLibrary.filter(m => m.category === category);
}

export function getAllCategories(): { id: MoleculeData['category']; name: string; count: number }[] {
    return [
        { id: 'strong-acid', name: 'الحموض القوية', count: getMoleculesByCategory('strong-acid').length },
        { id: 'weak-acid', name: 'الحموض الضعيفة', count: getMoleculesByCategory('weak-acid').length },
        { id: 'strong-base', name: 'القواعد القوية', count: getMoleculesByCategory('strong-base').length },
        { id: 'weak-base', name: 'القواعد الضعيفة', count: getMoleculesByCategory('weak-base').length },
        { id: 'salt', name: 'الأملاح', count: getMoleculesByCategory('salt').length },
        { id: 'water', name: 'الماء', count: getMoleculesByCategory('water').length },
        { id: 'ion', name: 'الأيونات', count: getMoleculesByCategory('ion').length },
    ];
}

export function getCategoryColor(category: MoleculeData['category']): string {
    const colors: Record<MoleculeData['category'], string> = {
        'strong-acid': '#ef4444',
        'weak-acid': '#f97316',
        'strong-base': '#3b82f6',
        'weak-base': '#06b6d4',
        'salt': '#10b981',
        'water': '#8b5cf6',
        'ion': '#ec4899',
    };
    return colors[category];
}

export function getCategoryName(category: MoleculeData['category']): string {
    const names: Record<MoleculeData['category'], string> = {
        'strong-acid': 'حمض قوي',
        'weak-acid': 'حمض ضعيف',
        'strong-base': 'قاعدة قوية',
        'weak-base': 'قاعدة ضعيفة',
        'salt': 'ملح',
        'water': 'ماء',
        'ion': 'أيون',
    };
    return names[category];
}
