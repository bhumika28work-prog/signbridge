'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Trophy, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { islDictionary } from '@/lib/islDictionary';

interface Question {
    correctSign: string;
    options: string[];
}

export default function SignQuizGame() {
    const router = useRouter();
    const { user } = useStore();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);
    const [questionCount, setQuestionCount] = useState(10);

    useEffect(() => {
        if (!user || user.role !== 'student') {
            router.push('/login');
        }
    }, [user, router]);

    const generateQuestions = (count: number) => {
        const availableSigns = Object.keys(islDictionary).filter(key =>
            key.length === 1 && key.match(/[A-Z0-9]/)
        );

        const generatedQuestions: Question[] = [];

        for (let i = 0; i < count; i++) {
            const correctSign = availableSigns[Math.floor(Math.random() * availableSigns.length)];
            const wrongSigns = availableSigns
                .filter(s => s !== correctSign)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            const options = [correctSign, ...wrongSigns].sort(() => Math.random() - 0.5);

            generatedQuestions.push({ correctSign, options });
        }

        setQuestions(generatedQuestions);
        setGameStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setStreak(0);
        setGameComplete(false);
    };

    const handleAnswer = (answer: string) => {
        if (showFeedback) return;

        const correct = answer === questions[currentQuestion].correctSign;
        setSelectedAnswer(answer);
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(prev => prev + (10 + streak * 2));
            setStreak(prev => prev + 1);
        } else {
            setStreak(0);
        }

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
                setShowFeedback(false);
            } else {
                setGameComplete(true);
            }
        }, 1500);
    };

    if (!user || user.role !== 'student') return null;

    const currentQ = questions[currentQuestion];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/student/games" className="inline-flex items-center gap-2 text-cyan- hover:text-cyan- font-medium mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Games
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold gradient-text mb-2">Sign Quiz Challenge</h1>
                    <p className="text-xl text-cyan-400">Identify the correct ISL sign!</p>
                </motion.div>

                {/* Start Screen */}
                {!gameStarted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-3xl p-12 text-center"
                    >
                        <Trophy className="w-20 h-20 mx-auto mb-6 text-cyan-" />
                        <h2 className="text-3xl font-bold mb-6">Choose Quiz Length</h2>
                        <div className="grid gap-4 max-w-md mx-auto">
                            <button
                                onClick={() => generateQuestions(5)}
                                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-slate-100 font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                Quick Quiz (5 Questions)
                            </button>
                            <button
                                onClick={() => generateQuestions(10)}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-500 text-slate-100 font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                Standard Quiz (10 Questions)
                            </button>
                            <button
                                onClick={() => generateQuestions(15)}
                                className="px-8 py-4 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                Challenge Quiz (15 Questions)
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Game Screen */}
                {gameStarted && !gameComplete && currentQ && (
                    <div className="space-y-6">
                        {/* Stats Bar */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="glass rounded-xl p-4 text-center">
                                <Target className="w-6 h-6 mx-auto mb-2 text-cyan-600" />
                                <p className="text-2xl font-bold text-slate-100">{currentQuestion + 1}/{questions.length}</p>
                                <p className="text-sm text-cyan-400">Question</p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Trophy className="w-6 h-6 mx-auto mb-2 text-green-600" />
                                <p className="text-2xl font-bold text-slate-100">{score}</p>
                                <p className="text-sm text-cyan-400">Score</p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Zap className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                                <p className="text-2xl font-bold text-slate-100">{streak}</p>
                                <p className="text-sm text-cyan-400">Streak</p>
                            </div>
                        </div>

                        {/* Question */}
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-3xl p-8 text-center"
                        >
                            <h2 className="text-2xl font-bold mb-6">Which sign represents:</h2>
                            <div className="inline-block px-12 py-8 bg-gradient-to-br from-cyan- to-teal- rounded-2xl mb-8">
                                <p className="text-7xl font-bold gradient-text">{currentQ.correctSign}</p>
                            </div>
                        </motion.div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-4">
                            {currentQ.options.map((option, index) => (
                                <motion.button
                                    key={option}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleAnswer(option)}
                                    disabled={showFeedback}
                                    className={`glass rounded-2xl p-6 hover:shadow-xl transition-all relative overflow-hidden ${showFeedback && option === currentQ.correctSign
                                            ? 'ring-4 ring-green-500 bg-slate-800'
                                            : showFeedback && option === selectedAnswer
                                                ? 'ring-4 ring-red-500 bg-slate-800'
                                                : 'hover:scale-105'
                                        }`}
                                >
                                    <div className="relative aspect-square w-full max-w-[200px] mx-auto mb-4">
                                        <Image
                                            src={islDictionary[option]}
                                            alt={`ISL sign for ${option}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <p className="text-3xl font-bold text-slate-100">{option}</p>

                                    {/* Feedback Icons */}
                                    <AnimatePresence>
                                        {showFeedback && option === currentQ.correctSign && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-4 right-4 w-12 h-12 bg-slate-8000 rounded-full flex items-center justify-center"
                                            >
                                                <Check className="w-8 h-8 text-slate-100" />
                                            </motion.div>
                                        )}
                                        {showFeedback && option === selectedAnswer && !isCorrect && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-4 right-4 w-12 h-12 bg-slate-8000 rounded-full flex items-center justify-center"
                                            >
                                                <X className="w-8 h-8 text-slate-100" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Game Complete */}
                <AnimatePresence>
                    {gameComplete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                className="glass-dark rounded-3xl p-12 text-center max-w-md"
                            >
                                <div className="text-6xl mb-4">
                                    {score >= questions.length * 8 ? '🏆' : score >= questions.length * 5 ? '🎉' : '👍'}
                                </div>
                                <h2 className="text-4xl font-bold text-slate-100 mb-4">Quiz Complete!</h2>
                                <p className="text-xl text-slate-200 mb-6">
                                    {score >= questions.length * 8 ? 'Outstanding!' :
                                        score >= questions.length * 5 ? 'Great job!' :
                                            'Keep practicing!'}
                                </p>

                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between text-slate-100">
                                        <span>Final Score:</span>
                                        <span className="font-bold">{score}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-100">
                                        <span>Questions:</span>
                                        <span className="font-bold">{questions.length}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-100">
                                        <span>Best Streak:</span>
                                        <span className="font-bold">{streak}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            setGameComplete(false);
                                            setGameStarted(false);
                                        }}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-bold rounded-xl hover:shadow-xl transition-all"
                                    >
                                        Play Again
                                    </button>
                                    <Link
                                        href="/student/games"
                                        className="flex-1 px-6 py-3 bg-slate-800 text-cyan- font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        Games Menu
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
