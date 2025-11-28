'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LessonView from '@/components/LessonView';
import WritingCanvas from '@/components/WritingCanvas';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/lib/api';

interface Lesson {
    _id: string;
    title: string;
    content: string;
    signVideoUrl?: string;
    type?: 'text' | 'video' | 'interactive';
}

export default function ModulePage() {
    const params = useParams();
    const moduleName = params.module as string;
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (moduleName === 'writing') {
            setLoading(false);
            return;
        }

        const fetchLessons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/learn/${moduleName}`);
                if (res.data && res.data.length > 0) {
                    setLessons(res.data);
                } else {
                    setLessons(getMockLessons(moduleName));
                }
            } catch (err) {
                console.error("Failed to fetch lessons, using mock data", err);
                setLessons(getMockLessons(moduleName));
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [moduleName]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-400 font-medium">Loading lessons...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <Link href="/learn" className="inline-flex items-center gap-2 glass px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">Back to Modules</span>
                    </Link>

                    <div className="flex items-center gap-3 mt-6">
                        <h1 className="text-4xl font-bold gradient-text capitalize">
                            {moduleName.replace('-', ' ')}
                        </h1>
                        <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    {moduleName === 'writing' ? (
                        <WritingCanvas />
                    ) : (
                        <LessonView
                            lessons={lessons}
                            onComplete={(id: string) => console.log('Completed', id)}
                        />
                    )}
                </motion.div>
            </div>
        </div>
    );
}

function getMockLessons(module: string): Lesson[] {
    switch (module) {
        case 'gujarati-alphabets':
            return [
                { _id: '1', title: 'Vowel A (અ)', content: 'The first vowel in Gujarati is A (અ). It is pronounced like "a" in "about".', type: 'text' },
                { _id: '2', title: 'Vowel Aa (આ)', content: 'The second vowel is Aa (આ). It is pronounced like "a" in "father".', type: 'text' },
                { _id: '3', title: 'Vowel I (ઇ)', content: 'The third vowel is I (ઇ). It is pronounced like "i" in "bit".', type: 'text' },
            ];
        case 'numbers':
            return [
                { _id: '1', title: 'Number 1 (૧)', content: 'This is the number one in Gujarati: ૧', type: 'text' },
                { _id: '2', title: 'Number 2 (૨)', content: 'This is the number two in Gujarati: ૨', type: 'text' },
                { _id: '3', title: 'Number 3 (૩)', content: 'This is the number three in Gujarati: ૩', type: 'text' },
            ];
        case 'science':
            return [
                { _id: '1', title: 'Parts of a Plant', content: 'Plants have roots, stems, leaves, and flowers. Each part has a special job!', type: 'text' },
                { _id: '2', title: 'Water Cycle', content: 'Water evaporates, forms clouds, and falls as rain in a continuous cycle.', type: 'text' },
            ];
        default:
            return [];
    }
}
