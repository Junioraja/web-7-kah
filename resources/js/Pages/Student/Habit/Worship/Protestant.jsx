import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    CaretLeft, Church, BookOpen, MusicNotes, 
    CheckCircle, Camera, UploadSimple, X, 
    Info, StarFour, Coins, Heart 
} from '@phosphor-icons/react';

export default function WorshipProtestant() {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        quiet_time: false,    // Saat Teduh
        bible_reading: false, // Baca Alkitab
        sunday_service: false, // Ibadah Minggu
        evidence_photo: null,
        note: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('evidence_photo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Route diarahkan kembali ke dashboard untuk sementara
        post(route('student.dashboard')); 
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8">
            <Head title="Ibadah Kristen Protestan - TunasHebat" />
            
            <div className="max-w-2xl mx-auto">
                <Link href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-indigo-500 transition-colors mb-8 font-bold group">
                    <div className="p-2 rounded-xl bg-card border border-border group-hover:border-indigo-500/50">
                        <CaretLeft size={20} weight="bold" />
                    </div>
                    Kembali ke Pilihan
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    {/* HABIT HEADER CARD */}
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                                    <Church weight="fill" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black tracking-tight">Ibadah Harian</h1>
                                    <p className="opacity-90 font-medium">Kristen Protestan</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 flex items-center gap-2">
                                    <StarFour weight="fill" className="text-blue-200" />
                                    <span className="font-bold">+50 XP</span>
                                </div>
                            </div>
                        </div>
                        <Church size={180} weight="fill" className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    {/* FORM SECTION */}
                    <form onSubmit={submit} className="bg-card border border-border rounded-[2.5rem] p-8 space-y-8 shadow-sm">
                        
                        {/* CHECKLIST AKTIVITAS */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <CheckCircle weight="bold" className="text-indigo-500" /> 1. Aktivitas Rohani Hari Ini
                            </label>
                            
                            <div className="grid grid-cols-1 gap-3">
                                <WorshipToggle 
                                    active={data.quiet_time} 
                                    onClick={() => setData('quiet_time', !data.quiet_time)}
                                    icon={<Heart weight="fill" />}
                                    label="Saat Teduh"
                                    desc="Doa dan penyerahan diri di pagi/malam hari"
                                />
                                <WorshipToggle 
                                    active={data.bible_reading} 
                                    onClick={() => setData('bible_reading', !data.bible_reading)}
                                    icon={<BookOpen weight="fill" />}
                                    label="Baca Alkitab"
                                    desc="Membaca dan merenungkan Firman Tuhan"
                                />
                                <WorshipToggle 
                                    active={data.sunday_service} 
                                    onClick={() => setData('sunday_service', !data.sunday_service)}
                                    icon={<MusicNotes weight="fill" />}
                                    label="Ibadah Minggu"
                                    desc="Khusus untuk hari Minggu / Persekutuan"
                                />
                            </div>
                        </div>

                        {/* UPLOAD BUKTI */}
                        <div className="space-y-4 pt-4 border-t border-dashed border-border">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Camera weight="bold" className="text-indigo-500" /> 2. Foto Saat Teduh / Alkitab
                            </label>
                            
                            {!preview ? (
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-[2rem] cursor-pointer hover:bg-muted/50 transition-all group">
                                    <UploadSimple size={32} weight="bold" className="text-muted-foreground group-hover:scale-110 transition-transform mb-2" />
                                    <span className="text-xs font-bold text-muted-foreground">Klik untuk Unggah Foto Bukti</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            ) : (
                                <div className="relative rounded-[2rem] overflow-hidden border border-border aspect-video group">
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                    <button 
                                        type="button"
                                        onClick={() => {setPreview(null); setData('evidence_photo', null);}}
                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition"
                                    >
                                        <X size={20} weight="bold" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* CATATAN */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Info weight="bold" className="text-indigo-500" /> 3. Ayat Alkitab / Pokok Doa Hari Ini
                            </label>
                            <textarea 
                                placeholder="Tuliskan ayat yang kamu baca atau hal yang kamu syukuri..."
                                value={data.note}
                                onChange={e => setData('note', e.target.value)}
                                className="w-full p-4 rounded-2xl bg-muted border-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium min-h-[100px]"
                            />
                        </div>

                        <button 
                            disabled={processing}
                            type="submit" 
                            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <CheckCircle size={24} weight="fill" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Jurnal Ibadah'}</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

// Komponen Pembantu Toggle
function WorshipToggle({ active, onClick, icon, label, desc }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                active 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' 
                : 'border-slate-100 dark:border-slate-800 hover:border-indigo-200'
            }`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-muted text-muted-foreground'}`}>
                {icon}
            </div>
            <div className="flex-1">
                <h4 className={`font-black text-sm uppercase tracking-tight ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-foreground'}`}>{label}</h4>
                <p className="text-[10px] text-muted-foreground font-medium">{desc}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-200'}`}>
                {active && <CheckCircle weight="fill" size={16} />}
            </div>
        </button>
    );
}