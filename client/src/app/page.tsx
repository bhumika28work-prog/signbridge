'use client';
import Link from "next/link";
import { ArrowRight, BookOpen, Camera, Sparkles, Brain, Zap, Award, Heart, Users, Target } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-teal-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                Empowering Every Child to Communicate
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl sm:text-8xl font-extrabold mb-6 leading-tight"
                        >
                            <span className="gradient-text">SignBridge</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-3xl mx-auto text-2xl text-cyan-400 mb-4 leading-relaxed font-medium"
                        >
                            Bridging Communication for Deaf & Mute Children
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-3xl mx-auto text-lg text-cyan-400 mb-12 leading-relaxed"
                        >
                            An AI-powered platform designed to help deaf and mute children learn Indian Sign Language through interactive lessons, real-time feedback, and engaging practice sessions.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            <Link
                                href="/login"
                                className="group relative inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-100 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-glow"
                            >
                                <span>Login to Continue</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-16 relative"
                    >
                        <div className="glass rounded-3xl p-8 max-w-5xl mx-auto overflow-hidden">
                            <div className="relative aspect-video rounded-2xl overflow-hidden">
                                <Image
                                    src="/hero.png"
                                    alt="Children learning sign language together"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                <span className="gradient-text">About SignBridge</span>
                            </h2>
                            <p className="text-xl text-cyan-400 mb-6 leading-relaxed">
                                SignBridge is an innovative educational platform designed specifically for deaf and mute children to learn Indian Sign Language (ISL) in an engaging, interactive way.
                            </p>
                            <p className="text-lg text-cyan-400 mb-6 leading-relaxed">
                                Using cutting-edge AI technology, we provide personalized learning experiences that adapt to each child's pace and learning style. Our platform combines visual learning, real-time feedback, and gamification to make learning ISL fun and effective.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                                        <Users className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-100 mb-1">For Children</h3>
                                        <p className="text-cyan-400">Interactive lessons designed for young learners</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-teal-500/10 rounded-lg">
                                        <BookOpen className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-100 mb-1">For Educators</h3>
                                        <p className="text-cyan-400">Tools to track progress and customize learning paths</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-cyan-100 rounded-lg">
                                        <Heart className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-100 mb-1">For Parents</h3>
                                        <p className="text-cyan-400">Support your child's learning journey at home</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glass rounded-3xl p-8 overflow-hidden">
                            <div className="relative aspect-square rounded-2xl overflow-hidden">
                                <Image
                                    src="/about.png"
                                    alt="Children using technology to learn"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            <span className="gradient-text">Our Mission</span>
                        </h2>
                        <p className="text-xl text-cyan-400 max-w-3xl mx-auto leading-relaxed">
                            To empower every deaf and mute child with the tools and confidence to communicate effectively through Indian Sign Language
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Inclusive Education",
                                description: "Breaking down communication barriers and ensuring every child has access to quality education",
                                gradient: "from-cyan-500 to-teal-500",
                                delay: 0.1
                            },
                            {
                                icon: Brain,
                                title: "AI-Powered Learning",
                                description: "Leveraging advanced technology to create personalized, adaptive learning experiences",
                                gradient: "from-cyan-500 to-cyan-500",
                                delay: 0.2
                            },
                            {
                                icon: Heart,
                                title: "Empowering Children",
                                description: "Building confidence and independence through effective communication skills",
                                gradient: "from-teal-500 to-rose-500",
                                delay: 0.3
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: item.delay, duration: 0.6 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="group"
                            >
                                <div className="glass rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-8 h-8 text-slate-100" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-slate-100">{item.title}</h3>
                                    <p className="text-cyan-400 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-16 glass rounded-3xl p-8 max-w-4xl mx-auto overflow-hidden"
                    >
                        <div className="relative aspect-video rounded-2xl overflow-hidden">
                            <Image
                                src="/mission.png"
                                alt="Hands forming heart with sign language"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                            <span className="gradient-text">Powerful Features</span>
                        </h2>
                        <p className="text-xl text-cyan-400 max-w-2xl mx-auto">
                            Everything you need to master sign language with cutting-edge AI technology
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BookOpen,
                                title: "Structured Modules",
                                description: "Comprehensive lessons covering Gujarati alphabets, numbers, and science concepts",
                                gradient: "from-cyan-500 to-teal-500",
                                delay: 0.1
                            },
                            {
                                icon: Camera,
                                title: "AI Hand Tracking",
                                description: "Real-time hand gesture recognition using MediaPipe for accurate practice feedback",
                                gradient: "from-cyan-500 to-cyan-500",
                                delay: 0.2
                            },
                            {
                                icon: Brain,
                                title: "Smart Feedback",
                                description: "Adaptive learning powered by AI that personalizes your learning journey",
                                gradient: "from-teal-500 to-rose-500",
                                delay: 0.3
                            },
                            {
                                icon: Zap,
                                title: "Speech-to-Sign",
                                description: "Convert spoken words to sign language animations instantly with AI voice recognition",
                                gradient: "from-emerald-500 to-teal-500",
                                delay: 0.4
                            },
                            {
                                icon: Award,
                                title: "Progress Tracking",
                                description: "Monitor your learning journey with detailed analytics and achievement milestones",
                                gradient: "from-green-500 to-emerald-500",
                                delay: 0.5
                            },
                            {
                                icon: Sparkles,
                                title: "Interactive Practice",
                                description: "Engage with writing canvas, quizzes, and interactive exercises for hands-on learning",
                                gradient: "from-indigo-500 to-cyan-500",
                                delay: 0.6
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: feature.delay, duration: 0.6 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="group"
                            >
                                <div className="glass rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-8 h-8 text-slate-100" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                                    <p className="text-cyan-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="glass-dark rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-6">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
                                Join thousands of students learning sign language with AI-powered tools
                            </p>
                            <Link
                                href="/learn"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-slate-800 text-cyan-400 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
