'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Gamepad2, Brain, Zap, Puzzle, Trophy, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GamesPage() {
    const router = useRouter();
    const { user } = useStore();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (user.role !== 'student') {
            router.push('/select-role');
        }
    }, [user, router]);

    if (!user || user.role !== 'student') return null;

    const games = [
        {
            id: 'memory-match',
            title: 'Sign Memory Match',
            description: 'Match pairs of ISL signs to improve your memory',
            icon: Brain,
            gradient: 'from-cyan- to-teal-',
            bgGradient: 'from-cyan- to-teal-',
            difficulty: 'Easy',
            href: '/student/games/memory-match',
        },
        {
            id: 'sign-quiz',
            title: 'Sign Quiz Challenge',
            description: 'Test your knowledge by identifying the correct ISL signs',
            icon: Trophy,
            gradient: 'from-cyan-500 to-cyan-500',
            bgGradient: 'from-cyan-50 to-cyan-50',
            difficulty: 'Medium',
            href: '/student/games/sign-quiz',
        },
        {
            id: 'sign-builder',
            title: 'Sign Builder',
            description: 'Build words by arranging ISL signs in the correct order',
            icon: Puzzle,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50',
            difficulty: 'Medium',
            href: '/student/games/sign-builder',
        },
        {
            id: 'quick-sign',
            title: 'Quick Sign',
            description: 'Fast-paced game - identify ISL signs as quickly as you can!',
            icon: Zap,
            gradient: 'from-teal-500 to-red-500',
            bgGradient: 'from-teal-50 to-red-50',
            difficulty: 'Hard',
            href: '/student/games/quick-sign',
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/student" className="inline-flex items-center gap-2 text-cyan- hover:text-cyan- font-medium mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 bg-gradient-to-br from-cyan- to-teal- rounded-2xl">
                            <Gamepad2 className="w-10 h-10 text-slate-100" />
                        </div>
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
                                Learning Games
                            </h1>
                            <p className="text-xl text-cyan-400 mt-2">
                                Practice ISL through fun and interactive games
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-400 text-sm font-medium mb-1">Games Played</p>
                                <p className="text-3xl font-bold gradient-text">0</p>
                            </div>
                            <div className="p-3 bg-cyan- rounded-xl">
                                <Gamepad2 className="w-6 h-6 text-cyan-" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-400 text-sm font-medium mb-1">High Score</p>
                                <p className="text-3xl font-bold gradient-text">0</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Trophy className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-400 text-sm font-medium mb-1">Achievements</p>
                                <p className="text-3xl font-bold gradient-text">0</p>
                            </div>
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <Trophy className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Games Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <Link href={game.href}>
                                <div className={`glass rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${game.bgGradient} cursor-pointer group`}>
                                    <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${game.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <game.icon className="w-12 h-12 text-slate-100" />
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-2xl font-bold text-slate-100">{game.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                game.difficulty === 'Medium' ? 'bg-emerald-100 text-emerald-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {game.difficulty}
                                        </span>
                                    </div>

                                    <p className="text-lg text-cyan-400 leading-relaxed mb-6">
                                        {game.description}
                                    </p>

                                    <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${game.gradient} text-slate-100 font-semibold rounded-xl group-hover:shadow-lg transition-all`}>
                                        Play Now
                                        <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-12 bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-2xl p-6 border-2 border-cyan-200"
                >
                    <h4 className="font-bold text-cyan-900 mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        💡 Game Tips
                    </h4>
                    <ul className="space-y-2 text-cyan-800 text-sm">
                        <li>• Start with easier games to build confidence</li>
                        <li>• Take your time to learn each ISL sign properly</li>
                        <li>• Practice regularly to improve your scores</li>
                        <li>• All games are designed to be fun and educational!</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
