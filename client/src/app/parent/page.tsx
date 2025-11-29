'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Award, Target, BarChart3 } from 'lucide-react';
import { useEffect } from 'react';

export default function ParentDashboard() {
    const router = useRouter();
    const { user } = useStore();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (user.role !== 'parent') {
            router.push('/select-role');
        }
    }, [user, router]);

    if (!user || user.role !== 'parent') return null;

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
                        Parent Dashboard
                    </h1>
                    <p className="text-xl text-cyan-400">
                        Monitor your child's learning progress
                    </p>
                </motion.div>

                {/* Student Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="glass rounded-3xl p-6 mb-8"
                >
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Select Student
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-800 border-2 border-cyan-500/30 rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-white">
                        <option>John Doe (Your Child)</option>
                    </select>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-4 gap-6 mb-8"
                >
                    {[
                        { icon: TrendingUp, label: 'Overall Progress', value: '75%', color: 'purple', bg: 'bg-purple-900/40', text: 'text-purple-400' },
                        { icon: Clock, label: 'Time Spent', value: '24h', color: 'blue', bg: 'bg-blue-900/40', text: 'text-blue-400' },
                        { icon: Award, label: 'Achievements', value: '12', color: 'green', bg: 'bg-green-900/40', text: 'text-green-400' },
                        { icon: Target, label: 'Avg. Score', value: '88%', color: 'pink', bg: 'bg-pink-900/40', text: 'text-pink-400' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="glass rounded-2xl p-6 border border-white/5"
                        >
                            <div className={`inline-flex p-3 rounded-xl ${stat.bg} mb-4`}>
                                <stat.icon className={`w-6 h-6 ${stat.text}`} />
                            </div>
                            <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Performance by Subject */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="glass rounded-3xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-100">
                        <BarChart3 className="w-6 h-6 text-cyan-400" />
                        Performance by Subject
                    </h2>
                    <div className="space-y-6">
                        {[
                            { subject: 'English', progress: 85, color: 'blue' },
                            { subject: 'Gujarati', progress: 92, color: 'purple' },
                            { subject: 'Science', progress: 78, color: 'green' },
                            { subject: 'Maths', progress: 88, color: 'orange' },
                        ].map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold text-slate-300">{item.subject}</span>
                                    <span className="font-bold text-slate-100">{item.progress}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progress}%` }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                        className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="glass rounded-3xl p-8"
                >
                    <h2 className="text-2xl font-bold mb-6 text-slate-100">Recent Activity</h2>
                    <div className="space-y-4">
                        {[
                            { activity: 'Completed Gujarati Alphabet Lesson 5', time: '2 hours ago', type: 'success' },
                            { activity: 'Practiced English vocabulary', time: '5 hours ago', type: 'info' },
                            { activity: 'Scored 95% in Maths Quiz', time: '1 day ago', type: 'success' },
                            { activity: 'Started Science Module', time: '2 days ago', type: 'info' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition-colors">
                                <div className={`w-2 h-2 rounded-full mt-2 ${item.type === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]'}`} />
                                <div className="flex-1">
                                    <p className="font-medium text-slate-100">{item.activity}</p>
                                    <p className="text-sm text-slate-400">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
