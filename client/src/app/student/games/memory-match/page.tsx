'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy, Timer, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { islDictionary } from '@/lib/islDictionary';

interface Card {
    id: number;
    sign: string;
    imageUrl: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export default function MemoryMatchGame() {
    const router = useRouter();
    const { user } = useStore();
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

    useEffect(() => {
        if (!user || user.role !== 'student') {
            router.push('/login');
        }
    }, [user, router]);

    useEffect(() => {
        if (isPlaying && !gameComplete) {
            const interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying, gameComplete]);

    const initializeGame = (level: 'easy' | 'medium' | 'hard') => {
        setDifficulty(level);
        const pairCount = level === 'easy' ? 6 : level === 'medium' ? 8 : 12;

        // Get random signs from ISL dictionary
        const availableSigns = Object.keys(islDictionary).filter(key =>
            key.length === 1 && key.match(/[A-Z0-9]/)
        );

        const selectedSigns = availableSigns
            .sort(() => Math.random() - 0.5)
            .slice(0, pairCount);

        // Create pairs
        const cardPairs: Card[] = [];
        selectedSigns.forEach((sign, index) => {
            const imageUrl = islDictionary[sign];
            cardPairs.push(
                { id: index * 2, sign, imageUrl, isFlipped: false, isMatched: false },
                { id: index * 2 + 1, sign, imageUrl, isFlipped: false, isMatched: false }
            );
        });

        // Shuffle cards
        const shuffled = cardPairs.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setTimer(0);
        setIsPlaying(true);
        setGameComplete(false);
    };

    const handleCardClick = (cardId: number) => {
        if (flippedCards.length === 2 || flippedCards.includes(cardId)) return;

        const card = cards.find(c => c.id === cardId);
        if (card?.isMatched) return;

        const newFlipped = [...flippedCards, cardId];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(prev => prev + 1);
            const [first, second] = newFlipped;
            const firstCard = cards.find(c => c.id === first);
            const secondCard = cards.find(c => c.id === second);

            if (firstCard?.sign === secondCard?.sign) {
                // Match found
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        c.id === first || c.id === second
                            ? { ...c, isMatched: true }
                            : c
                    ));
                    setMatches(prev => prev + 1);
                    setFlippedCards([]);

                    // Check if game is complete
                    const totalPairs = cards.length / 2;
                    if (matches + 1 === totalPairs) {
                        setGameComplete(true);
                        setIsPlaying(false);
                    }
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!user || user.role !== 'student') return null;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/student/games" className="inline-flex items-center gap-2 text-cyan- hover:text-cyan- font-medium mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Games
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold gradient-text mb-2">Sign Memory Match</h1>
                    <p className="text-xl text-cyan-400">Match pairs of ISL signs!</p>
                </motion.div>

                {/* Game Stats */}
                {isPlaying && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="glass rounded-xl p-4 text-center">
                            <Timer className="w-6 h-6 mx-auto mb-2 text-cyan-600" />
                            <p className="text-2xl font-bold text-slate-100">{formatTime(timer)}</p>
                            <p className="text-sm text-cyan-400">Time</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                            <Trophy className="w-6 h-6 mx-auto mb-2 text-green-600" />
                            <p className="text-2xl font-bold text-slate-100">{moves}</p>
                            <p className="text-sm text-cyan-400">Moves</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                            <Star className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                            <p className="text-2xl font-bold text-slate-100">{matches}/{cards.length / 2}</p>
                            <p className="text-sm text-cyan-400">Matches</p>
                        </div>
                    </div>
                )}

                {/* Start Screen */}
                {!isPlaying && !gameComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold mb-6">Choose Difficulty</h2>
                        <div className="grid gap-4">
                            <button
                                onClick={() => initializeGame('easy')}
                                className="px-8 py-6 bg-gradient-to-r from-green-500 to-emerald-500 text-slate-100 font-bold text-xl rounded-2xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                Easy (6 Pairs)
                            </button>
                            <button
                                onClick={() => initializeGame('medium')}
                                className="px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-100 font-bold text-xl rounded-2xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                Medium (8 Pairs)
                            </button>
                            <button
                                onClick={() => initializeGame('hard')}
                                className="px-8 py-6 bg-gradient-to-r from-red-500 to-teal- text-slate-100 font-bold text-xl rounded-2xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                Hard (12 Pairs)
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Game Board */}
                {isPlaying && (
                    <div className={`grid gap-4 ${difficulty === 'easy' ? 'grid-cols-4' :
                            difficulty === 'medium' ? 'grid-cols-4' :
                                'grid-cols-6'
                        } max-w-4xl mx-auto`}>
                        {cards.map((card) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: card.id * 0.05 }}
                                className="aspect-square"
                            >
                                <div
                                    onClick={() => handleCardClick(card.id)}
                                    className={`relative w-full h-full cursor-pointer transition-all duration-300 ${card.isMatched ? 'opacity-50' : ''
                                        }`}
                                    style={{ perspective: '1000px' }}
                                >
                                    <div
                                        className={`relative w-full h-full transition-transform duration-500 ${flippedCards.includes(card.id) || card.isMatched
                                                ? 'rotate-y-180'
                                                : ''
                                            }`}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        {/* Card Back */}
                                        <div
                                            className="absolute w-full h-full bg-gradient-to-br from-cyan- to-teal- rounded-2xl flex items-center justify-center shadow-lg"
                                            style={{ backfaceVisibility: 'hidden' }}
                                        >
                                            <div className="text-6xl">❓</div>
                                        </div>

                                        {/* Card Front */}
                                        <div
                                            className="absolute w-full h-full bg-slate-800 rounded-2xl p-3 shadow-lg flex items-center justify-center"
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)'
                                            }}
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={card.imageUrl}
                                                    alt={`ISL sign for ${card.sign}`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Game Complete Modal */}
                <AnimatePresence>
                    {gameComplete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                            onClick={() => setGameComplete(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 50 }}
                                className="glass-dark rounded-3xl p-12 text-center max-w-md"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-6xl mb-4">🎉</div>
                                <h2 className="text-4xl font-bold text-slate-100 mb-4">Congratulations!</h2>
                                <p className="text-xl text-slate-200 mb-6">You completed the game!</p>

                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between text-slate-100">
                                        <span>Time:</span>
                                        <span className="font-bold">{formatTime(timer)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-100">
                                        <span>Moves:</span>
                                        <span className="font-bold">{moves}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-100">
                                        <span>Difficulty:</span>
                                        <span className="font-bold capitalize">{difficulty}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => initializeGame(difficulty)}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Play Again
                                    </button>
                                    <Link
                                        href="/student/games"
                                        className="flex-1 px-6 py-3 bg-slate-800 text-cyan- font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Games Menu
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
}
