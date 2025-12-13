'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, RotateCcw, Lightbulb, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { islDictionary } from '@/lib/islDictionary';

const WORDS = [
    'CAT', 'DOG', 'BAT', 'RAT', 'HAT', 'MAT', 'SAT', 'FAT',
    'BIG', 'PIG', 'DIG', 'FIG', 'JIG', 'WIG',
    'BED', 'RED', 'FED', 'LED', 'WED',
    'SUN', 'RUN', 'FUN', 'BUN', 'GUN',
    'CAR', 'BAR', 'FAR', 'JAR', 'TAR',
];

export default function SignBuilderGame() {
    const router = useRouter();
    const { user } = useStore();
    const [targetWord, setTargetWord] = useState('');
    const [shuffledSigns, setShuffledSigns] = useState<string[]>([]);
    const [userAnswer, setUserAnswer] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [totalRounds] = useState(5);

    useEffect(() => {
        if (!user || user.role !== 'student') {
            router.push('/login');
        }
    }, [user, router]);

    const startGame = () => {
        setGameStarted(true);
        setRound(0);
        setScore(0);
        setGameComplete(false);
        generateNewWord();
    };

    const generateNewWord = () => {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        setTargetWord(word);
        setShuffledSigns(word.split('').sort(() => Math.random() - 0.5));
        setUserAnswer([]);
        setShowHint(false);
        setIsCorrect(null);
    };

    const handleSignClick = (sign: string, index: number) => {
        if (userAnswer.length < targetWord.length) {
            setUserAnswer([...userAnswer, sign]);
            setShuffledSigns(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleRemoveSign = (index: number) => {
        const removedSign = userAnswer[index];
        setUserAnswer(prev => prev.filter((_, i) => i !== index));
        setShuffledSigns(prev => [...prev, removedSign]);
    };

    const checkAnswer = () => {
        const correct = userAnswer.join('') === targetWord;
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 10);
            setTimeout(() => {
                if (round + 1 < totalRounds) {
                    setRound(prev => prev + 1);
                    generateNewWord();
                } else {
                    setGameComplete(true);
                }
            }, 1500);
        }
    };

    const useHint = () => {
        setShowHint(true);
        setScore(prev => Math.max(0, prev - 2));
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
                    <h1 className="text-4xl font-bold gradient-text mb-2">Sign Builder</h1>
                    <p className="text-xl text-cyan-400">Build words using ISL signs!</p>
                </motion.div>

                {/* Start Screen */}
                {!gameStarted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-3xl p-12 text-center"
                    >
                        <div className="text-6xl mb-6">🏗️</div>
                        <h2 className="text-3xl font-bold mb-4">How to Play</h2>
                        <div className="text-left max-w-md mx-auto mb-8 space-y-3 text-cyan-400">
                            <p>• You'll see a target word to spell</p>
                            <p>• Drag ISL signs to build the word</p>
                            <p>• Arrange them in the correct order</p>
                            <p>• Use hints if you need help (-2 points)</p>
                            <p>• Complete {totalRounds} rounds to win!</p>
                        </div>
                        <button
                            onClick={startGame}
                            className="px-12 py-4 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-bold text-xl rounded-2xl hover:shadow-xl transition-all hover:scale-105"
                        >
                            Start Game
                        </button>
                    </motion.div>
                )}

                {/* Game Screen */}
                {gameStarted && !gameComplete && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass rounded-xl p-4 text-center">
                                <p className="text-sm text-cyan-400 mb-1">Round</p>
                                <p className="text-3xl font-bold gradient-text">{round + 1}/{totalRounds}</p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <p className="text-sm text-cyan-400 mb-1">Score</p>
                                <p className="text-3xl font-bold gradient-text">{score}</p>
                            </div>
                        </div>

                        {/* Target Word */}
                        <motion.div
                            key={targetWord}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass rounded-2xl p-8 text-center"
                        >
                            <p className="text-lg text-cyan-400 mb-4">Build this word:</p>
                            <div className="inline-block px-8 py-4 bg-gradient-to-br from-cyan- to-teal- rounded-xl">
                                <p className="text-5xl font-bold gradient-text tracking-wider">
                                    {showHint ? targetWord : '???'}
                                </p>
                            </div>
                        </motion.div>

                        {/* User Answer Area */}
                        <div className="glass rounded-2xl p-6">
                            <p className="text-center text-cyan-400 mb-4">Your Answer:</p>
                            <div className="flex justify-center gap-3 min-h-[140px] items-center flex-wrap">
                                {userAnswer.length === 0 ? (
                                    <p className="text-slate-400 text-lg">Click signs below to build the word</p>
                                ) : (
                                    userAnswer.map((sign, index) => (
                                        <motion.div
                                            key={`answer-${index}`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            onClick={() => handleRemoveSign(index)}
                                            className="relative w-24 h-24 bg-slate-800 rounded-xl p-2 cursor-pointer hover:shadow-lg transition-all border-2 border-cyan-"
                                        >
                                            <Image
                                                src={islDictionary[sign]}
                                                alt={`ISL sign for ${sign}`}
                                                fill
                                                className="object-contain p-2"
                                            />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-8000 rounded-full flex items-center justify-center text-slate-100 text-xs font-bold">
                                                ×
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Available Signs */}
                        <div className="glass rounded-2xl p-6">
                            <p className="text-center text-cyan-400 mb-4">Available Signs:</p>
                            <div className="flex justify-center gap-3 flex-wrap">
                                {shuffledSigns.map((sign, index) => (
                                    <motion.div
                                        key={`shuffled-${index}`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleSignClick(sign, index)}
                                        className="relative w-24 h-24 bg-slate-800 rounded-xl p-2 cursor-pointer hover:shadow-lg hover:scale-110 transition-all border-2 border-cyan-500/30"
                                    >
                                        <Image
                                            src={islDictionary[sign]}
                                            alt={`ISL sign for ${sign}`}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={useHint}
                                disabled={showHint}
                                className="flex-1 px-6 py-3 bg-slate-8000 text-slate-100 font-bold rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Lightbulb className="w-5 h-5" />
                                Hint (-2 pts)
                            </button>
                            <button
                                onClick={checkAnswer}
                                disabled={userAnswer.length !== targetWord.length}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Check className="w-5 h-5" />
                                Check Answer
                            </button>
                        </div>

                        {/* Feedback */}
                        <AnimatePresence>
                            {isCorrect !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`text-center p-6 rounded-2xl ${isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
                                        }`}
                                >
                                    <p className={`text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                        {isCorrect ? '✓ Correct! Well done!' : '✗ Try again!'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Game Complete */}
                <AnimatePresence>
                    {gameComplete && (
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
                                <div className="text-6xl mb-4">🎉</div>
                                <h2 className="text-4xl font-bold text-slate-100 mb-4">Game Complete!</h2>
                                <p className="text-xl text-slate-200 mb-6">You finished all rounds!</p>

                                <div className="mb-8">
                                    <div className="flex justify-between text-slate-100 mb-2">
                                        <span>Final Score:</span>
                                        <span className="font-bold">{score}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-100">
                                        <span>Rounds Completed:</span>
                                        <span className="font-bold">{totalRounds}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={startGame}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw className="w-5 h-5" />
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
