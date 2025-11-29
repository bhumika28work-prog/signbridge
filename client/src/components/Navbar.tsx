'use client';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { user, logout } = useStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-cyan-500/30/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan- to-teal- rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-slate-100 font-bold text-xl">SB</span>
                        </div>
                        <span className="text-2xl font-bold gradient-text">SignBridge</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <a href="#about" className="text-slate-300 hover:text-cyan- font-medium transition-colors">
                            About
                        </a>
                        <a href="#mission" className="text-slate-300 hover:text-cyan- font-medium transition-colors">
                            Mission
                        </a>
                        <Link href="/learn" className="text-slate-300 hover:text-cyan- font-medium transition-colors">
                            Learn
                        </Link>
                        <Link href="/practice" className="text-slate-300 hover:text-cyan- font-medium transition-colors">
                            Practice
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan- to-teal- rounded-full">
                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan- to-teal- rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-slate-100" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-300">{user.username}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 hover:bg-slate-800 rounded-full text-cyan-400 hover:text-red-600 transition-colors duration-200"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-6 py-2.5 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-cyan- transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-cyan-500/30/20 glass"
                    >
                        <div className="px-4 py-6 space-y-4">
                            <a href="#about" className="block px-4 py-3 rounded-xl hover:bg-cyan- font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                About
                            </a>
                            <a href="#mission" className="block px-4 py-3 rounded-xl hover:bg-cyan- font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                Mission
                            </a>
                            <Link
                                href="/learn"
                                className="block px-4 py-3 rounded-xl hover:bg-cyan- font-medium transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Learn
                            </Link>
                            <Link
                                href="/practice"
                                className="block px-4 py-3 rounded-xl hover:bg-cyan- font-medium transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Practice
                            </Link>
                            {user ? (
                                <div className="pt-4 border-t border-cyan-500/30">
                                    <div className="flex items-center gap-2 px-4 py-3 mb-2">
                                        <User className="w-5 h-5 text-cyan-" />
                                        <span className="font-medium">{user.username}</span>
                                    </div>
                                    <button
                                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                                        className="w-full px-4 py-3 bg-slate-800 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block px-4 py-3 bg-gradient-to-r from-cyan- to-teal- text-slate-100 text-center font-semibold rounded-xl"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
