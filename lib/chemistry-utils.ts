// Chemistry utility functions for pH calculations and simulations

export function calculatePH(hConcentration: number): number {
    if (hConcentration <= 0) return 14;
    const ph = -Math.log10(hConcentration);
    return Math.max(0, Math.min(14, ph));
}

export function calculatePOH(ohConcentration: number): number {
    if (ohConcentration <= 0) return 14;
    const poh = -Math.log10(ohConcentration);
    return Math.max(0, Math.min(14, poh));
}

export function pHtoPOH(ph: number): number {
    return 14 - ph;
}

export function pOHtoPH(poh: number): number {
    return 14 - poh;
}

export function hConcentrationFromPH(ph: number): number {
    return Math.pow(10, -ph);
}

export function ohConcentrationFromPOH(poh: number): number {
    return Math.pow(10, -poh);
}

export function getPHColor(ph: number): string {
    const colors = [
        '#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffcc00',
        '#ffff00', '#ccff00', '#00ff00', '#00ffcc', '#00ccff',
        '#0099ff', '#0066ff', '#0033ff', '#0000ff', '#3300cc'
    ];
    const index = Math.max(0, Math.min(14, Math.round(ph)));
    return colors[index];
}

export function getPHDescription(ph: number): string {
    if (ph < 3) return 'حمضي قوي جداً';
    if (ph < 5) return 'حمضي متوسط';
    if (ph < 7) return 'حمضي ضعيف';
    if (ph === 7) return 'متعادل';
    if (ph < 9) return 'قاعدي ضعيف';
    if (ph < 12) return 'قاعدي متوسط';
    return 'قاعدي قوي جداً';
}

export interface Solution {
    name: string;
    nameAr: string;
    ph: number;
    formula: string;
    type: 'acid' | 'base' | 'neutral';
}

export const commonSolutions: Solution[] = [
    { name: 'Battery Acid', nameAr: 'حمض البطارية', ph: 0.5, formula: 'H₂SO₄', type: 'acid' },
    { name: 'Stomach Acid', nameAr: 'حمض المعدة', ph: 1.5, formula: 'HCl', type: 'acid' },
    { name: 'Lemon Juice', nameAr: 'عصير الليمون', ph: 2.5, formula: 'C₆H₈O₇', type: 'acid' },
    { name: 'Vinegar', nameAr: 'الخل', ph: 2.9, formula: 'CH₃COOH', type: 'acid' },
    { name: 'Cola', nameAr: 'المشروبات الغازية', ph: 3.5, formula: 'H₃PO₄', type: 'acid' },
    { name: 'Coffee', nameAr: 'القهوة', ph: 5.0, formula: '-', type: 'acid' },
    { name: 'Rain Water', nameAr: 'ماء المطر', ph: 5.6, formula: 'H₂O', type: 'acid' },
    { name: 'Pure Water', nameAr: 'الماء النقي', ph: 7.0, formula: 'H₂O', type: 'neutral' },
    { name: 'Blood', nameAr: 'الدم', ph: 7.4, formula: '-', type: 'base' },
    { name: 'Sea Water', nameAr: 'ماء البحر', ph: 8.0, formula: '-', type: 'base' },
    { name: 'Baking Soda', nameAr: 'صودا الخبز', ph: 9.0, formula: 'NaHCO₃', type: 'base' },
    { name: 'Ammonia', nameAr: 'الأمونيا', ph: 11.0, formula: 'NH₃', type: 'base' },
    { name: 'Bleach', nameAr: 'المبيض', ph: 12.5, formula: 'NaClO', type: 'base' },
    { name: 'Drain Cleaner', nameAr: 'منظف المصارف', ph: 14.0, formula: 'NaOH', type: 'base' },
];

export interface Indicator {
    name: string;
    nameAr: string;
    acidColor: string;
    baseColor: string;
    transitionPH: [number, number];
}

export const indicators: Indicator[] = [
    { name: 'Litmus', nameAr: 'عباد الشمس', acidColor: '#e74c3c', baseColor: '#3498db', transitionPH: [5, 8] },
    { name: 'Phenolphthalein', nameAr: 'الفينولفثالين', acidColor: 'transparent', baseColor: '#e91e8c', transitionPH: [8.2, 10] },
    { name: 'Methyl Orange', nameAr: 'الميثيل البرتقالي', acidColor: '#e74c3c', baseColor: '#f1c40f', transitionPH: [3.1, 4.4] },
    { name: 'Bromothymol Blue', nameAr: 'بروموثيمول الأزرق', acidColor: '#f1c40f', baseColor: '#3498db', transitionPH: [6, 7.6] },
];

export function getIndicatorColor(indicator: Indicator, ph: number): string {
    if (ph < indicator.transitionPH[0]) return indicator.acidColor;
    if (ph > indicator.transitionPH[1]) return indicator.baseColor;

    // Interpolate
    const ratio = (ph - indicator.transitionPH[0]) / (indicator.transitionPH[1] - indicator.transitionPH[0]);

    // Simple hex interpolation
    const hex = (color: string) => {
        if (color === 'transparent') return [255, 255, 255, 0]; // Treat transparent as white/clear
        if (color.startsWith('#')) return [
            parseInt(color.slice(1, 3), 16),
            parseInt(color.slice(3, 5), 16),
            parseInt(color.slice(5, 7), 16),
            1
        ];
        return [0, 0, 0, 1];
    };

    const c1 = hex(indicator.acidColor);
    const c2 = hex(indicator.baseColor);

    const r = Math.round(c1[0] + (c2[0] - c1[0]) * ratio);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * ratio);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
}

export interface GlossaryTerm {
    term: string;
    termEn: string;
    definition: string;
    category: 'acid' | 'base' | 'general' | 'reaction';
}

export const glossaryTerms: GlossaryTerm[] = [
    { term: 'حمض', termEn: 'Acid', definition: 'مادة تنتج أيونات الهيدروجين H⁺ في الماء', category: 'acid' },
    { term: 'قاعدة', termEn: 'Base', definition: 'مادة تنتج أيونات الهيدروكسيد OH⁻ في الماء', category: 'base' },
    { term: 'الرقم الهيدروجيني', termEn: 'pH', definition: 'مقياس لحموضة أو قاعدية المحلول من 0 إلى 14', category: 'general' },
    { term: 'التعادل', termEn: 'Neutralization', definition: 'تفاعل حمض مع قاعدة لإنتاج ملح وماء', category: 'reaction' },
    { term: 'الكاشف', termEn: 'Indicator', definition: 'مادة تتغير لونها حسب pH المحلول', category: 'general' },
    { term: 'التأين', termEn: 'Ionization', definition: 'تفكك المادة إلى أيونات في الماء', category: 'general' },
    { term: 'ثابت التأين', termEn: 'Ka/Kb', definition: 'مقياس لقوة الحمض أو القاعدة', category: 'general' },
    { term: 'المعايرة', termEn: 'Titration', definition: 'تقنية لتحديد تركيز محلول مجهول', category: 'reaction' },
    { term: 'الملح', termEn: 'Salt', definition: 'مركب أيوني ناتج عن تفاعل حمض وقاعدة', category: 'reaction' },
    { term: 'البروتون', termEn: 'Proton', definition: 'أيون الهيدروجين H⁺', category: 'general' },
];
