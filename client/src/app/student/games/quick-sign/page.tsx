'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Trophy, Timer, Flame } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { islDictionary } from '@/lib/islDictionary';

export default function QuickSignGame() {
    const router = useRouter();
    const { user } = useStore();
    const [currentSign, setCurrentSign] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(0);
    const [totalRounds] = useState(20);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!user || user.role !== 'student') {
            router.push('/login');
        }
    }, [user, router]);

    useEffect(() => {
        if (gameStarted && !gameOver && timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameStarted) {
            handleTimeout();
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeLeft, gameStarted, gameOver]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setCombo(0);
        setRound(0);
        generateNewQuestion();
    };

    const generateNewQuestion = () => {
        const availableSigns = Object.keys(islDictionary).filter(key =>
            key.length === 1 && key.match(/[A-Z0-9]/)
        );

        const correct = availableSigns[Math.floor(Math.random() * availableSigns.length)];
        const wrong = availableSigns
            .filter(s => s !== correct)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const allOptions = [correct, ...wrong].sort(() => Math.random() - 0.5);

        setCurrentSign(correct);
        setOptions(allOptions);
        setTimeLeft(3);
        setFeedback(null);
    };

    const handleAnswer = (answer: string) => {
        if (feedback) return;

        const correct = answer === currentSign;
        setFeedback(correct ? 'correct' : 'wrong');

        if (correct) {
            const points = 10 + (combo * 2);
            setScore(prev => prev + points);
            setCombo(prev => prev + 1);
        } else {
            setCombo(0);
        }

        setTimeout(() => {
            if (round + 1 < totalRounds) {
                setRound(prev => prev + 1);
                generateNewQuestion();
            } else {
                setGameOver(true);
            }
        }, 800);
    };

    const handleTimeout = () => {
        setFeedback('wrong');
        setCombo(0);

        setTimeout(() => {
            if (round + 1 < totalRounds) {
                setRound(prev => prev + 1);
                generateNewQuestion();
            } else {
                setGameOver(true);
            }
        }, 800);
    };

    if (!user || user.role !== 'student') return null;

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
                    <h1 className="text-4xl font-bold gradient-text mb-2">Quick Sign</h1>
                    <p className="text-xl text-cyan-400">Identify signs as fast as you can!</p>
                </motion.div>

                {/* Start Screen */}
                {!gameStarted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-3xl p-12 text-center"
                    >
                        <Zap className="w-20 h-20 mx-auto mb-6 text-emerald-500" />
                        <h2 className="text-3xl font-bold mb-4">Ready for Speed?</h2>
                        <div className="text-left max-w-md mx-auto mb-8 space-y-3 text-cyan-400">
                            <p>• You have only 3 seconds per question!</p>
                            <p>• Identify the ISL sign quickly</p>
                            <p>• Build combos for bonus points</p>
                            <p>• Complete {totalRounds} rounds</p>
                            <p>• Stay focused and be fast!</p>
                        </div>
                        <button
                            onClick={startGame}
                            className="px-12 py-4 bg-gradient-to-r from-teal-500 to-red-500 text-slate-100 font-bold text-xl rounded-2xl hover:shadow-xl transition-all hover:scale-105 animate-pulse"
                        >
                            Start Quick Sign!
                        </button>
                    </motion.div>
                )}

                {/* Game Screen */}
                {gameStarted && !gameOver && (
                    <div className="space-y-6">
                        {/* Stats Bar */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="glass rounded-xl p-4 text-center">
                                <Timer className="w-6 h-6 mx-auto mb-2 text-cyan-600" />
                                <p className={`text-3xl font-bold ${timeLeft <= 1 ? 'text-red-500 animate-pulse' : 'text-slate-100'}`}>
                                    {timeLeft}s
                                </p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Trophy className="w-6 h-6 mx-auto mb-2 text-green-600" />
                                <p className="text-2xl font-bold text-slate-100">{score}</p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Flame className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                                <p className="text-2xl font-bold text-slate-100">{combo}x</p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Zap className="w-6 h-6 mx-auto mb-2 text-cyan-" />
                                <p className="text-2xl font-bold text-slate-100">{round + 1}/{totalRounds}</p>
                            </div>
                        </div>

                        {/* Sign Display */}
                        <motion.div
                            key={currentSign}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass rounded-3xl p-8"
                        >
                            <div className="relative aspect-square max-w-md mx-auto">
                                <Image
                                    src={islDictionary[currentSign]}
                                    alt="ISL Sign"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-4">
                            {options.map((option, index) => (
                                <motion.button
                                    key={option}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleAnswer(option)}
                                    disabled={feedback !== null}
                                    className={`glass rounded-2xl p-6 text-3xl font-bold hover:shadow-xl transition-all hover:scale-105 ${feedback === 'correct' && option === currentSign
                                            ? 'ring-4 ring-green-500 bg-slate-800'
                                            : feedback === 'wrong' && option === currentSign
                                                ? 'ring-4 ring-green-500 bg-slate-800'
                                                : ''
                                        }`}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>

                        {/* Feedback */}
                        <AnimatePresence>
                            {feedback && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className={`text-center p-6 rounded-2xl ${feedback === 'correct' ? 'bg-green-100' : 'bg-red-100'
                                        }`}
                                >
                                    <p className={`text-3xl font-bold ${feedback === 'correct' ? 'text-green-700' : 'text-red-700'
                                        }`}>
                                        {feedback === 'correct' ? '✓ Correct!' : '✗ Wrong!'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Game Over */}
                <AnimatePresence>
                    {gameOver && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                className="glass-dark rounded-3xl p-12 text-center max-w-md"
                            >
                                <div className="text-6xl mb-4">
                                    {score >= 200 ? '🏆' : score >= 150 ? '🎉' : '⚡'}
                                </div>
                                <h2 className="text-4xl font-bold text-slate-100 mb-4">Time's Up!</h2>
                                <p className="text-xl text-slate-200 mb-6">
                                    {score >= 200 ? 'Lightning Fast!' : score >= 150 ? 'Great Speed!' : 'Keep Practicing!'}
                                </p>

                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between text-slate-100">
                                        <span>Final Score:</span>
                                        <span className="font-bold">{score}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-100">
                                        <span>Best Combo:</span>
                                        <span className="font-bold">{combo}x</span>
                                    </div>
                                    <div className="flex justify-between text-slate-100">
                                        <span>Questions:</span>
                                        <span className="font-bold">{totalRounds}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={startGame}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-red-500 text-slate-100 font-bold rounded-xl hover:shadow-xl transition-all"
                                    >
                                        Play Again
                                    </button>
                                    <Link
                                        href="/student/games"
                                        className="flex-1 px-6 py-3 bg-slate-800 text-teal-600 font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
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
