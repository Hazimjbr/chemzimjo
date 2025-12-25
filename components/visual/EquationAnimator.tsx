'use client';

import { motion } from 'framer-motion';

interface Props {
    reactants: [string, string][]; // [name, color]
    products: [string, string][]; // [name, color]
}

export default function EquationAnimator({ reactants, products }: Props) {
    return (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', overflow: 'hidden' }}>
            <h3 style={{ marginBottom: '2rem' }}>تفاعل كيميائي</h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Reactants */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {reactants.map((r, i) => (
                        <motion.div
                            key={`r-${i}`}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            style={{
                                padding: '0.5rem 1rem',
                                background: `${r[1]}20`,
                                border: `2px solid ${r[1]}`,
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                color: r[1]
                            }}
                        >
                            {r[0]}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    ⟳
                </motion.div>

                {/* Products */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {products.map((p, i) => (
                        <motion.div
                            key={`p-${i}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1 + i * 0.2 }}
                            style={{
                                padding: '0.5rem 1rem',
                                background: `${p[1]}20`,
                                border: `2px solid ${p[1]}`,
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                color: p[1]
                            }}
                        >
                            {p[0]}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
