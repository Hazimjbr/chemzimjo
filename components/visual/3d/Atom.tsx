'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface AtomProps {
    position: [number, number, number];
    color: string;
    size: number;
    symbol: string;
    element: string;
}

export default function Atom3D({
    position,
    color,
    size,
    symbol,
}: AtomProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Scale size appropriately
    const radius = Math.max(0.3, size / 80);

    return (
        <group position={position}>
            {/* Outer glow */}
            <mesh>
                <sphereGeometry args={[radius * 1.4, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Main atom sphere */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.3}
                    metalness={0.2}
                    emissive={color}
                    emissiveIntensity={0.1}
                />
            </mesh>
        </group>
    );
}
