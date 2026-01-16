import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';

// Floating 3D shapes for background decoration
const FloatingShape = ({ position, color, shape = 'sphere', speed = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.2;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
        }
    });

    const ShapeComponent = {
        sphere: Sphere,
        box: Box,
        torus: Torus
    }[shape];

    return (
        <ShapeComponent
            ref={meshRef}
            position={position}
            args={shape === 'torus' ? [1, 0.3, 16, 32] : [1, 32, 32]}
            scale={0.5}
        >
            <meshStandardMaterial color={color} transparent opacity={0.6} />
        </ShapeComponent>
    );
};

// Background floating elements component
export const FloatingBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} />

                <FloatingShape position={[-8, 2, -5]} color="#4F46E5" shape="sphere" speed={0.8} />
                <FloatingShape position={[8, -2, -8]} color="#7C3AED" shape="box" speed={1.2} />
                <FloatingShape position={[0, 4, -6]} color="#A5B4FC" shape="torus" speed={0.6} />
                <FloatingShape position={[-6, -4, -4]} color="#E0E7FF" shape="sphere" speed={1.0} />
                <FloatingShape position={[6, 1, -7]} color="#4338CA" shape="box" speed={0.9} />
            </Canvas>
        </div>
    );
};

// Animated card component with hover effects
export const AnimatedCard = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-300 ${className}`}
        >
            {children}
        </motion.div>
    );
};

// Pulse animation for buttons and interactive elements
export const PulseButton = ({ children, className = "", ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                boxShadow: [
                    "0 0 0 0 rgba(79, 70, 229, 0.4)",
                    "0 0 0 10px rgba(79, 70, 229, 0)",
                    "0 0 0 0 rgba(79, 70, 229, 0)"
                ]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={`relative overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default FloatingBackground;