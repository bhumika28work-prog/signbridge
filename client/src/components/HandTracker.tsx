'use client';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { motion } from 'framer-motion';
import { Trash2, RefreshCw, Camera } from 'lucide-react';

export default function HandTracker({ language = 'english' }: { language?: 'english' | 'gujarati' }) {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
    const [webcamRunning, setWebcamRunning] = useState(false);
    const [handsDetected, setHandsDetected] = useState(0);
    const [recognizedText, setRecognizedText] = useState('');
    const [currentLetter, setCurrentLetter] = useState('');
    const [confidence, setConfidence] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const lastRecognitionTime = useRef(0);
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const createHandLandmarker = async () => {
            try {
                console.log("Loading MediaPipe HandLandmarker...");
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
                );
                const landmarker = await HandLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                        delegate: "GPU"
                    },
                    runningMode: "VIDEO",
                    numHands: 2,
                    minHandDetectionConfidence: 0.5,
                    minHandPresenceConfidence: 0.5,
                    minTrackingConfidence: 0.5
                });
                console.log("HandLandmarker loaded successfully!");
                setHandLandmarker(landmarker);
                setLoading(false);
            } catch (error: any) {
                console.error("Error loading hand landmarker:", error);
                setError(error.message || "Failed to load hand tracking model");
                setLoading(false);
            }
        };
        createHandLandmarker();
    }, []);

    const enableCam = () => {
        if (!handLandmarker) {
            console.log("Wait! handLandmarker not loaded yet.");
            return;
        }
        setWebcamRunning(!webcamRunning);
    };

    // Improved finger detection logic
    const isFingerExtended = (hand: any[], fingerName: string) => {
        const wrist = hand[0];
        let tip, pip, mcp;

        switch (fingerName) {
            case 'thumb': tip = hand[4]; pip = hand[3]; mcp = hand[2]; break;
            case 'index': tip = hand[8]; pip = hand[6]; mcp = hand[5]; break;
            case 'middle': tip = hand[12]; pip = hand[10]; mcp = hand[9]; break;
            case 'ring': tip = hand[16]; pip = hand[14]; mcp = hand[13]; break;
            case 'pinky': tip = hand[20]; pip = hand[18]; mcp = hand[17]; break;
            default: return false;
        }

        if (fingerName === 'thumb') {
            // Thumb is extended if tip is far from pinky base
            const pinkyBase = hand[17];
            const dist = Math.hypot(tip.x - pinkyBase.x, tip.y - pinkyBase.y);
            const baseDist = Math.hypot(mcp.x - pinkyBase.x, mcp.y - pinkyBase.y);
            return dist > baseDist * 1.2;
        } else {
            // Other fingers: Tip should be further from wrist than PIP
            const tipDist = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
            const pipDist = Math.hypot(pip.x - wrist.x, pip.y - wrist.y);
            return tipDist > pipDist * 1.1;
        }
    };

    const recognizeGesture = (landmarks: any[]) => {
        const hand = landmarks[0];
        const thumb = isFingerExtended(hand, 'thumb');
        const index = isFingerExtended(hand, 'index');
        const middle = isFingerExtended(hand, 'middle');
        const ring = isFingerExtended(hand, 'ring');
        const pinky = isFingerExtended(hand, 'pinky');

        const extendedCount = [index, middle, ring, pinky].filter(Boolean).length;
        const allExtended = thumb && extendedCount === 4;

        let letter = '';
        let conf = 0.0;

        // --- NUMBER LOGIC (0-9) ---
        if (!thumb && !index && !middle && !ring && !pinky) { letter = '0'; conf = 0.9; } // Fist
        else if (!thumb && index && !middle && !ring && !pinky) { letter = '1'; conf = 0.9; }
        else if (!thumb && index && middle && !ring && !pinky) { letter = '2'; conf = 0.9; }
        else if (thumb && index && middle && !ring && !pinky) { letter = '3'; conf = 0.85; } // ASL 3
        else if (!thumb && index && middle && ring && !pinky) { letter = '6'; conf = 0.8; } // W/6
        else if (!thumb && index && middle && ring && pinky) { letter = '4'; conf = 0.9; }
        else if (allExtended) { letter = '5'; conf = 0.9; }

        // --- LETTER LOGIC (Overrides if more specific) ---
        if (thumb && !index && !middle && !ring && !pinky) { letter = 'A'; conf = 0.95; } // Thumbs up
        else if (!thumb && index && middle && ring && pinky) { letter = 'B'; conf = 0.9; }
        else if (!thumb && !index && !middle && !ring && pinky) { letter = 'I'; conf = 0.95; }
        else if (thumb && index && !middle && !ring && !pinky) { letter = 'L'; conf = 0.95; }
        else if (thumb && !index && !middle && !ring && pinky) { letter = 'Y'; conf = 0.95; }
        else if (!thumb && index && middle && !ring && pinky) { letter = 'F'; conf = 0.9; } // OK Sign approx
        else if (thumb && index && !middle && !ring && !pinky) { letter = 'L'; conf = 0.95; }
        else if (!thumb && index && !middle && !ring && pinky) { letter = 'I'; conf = 0.9; } // I/J start
        else if (thumb && index && middle && !ring && !pinky) { letter = 'V'; conf = 0.9; } // V
        else if (!thumb && index && middle && ring && !pinky) { letter = 'W'; conf = 0.9; } // W
        else if (thumb && !index && !middle && !ring && !pinky) { letter = 'S'; conf = 0.9; } // S (Fist with thumb over) - Hard to distinguish from A/0 without depth

        // --- MAPPING LOGIC ---
        let displayChar = letter;

        if (language === 'gujarati') {
            const gujaratiMap: Record<string, string> = {
                'A': 'અ', 'B': 'બ', 'C': 'ક', 'D': 'ડ', 'E': 'ઇ',
                'F': 'ફ', 'G': 'ગ', 'H': 'હ', 'I': 'ઇ', 'J': 'જ',
                'K': 'ક', 'L': 'લ', 'M': 'મ', 'N': 'ન', 'O': 'ઓ',
                'P': 'પ', 'Q': 'ક', 'R': 'ર', 'S': 'સ', 'T': 'ત',
                'U': 'ઉ', 'V': 'વ', 'W': 'વ', 'X': 'ક્ષ', 'Y': 'ય', 'Z': 'ઝ',
                '0': '૦', '1': '૧', '2': '૨', '3': '૩', '4': '૪', '5': '૫',
                '6': '૬', '7': '૭', '8': '૮', '9': '૯'
            };
            if (gujaratiMap[letter]) {
                displayChar = gujaratiMap[letter];
            }
        }

        return { letter: displayChar, confidence: conf };
    };

    const predictWebcam = () => {
        if (webcamRef.current && webcamRef.current.video && canvasRef.current && handLandmarker) {
            const video = webcamRef.current.video;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            if (video.currentTime > 0 && !video.paused && !video.ended) {
                const startTimeMs = performance.now();
                const results = handLandmarker.detectForVideo(video, startTimeMs);

                ctx?.clearRect(0, 0, canvas.width, canvas.height);

                if (results.landmarks && results.landmarks.length > 0) {
                    setHandsDetected(results.landmarks.length);

                    for (const landmarks of results.landmarks) {
                        drawConnectors(ctx, landmarks, HandLandmarker.HAND_CONNECTIONS, {
                            color: "#a855f7",
                            lineWidth: 5
                        });
                        drawLandmarks(ctx, landmarks, { color: "#ec4899", lineWidth: 3 });
                    }

                    const { letter, confidence: conf } = recognizeGesture(results.landmarks);

                    if (letter && conf > 0.5) {
                        setCurrentLetter(letter);
                        setConfidence(conf);

                        const now = Date.now();
                        if (now - lastRecognitionTime.current > 1000) {
                            setRecognizedText(prev => prev + letter);
                            lastRecognitionTime.current = now;
                        }
                    } else {
                        setCurrentLetter('');
                        setConfidence(0);
                    }
                } else {
                    setHandsDetected(0);
                    setCurrentLetter('');
                    setConfidence(0);
                }
            }
        }
        if (webcamRunning) {
            requestRef.current = requestAnimationFrame(predictWebcam);
        }
    };

    useEffect(() => {
        if (webcamRunning) {
            requestRef.current = requestAnimationFrame(predictWebcam);
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [webcamRunning]);

    const clearText = () => {
        setRecognizedText('');
        setCurrentLetter('');
        setConfidence(0);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 glass rounded-2xl">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-semibold text-slate-300">Loading AI Model...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-800 rounded-2xl border-2 border-red-200">
                <p className="text-lg font-bold text-red-600 mb-2">Error Loading Model</p>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-slate-100 rounded-xl hover:bg-red-700 transition-all"
                >
                    <RefreshCw className="w-5 h-5" />
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {webcamRunning && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl p-6 border border-white/5"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold gradient-text">Recognized Text</h3>
                        <button
                            onClick={clearText}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/5"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear
                        </button>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10 min-h-24 flex items-center">
                        <p className="text-3xl font-bold text-slate-100 tracking-wide">
                            {recognizedText || <span className="text-slate-500 text-xl font-normal italic">Make a sign to start...</span>}
                        </p>
                    </div>
                    {currentLetter && (
                        <div className="mt-4 flex items-center gap-4 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-cyan-400">Current Sign:</span>
                                <span className="text-4xl font-bold gradient-text">{currentLetter}</span>
                            </div>
                            <div className="w-px h-8 bg-white/10"></div>
                            <div className="flex items-center gap-3 flex-1">
                                <span className="text-sm font-semibold text-cyan-400">Confidence:</span>
                                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
                                        style={{ width: `${confidence * 100}%` }}
                                    />
                                </div>
                                <span className="text-sm font-bold text-slate-100">{Math.round(confidence * 100)}%</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-video border border-white/10 group">
                {webcamRunning ? (
                    <>
                        <Webcam
                            ref={webcamRef}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            mirrored
                        />
                        <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            width={640}
                            height={480}
                        />
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            <div className="glass px-4 py-2 rounded-xl backdrop-blur-md bg-slate-900/50 border border-white/10">
                                <p className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${handsDetected > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {handsDetected > 0 ? `${handsDetected} Hand${handsDetected > 1 ? 's' : ''} Detected` : 'No Hands Detected'}
                                </p>
                            </div>
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                        </div>

                        {/* Stop Button Overlay (visible on hover) */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={enableCam}
                                className="px-6 py-3 bg-red-500/90 hover:bg-red-600 text-white rounded-xl font-bold backdrop-blur-sm transition-all shadow-lg flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Stop Camera
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center z-10 p-8"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-white">Ready to Practice?</h3>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                Position yourself in good lighting. We'll recognize your hand gestures and convert them to text instantly.
                            </p>

                            <button
                                onClick={enableCam}
                                disabled={loading}
                                className={`px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 flex items-center gap-3 mx-auto ${loading
                                        ? 'bg-slate-700 cursor-wait'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                        Loading AI Model...
                                    </>
                                ) : (
                                    <>
                                        <Camera className="w-5 h-5" />
                                        Start Camera
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>

            {!webcamRunning && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
                >
                    <h4 className="font-bold text-slate-200 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs">i</span>
                        How to Use
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-3 text-slate-400 text-sm">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            Position hand clearly in frame
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            Ensure good lighting
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            Hold sign steady for 1 second
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            Recognizes: 0-9, A-Z
                        </li>
                    </ul>
                </motion.div>
            )}

            {webcamRunning && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl p-6 border border-white/5"
                >
                    <h4 className="font-bold text-slate-100 mb-4">Supported Signs</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-white/5">
                            <p className="text-2xl font-bold gradient-text mb-1">0-9</p>
                            <p className="text-xs text-slate-400">Numbers</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-white/5">
                            <p className="text-2xl font-bold gradient-text mb-1">A-Z</p>
                            <p className="text-xs text-slate-400">Alphabets</p>
                        </div>
                        {language === 'gujarati' && (
                            <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-white/5">
                                <p className="text-2xl font-bold gradient-text mb-1">અ-જ્ઞ</p>
                                <p className="text-xs text-slate-400">Gujarati</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function drawConnectors(ctx: CanvasRenderingContext2D | null, landmarks: any[], connections: any[], style: any) {
    if (!ctx) return;
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;
    for (const connection of connections) {
        const start = landmarks[connection.start];
        const end = landmarks[connection.end];
        ctx.beginPath();
        ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
        ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
        ctx.stroke();
    }
}

function drawLandmarks(ctx: CanvasRenderingContext2D | null, landmarks: any[], style: any) {
    if (!ctx) return;
    ctx.fillStyle = style.color;
    for (const landmark of landmarks) {
        ctx.beginPath();
        ctx.arc(landmark.x * ctx.canvas.width, landmark.y * ctx.canvas.height, style.lineWidth, 0, 2 * Math.PI);
        ctx.fill();
    }
}
