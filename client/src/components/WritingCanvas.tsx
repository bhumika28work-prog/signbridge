'use client';
import { useRef, useState, useEffect } from 'react';
import { Eraser, Download, Sparkles, Undo2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WritingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [color, setColor] = useState('#6366f1');
    const [lineWidth, setLineWidth] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.lineWidth = lineWidth;
                context.strokeStyle = color;
                setCtx(context);
            }
        }
    }, [color, lineWidth]);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        ctx?.beginPath();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !ctx || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        let x, y;
        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = (e as React.MouseEvent).clientX - rect.left;
            y = (e as React.MouseEvent).clientY - rect.top;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
        if (ctx && canvasRef.current) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    const downloadCanvas = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'my-drawing.png';
            link.href = canvasRef.current.toDataURL();
            link.click();
        }
    };

    const colors = [
        { name: 'Purple', value: '#6366f1' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Green', value: '#10b981' },
        { name: 'Orange', value: '#f97316' },
        { name: 'Black', value: '#000000' },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Toolbar */}
                <div className="glass rounded-2xl p-6 mb-6">
                    <div className="flex flex-wrap gap-6 items-center justify-between">
                        {/* Color Picker */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Color</label>
                            <div className="flex gap-2">
                                {colors.map((c) => (
                                    <button
                                        key={c.value}
                                        onClick={() => setColor(c.value)}
                                        className={`w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${color === c.value ? 'ring-4 ring-purple-300 scale-110' : ''
                                            }`}
                                        style={{ backgroundColor: c.value }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Brush Size */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-semibold text-slate-300 mb-3">
                                Brush Size: {lineWidth}px
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={lineWidth}
                                onChange={(e) => setLineWidth(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="glass rounded-2xl p-4 mb-6">
                    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-inner border-4 border-slate-100">
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={500}
                            onMouseDown={startDrawing}
                            onMouseUp={stopDrawing}
                            onMouseOut={stopDrawing}
                            onMouseMove={draw}
                            onTouchStart={startDrawing}
                            onTouchEnd={stopDrawing}
                            onTouchMove={draw}
                            className="cursor-crosshair w-full h-auto touch-none"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={clearCanvas}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <Eraser className="w-5 h-5" />
                        Clear Canvas
                    </button>

                    <button
                        onClick={downloadCanvas}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-500 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <Download className="w-5 h-5" />
                        Download
                    </button>

                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <Sparkles className="w-5 h-5" />
                        AI Check
                    </button>
                </div>

                {/* Tips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 glass rounded-2xl p-6"
                >
                    <h3 className="font-bold text-lg mb-3 gradient-text">💡 Practice Tips</h3>
                    <ul className="space-y-2 text-cyan-400">
                        <li>• Start with light strokes and gradually increase pressure</li>
                        <li>• Practice each character multiple times for muscle memory</li>
                        <li>• Use the AI Check feature to get instant feedback on your writing</li>
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
}
