'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Atom3D from './Atom';
import Bond3D from './Bond3D';
import { AtomData, BondData } from '@/lib/molecules-data';

interface Molecule3DProps {
    atoms: AtomData[];
    bonds: BondData[];
    autoRotate?: boolean;
    rotationSpeed?: number;
    scale?: number;
}

export default function Molecule3D({
    atoms,
    bonds,
    autoRotate = true,
    rotationSpeed = 0.3,
    scale = 1
}: Molecule3DProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Auto rotation
    useFrame((state, delta) => {
        if (autoRotate && groupRef.current) {
            groupRef.current.rotation.y += delta * rotationSpeed;
        }
    });

    // Calculate center of molecule
    const center = atoms.length > 0 ? atoms.reduce(
        (acc, atom) => ({
            x: acc.x + atom.x / atoms.length,
            y: acc.y + atom.y / atoms.length,
            z: acc.z + atom.z / atoms.length,
        }),
        { x: 0, y: 0, z: 0 }
    ) : { x: 0, y: 0, z: 0 };

    return (
        <group ref={groupRef} scale={scale}>
            {/* Render bonds first (behind atoms) */}
            {bonds.map((bond, i) => {
                const atom1 = atoms[bond.source];
                const atom2 = atoms[bond.target];

                if (!atom1 || !atom2) return null;

                return (
                    <Bond3D
                        key={`bond-${i}`}
                        start={[
                            atom1.x - center.x,
                            -(atom1.y - center.y),
                            atom1.z - center.z
                        ]}
                        end={[
                            atom2.x - center.x,
                            -(atom2.y - center.y),
                            atom2.z - center.z
                        ]}
                        type={bond.type}
                        colorStart={atom1.color}
                        colorEnd={atom2.color}
                    />
                );
            })}

            {/* Render atoms */}
            {atoms.map((atom) => (
                <Atom3D
                    key={atom.id}
                    element={atom.element}
                    symbol={atom.symbol}
                    color={atom.color}
                    size={atom.size}
                    position={[
                        atom.x - center.x,
                        -(atom.y - center.y),
                        atom.z - center.z
                    ]}
                />
            ))}
        </group>
    );
}
