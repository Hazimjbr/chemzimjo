'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface Bond3DProps {
    start: [number, number, number];
    end: [number, number, number];
    type: 'single' | 'double' | 'triple' | 'ionic';
    colorStart?: string;
    colorEnd?: string;
}

export default function Bond3D({
    start,
    end,
    type = 'single',
    colorStart = '#888888',
    colorEnd = '#888888',
}: Bond3DProps) {
    const { position, rotation, length } = useMemo(() => {
        const startVec = new THREE.Vector3(...start);
        const endVec = new THREE.Vector3(...end);

        const midpoint = new THREE.Vector3()
            .addVectors(startVec, endVec)
            .multiplyScalar(0.5);

        const direction = new THREE.Vector3()
            .subVectors(endVec, startVec);
        const len = direction.length();
        direction.normalize();

        // Calculate rotation to align cylinder with bond direction
        const quaternion = new THREE.Quaternion();
        const up = new THREE.Vector3(0, 1, 0);
        quaternion.setFromUnitVectors(up, direction);
        const euler = new THREE.Euler().setFromQuaternion(quaternion);

        return {
            position: [midpoint.x, midpoint.y, midpoint.z] as [number, number, number],
            rotation: [euler.x, euler.y, euler.z] as [number, number, number],
            length: len,
        };
    }, [start, end]);

    const radius = type === 'ionic' ? 0.06 : 0.08;
    const bondCount = type === 'double' ? 2 : type === 'triple' ? 3 : 1;
    const bondSpacing = 0.15;

    // Calculate offset perpendicular to bond for double/triple bonds
    const offsets = useMemo(() => {
        if (bondCount === 1) return [[0, 0]];
        if (bondCount === 2) return [[-bondSpacing / 2, 0], [bondSpacing / 2, 0]];
        return [[-bondSpacing, 0], [0, 0], [bondSpacing, 0]];
    }, [bondCount]);

    const bondColor = type === 'ionic' ? '#9ca3af' : '#666666';

    return (
        <group position={position} rotation={rotation}>
            {offsets.map((offset, i) => (
                <mesh key={i} position={[offset[0], 0, offset[1]]}>
                    <cylinderGeometry args={[radius, radius, length * 0.85, 8]} />
                    <meshStandardMaterial
                        color={bondColor}
                        roughness={0.6}
                        metalness={0.1}
                        transparent={type === 'ionic'}
                        opacity={type === 'ionic' ? 0.6 : 1}
                    />
                </mesh>
            ))}
        </group>
    );
}
