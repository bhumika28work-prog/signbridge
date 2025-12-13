'use client';
import { useState } from 'react';
import HandTracker from '@/components/HandTracker';
import ISLSignDisplay from '@/components/ISLSignDisplay';
import { Mic, Sparkles, Zap, Camera, MessageSquare, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { textToISL, gujaratiToISL, ISLSign } from '@/lib/islDictionary';

export default function PracticePage() {
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [activeTab, setActiveTab] = useState<'text' | 'speech' | 'gujarati' | 'camera'>('text');
    const [islSigns, setIslSigns] = useState<ISLSign[]>([]);

    const handleTextConversion = (text: string) => {
        setInputText(text);
        if (activeTab === 'gujarati') {
            setIslSigns(gujaratiToISL(text));
        } else {
            setIslSigns(textToISL(text));
        }
    };

    const handleSpeechToText = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = activeTab === 'gujarati' ? 'gu-IN' : 'en-US';
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
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Zap className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">Indian Sign Language Converter</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
                        <span className="gradient-text">ISL Practice Lab</span>
                    </h1>
                    <p className="text-xl text-cyan-400 max-w-2xl mx-auto">
                        Convert text, speech, and Gujarati to Indian Sign Language with real-time visualization
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex justify-center mb-12"
                >
                    <div className="glass rounded-2xl p-2 inline-flex gap-2 flex-wrap">
                        <button
                            onClick={() => setActiveTab('text')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'text'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 shadow-lg'
                                    : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <MessageSquare className="w-5 h-5" />
                            English Text
                        </button>
                        <button
                            onClick={() => setActiveTab('speech')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'speech'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 shadow-lg'
                                    : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <Mic className="w-5 h-5" />
                            English Speech
                        </button>
                        <button
                            onClick={() => setActiveTab('gujarati')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'gujarati'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 shadow-lg'
                                    : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <Languages className="w-5 h-5" />
                            Gujarati
                        </button>
                        <button
                            onClick={() => setActiveTab('camera')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'camera'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 shadow-lg'
                                    : 'text-cyan-400 hover:bg-slate-700/50'
                                }`}
                        >
                            <Camera className="w-5 h-5" />
                            Hand Tracking
                        </button>
                    </div>
                </motion.div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Panel - Input */}
                    {activeTab !== 'camera' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <div className="glass rounded-3xl p-8">
                                <h2 className="text-2xl font-bold mb-6 gradient-text">
                                    {activeTab === 'text' && 'Enter English Text'}
                                    {activeTab === 'speech' && 'Speak in English'}
                                    {activeTab === 'gujarati' && 'Enter Gujarati Text'}
                                </h2>

                                <div className="space-y-4">
                                    {activeTab === 'text' || activeTab === 'gujarati' ? (
                                        <textarea
                                            value={inputText}
                                            onChange={(e) => handleTextConversion(e.target.value)}
                                            placeholder={activeTab === 'gujarati' ? 'ગુજરાતી લખો...' : 'Type any text to convert to ISL...'}
                                            className="w-full h-40 px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none"
                                        />
                                    ) : (
                                        <div className="h-40 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                                            <button
                                                onClick={handleSpeechToText}
                                                className={`p-8 rounded-full transition-all duration-300 ${isListening
                                                        ? 'bg-slate-8000 text-slate-100 animate-pulse scale-110'
                                                        : 'bg-slate-800 text-purple-600 hover:scale-110'
                                                    } shadow-xl`}
                                            >
                                                <Mic className="w-12 h-12" />
                                            </button>
                                        </div>
                                    )}

                                    {activeTab === 'speech' && (
                                        <button
                                            onClick={handleSpeechToText}
                                            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${isListening
                                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-slate-100'
                                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 hover:shadow-lg hover:scale-105'
                                                }`}
                                        >
                                            <Mic className="w-5 h-5" />
                                            {isListening ? 'Listening...' : 'Start Speaking'}
                                        </button>
                                    )}

                                    {inputText && (
                                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                            <p className="text-sm font-semibold text-green-700 mb-1">Detected Text:</p>
                                            <p className="text-lg text-green-900">{inputText}</p>
                                            <p className="text-sm text-green-600 mt-2">
                                                {islSigns.length} ISL sign{islSigns.length !== 1 ? 's' : ''} generated
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Phrases */}
                                <div className="mt-6">
                                    <p className="text-sm font-semibold text-slate-300 mb-3">Quick Phrases:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(activeTab === 'gujarati'
                                            ? ['નમસ્તે', 'આભાર', 'શુભ પ્રભાત', 'તમે કેમ છો?']
                                            : ['Hello', 'Thank you', 'Good morning', 'How are you?']
                                        ).map((phrase) => (
                                            <button
                                                key={phrase}
                                                onClick={() => handleTextConversion(phrase)}
                                                className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-slate-100 transition-all duration-300"
                                            >
                                                {phrase}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Right Panel - ISL Output/Camera */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className={activeTab === 'camera' ? 'lg:col-span-2' : ''}
                    >
                        <div className="glass rounded-3xl p-8">
                            {activeTab === 'camera' ? (
                                <>
                                    <h2 className="text-2xl font-bold mb-6 gradient-text">Real-time Hand Tracking</h2>
                                    <p className="text-cyan-400 mb-6">
                                        Practice your ISL signs in front of the camera. Our AI will detect your hand movements and provide instant feedback.
                                    </p>
                                    <HandTracker />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold mb-6 gradient-text">Indian Sign Language</h2>
                                    <ISLSignDisplay signs={islSigns} autoPlay={false} speed={1500} />
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Info Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        {
                            icon: Languages,
                            title: 'Multi-Language Support',
                            description: 'Convert English and Gujarati text/speech to ISL',
                            gradient: 'from-purple-500 to-pink-500'
                        },
                        {
                            icon: Sparkles,
                            title: 'Fingerspelling',
                            description: 'Automatic character-by-character sign conversion',
                            gradient: 'from-cyan-500 to-cyan-500'
                        },
                        {
                            icon: Camera,
                            title: 'Practice Mode',
                            description: 'Real-time hand tracking for sign practice',
                            gradient: 'from-green-500 to-emerald-500'
                        }
                    ].map((card, index) => (
                        <div key={index} className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.gradient} mb-4`}>
                                <card.icon className="w-6 h-6 text-slate-100" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                            <p className="text-cyan-400 text-sm">{card.description}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-8 glass rounded-2xl p-6"
                >
                    <h3 className="font-bold text-lg mb-4 gradient-text">📝 How to Add Real ISL Images</h3>
                    <div className="space-y-2 text-cyan-400 text-sm">
                        <p>1. Create folders: <code className="bg-slate-800 px-2 py-1 rounded">public/isl/alphabet/</code>, <code className="bg-slate-800 px-2 py-1 rounded">public/isl/numbers/</code>, <code className="bg-slate-800 px-2 py-1 rounded">public/isl/words/</code></p>
                        <p>2. Add ISL sign images (PNG/JPG) named as: a.png, b.png, 1.png, 2.png, hello.png, etc.</p>
                        <p>3. The app will automatically display them instead of placeholders</p>
                        <p>4. You can download free ISL images from: <a href="https://www.indiansignlanguage.org/" target="_blank" className="text-purple-600 hover:underline">Indian Sign Language Research</a></p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
