import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CaretLeft, SunHorizon, Sun, MoonStars, Drop, 
    BowlFood, FishSimple, Carrot, AppleLogo, 
    CheckCircle, Camera, UploadSimple, X, 
    Info, StarFour, Coins, Brandy, Waves
} from '@phosphor-icons/react';

export default function HealthyFood() {
    const [activeModal, setActiveModal] = useState(null); // 'meal' or 'water'
    const [mealTitle, setMealTitle] = useState('');
    const [waterCount, setWaterCount] = useState(0);

    const { data, setData, post, processing } = useForm({
        meal_type: '', // Pagi, Siang, Malam
        nutrients: { karbo: '', lauk: '', sayur: '', buah: '' },
        water_glasses: 0,
        evidence_photo: null,
        note: '',
    });

    const openMealModal = (type) => {
        setMealTitle(type);
        setData('meal_type', type);
        setActiveModal('meal');
    };

    const toggleNutrient = (key) => {
        const newVal = data.nutrients[key] === '' ? 'Dipilih' : '';
        setData('nutrients', { ...data.nutrients, [key]: newVal });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('student.dashboard'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-brand-500 text-slate-800 font-sans p-4 md:p-8 relative overflow-hidden">
            <Head title="Jurnal Makan Sehat - TunasHebat" />

            {/* DEKORASI MENGAMBANG (Framer Motion) */}
            <FloatingIcon icon={<Carrot size={80} className="text-orange-400/40" />} top="10%" left="5%" delay={0} />
            <FloatingIcon icon={<AppleLogo size={70} className="text-red-400/40" />} top="20%" right="5%" delay={2} />
            <FloatingIcon icon={<FishSimple size={60} className="text-white/30" />} bottom="15%" left="10%" delay={1} />

            <div className="max-w-2xl mx-auto relative z-10">
                {/* HEADER */}
                <Link href={route('student.dashboard')} className="inline-flex items-center gap-2 text-white hover:text-sky-100 transition-colors mb-8 font-bold group">
                    <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                        <CaretLeft size={20} weight="bold" />
                    </div>
                    Kembali
                </Link>

                <div className="text-center text-white mb-10">
                    <h1 className="text-3xl font-black drop-shadow-md">Jurnal Gizi & Air</h1>
                    <p className="opacity-90 font-medium">Nutrisi seimbang untuk tubuh yang kuat!</p>
                </div>

                {/* MAIN SELECTION GRID */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <MealTimeCard 
                        onClick={() => openMealModal('Makan Pagi')}
                        icon={<SunHorizon weight="fill" />} 
                        title="Pagi" sub="Sarapan" color="text-yellow-500" bg="bg-yellow-50" 
                    />
                    <MealTimeCard 
                        onClick={() => openMealModal('Makan Siang')}
                        icon={<Sun weight="fill" />} 
                        title="Siang" sub="Energi" color="text-orange-500" bg="bg-orange-50" 
                    />
                    <MealTimeCard 
                        onClick={() => openMealModal('Makan Malam')}
                        icon={<MoonStars weight="fill" />} 
                        title="Malam" sub="Istirahat" color="text-indigo-500" bg="bg-indigo-50" 
                    />
                    <MealTimeCard 
                        onClick={() => setActiveModal('water')}
                        icon={<Drop weight="fill" />} 
                        title="Air" sub="8 Gelas" color="text-blue-500" bg="bg-blue-50" 
                    />
                </div>

                {/* WATER PROGRESS MINI WIDGET */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/50 shadow-xl flex justify-between items-center"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                            <Drop size={24} weight="fill" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700">Progress Air Minum</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{waterCount} / 8 Gelas Hari Ini</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setActiveModal('water')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95"
                    >
                        ISI AIR
                    </button>
                </motion.div>
            </div>

            {/* MODAL JURNAL MAKAN */}
            <AnimatePresence>
                {activeModal === 'meal' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setActiveModal(null)}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 100 }}
                            className="bg-white w-full max-w-lg rounded-[3rem] p-8 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-black text-slate-800">{mealTitle}</h3>
                                <button onClick={() => setActiveModal(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"><X weight="bold" /></button>
                            </div>

                            <p className="text-slate-400 text-sm mb-6">Centang 4 unsur gizi di piringmu.</p>

                            <div className="space-y-3 mb-8">
                                <NutrientToggle 
                                    active={data.nutrients.karbo !== ''} 
                                    onClick={() => toggleNutrient('karbo')}
                                    icon={<BowlFood color="#f97316" />} label="Karbohidrat" desc="Nasi, Roti, Kentang"
                                    value={data.nutrients.karbo}
                                    onChange={(val) => setData('nutrients', { ...data.nutrients, karbo: val })}
                                />
                                <NutrientToggle 
                                    active={data.nutrients.lauk !== ''} 
                                    onClick={() => toggleNutrient('lauk')}
                                    icon={<FishSimple color="#ef4444" />} label="Lauk Pauk" desc="Ikan, Ayam, Telur"
                                    value={data.nutrients.lauk}
                                    onChange={(val) => setData('nutrients', { ...data.nutrients, lauk: val })}
                                />
                                <NutrientToggle 
                                    active={data.nutrients.sayur !== ''} 
                                    onClick={() => toggleNutrient('sayur')}
                                    icon={<Carrot color="#10b981" />} label="Sayuran" desc="Bayam, Wortel, Brokoli"
                                    value={data.nutrients.sayur}
                                    onChange={(val) => setData('nutrients', { ...data.nutrients, sayur: val })}
                                />
                                <NutrientToggle 
                                    active={data.nutrients.buah !== ''} 
                                    onClick={() => toggleNutrient('buah')}
                                    icon={<AppleLogo color="#f43f5e" />} label="Buah-buahan" desc="Pisang, Apel, Jeruk"
                                    value={data.nutrients.buah}
                                    onChange={(val) => setData('nutrients', { ...data.nutrients, buah: val })}
                                />
                            </div>

                            <button onClick={submit} className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-black rounded-2xl shadow-xl shadow-brand-500/20 transition-all active:scale-95">
                                Simpan Jurnal Makan
                            </button>
                        </motion.div>
                    </div>
                )}

                {/* MODAL AIR MINUM */}
                {activeModal === 'water' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"
                            onClick={() => setActiveModal(null)}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-sm rounded-[3rem] p-10 relative z-10 shadow-2xl text-center"
                        >
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500 text-3xl">
                                <Drop weight="fill" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800">Target Air Minum</h3>
                            <p className="text-slate-400 text-sm mb-8">Klik gelas untuk mengisi air.</p>

                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {[...Array(8)].map((_, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setWaterCount(Math.max(waterCount, i + 1))}
                                        className={`h-16 rounded-b-2xl rounded-t-lg border-2 transition-all relative overflow-hidden flex items-end ${i < waterCount ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}
                                    >
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: i < waterCount ? '100%' : '0%' }}
                                            className="w-full bg-blue-500 absolute bottom-0 left-0"
                                        />
                                        <div className="w-full h-full flex items-center justify-center relative z-10">
                                            <Brandy size={20} className={i < waterCount ? 'text-white' : 'text-slate-200'} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <p className="text-brand-500 font-black mb-8">{waterCount} / 8 Gelas Terisi</p>
                            <button onClick={() => setActiveModal(null)} className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all">
                                Selesai
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            
            {/* WAVE ANIMATION AT BOTTOM */}
            <div className="fixed bottom-0 left-0 right-0 pointer-events-none opacity-30">
                <Waves size={200} weight="fill" className="text-white w-full h-auto animate-pulse" />
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function FloatingIcon({ icon, top, left, right, bottom, delay }) {
    return (
        <motion.div 
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: delay }}
            style={{ position: 'absolute', top, left, right, bottom }}
            className="z-0 pointer-events-none"
        >
            {icon}
        </motion.div>
    );
}

function MealTimeCard({ icon, title, sub, color, bg, onClick }) {
    return (
        <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/50 shadow-lg text-center group transition-all"
        >
            <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="font-black text-slate-700 text-lg leading-none mb-1">{title}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
        </motion.button>
    );
}

function NutrientToggle({ active, onClick, icon, label, desc, value, onChange }) {
    return (
        <div 
            onClick={onClick}
            className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${active ? 'border-brand-500 bg-brand-50 shadow-inner' : 'border-slate-100 hover:border-slate-200'}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-3xl">{icon}</div>
                    <div>
                        <h4 className="font-black text-slate-700 text-sm leading-none">{label}</h4>
                        <p className="text-[10px] font-bold text-slate-400">{desc}</p>
                    </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-200'}`}>
                    {active && <CheckCircle weight="fill" size={16} />}
                </div>
            </div>
            <AnimatePresence>
                {active && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <input 
                            type="text" 
                            placeholder="Tulis menu makananmu..." 
                            className="w-full mt-3 p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-brand-500 focus:border-brand-500 outline-none"
                            value={value === 'Dipilih' ? '' : value}
                            onChange={(e) => onChange(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}