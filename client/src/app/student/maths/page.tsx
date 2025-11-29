'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Plus, Minus, X, Divide } from 'lucide-react';
import { motion } from 'framer-motion';
import { textToISL } from '@/lib/islDictionary';
import ISLSignDisplay from '@/components/ISLSignDisplay';

export default function MathsModule() {
    const router = useRouter();
    const { user } = useStore();
    const [selectedLesson, setSelectedLesson] = useState(0);
    const [showISL, setShowISL] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [quizAnswer, setQuizAnswer] = useState('');

    useEffect(() => {
        if (!user || user.role !== 'student') {
            router.push('/login');
        }
    }, [user, router]);

    if (!user || user.role !== 'student') return null;

    const lessons = [
        {
            id: 1,
            title: 'Numbers 1-10',
            content: 'Learn to count from 1 to 10 and recognize number signs.',
            numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            icon: '🔢'
        },
        {
            id: 2,
            title: 'Addition (+)',
            content: 'Addition means putting numbers together to find the total.',
            examples: ['2 + 3 = 5', '4 + 1 = 5', '3 + 3 = 6', '5 + 2 = 7'],
            icon: Plus,
            quiz: { question: '3 + 4 = ?', answer: '7' }
        },
        {
            id: 3,
            title: 'Subtraction (-)',
            content: 'Subtraction means taking away one number from another.',
            examples: ['5 - 2 = 3', '7 - 3 = 4', '9 - 4 = 5', '8 - 3 = 5'],
            icon: Minus,
            quiz: { question: '9 - 5 = ?', answer: '4' }
        },
        {
            id: 4,
            title: 'Multiplication (×)',
            content: 'Multiplication is repeated addition of the same number.',
            examples: ['2 × 3 = 6', '3 × 2 = 6', '4 × 2 = 8', '5 × 2 = 10'],
            icon: X,
            quiz: { question: '3 × 3 = ?', answer: '9' }
        },
        {
            id: 5,
            title: 'Division (÷)',
            content: 'Division means splitting a number into equal parts.',
            examples: ['6 ÷ 2 = 3', '8 ÷ 4 = 2', '10 ÷ 5 = 2', '12 ÷ 3 = 4'],
            icon: Divide,
            quiz: { question: '8 ÷ 2 = ?', answer: '4' }
        },
    ];

    const currentLesson = lessons[selectedLesson];
    const Icon = typeof currentLesson.icon === 'string' ? null : currentLesson.icon;

    const handleShowISL = (text: string) => {
        setCurrentText(text);
        setShowISL(true);
    };

    const checkAnswer = () => {
        if (currentLesson.quiz && quizAnswer === currentLesson.quiz.answer) {
            alert('Correct! Well done! 🎉');
            setQuizAnswer('');
        } else {
            alert('Try again! 💪');
        }
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
                    <h1 className="text-4xl font-bold mb-2 gradient-text">Mathematics</h1>
                    <p className="text-lg text-cyan-400">Learn numbers and basic math operations</p>
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
                            <h2 className="text-xl font-bold mb-4 text-slate-100">Lessons</h2>
                            <div className="space-y-2">
                                {lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setSelectedLesson(index)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedLesson === index
                                            ? 'bg-gradient-to-r from-teal-600 to-red-600 text-slate-100 shadow-lg'
                                            : 'hover:bg-slate-800 text-slate-300'
                                            }`}
                                    >
                                        <span className="font-medium">{lesson.title}</span>
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
                                {Icon ? <Icon className="w-12 h-12 text-teal-600" /> : <span className="text-6xl">{typeof currentLesson.icon === 'string' ? currentLesson.icon : ''}</span>}
                                <h2 className="text-3xl font-bold text-slate-100">{currentLesson.title}</h2>
                            </div>

                            <div className="mb-6 p-6 bg-gradient-to-br from-teal-50 to-red-50 rounded-2xl">
                                <p className="text-lg text-slate-300">{currentLesson.content}</p>
                            </div>

                            {/* Numbers Grid (for lesson 1) */}
                            {currentLesson.numbers && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-4 text-slate-100">Click to see in ISL</h3>
                                    <div className="grid grid-cols-5 gap-4">
                                        {currentLesson.numbers.map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => handleShowISL(num)}
                                                className="aspect-square glass rounded-2xl flex items-center justify-center hover:shadow-lg transition-all group"
                                            >
                                                <span className="text-4xl font-bold gradient-text">{num}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Examples (for operations) */}
                            {currentLesson.examples && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-4 text-slate-100">Examples</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {currentLesson.examples.map((example, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleShowISL(example)}
                                                className="p-6 glass rounded-xl hover:shadow-lg transition-all group"
                                            >
                                                <span className="text-2xl font-bold text-slate-100">{example}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quiz Section */}
                            {currentLesson.quiz && (
                                <div className="mb-6 p-6 bg-slate-800 rounded-2xl">
                                    <h3 className="text-xl font-bold mb-4 text-cyan-900">Practice Quiz</h3>
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl font-bold text-slate-100">{currentLesson.quiz.question}</span>
                                        <input
                                            type="text"
                                            value={quizAnswer}
                                            onChange={(e) => setQuizAnswer(e.target.value)}
                                            className="w-24 px-4 py-3 border-2 border-cyan-300 rounded-xl text-2xl font-bold text-center focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500"
                                            placeholder="?"
                                        />
                                        <button
                                            onClick={checkAnswer}
                                            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all"
                                        >
                                            Check
                                        </button>
                                    </div>
                                </div>
                            )}

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
                                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-red-600 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
