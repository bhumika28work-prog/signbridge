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
                    <p className="text-xl text-slate-600">
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
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Select Student
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all">
                        <option>John Doe (Your Child)</option>
                    </select>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    {[
                        { icon: TrendingUp, label: 'Overall Progress', value: '75%', color: 'purple' },
                        { icon: Clock, label: 'Time Spent', value: '24h', color: 'blue' },
                        { icon: Award, label: 'Achievements', value: '12', color: 'green' },
                        { icon: Target, label: 'Avg. Score', value: '88%', color: 'pink' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                            className="glass rounded-2xl p-6"
                        >
                            <div className={`inline-flex p-3 rounded-xl bg-${stat.color}-100 mb-4`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </div>
                            <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Performance by Subject */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="glass rounded-3xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6" />
                        Performance by Subject
                    </h2>
                    <div className="space-y-4">
                        {[
                            { subject: 'English', progress: 85, color: 'blue' },
                            { subject: 'Gujarati', progress: 92, color: 'purple' },
                            { subject: 'Science', progress: 78, color: 'green' },
                            { subject: 'Maths', progress: 88, color: 'orange' },
                        ].map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold text-slate-700">{item.subject}</span>
                                    <span className="font-bold text-slate-900">{item.progress}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progress}%` }}
                                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                                        className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600`}
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
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="glass rounded-3xl p-8"
                >
                    <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {[
                            { activity: 'Completed Gujarati Alphabet Lesson 5', time: '2 hours ago', type: 'success' },
                            { activity: 'Practiced English vocabulary', time: '5 hours ago', type: 'info' },
                            { activity: 'Scored 95% in Maths Quiz', time: '1 day ago', type: 'success' },
                            { activity: 'Started Science Module', time: '2 days ago', type: 'info' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl">
                                <div className={`w-2 h-2 rounded-full mt-2 ${item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">{item.activity}</p>
                                    <p className="text-sm text-slate-500">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
