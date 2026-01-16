import { useEffect, useRef, useState } from 'react';
import { useImageSequence } from '../hooks/useImageSequence';

const HeroSection = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(0);

    // Configuration
    const FRAME_COUNT = 200;
    const START_INDEX = 1;
    const SCROLL_HEIGHT = 2500; // How tall the scroll area is (determines animation speed/duration)

    const { drawFrame, isLoading } = useImageSequence({
        frameCount: FRAME_COUNT,
        pathTemplate: '/sequence/ezgif-frame-XXX.jpg',
        startIndex: START_INDEX
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redraw current frame on resize
                const ctx = canvasRef.current.getContext('2d');
                drawFrame(progress * (FRAME_COUNT - 1), canvasRef.current, ctx);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame, progress]);

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            // Calculate start and end points
            // We want the animation to start when the container hits the top (roughly)
            // and end when we've scrolled through SCROLL_HEIGHT

            // Using sticky positioning often means the container is taller than viewport.
            // progress = (scrollTop - offsetTop) / (screenHeight - windowHeight)

            // Actually simpler logic for sticky container:
            // The container is `h-[300vh]` (or more). The sticky child is `h-screen`.
            // Progress is how far down the parent we have scrolled.

            // Top of container relative to viewport
            const top = rect.top;
            // Total scrollable distance = container height - viewport height
            const totalDist = container.offsetHeight - window.innerHeight;

            // Current scroll amount (inverted because top goes negative as we scroll down)
            const scrolled = -top;

            let norm = scrolled / totalDist;

            // Clamp between 0 and 1
            norm = Math.max(0, Math.min(1, norm));

            setProgress(norm);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sync Canvas Draw
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');

        // Map 0..1 to 0..FRAME_COUNT-1
        const frameIndex = progress * (FRAME_COUNT - 1);

        requestAnimationFrame(() => {
            drawFrame(frameIndex, canvasRef.current, ctx);
        });
    }, [progress, drawFrame]);

    return (
        // The outer container determines the scroll duration
        // 300vh means the animation plays over 2 full viewport heights of scrolling
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${SCROLL_HEIGHT}px` }}
        >
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-white">

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin"></div>
                    </div>
                )}

                {/* The Animation Canvas */}
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                />

                {/* Text Overlay - Fades out as we scroll */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 p-4 w-full max-w-4xl transition-opacity duration-300 ease-out"
                    style={{
                        opacity: Math.max(0, 1 - progress * 4), // Fades out quickly (start of scroll)
                        transform: `translate(-50%, calc(-50% - ${progress * 100}px))`
                    }}
                >
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 antialiased">
                        The Resume, <br />
                        <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Reimagined.</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
                        Experience how a chaotic history transforms into a structured, ATS-ready professional story.
                    </p>
                    <div className="mt-8 text-sm font-medium text-brand-primary uppercase tracking-widest">
                        Scroll to See the Structure
                    </div>
                </div>

                {/* Final State Text (Optional - appears at end) */}
                <div
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-opacity duration-500 delay-100"
                    style={{
                        opacity: progress > 0.9 ? 1 : 0,
                        transform: `translateX(-50%)`
                    }}
                >
                    <p className="text-2xl font-semibold text-brand-dark">
                        Perfectly Structured. Every Time.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;
