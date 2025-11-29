'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { textToISL } from '@/lib/islDictionary';
import ISLSignDisplay from '@/components/ISLSignDisplay';

export default function ScienceModule() {
    const router = useRouter();
    const { user } = useStore();
    const [selectedLesson, setSelectedLesson] = useState(0);
    const [showISL, setShowISL] = useState(false);
    const [currentText, setCurrentText] = useState('');

    useEffect(() => {
        if (!user || user.role !== 'student') {
            router.push('/login');
        }
    }, [user, router]);

    if (!user || user.role !== 'student') return null;

    const lessons = [
        {
            id: 1,
            title: 'Parts of a Plant',
            content: 'Plants have different parts that help them grow and survive. The main parts are roots, stem, leaves, and flowers.',
            details: [
                'Roots: Absorb water and nutrients from soil',
                'Stem: Supports the plant and carries water',
                'Leaves: Make food using sunlight',
                'Flowers: Help plants make seeds'
            ],
            image: '🌱'
        },
        {
            id: 2,
            title: 'Water Cycle',
            content: 'Water moves in a continuous cycle on Earth through evaporation, condensation, and precipitation.',
            details: [
                'Evaporation: Water turns into vapor from heat',
                'Condensation: Vapor cools and forms clouds',
                'Precipitation: Water falls as rain or snow',
                'Collection: Water gathers in rivers and oceans'
            ],
            image: '💧'
        },
        {
            id: 3,
            title: 'Solar System',
            content: 'Our solar system has the Sun at the center with eight planets orbiting around it.',
            details: [
                'Sun: The star at the center',
                'Inner Planets: Mercury, Venus, Earth, Mars',
                'Outer Planets: Jupiter, Saturn, Uranus, Neptune',
                'Moon: Earth\'s natural satellite'
            ],
            image: '🌍'
        },
        {
            id: 4,
            title: 'States of Matter',
            content: 'Matter exists in three main states: solid, liquid, and gas.',
            details: [
                'Solid: Has fixed shape and volume',
                'Liquid: Has fixed volume but takes container shape',
                'Gas: Has no fixed shape or volume',
                'Changes: Matter can change between states'
            ],
            image: '🧊'
        },
    ];

    const currentLesson = lessons[selectedLesson];

    const handleShowISL = (text: string) => {
        setCurrentText(text);
        setShowISL(true);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/student" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2 gradient-text">Science</h1>
                    <p className="text-lg text-cyan-400">Explore the wonders of science with visual learning</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Lesson List */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-1"
                    >
                        <div className="glass rounded-3xl p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-4 text-slate-100">Topics</h2>
                            <div className="space-y-2">
                                {lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setSelectedLesson(index)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedLesson === index
                                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-slate-100 shadow-lg'
                                                : 'hover:bg-slate-800 text-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{lesson.image}</span>
                                            <span className="font-medium">{lesson.title}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Lesson Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="glass rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-6xl">{currentLesson.image}</span>
                                <h2 className="text-3xl font-bold text-slate-100">{currentLesson.title}</h2>
                            </div>

                            <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                                <p className="text-lg text-slate-300 mb-4">{currentLesson.content}</p>
                            </div>

                            {/* Key Points */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-4 text-slate-100">Key Points</h3>
                                <div className="space-y-3">
                                    {currentLesson.details.map((detail, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-slate-800 rounded-xl">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-slate-100 text-sm font-bold">{index + 1}</span>
                                            </div>
                                            <p className="text-slate-300">{detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ISL Button */}
                            <button
                                onClick={() => handleShowISL(currentLesson.title)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all mb-6"
                            >
                                <BookOpen className="w-5 h-5" />
                                Show Topic in ISL
                            </button>

                            {/* ISL Display */}
                            {showISL && currentText && (
                                <div className="mt-6">
                                    <ISLSignDisplay signs={textToISL(currentText)} />
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
                                    disabled={selectedLesson === 0}
                                    className="px-6 py-3 glass font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setSelectedLesson(Math.min(lessons.length - 1, selectedLesson + 1))}
                                    disabled={selectedLesson === lessons.length - 1}
                                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
