import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    CaretLeft, Mosque, Camera, CheckCircle, 
    UploadSimple, X, Info, Coins, StarFour 
} from '@phosphor-icons/react';

export default function WorshipIslam() {
    const { data, setData, post, processing } = useForm({
        prayers: { subuh: false, dzuhur: false, ashar: false, maghrib: false, isya: false },
        evidence_photo: null,
        note: '',
    });

    const togglePrayer = (key) => {
        setData('prayers', { ...data.prayers, [key]: !data.prayers[key] });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8">
            <Head title="Ibadah Islam - TunasHebat" />
            
            <div className="max-w-2xl mx-auto">
                <Link href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-emerald-500 transition-colors mb-8 font-bold">
                    <CaretLeft size={20} weight="bold" /> Kembali ke Pilihan
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl">
                                    <Mosque weight="fill" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black">Ibadah Sholat</h1>
                                    <p className="opacity-90">Lengkapi 5 waktu hari ini</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="bg-white/20 px-3 py-1 rounded-xl text-xs font-bold">+50 XP</span>
                            </div>
                        </div>
                    </div>

                    <form className="bg-card border border-border rounded-[2.5rem] p-8 space-y-8 shadow-sm">
                        {/* CHECKLIST SHOLAT */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <CheckCircle weight="bold" className="text-emerald-500" /> 1. Checklist Waktu Sholat
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                                {Object.keys(data.prayers).map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => togglePrayer(time)}
                                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                            data.prayers[time] 
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' 
                                            : 'border-slate-100 dark:border-slate-800 hover:border-emerald-200'
                                        }`}
                                    >
                                        <span className="font-black uppercase tracking-wider text-sm">{time}</span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.prayers[time] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200'}`}>
                                            {data.prayers[time] && <CheckCircle weight="fill" size={16} />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* UPLOAD & CATATAN (Sama seperti WakeUp) */}
                        <div className="space-y-4 pt-4 border-t border-dashed">
                             <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Camera weight="bold" className="text-emerald-500" /> 2. Foto Berjamaah / Masjid (Opsional)
                            </label>
                            <div className="w-full h-40 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                                <UploadSimple size={32} className="mb-2" />
                                <span className="text-xs font-bold">Klik untuk Unggah Foto</span>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                            <CheckCircle size={24} weight="fill" /> Simpan Jurnal Ibadah
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}