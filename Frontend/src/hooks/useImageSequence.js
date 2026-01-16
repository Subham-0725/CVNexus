import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook to manage high-performance image sequence rendering
 * @param {Object} options
 * @param {number} options.frameCount - Total number of frames
 * @param {string} options.pathTemplate - Template string for paths, e.g. '/sequence/frame_XXX.jpg'
 * @param {number} options.startIndex - Index of the first frame (usually 0 or 1)
 * @returns {Object} - { drawFrame, progress, isLoading }
 */
export function useImageSequence({ frameCount, pathTemplate, startIndex = 1 }) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const cacheRef = useRef(new Map());

    // Helper to generate path
    const getPath = useCallback((index) => {
        // Pad with zeros to 3 digits (e.g., 1 -> 001, 10 -> 010)
        const paddedIndex = String(index).padStart(3, '0');
        return pathTemplate.replace('XXX', paddedIndex);
    }, [pathTemplate]);

    // Preload priority frames (first 20) then load the rest
    useEffect(() => {
        let mounted = true;

        const loadImages = async () => {
            // 1. Load first batch (critical for LCP)
            const priorityCount = Math.min(20, frameCount);
            const priorityPromises = [];

            for (let i = startIndex; i < startIndex + priorityCount; i++) {
                priorityPromises.push(preloadImage(getPath(i)));
            }

            await Promise.all(priorityPromises);

            if (!mounted) return;
            setIsLoading(false);

            // 2. Lazy load the rest
            for (let i = startIndex + priorityCount; i < startIndex + frameCount; i++) {
                if (!mounted) break;
                // Load in chunks using requestIdleCallback if available, or just setTimeout
                preloadImage(getPath(i));
            }
        };

        loadImages();

        return () => {
            mounted = false;
        };
    }, [frameCount, getPath, startIndex]);

    const preloadImage = (src) => {
        if (cacheRef.current.has(src)) return Promise.resolve(cacheRef.current.get(src));

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                cacheRef.current.set(src, img);
                resolve(img);
            };
            img.onerror = reject;
        });
    };

    /**
     * Draw specific frame to canvas context
     * @param {number} index - Frame index (raw index, e.g. 0 to frameCount-1)
     * @param {HTMLCanvasElement} canvas - The canvas element
     * @param {CanvasRenderingContext2D} ctx - The context
     */
    const drawFrame = useCallback((progressIndex, canvas, ctx) => {
        // Convert progress index (0..total-1) to file index (1..200)
        const fileIndex = Math.floor(progressIndex) + startIndex;
        const clampedIndex = Math.min(Math.max(fileIndex, startIndex), startIndex + frameCount - 1);
        const src = getPath(clampedIndex);
        const img = cacheRef.current.get(src);

        if (!img || !canvas || !ctx) return;

        // "Contain" object fit logic
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);

        // We want the image to act like 'cover' actually, to fill the screen
        // But user asked for "Contain" or just "Clean".
        // Usually for hero backgrounds, 'cover' is preferred found in Apple sites.
        // Let's implement 'cover' logic centered.

        const coverScale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * coverScale;
        const h = img.height * coverScale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, w, h);
    }, [getPath, startIndex, frameCount]);

    return {
        drawFrame,
        isLoading
    };
}
