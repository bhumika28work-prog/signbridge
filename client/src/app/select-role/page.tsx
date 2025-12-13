'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
import { useEffect } from 'react';

export default function SelectRole() {
    const router = useRouter();
    const { user, setRole } = useStore();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleRoleSelection = (role: 'student' | 'teacher' | 'parent') => {
        setRole(role);
        router.push(`/${role}`);
    };

    if (!user) return null;

    const roles = [
        {
            id: 'student',
            title: 'Student',
            description: 'Access learning modules for English, Gujarati, Science, and Maths',
            icon: GraduationCap,
            gradient: 'from-cyan-500 to-teal-500',
            bgGradient: 'from-cyan-900/40 to-teal-900/40',
        },
        {
            id: 'teacher',
            title: 'Teacher',
            description: 'View student reports and manage syllabus',
            icon: BookOpen,
            gradient: 'from-blue-500 to-indigo-500',
            bgGradient: 'from-blue-900/40 to-indigo-900/40',
        },
        {
            id: 'parent',
            title: 'Parent',
            description: 'Monitor your child\'s progress and view detailed reports',
            icon: Users,
            gradient: 'from-emerald-500 to-green-500',
            bgGradient: 'from-emerald-900/40 to-green-900/40',
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Welcome, <span className="gradient-text">{user.username}</span>!
                    </h1>
                    <p className="text-xl text-cyan-400">
                        Please select your role to continue
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            onClick={() => handleRoleSelection(role.id as 'student' | 'teacher' | 'parent')}
                            className="cursor-pointer group"
                        >
                            <div className={`glass rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${role.bgGradient}`}>
                                <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${role.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <role.icon className="w-12 h-12 text-slate-100" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-slate-100">{role.title}</h3>
                                <p className="text-lg text-cyan-400 leading-relaxed mb-6">{role.description}</p>
                                <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${role.gradient} text-slate-100 font-semibold rounded-xl group-hover:shadow-lg transition-all`}>
                                    Continue as {role.title}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
