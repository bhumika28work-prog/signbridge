'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ISLSign } from '@/lib/islDictionary';
import { Play, Pause } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ISLSignDisplayProps {
    signs: ISLSign[];
    autoPlay?: boolean;
    speed?: number;
}

export default function ISLSignDisplay({ signs, autoPlay = false, speed = 1500 }: ISLSignDisplayProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const startAutoPlay = () => {
        if (intervalId) clearInterval(intervalId);

        const id = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= signs.length - 1) {
                    setIsPlaying(false);
                    return 0;
                }
                return prev + 1;
            });
        }, speed);

        setIntervalId(id);
        setIsPlaying(true);
    };

    const stopAutoPlay = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setIsPlaying(false);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    };

    // Reset state when signs change
    useEffect(() => {
        setCurrentIndex(0);
        setIsPlaying(autoPlay);
    }, [signs, autoPlay]);

    if (signs.length === 0) {
        return (
            <div className="glass rounded-2xl p-12 text-center">
                <p className="text-cyan-400">Enter text to see ISL signs</p>
            </div>
        );
    }

    const currentSign = signs[currentIndex];

    // Safety check
    if (!currentSign) return null;

    return (
        <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                    >
                        <div className="relative w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-cyan- to-teal- rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                            <Image
                                src={currentSign.imageUrl}
                                alt={`ISL sign for ${currentSign.character}`}
                                fill
                                className="object-contain p-4"
                                onError={() => {
                                    // Silently handle image load errors
                                    // Some external ISL images may be unavailable
                                }}
                                unoptimized
                            />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold gradient-text">
                                {currentSign.character.toUpperCase()}
                            </h3>
                            {currentSign.description && (
                                <p className="text-cyan-400">{currentSign.description}</p>
                            )}
                            <span className="inline-block px-3 py-1 bg-cyan- text-cyan- rounded-full text-sm font-medium">
                                {currentSign.category}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-slate-300">
                            {currentIndex + 1} / {signs.length}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan- to-teal-"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentIndex + 1) / signs.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <button
                    onClick={handlePlayPause}
                    className="p-4 bg-gradient-to-r from-cyan- to-teal- text-slate-100 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
                {signs.map((sign, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            stopAutoPlay();
                        }}
                        className={`transition-all duration-300 ${index === currentIndex
                            ? 'w-8 h-3 bg-gradient-to-r from-cyan- to-teal- rounded-full'
                            : 'w-3 h-3 bg-slate-300 hover:bg-slate-400 rounded-full'
                            }`}
                        title={sign.character}
                    />
                ))}
            </div>

            <div className="glass rounded-2xl p-6">
                <h4 className="font-semibold text-slate-300 mb-4">Sign Sequence:</h4>
                <div className="flex flex-wrap gap-2">
                    {signs.map((sign, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentIndex(index);
                                stopAutoPlay();
                            }}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${index === currentIndex
                                ? 'bg-gradient-to-r from-cyan- to-teal- text-slate-100 shadow-lg scale-110'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-900'
                                }`}
                        >
                            {sign.character.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
