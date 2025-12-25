'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { MoleculeData, getCategoryColor, getCategoryName } from '@/lib/molecules-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ZoomIn, ZoomOut, RotateCcw, Loader2 } from 'lucide-react';

// Dynamic import for Canvas to avoid SSR issues
const Scene3D = dynamic(() => import('./Scene3D'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem',
            color: 'var(--color-text-muted)'
        }}>
            <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '0.875rem' }}>جاري تحميل العرض ثلاثي الأبعاد...</span>
        </div>
    )
});

interface MoleculeViewerProps {
    molecule: MoleculeData;
    compact?: boolean;
    showControls?: boolean;
}

export default function MoleculeViewer({
    molecule,
    compact = false,
    showControls = true
}: MoleculeViewerProps) {
    const [showInfo, setShowInfo] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [key, setKey] = useState(0);

    if (!molecule) return null;

    const categoryColor = getCategoryColor(molecule.category);
    const categoryName = getCategoryName(molecule.category);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
    const handleReset = () => {
        setZoom(1);
        setKey(prev => prev + 1);
    };

    return (
        <div
            className="glass-card"
            style={{
                padding: compact ? '1rem' : '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                borderColor: categoryColor + '40'
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: compact ? '0.5rem' : '1rem'
            }}>
                <div>
                    <h3 style={{
                        marginBottom: '0.25rem',
                        fontSize: compact ? '1rem' : '1.25rem'
                    }}>
                        {molecule.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span
                            className="badge"
                            style={{
                                background: categoryColor + '20',
                                color: categoryColor,
                                border: `1px solid ${categoryColor}`,
                                fontSize: '0.7rem'
                            }}
                        >
                            {categoryName}
                        </span>
                        <span style={{
                            fontFamily: 'monospace',
                            fontSize: compact ? '0.9rem' : '1.1rem',
                            color: 'var(--color-text-secondary)',
                            direction: 'ltr'
                        }}>
                            {molecule.formula}
                        </span>
                    </div>
                </div>
                {showControls && (
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        style={{
                            background: showInfo ? categoryColor + '20' : 'transparent',
                            border: `1px solid ${categoryColor}`,
                            borderRadius: '8px',
                            padding: '6px',
                            cursor: 'pointer',
                            color: categoryColor,
                            transition: 'all 0.2s'
                        }}
                    >
                        <Info size={18} />
                    </button>
                )}
            </div>

            {/* Info Panel */}
            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: 'var(--color-bg-tertiary)',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1rem',
                            overflow: 'hidden'
                        }}
                    >
                        <p style={{
                            margin: 0,
                            fontSize: '0.9rem',
                            color: 'var(--color-text-secondary)'
                        }}>
                            {molecule.description}
                        </p>
                        {molecule.pH !== undefined && (
                            <div style={{
                                marginTop: '0.75rem',
                                display: 'flex',
                                gap: '1rem',
                                fontSize: '0.85rem'
                            }}>
                                <span>
                                    <strong style={{ color: categoryColor }}>pH:</strong>{' '}
                                    {molecule.pH}
                                </span>
                                <span>
                                    <strong style={{ color: categoryColor }}>الذرات:</strong>{' '}
                                    {molecule.atoms.length}
                                </span>
                                <span>
                                    <strong style={{ color: categoryColor }}>الروابط:</strong>{' '}
                                    {molecule.bonds.length}
                                </span>
                            </div>
                        )}
                        <div style={{
                            marginTop: '0.75rem',
                            fontSize: '0.8rem',
                            color: 'var(--color-text-muted)',
                            direction: 'ltr'
                        }}>
                            {molecule.nameEn}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Canvas */}
            <div style={{
                height: compact ? 250 : 350,
                width: '100%',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(0,0,0,0.3) 100%)'
            }}>
                <Scene3D
                    key={key}
                    atoms={molecule.atoms}
                    bonds={molecule.bonds}
                    zoom={zoom}
                />

                {/* 3D Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    background: 'rgba(0,0,0,0.6)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    color: 'white',
                    pointerEvents: 'none',
                    backdropFilter: 'blur(4px)'
                }}>
                    🧪 عرض ثلاثي الأبعاد
                </div>
            </div>

            {/* Controls */}
            {showControls && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '1rem'
                }}>
                    <button
                        onClick={handleZoomOut}
                        className="btn"
                        style={{
                            background: 'var(--color-bg-tertiary)',
                            padding: '8px 12px',
                            fontSize: '0.85rem'
                        }}
                    >
                        <ZoomOut size={16} />
                    </button>
                    <button
                        onClick={handleReset}
                        className="btn"
                        style={{
                            background: 'var(--color-bg-tertiary)',
                            padding: '8px 12px',
                            fontSize: '0.85rem'
                        }}
                    >
                        <RotateCcw size={16} />
                    </button>
                    <button
                        onClick={handleZoomIn}
                        className="btn"
                        style={{
                            background: 'var(--color-bg-tertiary)',
                            padding: '8px 12px',
                            fontSize: '0.85rem'
                        }}
                    >
                        <ZoomIn size={16} />
                    </button>
                </div>
            )}

            {/* Hint */}
            <p style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.75rem',
                textAlign: 'center',
                marginBottom: 0
            }}>
                اسحب للتدوير • مرر للتكبير
            </p>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
