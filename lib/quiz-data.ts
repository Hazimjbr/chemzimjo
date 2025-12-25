export interface QuizQuestion {
    id: string;
    lessonId: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface Quiz {
    id: string;
    title: string;
    lessonId: string;
    questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
    // Lesson 1: Intro
    {
        id: 'quiz-1',
        title: 'اختبار: مقدمة في الحموض والقواعد',
        lessonId: 'intro-acids-bases',
        questions: [
            { id: 'q1-1', lessonId: 'intro-acids-bases', question: 'عرف أرهينيوس الحمض بأنه مادة تنتج أيون:', options: ['OH⁻', 'H⁺', 'Cl⁻', 'Na⁺'], correctIndex: 1, explanation: 'حسب أرهينيوس، الحمض ينتج أيون الهيدروجين H⁺ في الماء.' },
            { id: 'q1-2', lessonId: 'intro-acids-bases', question: 'أي المواد التالية تعتبر قاعدة حسب مفهوم أرهينيوس؟', options: ['HCl', 'NH₃', 'NaOH', 'CH₄'], correctIndex: 2, explanation: 'NaOH تحتوي على مجموعة OH وتنتج OH⁻ عند الذوبان في الماء.' },
            { id: 'q1-3', lessonId: 'intro-acids-bases', question: 'ما هو العيب الرئيسي في نظرية أرهينيوس؟', options: ['لم تشرح الحسابات', 'اقتصرت على المحاليل المائية', 'لم تعرف الحموض', 'معقدة جداً'], correctIndex: 1, explanation: 'أرهينيوس اشترط وجود الماء (محاليل مائية) وهذا قصور.' },
            { id: 'q1-4', lessonId: 'intro-acids-bases', question: 'حسب برونستد-لوري، القاعدة هي:', options: ['مانح بروتون', 'مستقبل بروتون', 'منتج هيدروجين', 'مستقبل إلكترون'], correctIndex: 1, explanation: 'القاعدة تستقبل بروتون H⁺ من الحمض.' },
            { id: 'q1-5', lessonId: 'intro-acids-bases', question: 'ما هو الحمض المرافق لـ NH₃؟', options: ['NH₂⁻', 'NH₄⁺', 'N₂', 'H₂'], correctIndex: 1, explanation: 'عندما تكسب القاعدة NH₃ بروتوناً تصبح حمضاً مرافقاً NH₄⁺.' },
            { id: 'q1-6', lessonId: 'intro-acids-bases', question: 'في التفاعل HCl + H₂O → Cl⁻ + H₃O⁺، الزوج المترافق هو:', options: ['HCl/H₃O⁺', 'H₂O/Cl⁻', 'HCl/Cl⁻', 'HCl/H₂O'], correctIndex: 2, explanation: 'HCl يفقد بروتون ليصبح Cl⁻، فهما زوج مترافق.' },
            { id: 'q1-7', lessonId: 'intro-acids-bases', question: 'المادة التي تسلك كحمض وكقاعدة (مترددة) هي:', options: ['HCl', 'NaOH', 'H₂O', 'NaCl'], correctIndex: 2, explanation: 'الماء يسلك كحمض مع القواعد وكقاعدة مع الحموض.' },
            { id: 'q1-8', lessonId: 'intro-acids-bases', question: 'أي الآتي لا يعتبر حمضاً لبرونستد-لوري؟', options: ['HCl', 'NH₄⁺', 'H₂SO₄', 'CO₃²⁻'], correctIndex: 3, explanation: 'الكربونات CO₃²⁻ لا تملك هيدروجين لتمنحه، فهي قاعدة فقط.' },
            { id: 'q1-9', lessonId: 'intro-acids-bases', question: 'أيون الهيدرونيوم هو:', options: ['H⁺', 'OH⁻', 'H₃O⁺', 'H₂O'], correctIndex: 2, explanation: 'ينتج H₃O⁺ من ارتباط H⁺ مع H₂O.' },
            { id: 'q1-10', lessonId: 'intro-acids-bases', question: 'تفاعل HCl مع NH₃ (غازات) يفسر بواسطة:', options: ['أرهينيوس فقط', 'برونستد-لوري', 'لا أحد', 'كلاهما'], correctIndex: 1, explanation: 'برونستد-لوري يفسر التفاعلات غير المائية.' }
        ]
    },
    // Lesson 2: Acid Properties
    {
        id: 'quiz-2',
        title: 'اختبار: خصائص الحموض',
        lessonId: 'acid-properties',
        questions: [
            { id: 'q2-1', lessonId: 'acid-properties', question: 'طعم الحموض:', options: ['مر', 'حلو', 'حامض', 'مالح'], correctIndex: 2, explanation: 'تتميز الحموض بالطعم الحامض اللاذع.' },
            { id: 'q2-2', lessonId: 'acid-properties', question: 'تغير الحموض لون ورقة تباع الشمس إلى:', options: ['الأزرق', 'الأحمر', 'الأصفر', 'الأخضر'], correctIndex: 1, explanation: 'الحمض يحمر ورقة تباع الشمس.' },
            { id: 'q2-3', lessonId: 'acid-properties', question: 'عند تفاعل حمض مع خارصين Zn، يتصاعد غاز:', options: ['O₂', 'CO₂', 'N₂', 'H₂'], correctIndex: 3, explanation: 'تفاعل الحمض مع فلز نشط يطلق غاز الهيدروجين.' },
            { id: 'q2-4', lessonId: 'acid-properties', question: 'تفاعل كربونات الكالسيوم مع حمض HCl ينتج غاز:', options: ['H₂', 'CO₂', 'O₂', 'NH₃'], correctIndex: 1, explanation: 'الكربونات مع الحمض تنتج غاز ثاني أكسيد الكربون.' },
            { id: 'q2-5', lessonId: 'acid-properties', question: 'أي المواد التالية توصل الكهرباء بدرجة عالية؟', options: ['محلول سكر', 'ماء نقي', 'محلول HCl', 'كحول'], correctIndex: 2, explanation: 'HCl حمض قوي يتأين كلياً فيعطي أيونات كثيرة.' },
            { id: 'q2-6', lessonId: 'acid-properties', question: 'غاز CO₂ يكشف عنه بتعكير:', options: ['ماء الشرب', 'ماء الجير', 'الزيت', 'الخل'], correctIndex: 1, explanation: 'CO₂ يعكر ماء الجير (هيدروكسيد الكالسيوم).' },
            { id: 'q2-7', lessonId: 'acid-properties', question: 'الاسم العلمي لحمض الخل هو:', options: ['هيدروكلوريك', 'نيتريك', 'أسيتيك', 'كبريتيك'], correctIndex: 2, explanation: 'الخل هو حمض الأسيتيك المخفف.' },
            { id: 'q2-8', lessonId: 'acid-properties', question: 'أي الفلزات لا يطلق الهيدروجين مع الحمض؟', options: ['Zn', 'Mg', 'Cu', 'Na'], correctIndex: 2, explanation: 'النحاس Cu يلي الهيدروجين في سلسلة النشاط فلا يحل محله.' },
            { id: 'q2-9', lessonId: 'acid-properties', question: 'يوجد حمض اللاكتيك في:', options: ['الليمون', 'اللبن', 'البطارية', 'المعدة'], correctIndex: 1, explanation: 'حمض اللاكتيك يوجد في اللبن ومشتقاته.' },
            { id: 'q2-10', lessonId: 'acid-properties', question: 'صيغة حمض الكبريتيك هي:', options: ['HCl', 'HNO₃', 'H₂SO₄', 'H₃PO₄'], correctIndex: 2, explanation: 'حمض الكبريتيك هو H₂SO₄.' }
        ]
    },
    // Lesson 3: Base Properties
    {
        id: 'quiz-3',
        title: 'اختبار: خصائص القواعد',
        lessonId: 'base-properties',
        questions: [
            { id: 'q3-1', lessonId: 'base-properties', question: 'ملمس المحاليل القاعدية:', options: ['خشن', 'زلق (صابوني)', 'جاف', 'حبيبي'], correctIndex: 1, explanation: 'القواعد لها ملمس ناعم زلق يشبه الصابون.' },
            { id: 'q3-2', lessonId: 'base-properties', question: 'تستخدم NH₃ (الأمونيا) في صناعة:', options: ['الصابون', 'الأسمدة والمنظفات', 'السيارات', 'الأسمنت'], correctIndex: 1, explanation: 'الأمونيا أساسية في صناعة الأسمدة النيتروجينية ومنظفات الزجاج.' },
            { id: 'q3-3', lessonId: 'base-properties', question: 'هيدروكسيد الكالسيوم يعرف بـ:', options: ['الصودا الكاوية', 'الجير المطفأ', 'البوتاس', 'الملح الصخري'], correctIndex: 1, explanation: 'Ca(OH)₂ يسمى الجير المطفأ.' },
            { id: 'q3-4', lessonId: 'base-properties', question: 'القاعدة المستخدمة في مضادات حموضة المعدة:', options: ['NaOH', 'KOH', 'Mg(OH)₂', 'NH₃'], correctIndex: 2, explanation: 'هيدروكسيد المغنيسيوم (حليب المغنيسيا) آمن لمعادلة حمض المعدة.' },
            { id: 'q3-5', lessonId: 'base-properties', question: 'أكسيد المغنيسيوم MgO يعتبر:', options: ['أكسيد حمضي', 'أكسيد قاعدي', 'كسيد متعادل', 'ليس له خواص'], correctIndex: 1, explanation: 'أكاسيد الفلزات هي أكاسيد قاعدية.' },
            { id: 'q3-6', lessonId: 'base-properties', question: 'القلوي (Alkali) هو:', options: ['قاعدة لا تذوب في الماء', 'حمض قوي', 'قاعدة تذوب في الماء', 'ملح'], correctIndex: 2, explanation: 'القلويات هي القواعد الذائبة في الماء.' },
            { id: 'q3-7', lessonId: 'base-properties', question: 'الصودا الكاوية هي الاسم الشائع لـ:', options: ['NaOH', 'KOH', 'Ca(OH)₂', 'Mg(OH)₂'], correctIndex: 0, explanation: 'هيدروكسيد الصوديوم يُعرف بالصودا الكاوية.' },
            { id: 'q3-8', lessonId: 'base-properties', question: 'لون الفينولفثالين في الوسط القاعدي:', options: ['أحمر', 'وردي', 'عديم اللون', 'أصفر'], correctIndex: 1, explanation: 'الفينولفثالين يتحول للوردي (الزهري) في القاعدة.' },
            { id: 'q3-9', lessonId: 'base-properties', question: 'محلول KOH يوصل الكهرباء لأنه:', options: ['مركب تساهمي', 'يحتوي على إلكترونات حرة', 'يتفكك لأيونات حرة', 'لأنه ماء'], correctIndex: 2, explanation: 'لأنه مركب أيوني يتفكك في الماء.' },
            { id: 'q3-10', lessonId: 'base-properties', question: 'أي المواد التالية لا تغير لون ورقة تباع الشمس؟', options: ['HCl', 'NaOH', 'NaCl (متعادل)', 'عصير ليمون'], correctIndex: 2, explanation: 'المحلول المتعادل لا يغير لون الكاشف.' }
        ]
    },
    // Lesson 4: pH Scale
    {
        id: 'quiz-4',
        title: 'اختبار: الرقم الهيدروجيني',
        lessonId: 'ph-scale',
        questions: [
            { id: 'q4-1', lessonId: 'ph-scale', question: 'محلول له pH = 9، يصنف بأنه:', options: ['حمضي', 'قاعدي', 'متعادل', 'متردد'], correctIndex: 1, explanation: 'أي قيمة فوق 7 تعتبر قاعدية.' },
            { id: 'q4-2', lessonId: 'ph-scale', question: 'إذا كان تركيز [H₃O⁺] = 1 × 10⁻³، فإن pH:', options: ['3', '11', '1', '10'], correctIndex: 0, explanation: 'pH = -log(10⁻³) = 3.' },
            { id: 'q4-3', lessonId: 'ph-scale', question: 'قيمة Kw للماء عند 25 س تساوي:', options: ['14', '7', '1 × 10⁻¹⁴', '1 × 10⁻⁷'], correctIndex: 2, explanation: 'ثابت تأين الماء Kw يساوي 1 × 10⁻¹⁴.' },
            { id: 'q4-4', lessonId: 'ph-scale', question: 'محلول حمض قوي HCl تركيزه 0.1M، ما قيمة pH؟', options: ['1', '0.1', '13', '7'], correctIndex: 0, explanation: '[H⁺] = 0.1 = 10⁻¹، إذن pH = 1.' },
            { id: 'q4-5', lessonId: 'ph-scale', question: 'العلاقة الصحيحة بين pH و pOH:', options: ['طرحهما = 14', 'ضربهما = 14', 'جمعهما = 14', 'قسمتهما = 1'], correctIndex: 2, explanation: 'pH + pOH = 14.' },
            { id: 'q4-6', lessonId: 'ph-scale', question: 'كلما زادت قيمة pH:', options: ['زادت الحموضة', 'زادت القاعدية', 'قل تركيز OH⁻', 'بقي كما هو'], correctIndex: 1, explanation: 'زيادة الرقم الهيدروجيني تعني زيادة الصفة القاعدية.' },
            { id: 'q4-7', lessonId: 'ph-scale', question: 'محلول له pOH = 2، فإن pH له تساوي:', options: ['2', '12', '7', '14'], correctIndex: 1, explanation: 'pH = 14 - 2 = 12.' },
            { id: 'q4-8', lessonId: 'ph-scale', question: 'الماء المقطر له pH تساوي:', options: ['0', '7', '14', '5'], correctIndex: 1, explanation: 'الماء النقي متعادل.' },
            { id: 'q4-9', lessonId: 'ph-scale', question: 'أي المحاليل الآتية له أعلى pH؟', options: ['حمض المعدة', 'الخل', 'الماء', 'الدم (7.4)'], correctIndex: 3, explanation: 'كلما زاد الرقم كان أقل حموضة (أكثر قاعدية). الدم 7.4 أعلى من البقية.' },
            { id: 'q4-10', lessonId: 'ph-scale', question: 'قيمة -log[OH⁻] تمثل:', options: ['pH', 'pOH', 'Kw', 'Ka'], correctIndex: 1, explanation: 'هذا تعريف الرقم الهيدروكسيلي pOH.' }
        ]
    },
    // Lesson 5: Reactions
    {
        id: 'quiz-5',
        title: 'اختبار: تفاعلات التعادل والمعايرة',
        lessonId: 'acid-base-reactions',
        questions: [
            { id: 'q5-1', lessonId: 'acid-base-reactions', question: 'تفاعل HCl مع NaOH ينتج:', options: ['NaCl فقط', 'H₂O فقط', 'NaCl + H₂O', 'غاز Cl₂'], correctIndex: 2, explanation: 'ملح الطعام والماء.' },
            { id: 'q5-2', lessonId: 'acid-base-reactions', question: 'المعادلة الأيونية الصافية للتعادل القوي هي:', options: ['H⁺ + Cl⁻ → HCl', 'Na⁺ + OH⁻ → NaOH', 'H⁺ + OH⁻ → H₂O', 'Na⁺ + Cl⁻ → NaCl'], correctIndex: 2, explanation: 'تكوين الماء هو جوهر التعادل.' },
            { id: 'q5-3', lessonId: 'acid-base-reactions', question: 'تسمى العملية العملية لتحديد تركيز مجهول:', options: ['التقطير', 'الترشيح', 'المعايرة', 'التبخير'], correctIndex: 2, explanation: 'المعايرة (Titration) هي العملية المستخدمة.' },
            { id: 'q5-4', lessonId: 'acid-base-reactions', question: 'عند نقطة التكافؤ لمعايرة HCl و NaOH:', options: ['pH=0', 'pH=7', 'pH=14', 'pH=5'], correctIndex: 1, explanation: 'ناتج تعادل قوي مع قوي هو ملح متعادل pH=7.' },
            { id: 'q5-5', lessonId: 'acid-base-reactions', question: 'تفاعل التعادل يعتبر تفاعل:', options: ['طارد للحرارة', 'ماص للحرارة', 'نووي', 'فيزيائي'], correctIndex: 0, explanation: 'تنطلق حرارة نتيجة تكون روابط الماء.' },
            { id: 'q5-6', lessonId: 'acid-base-reactions', question: 'الملح الناتج من حمض قوي وقاعدة ضعيفة يكون تأثيره:', options: ['متعادل', 'قاعدي', 'حمضي', 'متردد'], correctIndex: 2, explanation: 'الملح "يتبع القوي"، لذا يكون حمضياً.' },
            { id: 'q5-7', lessonId: 'acid-base-reactions', question: 'في المعايرة، المحلول معلوم التركيز يوضع في:', options: ['الدورق المخروطي', 'السحاحة', 'الكأس', 'خبار المدرج'], correctIndex: 1, explanation: 'المחלول القياسي يوضع عادة في السحاحة.' },
            { id: 'q5-8', lessonId: 'acid-base-reactions', question: 'نقطة النهاية (End point) هي النقطة التي:', options: ['ينفجر فيها التفاعل', 'يتغير فيها لون الكاشف', 'تغلي فيها المادة', 'تتجمد فيها المادة'], correctIndex: 1, explanation: 'يتغير اللون دلالة على انتهاء التفاعل.' },
            { id: 'q5-9', lessonId: 'acid-base-reactions', question: 'ملح CH₃COONa تأثيره:', options: ['حمضي', 'قاعدي', 'متعادل', 'لا يذوب'], correctIndex: 1, explanation: 'لأنه مشتق من قاعدة قوية (NaOH) وحمض ضعيف.' },
            { id: 'q5-10', lessonId: 'acid-base-reactions', question: 'للحصول على ملح، نفاعل الحمض مع:', options: ['ماء', 'أكسجين', 'قاعدة', 'هيدروجين'], correctIndex: 2, explanation: 'حمض + قاعدة يعطي ملح + ماء.' }
        ]
    },
    // Lesson 6: Indicators
    {
        id: 'quiz-6',
        title: 'اختبار: الكواشف',
        lessonId: 'indicators',
        questions: [
            { id: 'q6-1', lessonId: 'indicators', question: 'الكواشف الكيميائية عبارة عن:', options: ['أملاح قوية', 'حموض أو قواعد عضوية ضعيفة', 'فلزات', 'غازات خاملة'], correctIndex: 1, explanation: 'هي مواد عضوية ضعيفة تتأثر بالـ pH.' },
            { id: 'q6-2', lessonId: 'indicators', question: 'لون الميثيل البرتقالي في الوسط الحمضي:', options: ['أصفر', 'أزرق', 'أحمر', 'شفاف'], correctIndex: 2, explanation: 'أحمر في الحمض وأصفر في القاعدة.' },
            { id: 'q6-3', lessonId: 'indicators', question: 'الفينولفثالين في الوسط الحمضي يكون:', options: ['وردي', 'أزرق', 'عديم اللون', 'أصفر'], correctIndex: 2, explanation: 'عديم اللون في الحمض ووردي في القاعدة.' },
            { id: 'q6-4', lessonId: 'indicators', question: 'لمعايرة حمض ضعيف وقاعدة قوية (نقطة التكافؤ > 7)، أنسب كاشف:', options: ['الميثيل البرتقالي', 'الميثيل الأحمر', 'الفينولفثالين', 'الماء'], correctIndex: 2, explanation: 'الفينولفثالين يعمل في المدى القاعدي (8-10).' },
            { id: 'q6-5', lessonId: 'indicators', question: 'يتغير لون الكاشف عندما:', options: ['يسخن', 'يتغير التركيب الأيوني له مع pH', 'يتبخر', 'يتجمد'], correctIndex: 1, explanation: 'تغير pH يغير موضع الاتزان بين الجزيئات والأيونات.' },
            { id: 'q6-6', lessonId: 'indicators', question: 'تباع الشمس يكون لونه أزرق عند pH:', options: ['1', '5', '9', '3'], correctIndex: 2, explanation: 'pH=9 وسط قاعدي، وتباع الشمس أزرق في القاعدة.' },
            { id: 'q6-7', lessonId: 'indicators', question: 'يمكن استخدام الملفوف الأحمر ككاشف لأنه:', options: ['رخيص', 'طبيعي يتغير لونه', 'لذيذ', 'سائل'], correctIndex: 1, explanation: 'يحتوي على صبغات طبيعية تتأثر بالحموضة.' },
            { id: 'q6-8', lessonId: 'indicators', question: 'مدى pH للكاشف هو:', options: ['درجة الغليان', 'النطاق الذي يتغير فيه لونه', 'وزنه الجزيئي', 'كثافته'], correctIndex: 1, explanation: 'النطاق الذي يظهر فيه اللون الانتقالي.' },
            { id: 'q6-9', lessonId: 'indicators', question: 'إذا كان الكاشف HIn لونه أحمر، و In⁻ لونه أصفر، ففي الوسط الحمضي يظهر:', options: ['الأحمر', 'الأصفر', 'البرتقالي', 'الأخضر'], correctIndex: 0, explanation: 'في الوسط الحمضي يزداد تركيز H⁺ فينرجح الاتزان نحو HIn (الأحمر).' },
            { id: 'q6-10', lessonId: 'indicators', question: 'الفرق بين الكاشف والرقم الهيدروجيني:', options: ['لا فرق', 'الكاشف أداة قياس دقيقة', 'الكاشف يعطي لوناً تقريبياً', 'الرقم الهيدروجيني يعطي لوناً'], correctIndex: 2, explanation: 'جهاز pH دقيق، الكاشف يعطي تقديراً نوعياً.' }
        ]
    },
    // Lesson 7: Strong/Weak
    {
        id: 'quiz-7',
        title: 'اختبار: قوة الحموض والقواعد',
        lessonId: 'strong-weak-acids-bases',
        questions: [
            { id: 'q7-1', lessonId: 'strong-weak-acids-bases', question: 'الحمض القوي يتأين في الماء بنسبة:', options: ['1%', '50%', '100%', '0%'], correctIndex: 2, explanation: 'تأين تام.' },
            { id: 'q7-2', lessonId: 'strong-weak-acids-bases', question: 'رمز ثابت تأين الحمض الضعيف:', options: ['Kw', 'Ka', 'Kb', 'Keq'], correctIndex: 1, explanation: 'Acid starts with A -> Ka.' },
            { id: 'q7-3', lessonId: 'strong-weak-acids-bases', question: 'أي الآتي حمض ضعيف؟', options: ['HCl', 'HNO₃', 'CH₃COOH', 'HBr'], correctIndex: 2, explanation: 'حمض الخليك (الأسيتيك) حمض ضعيف.' },
            { id: 'q7-4', lessonId: 'strong-weak-acids-bases', question: 'كلما زادت قيمة Ka:', options: ['زادت قوة الحمض', 'قلت قوة الحمض', 'زادت الـ pH', 'لم يتأثر'], correctIndex: 0, explanation: 'Ka كبيرة تعني نواتج (أيونات) أكثر.' },
            { id: 'q7-5', lessonId: 'strong-weak-acids-bases', question: 'تفاعل تأين الحمض الضعيف يمثل بسهم:', options: ['واحد', 'متعاكسين ⇌', 'لأسفل', 'دائري'], correctIndex: 1, explanation: 'لأنه تفاعل منعكس (اتزان).' },
            { id: 'q7-6', lessonId: 'strong-weak-acids-bases', question: 'قاعدة مرافقة لحمض قوي تكون:', options: ['قاعدة قوية', 'قاعدة ضعيفة جداً', 'حمض قوي', 'حمض ضعيف'], correctIndex: 1, explanation: 'كلما كان الحمض أقوى، كانت قاعدته المرافقة أضعف.' },
            { id: 'q7-7', lessonId: 'strong-weak-acids-bases', question: 'محلول بتركيز 0.1M، أيهم له أقل pH (الأكثر حموضة)؟', options: ['HF (Ka=10⁻⁴)', 'CH₃COOH (Ka=10⁻⁵)', 'HCN (Ka=10⁻¹⁰)', 'HNO₂ (Ka=10⁻³)'], correctIndex: 3, explanation: 'Ka الأكبر (10⁻³) تعني حمضاً أقوى وبالتالي pH أقل.' },
            { id: 'q7-8', lessonId: 'strong-weak-acids-bases', question: 'الأمونيا NH₃ تعتبر:', options: ['حمض قوي', 'قاعدة قوية', 'حمض ضعيف', 'قاعدة ضعيفة'], correctIndex: 3, explanation: 'قاعدة ضعيفة تتأين جزئياً.' },
            { id: 'q7-9', lessonId: 'strong-weak-acids-bases', question: 'لحساب pH لحمض ضعيف نحتاج:', options: ['التركيز فقط', 'Ka والتركيز', 'الحجم', 'الضغط'], correctIndex: 1, explanation: 'نستخدم قانون الجذر (تقريباً) الذي يعتمد على Ka والتركيز.' },
            { id: 'q7-10', lessonId: 'strong-weak-acids-bases', question: 'أي من المحاليل التالية يحتوي جزيئات غير متأينة؟', options: ['HCl', 'NaOH', 'HF', 'NaCl'], correctIndex: 2, explanation: 'HF حمض ضعيف، فمعظم جزيئاته تبقى غير متأينة.' }
        ]
    },
    // Lesson 8: Applications
    {
        id: 'quiz-8',
        title: 'اختبار: التطبيقات الحياتية',
        lessonId: 'daily-applications',
        questions: [
            { id: 'q8-1', lessonId: 'daily-applications', question: 'الرقم الهيدروجيني للمطر الحمضي يكون أقل من:', options: ['7.0', '5.6', '2.0', '9.0'], correctIndex: 1, explanation: 'مطر طبيعي 5.6، الحمضي أقل من ذلك.' },
            { id: 'q8-2', lessonId: 'daily-applications', question: 'الغاز المسؤول الرئيسي عن المطر الحمضي من حرق الوقود:', options: ['O₂', 'N₂', 'SO₂', 'H₂'], correctIndex: 2, explanation: 'ثاني أكسيد الكبريت.' },
            { id: 'q8-3', lessonId: 'daily-applications', question: 'وظيفة المحلول المنظم (Buffer):', options: ['تغيير اللون', 'زيادة الحموضة', 'مقاومة تغير pH', 'رفع درجة الغليان'], correctIndex: 2, explanation: 'الحفاظ على ثبات الرقم الهيدروجيني.' },
            { id: 'q8-4', lessonId: 'daily-applications', question: 'الرقم الهيدروجيني للدم البشري السليم:', options: ['7.0', '7.4', '6.8', '8.0'], correctIndex: 1, explanation: 'يميل للقاعدية الخفيفة جداً.' },
            { id: 'q8-5', lessonId: 'daily-applications', question: 'حمض المعدة يساعد في:', options: ['هضم الدهون', 'هضم البروتينات وقتل البكتيريا', 'امتصاص السكر', 'تكسير العظام'], correctIndex: 1, explanation: 'تنشيط إنزيم الببسين لهضم البروتين.' },
            { id: 'q8-6', lessonId: 'daily-applications', question: 'لعلاج حموضة التربة، يضيف المزارعون:', options: ['سماد حمضي', 'جير (قاعدة)', 'ماء مقطر', 'ملح طعام'], correctIndex: 1, explanation: 'القاعدة تعادل الحموضة الزائدة.' },
            { id: 'q8-7', lessonId: 'daily-applications', question: 'أثر المطر الحمضي على المباني الجيرية:', options: ['ينظفها', 'يسبب تآكلها', 'يصبغها', 'يقويها'], correctIndex: 1, explanation: 'الحمض يتفاعل مع كربونات الكالسيوم في الحجر.' },
            { id: 'q8-8', lessonId: 'daily-applications', question: 'يتكون المحلول المنظم عادة من:', options: ['حمض قوي وقاعدة قوية', 'حمض ضعيف وملحه', 'ماء وملح', 'فلز وحمض'], correctIndex: 1, explanation: 'حمض ضعيف وقاعدته المرافقة.' },
            { id: 'q8-9', lessonId: 'daily-applications', question: 'حمض الكبريتيك يستخدم في:', options: ['صناعة بطاريات السيارات', 'الطعام', 'مستحضرات التجميل', 'الري'], correctIndex: 0, explanation: 'يسمى زيت الزاج ويستخدم في البطاريات.' },
            { id: 'q8-10', lessonId: 'daily-applications', question: 'المادة التي تسبب شعور الحرقة في العضلات عند التعب:', options: ['حمض المعدة', 'حمض اللاكتيك', 'الأدرينالين', 'الماء'], correctIndex: 1, explanation: 'تراكم حمض اللاكتيك نتيجة التنفس اللاهوائي.' }
        ]
    }
];

export function getQuizByLessonId(lessonId: string): Quiz | undefined {
    return quizzes.find(q => q.lessonId === lessonId);
}

export function getQuizById(id: string): Quiz | undefined {
    return quizzes.find(q => q.id === id);
}
