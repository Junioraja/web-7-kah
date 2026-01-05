import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CaretLeft, BookOpen, Clock, Play, 
    Pause, ArrowCounterClockwise, CheckCircle, 
    Notebook, BookBookmark, Camera, UploadSimple, 
    X, Info, StarFour, Coins, Lightbulb, GraduationCap 
} from '@phosphor-icons/react';

export default function LearnHabit() {
    // --- STATE TIMER FOKUS ---
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 Menit
    const [isActive, setIsActive] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        let timer = null;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);
            setIsActive(false);
            alert("Waktu Fokus Selesai! Hebat!");
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const { data, setData, post, processing, errors } = useForm({
        study_duration: 25,
        learned_today: '',
        book_title: '',
        page_count: '',
        evidence_photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('student.dashboard'));
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8">
            <Head title="Gemar Belajar - TunasHebat" />
            
            <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-8">
                
                {/* LEFT COLUMN: FOCUS TIMER (POMODORO) */}
                <div className="lg:col-span-2 space-y-6">
                    <Link href={route('student.dashboard')} className="inline-flex items-center gap-2 text-muted-foreground hover:text-indigo-500 font-bold mb-2">
                        <CaretLeft size={20} weight="bold" /> Kembali
                    </Link>

                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-card border border-border rounded-[3rem] p-8 shadow-xl relative overflow-hidden text-center"
                    >
                        <div className="relative z-10">
                            <div className="p-4 bg-indigo-500/10 rounded-2xl inline-block text-indigo-500 mb-6">
                                <Clock size={32} weight="fill" />
                            </div>
                            <h3 className="text-xl font-black mb-1">Mode Fokus</h3>
                            <p className="text-xs text-muted-foreground font-medium mb-8">Gunakan teknik Pomodoro untuk belajar</p>

                            {/* TIMER DISPLAY */}
                            <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                                <svg className="w-full h-full rotate-[-90deg]">
                                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                                    <motion.circle 
                                        cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                        className="text-indigo-500"
                                        strokeDasharray="553"
                                        initial={{ strokeDashoffset: 553 }}
                                        animate={{ strokeDashoffset: 553 - (553 * (timeLeft / (25 * 60))) }}
                                    />
                                </svg>
                                <span className="absolute text-4xl font-black tracking-tighter">{formatTime(timeLeft)}</span>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button 
                                    onClick={() => setIsActive(!isActive)}
                                    className={`p-4 rounded-2xl transition-all shadow-lg ${isActive ? 'bg-orange-500 text-white shadow-orange-500/30' : 'bg-indigo-500 text-white shadow-indigo-500/30'}`}
                                >
                                    {isActive ? <Pause size={24} weight="fill" /> : <Play size={24} weight="fill" />}
                                </button>
                                <button 
                                    onClick={() => {setIsActive(false); setTimeLeft(25 * 60);}}
                                    className="p-4 rounded-2xl bg-muted text-muted-foreground hover:bg-slate-200 transition-all"
                                >
                                    <ArrowCounterClockwise size={24} weight="bold" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-indigo-600 rounded-[2.5rem] p-6 text-white shadow-lg relative overflow-hidden">
                         <div className="relative z-10">
                            <h4 className="font-black flex items-center gap-2 mb-2"><Lightbulb weight="fill" /> Tips Belajar</h4>
                            <p className="text-xs leading-relaxed opacity-90 font-medium">Belajarlah selama 25 menit, lalu istirahat 5 menit. Ulangi 4 kali untuk hasil maksimal!</p>
                         </div>
                         <GraduationCap size={120} className="absolute -right-8 -bottom-8 opacity-10" weight="fill" />
                    </div>
                </div>

                {/* RIGHT COLUMN: JOURNAL & READING LOG */}
                <div className="lg:col-span-3">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        
                        {/* HEADER CARD */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10 flex justify-between items-center">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl">
                                        <BookOpen weight="fill" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black">Gemar Belajar</h1>
                                        <p className="opacity-90 font-medium">Catat ilmu barumu hari ini</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="bg-white/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-white/30">
                                        <StarFour weight="fill" className="text-indigo-200" /> +50 XP
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="bg-card border border-border rounded-[2.5rem] p-8 space-y-8 shadow-sm">
                            
                            {/* LOG MEMBACA */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                    <BookBookmark weight="bold" className="text-indigo-500" /> 1. Log Membaca Buku/Alkitab
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        type="text" placeholder="Judul Buku / Bab Alkitab"
                                        value={data.book_title} onChange={e => setData('book_title', e.target.value)}
                                        className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-muted border-none text-sm font-bold"
                                    />
                                    <input 
                                        type="number" placeholder="Jumlah Halaman"
                                        value={data.page_count} onChange={e => setData('page_count', e.target.value)}
                                        className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-muted border-none text-sm font-bold"
                                    />
                                </div>
                            </div>

                            {/* CATATAN BELAJAR */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                    <Notebook weight="bold" className="text-indigo-500" /> 2. Apa yang kamu pelajari?
                                </label>
                                <textarea 
                                    placeholder="Tuliskan rangkuman materi atau ilmu yang baru kamu tahu..."
                                    value={data.learned_today} onChange={e => setData('learned_today', e.target.value)}
                                    className="w-full p-4 rounded-2xl bg-muted border-none text-sm font-medium min-h-[120px] focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* UPLOAD BUKTI */}
                            <div className="space-y-4 pt-4 border-t border-dashed border-border">
                                <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                    <Camera weight="bold" className="text-indigo-500" /> 3. Foto Catatan / Buku
                                </label>
                                {!preview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-[2rem] cursor-pointer hover:bg-muted transition-colors">
                                        <UploadSimple size={32} className="text-muted-foreground mb-2" />
                                        <span className="text-xs font-bold text-muted-foreground">Ketuk untuk Unggah</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                            const file = e.target.files[0];
                                            if(file) { setData('evidence_photo', file); setPreview(URL.createObjectURL(file)); }
                                        }} />
                                    </label>
                                ) : (
                                    <div className="relative rounded-[2rem] overflow-hidden border border-border aspect-video">
                                        <img src={preview} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => setPreview(null)} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"><X size={20} weight="bold" /></button>
                                    </div>
                                )}
                            </div>

                            <button disabled={processing} type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                                <CheckCircle size={24} weight="fill" />
                                <span>Simpan Jurnal Belajar</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}