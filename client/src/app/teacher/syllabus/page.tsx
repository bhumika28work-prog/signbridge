'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Save, X, BookOpen, Video, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeacherSyllabus() {
    const router = useRouter();
    const { user } = useStore();
    const [isAdding, setIsAdding] = useState(false);
    const [activeModule, setActiveModule] = useState('English');

    // Mock Data
    const [lessons, setLessons] = useState([
        { id: 1, title: 'Introduction to Alphabets', module: 'English', type: 'Video', duration: '10 mins' },
        { id: 2, title: 'Basic Greetings', module: 'English', type: 'Text', duration: '15 mins' },
        { id: 3, title: 'Vowels and Consonants', module: 'Gujarati', type: 'Video', duration: '12 mins' },
        { id: 4, title: 'Numbers 1-10', module: 'Maths', type: 'Interactive', duration: '20 mins' },
        { id: 5, title: 'Parts of Plants', module: 'Science', type: 'Video', duration: '15 mins' },
    ]);

    const [newLesson, setNewLesson] = useState({ title: '', module: 'English', type: 'Video', duration: '' });

    useEffect(() => {
        if (!user || user.role !== 'teacher') {
            router.push('/login');
        }
    }, [user, router]);

    if (!user || user.role !== 'teacher') return null;

    const handleAddLesson = () => {
        if (newLesson.title && newLesson.duration) {
            setLessons([...lessons, { ...newLesson, id: Date.now() }]);
            setNewLesson({ title: '', module: 'English', type: 'Video', duration: '' });
            setIsAdding(false);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this lesson?')) {
            setLessons(lessons.filter(l => l.id !== id));
        }
    };

    const filteredLessons = lessons.filter(l => l.module === activeModule);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/teacher" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold gradient-text">Manage Syllabus</h1>
                        <p className="text-cyan-400 mt-2">Create and organize learning materials</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add Lesson
                    </button>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar - Modules */}
                    <div className="md:col-span-1 space-y-2">
                        {['English', 'Gujarati', 'Maths', 'Science'].map((module) => (
                            <button
                                key={module}
                                onClick={() => setActiveModule(module)}
                                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${activeModule === module
                                    ? 'bg-purple-600 text-slate-100 shadow-lg'
                                    : 'bg-slate-800 text-cyan-400 hover:bg-purple-50'
                                    }`}
                            >
                                {module}
                            </button>
                        ))}
                    </div>

                    {/* Main Content - Lessons List */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Add Lesson Form */}
                        <AnimatePresence>
                            {isAdding && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="glass rounded-2xl p-6 overflow-hidden"
                                >
                                    <h3 className="text-lg font-bold mb-4">Add New Lesson</h3>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={newLesson.title}
                                                onChange={e => setNewLesson({ ...newLesson, title: e.target.value })}
                                                className="w-full px-4 py-2 rounded-xl border border-cyan-500/30 focus:ring-2 focus:ring-purple-500 outline-none"
                                                placeholder="Lesson Title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Duration</label>
                                            <input
                                                type="text"
                                                value={newLesson.duration}
                                                onChange={e => setNewLesson({ ...newLesson, duration: e.target.value })}
                                                className="w-full px-4 py-2 rounded-xl border border-cyan-500/30 focus:ring-2 focus:ring-purple-500 outline-none"
                                                placeholder="e.g. 15 mins"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Type</label>
                                            <select
                                                value={newLesson.type}
                                                onChange={e => setNewLesson({ ...newLesson, type: e.target.value })}
                                                className="w-full px-4 py-2 rounded-xl border border-cyan-500/30 focus:ring-2 focus:ring-purple-500 outline-none"
                                            >
                                                <option>Video</option>
                                                <option>Text</option>
                                                <option>Interactive</option>
                                                <option>Quiz</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Module</label>
                                            <select
                                                value={newLesson.module}
                                                onChange={e => setNewLesson({ ...newLesson, module: e.target.value })}
                                                className="w-full px-4 py-2 rounded-xl border border-cyan-500/30 focus:ring-2 focus:ring-purple-500 outline-none"
                                            >
                                                <option>English</option>
                                                <option>Gujarati</option>
                                                <option>Maths</option>
                                                <option>Science</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => setIsAdding(false)}
                                            className="px-4 py-2 text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddLesson}
                                            className="px-6 py-2 bg-purple-600 text-slate-100 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save Lesson
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Lessons List */}
                        <div className="space-y-4">
                            {filteredLessons.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 bg-slate-800/50 rounded-2xl border-2 border-dashed border-cyan-500/30">
                                    No lessons found for this module. Add one to get started!
                                </div>
                            ) : (
                                filteredLessons.map((lesson) => (
                                    <motion.div
                                        key={lesson.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="glass p-4 rounded-xl flex items-center justify-between group hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${lesson.type === 'Video' ? 'bg-cyan-100 text-cyan-600' :
                                                lesson.type === 'Text' ? 'bg-green-100 text-green-600' :
                                                    'bg-purple-100 text-purple-600'
                                                }`}>
                                                {lesson.type === 'Video' ? <Video className="w-6 h-6" /> :
                                                    lesson.type === 'Text' ? <FileText className="w-6 h-6" /> :
                                                        <BookOpen className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-100">{lesson.title}</h3>
                                                <p className="text-sm text-slate-400">{lesson.duration} • {lesson.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg text-cyan-600 transition-colors">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(lesson.id)}
                                                className="p-2 hover:bg-slate-800 rounded-lg text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
