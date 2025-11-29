'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Calculator, Microscope, PenTool, ArrowRight, Sparkles } from "lucide-react";

const modules = [
    {
        id: "gujarati-alphabets",
        title: "Gujarati Alphabets",
        description: "Master vowels and consonants with interactive sign language videos",
        icon: BookOpen,
        gradient: "from-teal-500 to-red-500",
        bgGradient: "from-teal-50 to-red-50",
        href: "/learn/gujarati-alphabets",
        lessons: 50,
        difficulty: "Beginner"
    },
    {
        id: "numbers",
        title: "Numbers & Maths",
        description: "Learn counting, arithmetic operations, and mathematical concepts",
        icon: Calculator,
        gradient: "from-cyan-500 to-cyan-500",
        bgGradient: "from-cyan-50 to-cyan-50",
        href: "/learn/numbers",
        lessons: 35,
        difficulty: "Beginner"
    },
    {
        id: "science",
        title: "Science Concepts",
        description: "Explore the natural world with sign language demonstrations",
        icon: Microscope,
        gradient: "from-green-500 to-emerald-500",
        bgGradient: "from-green-50 to-emerald-50",
        href: "/learn/science",
        lessons: 40,
        difficulty: "Intermediate"
    },
    {
        id: "writing",
        title: "Writing Practice",
        description: "Practice writing Gujarati characters with AI-powered feedback",
        icon: PenTool,
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-50 to-pink-50",
        href: "/learn/writing",
        lessons: 25,
        difficulty: "All Levels"
    },
];

export default function LearnPage() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">Choose Your Path</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
                        <span className="gradient-text">Learning Modules</span>
                    </h1>
                    <p className="text-xl text-cyan-400 max-w-2xl mx-auto">
                        Select a module to begin your sign language learning journey
                    </p>
                </motion.div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {modules.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <Link href={module.href} className="block group">
                                <div className="glass rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${module.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${module.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <module.icon className="w-8 h-8 text-slate-100" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-bold mb-3 text-slate-100 group-hover:gradient-text transition-all duration-300">
                                            {module.title}
                                        </h3>
                                        <p className="text-cyan-400 mb-6 leading-relaxed">
                                            {module.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="px-3 py-1 bg-slate-800 rounded-full text-sm font-medium text-slate-300">
                                                {module.lessons} Lessons
                                            </span>
                                            <span className="px-3 py-1 bg-slate-800 rounded-full text-sm font-medium text-slate-300">
                                                {module.difficulty}
                                            </span>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all duration-300">
                                            <span>Start Learning</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-3">Need Help Getting Started?</h3>
                        <p className="text-cyan-400 mb-6">
                            Not sure which module to choose? Try our AI-powered practice mode to assess your current level.
                        </p>
                        <Link
                            href="/practice"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            Try Practice Mode
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
