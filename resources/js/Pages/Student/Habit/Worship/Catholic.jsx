import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    CaretLeft, Cross, BookOpen, HandsPraying, 
    CheckCircle, Camera, UploadSimple, X, 
    Info, StarFour, Coins, Sparkle, Church
} from '@phosphor-icons/react';

export default function WorshipCatholic() {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        morning_evening_prayer: false, // Doa Pagi/Malam
        bible_reading: false,          // Baca Kitab Suci
        rosary: false,                 // Doa Rosario
        mass: false,                   // Perayaan Ekaristi / Misa
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
        post(route('student.dashboard')); 
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8">
            <Head title="Ibadah Katolik - TunasHebat" />
            
            <div className="max-w-2xl mx-auto">
                <Link href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-purple-500 transition-colors mb-8 font-bold group">
                    <div className="p-2 rounded-xl bg-card border border-border group-hover:border-purple-500/50">
                        <CaretLeft size={20} weight="bold" />
                    </div>
                    Kembali ke Pilihan
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    {/* HEADER CARD KATOLIK */}
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-purple-500/20 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                                    <Cross weight="fill" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black tracking-tight">Ibadah Harian</h1>
                                    <p className="opacity-90 font-medium">Umat Katolik</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 flex items-center gap-2">
                                    <StarFour weight="fill" className="text-purple-200" />
                                    <span className="font-bold">+50 XP</span>
                                </div>
                            </div>
                        </div>
                        <Cross size={180} weight="fill" className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    {/* FORM SECTION */}
                    <form onSubmit={submit} className="bg-card border border-border rounded-[2.5rem] p-8 space-y-8 shadow-sm">
                        
                        {/* CHECKLIST AKTIVITAS KATOLIK */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <CheckCircle weight="bold" className="text-purple-500" /> 1. Praktik Rohani Hari Ini
                            </label>
                            
                            <div className="grid grid-cols-1 gap-3">
                                <WorshipToggle 
                                    active={data.morning_evening_prayer} 
                                    onClick={() => setData('morning_evening_prayer', !data.morning_evening_prayer)}
                                    icon={<HandsPraying weight="fill" />}
                                    label="Doa Pagi & Malam"
                                    desc="Berkomunikasi dengan Tuhan mengawali & mengakhiri hari"
                                />
                                <WorshipToggle 
                                    active={data.bible_reading} 
                                    onClick={() => setData('bible_reading', !data.bible_reading)}
                                    icon={<BookOpen weight="fill" />}
                                    label="Baca Kitab Suci"
                                    desc="Mendengarkan Sabda Tuhan lewat Kitab Suci"
                                />
                                <WorshipToggle 
                                    active={data.rosary} 
                                    onClick={() => setData('rosary', !data.rosary)}
                                    icon={<Sparkle weight="fill" />}
                                    label="Doa Rosario"
                                    desc="Devosi kepada Bunda Maria (Opsional/Bulan Rosario)"
                                />
                                <WorshipToggle 
                                    active={data.mass} 
                                    onClick={() => setData('mass', !data.mass)}
                                    icon={<Church weight="fill" />}
                                    label="Perayaan Ekaristi"
                                    desc="Misa Kudus di Gereja (Minggu/Hari Raya)"
                                />
                            </div>
                        </div>

                        {/* UPLOAD FOTO */}
                        <div className="space-y-4 pt-4 border-t border-dashed border-border">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Camera weight="bold" className="text-purple-500" /> 2. Foto Kegiatan / Gereja
                            </label>
                            
                            {!preview ? (
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-[2rem] cursor-pointer hover:bg-muted/50 transition-all group">
                                    <UploadSimple size={32} weight="bold" className="text-muted-foreground group-hover:scale-110 transition-transform mb-2" />
                                    <span className="text-xs font-bold text-muted-foreground">Ketuk untuk Unggah Bukti</span>
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

                        {/* CATATAN / REFLEKSI */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Info weight="bold" className="text-purple-500" /> 3. Refleksi Singkat
                            </label>
                            <textarea 
                                placeholder="Tuliskan ayat atau pesan homili yang kamu ingat..."
                                value={data.note}
                                onChange={e => setData('note', e.target.value)}
                                className="w-full p-4 rounded-2xl bg-muted border-none focus:ring-2 focus:ring-purple-500 text-sm font-medium min-h-[100px]"
                            />
                        </div>

                        <button 
                            disabled={processing}
                            type="submit" 
                            className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
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

function WorshipToggle({ active, onClick, icon, label, desc }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                active 
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10' 
                : 'border-slate-100 dark:border-slate-800 hover:border-purple-200'
            }`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${active ? 'bg-purple-500 text-white shadow-lg' : 'bg-muted text-muted-foreground'}`}>
                {icon}
            </div>
            <div className="flex-1">
                <h4 className={`font-black text-sm uppercase tracking-tight ${active ? 'text-purple-600 dark:text-purple-400' : 'text-foreground'}`}>{label}</h4>
                <p className="text-[10px] text-muted-foreground font-medium">{desc}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'bg-purple-500 border-purple-500 text-white' : 'border-slate-200'}`}>
                {active && <CheckCircle weight="fill" size={16} />}
            </div>
        </button>
    );
}