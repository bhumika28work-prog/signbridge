'use client';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { motion } from 'framer-motion';
import { Trash2, RefreshCw } from 'lucide-react';

export default function HandTracker() {
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
    const isFingerExtended = (hand: any[], base: number, tip: number) => {
        const wrist = hand[0];
        const fingerTip = hand[tip];
        const fingerBase = hand[base];

        // Calculate distance from wrist
        const tipDist = Math.hypot(fingerTip.x - wrist.x, fingerTip.y - wrist.y);
        const baseDist = Math.hypot(fingerBase.x - wrist.x, fingerBase.y - wrist.y);

        return tipDist > baseDist;
    };

    const recognizeGesture = (landmarks: any[]) => {
        const hand = landmarks[0];

        // Check each finger
        const thumb = isFingerExtended(hand, 2, 4);
        const index = isFingerExtended(hand, 5, 8);
        const middle = isFingerExtended(hand, 9, 12);
        const ring = isFingerExtended(hand, 13, 16);
        const pinky = isFingerExtended(hand, 17, 20);

        const extendedCount = [thumb, index, middle, ring, pinky].filter(Boolean).length;

        // Debug log
        // console.log("Fingers:", { thumb, index, middle, ring, pinky }, "Count:", extendedCount);

        let letter = '';
        let conf = 0.0;

        // Simple Logic for Numbers
        if (extendedCount === 0) { letter = '0'; conf = 0.9; }
        else if (extendedCount === 1 && index) { letter = '1'; conf = 0.9; }
        else if (extendedCount === 2 && index && middle) { letter = '2'; conf = 0.9; }
        else if (extendedCount === 3 && index && middle && ring) { letter = '3'; conf = 0.9; }
        else if (extendedCount === 4 && index && middle && ring && pinky) { letter = '4'; conf = 0.9; }
        else if (extendedCount === 5) { letter = '5'; conf = 0.9; }

        // Simple Logic for Letters
        else if (extendedCount === 1 && thumb) { letter = 'A'; conf = 0.8; } // Thumbs up
        else if (extendedCount === 4 && !thumb) { letter = 'B'; conf = 0.8; } // Open palm, thumb in

        return { letter, confidence: conf };
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
                    className="glass rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold gradient-text">Recognized Text</h3>
                        <button
                            onClick={clearText}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-8000 text-slate-100 rounded-xl hover:bg-red-600 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear
                        </button>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-6 border-2 border-purple-200 min-h-24">
                        <p className="text-3xl font-bold text-slate-100">
                            {recognizedText || <span className="text-slate-300">Make a sign to start...</span>}
                        </p>
                    </div>
                    {currentLetter && (
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-cyan-400">Current Sign:</span>
                                <span className="text-4xl font-bold gradient-text">{currentLetter}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-cyan-400">Confidence:</span>
                                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                                        style={{ width: `${confidence * 100}%` }}
                                    />
                                </div>
                                <span className="text-sm font-bold text-slate-100">{Math.round(confidence * 100)}%</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}

            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-video">
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
                            <div className="glass px-4 py-2 rounded-xl">
                                <p className="text-sm font-semibold text-slate-100">
                                    {handsDetected > 0 ? `${handsDetected} Hand${handsDetected > 1 ? 's' : ''} Detected` : 'No Hands Detected'}
                                </p>
                            </div>
                            <div className="w-3 h-3 bg-slate-8000 rounded-full animate-pulse"></div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-100 p-8">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Camera Ready</h3>
                            <p className="text-slate-400">Click the button below to start practicing</p>
                        </motion.div>
                    </div>
                )}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={enableCam}
                    className={`flex-1 px-8 py-4 rounded-xl font-bold text-slate-100 transition-all duration-300 hover:scale-105 ${webcamRunning
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg animate-glow'
                        }`}
                >
                    {webcamRunning ? "Stop Practice" : "Start Camera Practice"}
                </button>
            </div>

            {!webcamRunning && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200"
                >
                    <h4 className="font-bold text-blue-900 mb-3">📋 How to Use Sign Recognition</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Position your hand clearly in front of the camera</li>
                        <li>• Ensure good lighting for better detection</li>
                        <li>• Hold each sign steady for 1 second to add it to text</li>
                        <li>• Currently recognizes: Numbers (0-5) and some letters (A, B)</li>
                        <li>• Watch the confidence meter to see detection accuracy</li>
                    </ul>
                </motion.div>
            )}

            {webcamRunning && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl p-6"
                >
                    <h4 className="font-bold text-slate-100 mb-3">✋ Supported Signs</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-slate-800 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold gradient-text mb-1">0-5</p>
                            <p className="text-xs text-cyan-400">Numbers</p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold gradient-text mb-1">A</p>
                            <p className="text-xs text-cyan-400">Thumbs Up</p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold gradient-text mb-1">B</p>
                            <p className="text-xs text-cyan-400">Open Palm</p>
                        </div>
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
