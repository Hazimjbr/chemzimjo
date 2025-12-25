'use client';

import { MoleculeData, getCategoryColor, getCategoryName } from '@/lib/molecules-data';

interface MoleculeCardProps {
    molecule: MoleculeData;
    onClick?: () => void;
}

// Simple 2D molecule preview using SVG
export default function MoleculeCard({ molecule, onClick }: MoleculeCardProps) {
    const categoryColor = getCategoryColor(molecule.category);
    const categoryName = getCategoryName(molecule.category);

    // Calculate bounds for positioning
    const atoms = molecule.atoms;
    const minX = Math.min(...atoms.map(a => a.x));
    const maxX = Math.max(...atoms.map(a => a.x));
    const minY = Math.min(...atoms.map(a => a.y));
    const maxY = Math.max(...atoms.map(a => a.y));

    const width = maxX - minX || 2;
    const height = maxY - minY || 2;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const scale = Math.min(80 / width, 60 / height);

    return (
        <div
            className="glass-card molecule-card"
            onClick={onClick}
            style={{
                padding: '1rem',
                cursor: 'pointer',
                borderColor: categoryColor + '40',
                transition: 'all 0.3s ease',
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>
                    {molecule.name}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span
                        className="badge"
                        style={{
                            background: categoryColor + '20',
                            color: categoryColor,
                            border: `1px solid ${categoryColor}`,
                            fontSize: '0.65rem',
                            padding: '2px 6px'
                        }}
                    >
                        {categoryName}
                    </span>
                    <span style={{
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-secondary)',
                        direction: 'ltr'
                    }}>
                        {molecule.formula}
                    </span>
                </div>
            </div>

            {/* 2D SVG Preview */}
            <div style={{
                height: 180,
                width: '100%',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg width="100%" height="100%" viewBox="-50 -40 100 80">
                    {/* Bonds */}
                    {molecule.bonds.map((bond, i) => {
                        const atom1 = atoms[bond.source];
                        const atom2 = atoms[bond.target];
                        if (!atom1 || !atom2) return null;

                        const x1 = (atom1.x - centerX) * scale;
                        const y1 = (atom1.y - centerY) * scale;
                        const x2 = (atom2.x - centerX) * scale;
                        const y2 = (atom2.y - centerY) * scale;

                        const bondWidth = bond.type === 'ionic' ? 2 : 3;
                        const opacity = bond.type === 'ionic' ? 0.4 : 0.7;
                        const dash = bond.type === 'ionic' ? '4,2' : 'none';

                        if (bond.type === 'double') {
                            const angle = Math.atan2(y2 - y1, x2 - x1);
                            const offset = 3;
                            const ox = Math.sin(angle) * offset;
                            const oy = -Math.cos(angle) * offset;
                            return (
                                <g key={`bond-${i}`}>
                                    <line x1={x1 + ox} y1={y1 + oy} x2={x2 + ox} y2={y2 + oy}
                                        stroke="#666" strokeWidth={2} opacity={opacity} />
                                    <line x1={x1 - ox} y1={y1 - oy} x2={x2 - ox} y2={y2 - oy}
                                        stroke="#666" strokeWidth={2} opacity={opacity} />
                                </g>
                            );
                        }

                        return (
                            <line
                                key={`bond-${i}`}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke="#666"
                                strokeWidth={bondWidth}
                                opacity={opacity}
                                strokeDasharray={dash}
                            />
                        );
                    })}

                    {/* Atoms */}
                    {atoms.map((atom) => {
                        const x = (atom.x - centerX) * scale;
                        const y = (atom.y - centerY) * scale;
                        const r = Math.max(6, atom.size / 12);

                        return (
                            <g key={atom.id}>
                                {/* Glow */}
                                <circle
                                    cx={x} cy={y} r={r * 1.5}
                                    fill={atom.color}
                                    opacity={0.2}
                                />
                                {/* Atom */}
                                <circle
                                    cx={x} cy={y} r={r}
                                    fill={atom.color}
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth={1}
                                />
                                {/* Symbol */}
                                <text
                                    x={x} y={y}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill="white"
                                    fontSize={r * 0.9}
                                    fontWeight="bold"
                                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                                >
                                    {atom.symbol}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* 3D Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    background: 'rgba(0,0,0,0.7)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    color: 'white',
                    backdropFilter: 'blur(4px)'
                }}>
                    اضغط للعرض 3D 🧪
                </div>
            </div>

            <style jsx>{`
                .molecule-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2);
                    border-color: ${categoryColor}80 !important;
                }
            `}</style>
        </div>
    );
}
