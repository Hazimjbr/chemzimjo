'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Molecule3D from './3d/Molecule3D';
import { AtomData, BondData } from '@/lib/molecules-data';

interface Scene3DProps {
    atoms: AtomData[];
    bonds: BondData[];
    zoom?: number;
}

export default function Scene3D({ atoms, bonds, zoom = 1 }: Scene3DProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 8 / zoom], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            <pointLight position={[0, 10, 0]} intensity={0.5} />

            {/* Molecule */}
            <Molecule3D
                atoms={atoms}
                bonds={bonds}
                autoRotate
                rotationSpeed={0.4}
            />

            {/* Controls */}
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={3}
                maxDistance={15}
                autoRotate={false}
            />
        </Canvas>
    );
}
