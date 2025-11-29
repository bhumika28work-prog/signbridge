'use client';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Filter, Search, MoreVertical, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeacherReports() {
    const router = useRouter();
    const { user } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!user || user.role !== 'teacher') {
            router.push('/login');
        }
    }, [user, router]);

    if (!user || user.role !== 'teacher') return null;

    // Mock Data for Students
    const students = [
        { id: 1, name: 'Aarav Patel', grade: '5th', progress: 85, status: 'Active', lastActive: '2 mins ago', strengths: ['Maths', 'Science'], weak: ['Gujarati'] },
        { id: 2, name: 'Diya Shah', grade: '5th', progress: 92, status: 'Active', lastActive: '1 hour ago', strengths: ['English', 'Gujarati'], weak: ['Maths'] },
        { id: 3, name: 'Rohan Gupta', grade: '5th', progress: 64, status: 'Inactive', lastActive: '2 days ago', strengths: ['Science'], weak: ['English', 'Maths'] },
        { id: 4, name: 'Ananya Singh', grade: '5th', progress: 78, status: 'Active', lastActive: '5 hours ago', strengths: ['Maths'], weak: ['Science'] },
        { id: 5, name: 'Vihaan Kumar', grade: '5th', progress: 45, status: 'Needs Help', lastActive: '1 day ago', strengths: ['Gujarati'], weak: ['English', 'Maths', 'Science'] },
    ];

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/teacher" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold gradient-text">Student Reports</h1>
                        <p className="text-cyan-400 mt-2">Track performance and progress of your class</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="inline-flex items-center gap-2 px-6 py-3 glass font-semibold rounded-xl hover:shadow-lg transition-all">
                            <Download className="w-5 h-5" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="glass rounded-2xl p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-slate-400 font-medium">Class Average</h3>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-slate-100">72.8%</p>
                        <p className="text-sm text-green-600 mt-1">+4.2% from last week</p>
                    </div>
                    <div className="glass rounded-2xl p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-slate-400 font-medium">Active Students</h3>
                            <CheckCircle className="w-5 h-5 text-purple-500" />
                        </div>
                        <p className="text-3xl font-bold text-slate-100">24/30</p>
                        <p className="text-sm text-purple-600 mt-1">80% attendance rate</p>
                    </div>
                    <div className="glass rounded-2xl p-6 border-l-4 border-red-500">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-slate-400 font-medium">Needs Attention</h3>
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <p className="text-3xl font-bold text-slate-100">3</p>
                        <p className="text-sm text-red-600 mt-1">Students falling behind</p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="glass rounded-3xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-cyan-500/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-cyan-500/30 font-semibold rounded-xl hover:bg-slate-900 transition-all">
                            <Filter className="w-5 h-5 text-slate-400" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Students Table */}
                <div className="glass rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-900/50 border-b border-cyan-500/30">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Student Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Progress</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Strengths</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Weaknesses</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-cyan-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStudents.map((student) => (
                                    <motion.tr
                                        key={student.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-purple-50/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-slate-100 font-bold">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-100">{student.name}</p>
                                                    <p className="text-xs text-slate-400">{student.grade}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    student.status === 'Inactive' ? 'bg-slate-800 text-slate-100' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full max-w-[140px]">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="font-medium text-slate-300">{student.progress}%</span>
                                                </div>
                                                <div className="w-full bg-slate-700 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${student.progress >= 80 ? 'bg-slate-8000' :
                                                                student.progress >= 60 ? 'bg-slate-8000' :
                                                                    'bg-slate-8000'
                                                            }`}
                                                        style={{ width: `${student.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {student.strengths.map(s => (
                                                    <span key={s} className="px-2 py-1 bg-slate-800 text-green-700 text-xs rounded-md border border-green-100">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {student.weak.map(w => (
                                                    <span key={w} className="px-2 py-1 bg-slate-800 text-red-700 text-xs rounded-md border border-red-100">
                                                        {w}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-purple-600 transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
