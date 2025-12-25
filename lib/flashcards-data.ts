export interface Flashcard {
    id: string;
    term: string;
    definition: string;
    category: 'acid' | 'base' | 'general';
}

export const flashcards: Flashcard[] = [
    {
        id: '1',
        term: 'الحمض (أرهينيوس)',
        definition: 'مادة تتفكك في الماء لتعطي أيونات الهيدروجين (H⁺).',
        category: 'acid'
    },
    {
        id: '2',
        term: 'القاعدة (أرهينيوس)',
        definition: 'مادة تتفكك في الماء لتعطي أيونات الهيدروكسيد (OH⁻).',
        category: 'base'
    },
    {
        id: '3',
        term: 'الحمض (برونستد-لوري)',
        definition: 'مادة مانحة للبروتون (H⁺) أثناء التفاعل الكيميائي.',
        category: 'acid'
    },
    {
        id: '4',
        term: 'القاعدة (برونستد-لوري)',
        definition: 'مادة مستقبلة للبروتون (H⁺) أثناء التفاعل الكيميائي.',
        category: 'base'
    },
    {
        id: '5',
        term: 'الرقم الهيدروجيني (pH)',
        definition: 'مقياس يعبر عن درجة حموضة أو قاعدية المحلول، ويتراوح من 0 إلى 14.',
        category: 'general'
    },
    {
        id: '6',
        term: 'الكاشف',
        definition: 'مادة يتغير لونها بتغير الرقم الهيدروجيني للمحلول وتستخدم لتمييز الحمض عن القاعدة.',
        category: 'general'
    },
    {
        id: '7',
        term: 'تفاعل التعادل',
        definition: 'تفاعل بين حمض وقاعدة ينتج عنه ملح وماء.',
        category: 'general'
    },
    {
        id: '8',
        term: 'حمض قوي',
        definition: 'حمض يتأين كلياً في الماء، مثل HCl.',
        category: 'acid'
    },
    {
        id: '9',
        term: 'قاعدة ضعيفة',
        definition: 'قاعدة تتأين جزئياً في الماء، مثل NH₃.',
        category: 'base'
    },
    {
        id: '10',
        term: 'المعايرة',
        definition: 'عملية مخبرية تستخدم لتحديد تركيز محلول مجهول باستخدام محلول معلوم التركيز.',
        category: 'general'
    }
];
