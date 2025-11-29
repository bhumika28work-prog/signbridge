'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, CheckCircle, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lesson {
    _id: string;
    title: string;
    content: string;
    signVideoUrl?: string;
    type?: 'text' | 'video' | 'interactive';
}

interface LessonViewProps {
    lessons: Lesson[];
    onComplete: (lessonId: string) => void;
}

export default function LessonView({ lessons, onComplete }: LessonViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentLesson = lessons[currentIndex];
    const progress = ((currentIndex + 1) / lessons.length) * 100;

    const handleNext = () => {
        if (currentIndex < lessons.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold gradient-text">{currentLesson.title}</h2>
                    <span className="text-sm font-medium text-cyan-400">
                        Lesson {currentIndex + 1} of {lessons.length}
                    </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Lesson Content Card */}
            <div className="glass rounded-3xl overflow-hidden shadow-2xl min-h-[500px] relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-10"
                    >
                        {/* Sign Video Section */}
                        {currentLesson.signVideoUrl && (
                            <div className="mb-8">
                                <div className="aspect-video bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 text-center">
                                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Play className="w-10 h-10 text-purple-600 ml-1" />
                                        </div>
                                        <p className="text-cyan-400 font-medium">Sign Language Video</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="prose max-w-none">
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-6">
                                <p className="text-2xl text-slate-100 leading-relaxed font-medium">
                                    {currentLesson.content}
                                </p>
                            </div>

                            {/* Audio Pronunciation Button */}
                            <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-500 text-slate-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <Volume2 className="w-5 h-5" />
                                <span className="font-semibold">Listen to Pronunciation</span>
                            </button>
                        </div>

                        {/* Completion Badge */}
                        {currentIndex === lessons.length - 1 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200"
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                    <div>
                                        <h4 className="font-bold text-green-900">Great Progress!</h4>
                                        <p className="text-green-700">You've completed this module</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 glass rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                </button>

                <div className="flex gap-2">
                    {lessons.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-8'
                                    : 'bg-slate-300 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === lessons.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                >
                    Next
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
