'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Beaker, FlaskConical, Zap } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { glossaryTerms } from '@/lib/chemistry-utils';

const categoryInfo = {
    acid: { label: 'الحموض', icon: FlaskConical, color: 'var(--color-acid)' },
    base: { label: 'القواعد', icon: Beaker, color: 'var(--color-base)' },
    general: { label: 'عام', icon: BookOpen, color: 'var(--color-primary)' },
    reaction: { label: 'التفاعلات', icon: Zap, color: 'var(--color-neutral)' }
};

export default function GlossaryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredTerms = glossaryTerms.filter(term => {
        const matchesSearch = term.term.includes(searchTerm) ||
            term.termEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
            term.definition.includes(searchTerm);
        const matchesCategory = !selectedCategory || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['acid', 'base', 'general', 'reaction'] as const;

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 100 }}>
                <section className="section">
                    <div className="container">
                        <div className="section-header">
                            <h1>قاموس <span className="gradient-text">المصطلحات</span></h1>
                            <p>مصطلحات كيميائية مهمة في مادة الحموض والقواعد</p>
                        </div>

                        {/* Search & Filter */}
                        <div className="glass-card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <div style={{ position: 'relative', marginBottom: 'var(--spacing-lg)' }}>
                                <Search size={20} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="ابحث عن مصطلح..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ paddingRight: 44 }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`btn ${!selectedCategory ? 'btn-primary' : 'btn-outline'}`}
                                    style={{ padding: '0.5rem 1rem' }}
                                >
                                    الكل
                                </button>
                                {categories.map(cat => {
                                    const info = categoryInfo[cat];
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderColor: selectedCategory === cat ? info.color : undefined
                                            }}
                                        >
                                            <info.icon size={16} />
                                            {info.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Terms Grid */}
                        <div className="grid-2">
                            {filteredTerms.map((term, index) => {
                                const info = categoryInfo[term.category];
                                return (
                                    <motion.div
                                        key={term.term}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="glass-card"
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                            <div style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 'var(--radius-lg)',
                                                background: `${info.color}20`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <info.icon size={20} style={{ color: info.color }} />
                                            </div>
                                            <div>
                                                <h4 style={{ margin: 0 }}>{term.term}</h4>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{term.termEn}</span>
                                            </div>
                                        </div>
                                        <p style={{ margin: 0 }}>{term.definition}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {filteredTerms.length === 0 && (
                            <div className="glass-card" style={{ textAlign: 'center' }}>
                                <p style={{ margin: 0 }}>لا توجد نتائج للبحث "{searchTerm}"</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
