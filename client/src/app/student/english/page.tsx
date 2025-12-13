'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, MessageSquare, Mic, Camera, Grid3x3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { textToISL } from '@/lib/islDictionary';
import ISLSignDisplay from '@/components/ISLSignDisplay';
import HandTracker from '@/components/HandTracker';

type TabType = 'lessons' | 'alphabet' | 'text-to-sign' | 'sign-to-text' | 'speech-to-sign';

export default function EnglishModule() {
    const router = useRouter();
    const { user } = useStore();
    const [activeTab, setActiveTab] = useState<TabType>('lessons');
    const [selectedLesson, setSelectedLesson] = useState(0);
    const [showISL, setShowISL] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!user || user.role !== 'student') {
            router.push('/login');
        }
    }, [user, router]);

    if (!user || user.role !== 'student') return null;

    const lessons = [
        {
            id: 1,
            title: 'Letters A-E',
            content: 'Learn the first five letters of the English alphabet with ISL signs.',
            characters: ['A', 'B', 'C', 'D', 'E'],
            words: ['Apple', 'Ball', 'Cat', 'Dog', 'Elephant']
        },
        {
            id: 2,
            title: 'Letters F-J',
            content: 'Continue learning with letters F through J.',
            characters: ['F', 'G', 'H', 'I', 'J'],
            words: ['Fish', 'Goat', 'Hat', 'Ice', 'Jug']
        },
        {
            id: 3,
            title: 'Letters K-O',
            content: 'Practice letters K through O with common words.',
            characters: ['K', 'L', 'M', 'N', 'O'],
            words: ['Kite', 'Lion', 'Mango', 'Nest', 'Orange']
        },
        {
            id: 4,
            title: 'Letters P-T',
            content: 'Learn letters P through T.',
            characters: ['P', 'Q', 'R', 'S', 'T'],
            words: ['Pen', 'Queen', 'Rat', 'Sun', 'Tree']
        },
        {
            id: 5,
            title: 'Letters U-Z',
            content: 'Complete the alphabet with letters U through Z.',
            characters: ['U', 'V', 'W', 'X', 'Y', 'Z'],
            words: ['Umbrella', 'Van', 'Water', 'Box', 'Yellow', 'Zebra']
        },
    ];

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const currentLesson = lessons[selectedLesson];

    const handleShowISL = (text: string) => {
        setCurrentText(text);
        setShowISL(true);
    };

    const handleTextConversion = (text: string) => {
        setInputText(text);
        setCurrentText(text);
        setShowISL(true);
    };

    const handleSpeechToText = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                handleTextConversion(transcript);
            };

            recognition.start();
        } else {
            alert("Speech recognition not supported in this browser.");
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/student" className="inline-flex items-center gap-2 text-cyan- hover:text-cyan- font-medium mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2 gradient-text">English Module</h1>
                    <p className="text-lg text-cyan-400">Learn English with Indian Sign Language</p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="glass rounded-2xl p-2 inline-flex gap-2 flex-wrap">
                        <button
                            onClick={() => setActiveTab('lessons')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'lessons'
                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            Lessons
                        </button>
                        <button
                            onClick={() => setActiveTab('alphabet')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'alphabet'
                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <Grid3x3 className="w-4 h-4" />
                            A-Z Chart
                        </button>
                        <button
                            onClick={() => setActiveTab('text-to-sign')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'text-to-sign'
                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Text→Sign
                        </button>
                        <button
                            onClick={() => setActiveTab('sign-to-text')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'sign-to-text'
                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <Camera className="w-4 h-4" />
                            Sign→Text
                        </button>
                        <button
                            onClick={() => setActiveTab('speech-to-sign')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'speech-to-sign'
                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <Mic className="w-4 h-4" />
                            Speech→Sign
                        </button>
                    </div>
                </motion.div>

                {/* Tab Content */}
                {activeTab === 'lessons' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Lesson List */}
                        <div className="lg:col-span-1">
                            <div className="glass rounded-3xl p-6 sticky top-24">
                                <h2 className="text-xl font-bold mb-4 text-slate-100">Lessons</h2>
                                <div className="space-y-2">
                                    {lessons.map((lesson, index) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => setSelectedLesson(index)}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedLesson === index
                                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 shadow-lg'
                                                : 'hover:bg-slate-800 text-slate-300'
                                                }`}
                                        >
                                            <span className="font-medium">{lesson.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lesson Content */}
                        <div className="lg:col-span-2">
                            <div className="glass rounded-3xl p-8">
                                <h2 className="text-3xl font-bold text-slate-100 mb-6">{currentLesson.title}</h2>
                                <div className="mb-6 p-6 bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-2xl">
                                    <p className="text-lg text-slate-300">{currentLesson.content}</p>
                                </div>

                                {/* Letters Grid */}
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-8">
                                    {currentLesson.characters.map((char, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleShowISL(char)}
                                            className="aspect-square glass rounded-2xl flex flex-col items-center justify-center hover:shadow-lg transition-all group"
                                        >
                                            <span className="text-4xl font-bold gradient-text mb-2">{char}</span>
                                            <span className="text-xs text-cyan-400 group-hover:text-cyan-600 transition-colors">
                                                Show ISL
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Words Section */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-4 text-slate-100">Practice Words</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {currentLesson.words.map((word, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleShowISL(word)}
                                                className="flex items-center justify-between p-4 glass rounded-xl hover:shadow-lg transition-all group"
                                            >
                                                <span className="font-semibold text-slate-100">{word}</span>
                                                <BookOpen className="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* ISL Display */}
                                {showISL && currentText && (
                                    <div className="mt-6">
                                        <ISLSignDisplay signs={textToISL(currentText)} />
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between mt-8">
                                    <button
                                        onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
                                        disabled={selectedLesson === 0}
                                        className="px-6 py-3 glass font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setSelectedLesson(Math.min(lessons.length - 1, selectedLesson + 1))}
                                        disabled={selectedLesson === lessons.length - 1}
                                        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'alphabet' && (
                    <div className="glass rounded-3xl p-8">
                        <h2 className="text-3xl font-bold mb-6 gradient-text">Complete A-Z Alphabet Chart</h2>
                        <p className="text-cyan-400 mb-8">Click any letter to see its ISL sign</p>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-8">
                            {alphabet.map((letter) => (
                                <button
                                    key={letter}
                                    onClick={() => handleShowISL(letter)}
                                    className="aspect-square glass rounded-2xl flex items-center justify-center hover:shadow-lg transition-all hover:scale-110 group"
                                >
                                    <span className="text-3xl font-bold gradient-text">{letter}</span>
                                </button>
                            ))}
                        </div>
                        {showISL && currentText && (
                            <ISLSignDisplay signs={textToISL(currentText)} />
                        )}
                    </div>
                )}

                {activeTab === 'text-to-sign' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6 gradient-text">Enter English Text</h2>
                            <textarea
                                value={inputText}
                                onChange={(e) => handleTextConversion(e.target.value)}
                                placeholder="Type any English text to convert to ISL..."
                                className="w-full h-40 px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all resize-none mb-4"
                            />
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-slate-300">Quick Phrases:</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Hello', 'Thank you', 'Good morning', 'How are you?', 'My name is'].map((phrase) => (
                                        <button
                                            key={phrase}
                                            onClick={() => handleTextConversion(phrase)}
                                            className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-cyan-600 hover:text-slate-100 transition-all"
                                        >
                                            {phrase}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6 gradient-text">ISL Signs</h2>
                            {inputText ? (
                                <ISLSignDisplay signs={textToISL(inputText)} autoPlay={false} />
                            ) : (
                                <div className="h-40 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-xl">
                                    <p className="text-slate-400">Type text to see ISL signs</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'sign-to-text' && (
                    <div className="glass rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-6 gradient-text">Real-time Sign Recognition</h2>
                        <p className="text-cyan-400 mb-6">
                            Show hand signs to the camera. Our AI will recognize and convert them to text.
                        </p>
                        <HandTracker language="english" />
                    </div>
                )}

                {activeTab === 'speech-to-sign' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6 gradient-text">Speak in English</h2>
                            <div className="h-40 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-xl mb-4">
                                <button
                                    onClick={handleSpeechToText}
                                    className={`p-8 rounded-full transition-all duration-300 ${isListening
                                        ? 'bg-slate-8000 text-slate-100 animate-pulse scale-110'
                                        : 'bg-slate-800 text-cyan-600 hover:scale-110'
                                        } shadow-xl`}
                                >
                                    <Mic className="w-12 h-12" />
                                </button>
                            </div>
                            <button
                                onClick={handleSpeechToText}
                                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all ${isListening
                                    ? 'bg-gradient-to-r from-red-500 to-teal- text-slate-100'
                                    : 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-slate-100 hover:shadow-lg hover:scale-105'
                                    }`}
                            >
                                <Mic className="w-5 h-5" />
                                {isListening ? 'Listening...' : 'Start Speaking'}
                            </button>
                            {inputText && (
                                <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                    <p className="text-sm font-semibold text-green-700 mb-1">Detected Speech:</p>
                                    <p className="text-lg text-green-900">{inputText}</p>
                                </div>
                            )}
                        </div>
                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6 gradient-text">ISL Signs</h2>
                            {inputText ? (
                                <ISLSignDisplay signs={textToISL(inputText)} autoPlay={true} />
                            ) : (
                                <div className="h-40 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-xl">
                                    <p className="text-slate-400">Speak to see ISL signs</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
