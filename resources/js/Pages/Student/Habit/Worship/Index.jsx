import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    CaretLeft, HandsPraying, Mosque, Church, 
    Cross, Wheelchair, StarFour, Coins, FlowerLotus 
} from '@phosphor-icons/react';

export default function WorshipIndex() {
    // Data Agama dengan rute yang sudah disesuaikan
    const religions = [
        { 
            id: 'islam', 
            name: 'Islam', 
            icon: <Mosque size={40} weight="fill" />, 
            color: 'from-emerald-400 to-teal-600', 
            shadow: 'shadow-emerald-500/20',
            route: 'student.habit.worship.islam' 
        },
        { 
            id: 'protestan', 
            name: 'Kristen Protestan', 
            icon: <Church size={40} weight="fill" />, 
            color: 'from-blue-400 to-indigo-600', 
            shadow: 'shadow-indigo-500/20',
            route: 'student.habit.worship.protestant' 
        },
        { 
            id: 'katolik', 
            name: 'Katolik', 
            icon: <Cross size={40} weight="fill" />, 
            color: 'from-purple-400 to-purple-600', 
            shadow: 'shadow-purple-500/20',
            route: 'student.habit.worship.catholic' 
        },
        { 
            id: 'hindu', 
            name: 'Hindu', 
            icon: <FlowerLotus size={40} weight="fill" />, 
            color: 'from-orange-400 to-red-600', 
            shadow: 'shadow-orange-500/20',
            route: 'student.habit.worship.hindu' 
        },
        { 
            id: 'budha', 
            name: 'Budha', 
            icon: <Wheelchair size={40} weight="fill" />, 
            color: 'from-yellow-400 to-amber-600', 
            shadow: 'shadow-amber-500/20',
            route: 'student.habit.worship.buddhist' 
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-6 md:p-10 relative overflow-hidden">
            <Head title="Pilih Keyakinan - TunasHebat" />

            {/* Efek Latar Belakang */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] -z-10"></div>
            
            <div className="max-w-5xl mx-auto relative z-10">
                {/* Tombol Kembali ke Dashboard */}
                <Link 
                    href={route('student.dashboard')} 
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-primary transition-all mb-12 font-bold group"
                >
                    <div className="p-2.5 rounded-2xl bg-card border border-border group-hover:border-brand-primary/50 shadow-sm transition-all">
                        <CaretLeft size={20} weight="bold" />
                    </div>
                    <span>Kembali ke Dashboard</span>
                </Link>

                {/* Judul Halaman */}
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ scale: 0, rotate: -20 }} 
                        animate={{ scale: 1, rotate: 0 }}
                        className="inline-block p-5 bg-brand-primary/10 rounded-[2rem] text-brand-primary mb-6 shadow-inner"
                    >
                        <HandsPraying size={52} weight="fill" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">Jurnal Beribadah</h1>
                    <p className="text-muted-foreground font-medium text-lg italic">
                        "Keyakinan adalah cahaya yang membimbing setiap langkah kita."
                    </p>
                </div>

                {/* Grid Pilihan Agama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {religions.map((religion, index) => (
                        <motion.div
                            key={religion.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                        >
                            <Link 
                                href={religion.route !== '#' ? route(religion.route) : '#'}
                                className={`group block h-full p-8 rounded-[3rem] bg-gradient-to-br ${religion.color} text-white shadow-2xl ${religion.shadow} hover:scale-[1.05] active:scale-95 transition-all duration-300 relative overflow-hidden`}
                            >
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform duration-500">
                                        {religion.icon}
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight mb-2">{religion.name}</h3>
                                    <div className="flex gap-2">
                                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 text-[10px] font-black uppercase">
                                            <StarFour weight="fill" className="text-yellow-200" /> +50 XP
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 text-[10px] font-black uppercase">
                                            <Coins weight="fill" className="text-yellow-300" /> +10
                                        </div>
                                    </div>
                                </div>

                                {/* Ikon Latar Belakang Besar */}
                                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">
                                    {React.cloneElement(religion.icon, { size: 200 })}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info */}
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16 text-sm text-muted-foreground font-medium"
                >
                    Pilihan ini bersifat sementara. Ke depannya, jurnal akan otomatis menyesuaikan dengan profil akunmu.
                </motion.p>
            </div>
        </div>
    );
}