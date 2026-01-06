import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CaretLeft, PersonSimpleRun, SoccerBall, Basketball, 
    Bicycle, SwimmingPool, Barbell, CheckCircle, 
    Camera, UploadSimple, X, Info, StarFour, 
    Coins, Clock, Fire
} from '@phosphor-icons/react';
import { Hand } from 'lucide-react';

export default function ExerciseHabit() {
    const [preview, setPreview] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const activities = [
        { id: 'running', name: 'Lari / Jalan', icon: <PersonSimpleRun weight="fill" /> },
        { id: 'soccer', name: 'Sepak Bola', icon: <SoccerBall weight="fill" /> },
        { id: 'basketball', name: 'Basket', icon: <Basketball weight="fill" /> },
        { id: 'cycling', name: 'Bersepeda', icon: <Bicycle weight="fill" /> },
        { id: 'swimming', name: 'Berenang', icon: <SwimmingPool weight="fill" /> },
        { id: 'gym', name: 'Work Out', icon: <Barbell weight="fill" /> },
        { id: 'gooning', name: 'Gooning', icon: <Hand weight="fill" /> }
    ];

    const { data, setData, post, processing, errors } = useForm({
        activity_type: '',
        duration: 30,
        evidence_photo: null,
        note: '',
    });

    const handleActivitySelect = (id) => {
        setSelectedActivity(id);
        setData('activity_type', id);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('evidence_photo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('student.dashboard')); 
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8">
            <Head title="Jurnal Olahraga - TunasHebat" />
            
            <div className="max-w-2xl mx-auto">
                <Link href={route('student.dashboard')} className="inline-flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors mb-8 font-bold group">
                    <div className="p-2 rounded-xl bg-card border border-border group-hover:border-red-500/50">
                        <CaretLeft size={20} weight="bold" />
                    </div>
                    Kembali
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    {/* HERO HEADER OLAHRAGA */}
                    <div className="bg-gradient-to-br from-red-500 to-rose-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-red-500/20 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                                    <PersonSimpleRun weight="fill" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black tracking-tight">Badan Sehat</h1>
                                    <p className="opacity-90 font-medium">Minimal 30 Menit sehari</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 flex items-center gap-2 text-sm font-bold">
                                    <StarFour weight="fill" className="text-red-200" /> +50 XP
                                </div>
                            </div>
                        </div>
                        <Fire size={180} weight="fill" className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    <form onSubmit={submit} className="bg-card border border-border rounded-[2.5rem] p-8 space-y-10 shadow-sm">
                        
                        {/* 1. PILIH AKTIVITAS */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Fire weight="bold" className="text-red-500" /> 1. Apa Olahragamu Hari Ini?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {activities.map((act) => (
                                    <button
                                        key={act.id}
                                        type="button"
                                        onClick={() => handleActivitySelect(act.id)}
                                        className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                                            selectedActivity === act.id 
                                            ? 'border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600' 
                                            : 'border-slate-100 dark:border-slate-800 hover:border-red-200 text-muted-foreground'
                                        }`}
                                    >
                                        <div className={`text-3xl transition-transform ${selectedActivity === act.id ? 'scale-110' : ''}`}>
                                            {act.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-center">{act.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. INPUT DURASI */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Clock weight="bold" className="text-red-500" /> 2. Berapa Lama? (Menit)
                            </label>
                            <div className="flex items-center gap-6 bg-muted p-6 rounded-3xl">
                                <input 
                                    type="range" 
                                    min="10" max="120" step="5"
                                    value={data.duration}
                                    onChange={e => setData('duration', e.target.value)}
                                    className="flex-1 accent-red-500"
                                />
                                <div className="text-center min-w-[80px]">
                                    <span className="text-3xl font-black text-red-500">{data.duration}</span>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Menit</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. UPLOAD FOTO */}
                        <div className="space-y-4 pt-4 border-t border-dashed border-border">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Camera weight="bold" className="text-red-500" /> 3. Unggah Foto Kegiatan
                            </label>
                            
                            {!preview ? (
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-[2rem] cursor-pointer hover:bg-muted/50 transition-all group">
                                    <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 mb-2 group-hover:scale-110 transition-transform">
                                        <UploadSimple size={32} weight="bold" />
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground">Klik untuk Unggah Bukti</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            ) : (
                                <div className="relative rounded-[2rem] overflow-hidden border border-border aspect-video group">
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                    <button 
                                        type="button"
                                        onClick={() => {setPreview(null); setData('evidence_photo', null);}}
                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"
                                    >
                                        <X size={20} weight="bold" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 4. CATATAN */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Info weight="bold" className="text-red-500" /> 4. Cerita Singkat (Opsional)
                            </label>
                            <textarea 
                                placeholder="Misal: Lari sore bareng teman-teman..."
                                value={data.note}
                                onChange={e => setData('note', e.target.value)}
                                className="w-full p-4 rounded-2xl bg-muted border-none focus:ring-2 focus:ring-red-500 text-sm font-medium min-h-[100px]"
                            />
                        </div>

                        <button 
                            disabled={processing}
                            type="submit" 
                            className="w-full py-5 bg-red-500 hover:bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <CheckCircle size={24} weight="fill" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Jurnal Olahraga'}</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}