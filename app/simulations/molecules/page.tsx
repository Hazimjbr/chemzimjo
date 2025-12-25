'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Filter, Search, X, Atom, Beaker } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MoleculeViewer from '@/components/visual/MoleculeViewer';
import MoleculeCard from '@/components/visual/MoleculeCard';
import {
    moleculesLibrary,
    getAllCategories,
    getMoleculesByCategory,
    getCategoryColor,
    MoleculeData
} from '@/lib/molecules-data';

const categoryIcons: Record<string, React.ReactNode> = {
    'strong-acid': '🔴',
    'weak-acid': '🟠',
    'strong-base': '🔵',
    'weak-base': '🩵',
    'salt': '🟢',
    'water': '💧',
    'ion': '⚡',
};

export default function MoleculesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMolecule, setSelectedMolecule] = useState<MoleculeData | null>(null);

    const categories = getAllCategories();

    const filteredMolecules = useMemo(() => {
        let molecules = selectedCategory
            ? getMoleculesByCategory(selectedCategory as any)
            : moleculesLibrary;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            molecules = molecules.filter(m =>
                m.name.includes(query) ||
                m.nameEn.toLowerCase().includes(query) ||
                m.formula.toLowerCase().includes(query)
            );
        }

        return molecules;
    }, [selectedCategory, searchQuery]);

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="hero" style={{ minHeight: '50vh', paddingTop: '120px' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            style={{ marginBottom: '1.5rem' }}
                        >
                            <Atom size={56} style={{ color: 'var(--color-primary)' }} />
                        </motion.div>

                        <h1>
                            مكتبة <span className="gradient-text">الجزيئات الكيميائية</span>
                        </h1>
                        <p style={{
                            maxWidth: 600,
                            margin: '0 auto',
                            color: 'var(--color-text-secondary)',
                            fontSize: '1.1rem'
                        }}>
                            استكشف أكثر من 20 جزيء كيميائي بتقنية العرض ثلاثي الأبعاد التفاعلية
                        </p>

                        {/* Stats */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '2rem',
                            marginTop: '2rem',
                            flexWrap: 'wrap'
                        }}>
                            <div className="glass-card" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                    {moleculesLibrary.length}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    جزيء كيميائي
                                </div>
                            </div>
                            <div className="glass-card" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-acid)' }}>
                                    {categories.filter(c => c.id.includes('acid')).reduce((a, c) => a + c.count, 0)}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    حمض
                                </div>
                            </div>
                            <div className="glass-card" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-base)' }}>
                                    {categories.filter(c => c.id.includes('base')).reduce((a, c) => a + c.count, 0)}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    قاعدة
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    {/* Search Bar */}
                    <div style={{
                        maxWidth: 500,
                        margin: '0 auto 2rem',
                        position: 'relative'
                    }}>
                        <Search
                            size={20}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--color-text-muted)'
                            }}
                        />
                        <input
                            type="text"
                            className="input"
                            placeholder="ابحث عن جزيء..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                paddingRight: '3rem',
                                paddingLeft: searchQuery ? '3rem' : '1rem'
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--color-text-muted)'
                                }}
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    {/* Category Filters */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        marginBottom: '2rem'
                    }}>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="btn"
                            style={{
                                background: selectedCategory === null
                                    ? 'var(--color-primary)'
                                    : 'var(--color-bg-tertiary)',
                                padding: '0.5rem 1rem',
                                fontSize: '0.9rem'
                            }}
                        >
                            <Filter size={16} />
                            الكل ({moleculesLibrary.length})
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className="btn"
                                style={{
                                    background: selectedCategory === cat.id
                                        ? getCategoryColor(cat.id as any)
                                        : 'var(--color-bg-tertiary)',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.9rem',
                                    borderColor: getCategoryColor(cat.id as any)
                                }}
                            >
                                {categoryIcons[cat.id]} {cat.name} ({cat.count})
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        color: 'var(--color-text-muted)'
                    }}>
                        عرض {filteredMolecules.length} من {moleculesLibrary.length} جزيء
                    </div>

                    {/* Molecules Grid */}
                    <div className="grid-3">
                        <AnimatePresence mode="popLayout">
                            {filteredMolecules.map((molecule, index) => (
                                <motion.div
                                    key={molecule.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.03 }}
                                >
                                    <MoleculeCard
                                        molecule={molecule}
                                        onClick={() => setSelectedMolecule(molecule)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty State */}
                    {filteredMolecules.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                textAlign: 'center',
                                padding: '4rem 2rem'
                            }}
                        >
                            <Beaker size={64} style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }} />
                            <h3>لا توجد نتائج</h3>
                            <p>جرب تغيير كلمة البحث أو الفئة</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Modal for Selected Molecule */}
            <AnimatePresence>
                {selectedMolecule && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMolecule(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.8)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            backdropFilter: 'blur(8px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: 700,
                                width: '100%',
                                maxHeight: '90vh',
                                overflow: 'auto'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBottom: '1rem'
                            }}>
                                <button
                                    onClick={() => setSelectedMolecule(null)}
                                    className="btn"
                                    style={{
                                        background: 'var(--color-bg-tertiary)',
                                        padding: '0.5rem'
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <MoleculeViewer
                                molecule={selectedMolecule}
                                compact={false}
                                showControls={true}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info Section */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2>كيف تستخدم <span className="gradient-text">المكتبة</span>؟</h2>
                    </div>

                    <div className="grid-3">
                        <motion.div
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                            <h4>ابحث وتصفح</h4>
                            <p style={{ marginBottom: 0 }}>
                                استخدم شريط البحث أو فلترة الفئات للعثور على الجزيء المطلوب
                            </p>
                        </motion.div>

                        <motion.div
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🖱️</div>
                            <h4>تفاعل مع الجزيء</h4>
                            <p style={{ marginBottom: 0 }}>
                                اسحب للتدوير، مرر للتكبير، وحرك المؤشر على الذرات لمعرفة معلوماتها
                            </p>
                        </motion.div>

                        <motion.div
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
                            <h4>تعلم المزيد</h4>
                            <p style={{ marginBottom: 0 }}>
                                اضغط على أيقونة المعلومات لقراءة وصف الجزيء وخصائصه
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
