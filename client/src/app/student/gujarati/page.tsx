'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, MessageSquare, Mic, Camera, Grid3x3, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { textToISL, gujaratiToISL } from '@/lib/islDictionary';
import ISLSignDisplay from '@/components/ISLSignDisplay';
import HandTracker from '@/components/HandTracker';

type TabType = 'lessons' | 'alphabet' | 'text-to-sign' | 'sign-to-text' | 'speech-to-sign';

export default function GujaratiModule() {
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
            title: 'Vowel A (અ)',
            content: 'The first vowel in Gujarati is A (અ). It is pronounced like "a" in "about".',
            character: 'અ',
            pronunciation: 'a'
        },
        {
            id: 2,
            title: 'Vowel Aa (આ)',
            content: 'The second vowel is Aa (આ). It is pronounced like "a" in "father".',
            character: 'આ',
            pronunciation: 'aa'
        },
        {
            id: 3,
            title: 'Vowel I (ઇ)',
            content: 'The third vowel is I (ઇ). It is pronounced like "i" in "bit".',
            character: 'ઇ',
            pronunciation: 'i'
        },
        {
            id: 4,
            title: 'Vowel Ee (ઈ)',
            content: 'The fourth vowel is Ee (ઈ). It is pronounced like "ee" in "see".',
            character: 'ઈ',
            pronunciation: 'ee'
        },
        {
            id: 5,
            title: 'Vowel U (ઉ)',
            content: 'The fifth vowel is U (ઉ). It is pronounced like "u" in "put".',
            character: 'ઉ',
            pronunciation: 'u'
        },
    ];

    const gujaratiVowels = ['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'એ', 'ઐ', 'ઓ', 'ઔ', 'અં', 'અઃ'];
    const gujaratiConsonants = ['ક', 'ખ', 'ગ', 'ઘ', 'ચ', 'છ', 'જ', 'ઝ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'વ', 'શ', 'ષ', 'સ', 'હ', 'ળ', 'ક્ષ', 'જ્ઞ'];

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
            recognition.lang = 'gu-IN';
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
                    <h1 className="text-4xl font-bold mb-2 gradient-text">Gujarati Module</h1>
                    <p className="text-lg text-cyan-400">Learn Gujarati with Indian Sign Language</p>
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
                                ? 'bg-gradient-to-r from-cyan- to-teal- text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            Lessons
                        </button>
                        <button
                            onClick={() => setActiveTab('alphabet')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'alphabet'
                                ? 'bg-gradient-to-r from-cyan- to-teal- text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <Grid3x3 className="w-4 h-4" />
                            Alphabet Chart
                        </button>
                        <button
                            onClick={() => setActiveTab('text-to-sign')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'text-to-sign'
                                ? 'bg-gradient-to-r from-cyan- to-teal- text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Text→Sign
                        </button>
                        <button
                            onClick={() => setActiveTab('sign-to-text')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'sign-to-text'
                                ? 'bg-gradient-to-r from-cyan- to-teal- text-slate-100 shadow-lg'
                                : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <Camera className="w-4 h-4" />
                            Sign→Text
                        </button>
                        <button
                            onClick={() => setActiveTab('speech-to-sign')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === 'speech-to-sign'
                                ? 'bg-gradient-to-r from-cyan- to-teal- text-slate-100 shadow-lg'
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
                                                ? 'bg-gradient-to-r from-cyan- to-teal- text-slate-100 shadow-lg'
                                                : 'hover:bg-cyan- text-slate-300'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{lesson.title}</span>
                                                <span className="text-2xl">{lesson.character}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lesson Content */}
                        <div className="lg:col-span-2">
                            <div className="glass rounded-3xl p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-slate-100">{currentLesson.title}</h2>
                                    <div className="text-6xl font-bold gradient-text">{currentLesson.character}</div>
                                </div>

                                <div className="mb-6 p-6 bg-gradient-to-br from-cyan- to-teal- rounded-2xl">
                                    <p className="text-lg text-slate-300 mb-4">{currentLesson.content}</p>
                                    <div className="flex items-center gap-2 text-cyan-">
                                        <Volume2 className="w-5 h-5" />
                                        <span className="font-semibold">Pronunciation: {currentLesson.pronunciation}</span>
                                    </div>
                                </div>

                                {/* ISL Button */}
                                <button
                                    onClick={() => handleShowISL(currentLesson.character)}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all mb-6"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Show in ISL
                                </button>

                                {/* ISL Display */}
                                {showISL && currentText && (
                                    <div className="mt-6">
                                        <ISLSignDisplay signs={gujaratiToISL(currentText)} />
                                    </div>
                                )}

                                {/* Practice Section */}
                                <div className="mt-8 p-6 bg-slate-800 rounded-2xl">
                                    <h3 className="text-xl font-bold mb-4 text-cyan-900">Practice Writing</h3>
                                    <div className="bg-slate-800 rounded-xl p-8 border-2 border-dashed border-cyan-300">
                                        <p className="text-center text-7xl font-bold text-slate-300 select-none">
                                            {currentLesson.character}
                                        </p>
                                        <p className="text-center text-sm text-slate-400 mt-4">
                                            Trace the character above to practice
                                        </p>
                                    </div>
                                </div>

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
                                        className="px-6 py-3 bg-gradient-to-r from-cyan- to-teal- text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                        <h2 className="text-3xl font-bold mb-6 gradient-text">Complete Gujarati Alphabet Chart</h2>
                        <p className="text-cyan-400 mb-6">Click any character to see its ISL sign</p>

                        <h3 className="text-xl font-bold mb-4 text-slate-100">Vowels (સ્વરો)</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 mb-8">
                            {gujaratiVowels.map((char) => (
                                <button
                                    key={char}
                                    onClick={() => handleShowISL(char)}
                                    className="aspect-square glass rounded-2xl flex items-center justify-center hover:shadow-lg transition-all hover:scale-110"
                                >
                                    <span className="text-3xl font-bold gradient-text">{char}</span>
                                </button>
                            ))}
                        </div>

                        <h3 className="text-xl font-bold mb-4 text-slate-100">Consonants (વ્યંજનો)</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 mb-8">
                            {gujaratiConsonants.map((char) => (
                                <button
                                    key={char}
                                    onClick={() => handleShowISL(char)}
                                    className="aspect-square glass rounded-2xl flex items-center justify-center hover:shadow-lg transition-all hover:scale-110"
                                >
                                    <span className="text-3xl font-bold gradient-text">{char}</span>
                                </button>
                            ))}
                        </div>

                        {showISL && currentText && (
                            <ISLSignDisplay signs={gujaratiToISL(currentText)} />
                        )}
                    </div>
                )}

                {activeTab === 'text-to-sign' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6 gradient-text">Enter Gujarati Text</h2>
                            <textarea
                                value={inputText}
                                onChange={(e) => handleTextConversion(e.target.value)}
                                placeholder="ગુજરાતી લખો..."
                                className="w-full h-40 px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan- focus:ring-4 focus:ring-cyan- transition-all resize-none mb-4"
                            />
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-slate-300">Quick Phrases:</p>
                                <div className="flex flex-wrap gap-2">
                                    {['નમસ્તે', 'આભાર', 'શુભ પ્રભાત', 'તમે કેમ છો?', 'મારું નામ'].map((phrase) => (
                                        <button
                                            key={phrase}
                                            onClick={() => handleTextConversion(phrase)}
                                            className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:bg-gradient-to-r hover:from-cyan- hover:to-teal- hover:text-slate-100 transition-all"
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
                                <ISLSignDisplay signs={gujaratiToISL(inputText)} autoPlay={false} />
                            ) : (
                                <div className="h-40 flex items-center justify-center bg-gradient-to-br from-cyan- to-teal- rounded-xl">
                                    <p className="text-slate-400">Type Gujarati text to see ISL signs</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'sign-to-text' && (
                    <div className="glass rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-6 gradient-text">Real-time Sign Recognition</h2>
                        <p className="text-cyan-400 mb-6">
                            Show hand signs to the camera. Our AI will recognize and convert them to Gujarati text.
                        </p>
                        <HandTracker language="gujarati" />
                    </div>
                )}

                {activeTab === 'speech-to-sign' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6 gradient-text">Speak in Gujarati</h2>
                            <div className="h-40 flex items-center justify-center bg-gradient-to-br from-cyan- to-teal- rounded-xl mb-4">
                                <button
                                    onClick={handleSpeechToText}
                                    className={`p-8 rounded-full transition-all duration-300 ${isListening
                                        ? 'bg-slate-8000 text-slate-100 animate-pulse scale-110'
                                        : 'bg-slate-800 text-cyan- hover:scale-110'
                                        } shadow-xl`}
                                >
                                    <Mic className="w-12 h-12" />
                                </button>
                            </div>
                            <button
                                onClick={handleSpeechToText}
                                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all ${isListening
                                    ? 'bg-gradient-to-r from-red-500 to-teal- text-slate-100'
                                    : 'bg-gradient-to-r from-cyan- to-teal- text-slate-100 hover:shadow-lg hover:scale-105'
                                    }`}
                            >
                                <Mic className="w-5 h-5" />
                                {isListening ? 'સાંભળી રહ્યા છીએ...' : 'બોલવાનું શરૂ કરો'}
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
                                <ISLSignDisplay signs={gujaratiToISL(inputText)} autoPlay={true} />
                            ) : (
                                <div className="h-40 flex items-center justify-center bg-gradient-to-br from-cyan- to-teal- rounded-xl">
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
