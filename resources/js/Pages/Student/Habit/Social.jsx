import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CaretLeft, Users, HandHeart, Plant, 
    ChatCircleDots, CheckCircle, Camera, 
    UploadSimple, X, Info, StarFour, 
    Coins, Heart, Smiley
} from '@phosphor-icons/react';

export default function SocialHabit() {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        kindness: {
            help_parents: false,
            greet_neighbor: false,
            kind_words: false,
            clean_environment: false,
        },
        evidence_photo: null,
        note: '',
    });

    const toggleKindness = (key) => {
        setData('kindness', { ...data.kindness, [key]: !data.kindness[key] });
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
            <Head title="Sosial & Bermasyarakat - TunasHebat" />
            
            <div className="max-w-2xl mx-auto">
                {/* TOMBOL KEMBALI */}
                <Link href={route('student.dashboard')} className="inline-flex items-center gap-2 text-muted-foreground hover:text-purple-500 transition-colors mb-8 font-bold group">
                    <div className="p-2 rounded-xl bg-card border border-border group-hover:border-purple-500/50 transition-all shadow-sm">
                        <CaretLeft size={20} weight="bold" />
                    </div>
                    <span>Kembali ke Dashboard</span>
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    
                    {/* HEADER CARD SOSIAL */}
                    <div className="bg-gradient-to-br from-purple-500 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-purple-500/20 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                                    <Users weight="fill" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black tracking-tight">Bermasyarakat</h1>
                                    <p className="opacity-90 font-medium">Bantu orang & jaga lingkungan</p>
                                </div>
                            </div>
                            <div className="flex gap-3 text-sm font-bold">
                                <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/30 flex items-center gap-2">
                                    <StarFour weight="fill" className="text-purple-200" /> +50 XP
                                </div>
                            </div>
                        </div>
                        <Heart size={180} weight="fill" className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    {/* FORM SECTION */}
                    <form onSubmit={submit} className="bg-card border border-border rounded-[2.5rem] p-8 space-y-10 shadow-sm relative overflow-hidden">
                        
                        {/* 1. CHECKLIST KEBAIKAN */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <HandHeart weight="bold" className="text-purple-500" /> 1. Kebaikan Apa yang Kamu Lakukan?
                            </label>
                            
                            <div className="grid grid-cols-1 gap-3">
                                <SocialToggle 
                                    active={data.kindness.help_parents} 
                                    onClick={() => toggleKindness('help_parents')}
                                    icon={<HandHeart weight="fill" />}
                                    label="Membantu Orang Tua"
                                    desc="Membantu pekerjaan rumah atau memijat orang tua"
                                />
                                <SocialToggle 
                                    active={data.kindness.greet_neighbor} 
                                    onClick={() => toggleKindness('greet_neighbor')}
                                    icon={<Smiley weight="fill" />}
                                    label="Menyapa Tetangga"
                                    desc="Bertegur sapa dengan sopan di lingkungan rumah"
                                />
                                <SocialToggle 
                                    active={data.kindness.kind_words} 
                                    onClick={() => toggleKindness('kind_words')}
                                    icon={<ChatCircleDots weight="fill" />}
                                    label="Menjaga Lisan"
                                    desc="Berbicara baik dan tidak menyakiti perasaan orang lain"
                                />
                                <SocialToggle 
                                    active={data.kindness.clean_environment} 
                                    onClick={() => toggleKindness('clean_environment')}
                                    icon={<Plant weight="fill" />}
                                    label="Aksi Lingkungan"
                                    desc="Membuang sampah pada tempatnya atau menyiram bunga"
                                />
                            </div>
                        </div>

                        {/* 2. UPLOAD FOTO BUKTI */}
                        <div className="space-y-4 pt-4 border-t border-dashed border-border">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Camera weight="bold" className="text-purple-500" /> 2. Unggah Foto Kebaikan (Opsional)
                            </label>
                            
                            {!preview ? (
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-[2rem] cursor-pointer hover:bg-muted/50 transition-all group">
                                    <UploadSimple size={32} weight="bold" className="text-muted-foreground group-hover:scale-110 transition-transform mb-2" />
                                    <span className="text-xs font-bold text-muted-foreground">Ketuk untuk Pilih Foto</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            ) : (
                                <div className="relative rounded-[2rem] overflow-hidden border border-border aspect-video group">
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                    <button 
                                        type="button"
                                        onClick={() => {setPreview(null); setData('evidence_photo', null);}}
                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:rotate-90 transition-transform"
                                    >
                                        <X size={20} weight="bold" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 3. CATATAN CERITA */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground">
                                <Info weight="bold" className="text-purple-500" /> 3. Ceritakan Kebaikanmu Hari Ini
                            </label>
                            <textarea 
                                placeholder="Hari ini saya membantu ibu mencuci piring..."
                                value={data.note}
                                onChange={e => setData('note', e.target.value)}
                                className="w-full p-5 rounded-2xl bg-muted border-none focus:ring-2 focus:ring-purple-500 text-sm font-medium min-h-[120px] shadow-inner"
                            />
                        </div>

                        {/* TOMBOL SIMPAN */}
                        <button 
                            disabled={processing}
                            type="submit" 
                            className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <CheckCircle size={24} weight="fill" />
                            <span>{processing ? 'Mengirim Cerita...' : 'Simpan Jurnal Sosial'}</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

// --- KOMPONEN TOGGLE KHUSUS SOSIAL ---
function SocialToggle({ active, onClick, icon, label, desc }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                active 
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10' 
                : 'border-slate-100 dark:border-slate-800 hover:border-purple-200 shadow-sm'
            }`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${active ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' : 'bg-muted text-muted-foreground'}`}>
                {icon}
            </div>
            <div className="flex-1">
                <h4 className={`font-black text-sm uppercase tracking-tight ${active ? 'text-purple-600 dark:text-purple-400' : 'text-foreground'}`}>{label}</h4>
                <p className="text-[10px] text-muted-foreground font-bold tracking-wide">{desc}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'bg-purple-500 border-purple-500 text-white' : 'border-slate-200'}`}>
                {active && <CheckCircle weight="fill" size={16} />}
            </div>
        </button>
    );
}