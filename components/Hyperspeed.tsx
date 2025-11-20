
'use client'

import React, { useRef, useEffect } from 'react';

const Hyperspeed = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const numStars = 500;
        const stars: any[] = [];
        const speed = 7;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
                pz: Math.random() * width,
            });
        }

        let animationFrameId: number;

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);
            ctx.save();
            ctx.translate(width / 2, height / 2);

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];
                star.z -= speed;

                if (star.z < 1) {
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.z = width;
                    star.pz = width;
                }

                const k = 128.0 / star.z;
                const px = star.x * k + width / 2;
                const py = star.y * k + height / 2;

                if (px >= 0 && px <= width && py >= 0 && py <= height) {
                    const size = (1 - star.z / width) * 5;
                    const shade = parseInt((1 - star.z / width) * 255 as any);
                    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
                    ctx.beginPath();
                    ctx.arc(px, py, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }

            }
            ctx.restore();
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return (
        <div className="hyperspeed-wrapper">
            <canvas ref={canvasRef} id="hyperspeed-canvas" className="hyperspeed-canvas"></canvas>
        </div>
    );
};

export default Hyperspeed;
