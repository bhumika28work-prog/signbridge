'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Beaker, Calculator, Gamepad2, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

export default function StudentDashboard() {
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

    const modules = [
        {
            id: 'english',
            title: 'English',
            description: 'Learn English alphabets and vocabulary with ISL',
            icon: Globe,
            gradient: 'from-cyan-500 to-blue-500',
            bgGradient: 'from-cyan-900/40 to-blue-900/40',
            href: '/student/english',
        },
        {
            id: 'gujarati',
            title: 'Gujarati',
            description: 'Master Gujarati alphabets and writing with ISL',
            icon: BookOpen,
            gradient: 'from-teal-500 to-emerald-500',
            bgGradient: 'from-teal-900/40 to-emerald-900/40',
            href: '/student/gujarati',
        },
        {
            id: 'science',
            title: 'Science',
            description: 'Explore scientific concepts through visual learning',
            icon: Beaker,
            gradient: 'from-purple-500 to-indigo-500',
            bgGradient: 'from-purple-900/40 to-indigo-900/40',
            href: '/student/science',
        },
        {
            id: 'maths',
            title: 'Maths',
            description: 'Practice numbers and basic mathematics',
            icon: Calculator,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-900/40 to-red-900/40',
            href: '/student/maths',
        },
        {
            id: 'games',
            title: 'Games',
            description: 'Practice ISL through fun and interactive games',
            icon: Gamepad2,
            gradient: 'from-pink-500 to-rose-500',
            bgGradient: 'from-pink-900/40 to-rose-900/40',
            href: '/student/games',
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Welcome back, <span className="gradient-text">{user.username}</span>!
                    </h1>
                    <p className="text-xl text-cyan-400">
                        Choose a subject to continue your learning journey
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 gap-8"
                >
                    {modules.map((module) => (
                        <motion.div
                            key={module.id}
                            variants={item}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <Link href={module.href}>
                                <div className={`glass rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${module.bgGradient} cursor-pointer group border border-white/5`}>
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${module.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <module.icon className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 text-slate-100">{module.title}</h3>
                                    <p className="text-lg text-slate-300 leading-relaxed mb-6">{module.description}</p>
                                    <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${module.gradient} text-white font-semibold rounded-xl group-hover:shadow-lg transition-all`}>
                                        Start Learning
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Progress Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-12 glass rounded-3xl p-8"
                >
                    <h2 className="text-2xl font-bold mb-6 text-slate-100">Your Progress</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">12</div>
                            <p className="text-cyan-400">Lessons Completed</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">45</div>
                            <p className="text-cyan-400">Practice Sessions</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">8</div>
                            <p className="text-cyan-400">Achievements</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">92%</div>
                            <p className="text-cyan-400">Average Score</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
