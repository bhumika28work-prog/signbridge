'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Users, BookOpen, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

export default function TeacherDashboard() {
    const router = useRouter();
    const { user } = useStore();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (user.role !== 'teacher') {
            router.push('/select-role');
        }
    }, [user, router]);

    if (!user || user.role !== 'teacher') return null;

    const sections = [
        {
            id: 'reports',
            title: 'Student Reports',
            description: 'View and analyze student progress, performance metrics, and detailed reports',
            icon: Users,
            gradient: 'from-cyan-500 to-blue-500',
            bgGradient: 'from-cyan-900/40 to-blue-900/40',
            href: '/teacher/reports',
        },
        {
            id: 'syllabus',
            title: 'Manage Syllabus',
            description: 'Create, edit, and organize lesson plans and learning materials',
            icon: BookOpen,
            gradient: 'from-teal-500 to-emerald-500',
            bgGradient: 'from-teal-900/40 to-emerald-900/40',
            href: '/teacher/syllabus',
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
                        Teacher Dashboard
                    </h1>
                    <p className="text-xl text-cyan-400">
                        Manage your students and curriculum
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 gap-8"
                >
                    {sections.map((section) => (
                        <motion.div
                            key={section.id}
                            variants={item}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <Link href={section.href}>
                                <div className={`glass rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${section.bgGradient} cursor-pointer group border border-white/5`}>
                                    <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${section.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <section.icon className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 text-slate-100">{section.title}</h3>
                                    <p className="text-lg text-slate-300 leading-relaxed mb-6">{section.description}</p>
                                    <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${section.gradient} text-white font-semibold rounded-xl group-hover:shadow-lg transition-all`}>
                                        Open
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-12 glass rounded-3xl p-8"
                >
                    <h2 className="text-2xl font-bold mb-6 text-slate-100">Quick Overview</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">45</div>
                            <p className="text-cyan-400">Total Students</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">12</div>
                            <p className="text-cyan-400">Active Lessons</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">87%</div>
                            <p className="text-cyan-400">Avg. Completion</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">92%</div>
                            <p className="text-cyan-400">Avg. Score</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
