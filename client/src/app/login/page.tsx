'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const setUser = useStore((state) => state.setUser);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                username,
                password
            });

            setUser(res.data);
            router.push('/select-role');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan- rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal- rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-" />
                        <span className="text-sm font-medium text-cyan-">Welcome Back</span>
                    </div>
                    <h1 className="text-4xl font-extrabold mb-2">
                        <span className="gradient-text">Sign In</span>
                    </h1>
                    <p className="text-cyan-400">Continue your learning journey</p>
                </div>

                {/* Login Form */}
                <div className="glass rounded-3xl p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-slate-300 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-3 border-2 border-cyan-500/30 rounded-xl focus:ring-4 focus:ring-cyan- focus:border-cyan- transition-all duration-300"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-3 border-2 border-cyan-500/30 rounded-xl focus:ring-4 focus:ring-cyan- focus:border-cyan- transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-slate-800 border-2 border-red-200 rounded-xl"
                            >
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Account Info */}
                    <div className="mt-6 p-4 bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-xl border-2 border-cyan-200">
                        <p className="text-sm font-semibold text-cyan-900 mb-2">💡 Demo Account</p>
                        <p className="text-xs text-cyan-700">
                            Just enter any username and password to create a new account automatically!
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-cyan-400 hover:text-cyan- font-medium transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
