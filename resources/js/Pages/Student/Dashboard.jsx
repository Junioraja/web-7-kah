import React, { useState, useEffect } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    StarFour, House, User, Trophy, Storefront, Bell, Coins,
    Fire, CheckCircle, Sun, HandsPraying, PersonSimpleRun,
    Carrot, BookOpen, Users, MoonStars, CaretRight, Plus,
    SunDim, Moon, ChartBar, Crown, EnvelopeSimple,
    LockKey
} from '@phosphor-icons/react';

// Dummy Data untuk Grafik Mingguan
const weeklyData = [
    { name: 'Sen', xp: 400 }, { name: 'Sel', xp: 650 }, { name: 'Rab', xp: 900 },
    { name: 'Kam', xp: 1200 }, { name: 'Jum', xp: 1500 }, { name: 'Sab', xp: 2000 },
    { name: 'Min', xp: 2500 },
];

// Dummy Data untuk Leaderboard
const leaderboardData = [
    { id: 1, name: 'Budi S.', xp: 2500, avatar: 'https://i.pravatar.cc/150?u=budi' },
    { id: 2, name: 'Siti A.', xp: 2450, avatar: 'https://i.pravatar.cc/150?u=siti' },
    { id: 3, name: 'Rudi H.', xp: 2300, avatar: 'https://i.pravatar.cc/150?u=rudi' },
];

export default function Dashboard() {
    const { auth } = usePage().props;
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // --- LOGIKA TOGGLE TEMA ---
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    // --------------------------

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-500 flex relative overflow-hidden">
            <Head title="Dashboard Murid - TunasHebat" />

            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-[100px] -z-10"></div>

            {/* SIDEBAR (Desktop) */}
            <aside className="hidden lg:flex w-72 h-screen sticky top-0 bg-card/50 backdrop-blur-xl border-r border-border flex-col p-6 z-20">
                <div className="flex items-center gap-3 mb-12">
                    <div className="p-2 bg-brand-primary/10 rounded-xl">
                        <StarFour weight="fill" size={24} className="text-brand-primary" />
                    </div>
                    <span className="font-black text-xl tracking-tighter uppercase bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">TunasHebat</span>
                </div>
                <nav className="space-y-3 flex-1">
                    <NavItem icon={<House weight="fill" />} label="Beranda" active />
                    <NavItem icon={<ChartBar />} label="Statistik" />
                    <NavItem icon={<Trophy />} label="Peringkat" />
                    <NavItem icon={<Storefront />} label="Toko Skin" />
                    <NavItem icon={<EnvelopeSimple />} label="Pesan" badge={2} />
                    <Link href={route('student.profile')}>
                        <NavItem icon={<User />} label="Profil Saya" />
                    </Link>
                </nav>
                {/* User Mini Profile di Sidebar */}
                <div className="p-4 bg-card/80 rounded-2xl border border-border flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?u=budi" className="w-10 h-10 rounded-full border-2 border-brand-primary" />
                    <div>
                        <h4 className="font-bold text-sm truncate">{auth.user.name}</h4>
                        <p className="text-xs text-muted-foreground">Siswa Level 12</p>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
                {/* HEADER SECTION */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl lg:text-4xl font-black mb-2">
                            Selamat Pagi, <span className="text-brand-primary">{auth.user.name.split(' ')[0]}!</span> 👋
                        </h1>
                        <p className="text-muted-foreground font-medium">Siap untuk membentuk kebiasaan hebat hari ini?</p>
                    </motion.div>

                    <div className="flex items-center gap-4 self-end md:self-auto">
                        {/* Koin & Notif */}
                        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md p-2 rounded-full border border-border shadow-sm">
                            <div className="flex items-center gap-2 bg-koin/10 px-4 py-2 rounded-full">
                                <Coins size={20} weight="fill" className="text-koin" />
                                <span className="font-black text-koin">{auth.user.koin.toLocaleString()}</span>
                            </div>
                            <button className="relative p-2.5 rounded-full hover:bg-muted transition-colors">
                                <Bell size={20} weight="bold" className="text-muted-foreground" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-[1.5px] border-card"></span>
                            </button>
                        </div>

                        {/* THEME TOGGLE BUTTON */}
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-sm hover:bg-muted transition-all active:scale-95"
                        >
                            <AnimatePresence mode='wait'>
                                {theme === 'light' ? (
                                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                        <SunDim size={22} weight="fill" className="text-orange-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                        <Moon size={22} weight="fill" className="text-brand-primary" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </header>

                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">

                    {/* HERO ROW: XP Card + Grafik Chart */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* XP PROGRESS CARD (Besar) */}
                        <motion.div variants={itemVariants} className="xl:col-span-1 bg-gradient-to-br from-brand-primary to-brand-secondary p-8 rounded-5xl text-white shadow-xl shadow-brand-primary/20 relative overflow-hidden group">
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4 opacity-90">
                                        <StarFour weight="fill" />
                                        <h3 className="font-bold uppercase tracking-wider text-sm">Total Experience (XP)</h3>
                                    </div>
                                    <div className="flex items-end gap-3 mb-6">
                                        <span className="text-6xl font-black tracking-tight">{auth.user.xp.toLocaleString()}</span>
                                        <span className="text-xl font-bold opacity-70 mb-2">/ 3000</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-bold mb-2 opacity-90">
                                        <span>Progres Level 12</span>
                                        <span>83%</span>
                                    </div>
                                    <div className="w-full h-4 bg-black/20 rounded-full overflow-hidden p-0.5">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: '83%' }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            className="h-full bg-white rounded-full shadow-[0_2px_10px_rgba(255,255,255,0.5)] relative"
                                        >
                                            <div className="absolute right-0 top-0 h-full w-6 bg-white/50 blur-md animate-pulse"></div>
                                        </motion.div>
                                    </div>
                                    <p className="text-xs mt-4 opacity-80 font-medium">Butuh 500 XP lagi untuk naik ke Level 13!</p>
                                </div>
                            </div>
                            {/* Decorative Pattern */}
                            <StarFour className="absolute -right-12 -top-12 text-white/10 group-hover:rotate-12 transition-transform duration-700" size={250} weight="fill" />
                        </motion.div>

                        {/* WEEKLY ACTIVITY CHART */}
                        <motion.div variants={itemVariants} className="xl:col-span-2 bg-card/80 backdrop-blur-md p-8 rounded-5xl border border-border shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <ChartBar className="text-brand-primary" weight="fill" />
                                        Aktivitas Minggu Ini
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Konsistensi adalah kunci!</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-4 py-2 rounded-full">
                                    <Fire weight="fill" /> 5 Hari Streak
                                </div>
                            </div>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weeklyData}>
                                        <defs>
                                            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--brand-primary))" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="hsl(var(--brand-primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.2)" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dx={-10} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: 'hsl(var(--brand-primary))', fontWeight: 'bold' }}
                                            cursor={{ stroke: 'hsl(var(--brand-primary) / 0.5)', strokeWidth: 2 }}
                                        />
                                        <Area type="monotone" dataKey="xp" stroke="hsl(var(--brand-primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" activeDot={{ r: 8, strokeWidth: 0 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                    {/* SECOND ROW: 7 Habits & Leaderboard */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        {/* 7 HABITS GRID (Dominan) */}
                        <motion.div variants={itemVariants} className="xl:col-span-3">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-xl">Jurnal 7 Kebiasaan Harian</h3>
                                <p className="text-sm font-medium text-brand-primary">Kamis, 26 Okt 2023</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* 1. Bangun Pagi */}
                                <Link href={route('student.habit.wakeup')} className="block">
                                    <HabitCard icon={<Sun weight="fill" className="text-yellow-500" />} title="Bangun Pagi" sub="04:30 WIB" status="pending" />
                                </Link>

                                {/* 2. Beribadah */}
                                <Link href={route('student.habit.worship.index')} className="block">
                                    <HabitCard icon={<HandsPraying weight="fill" className="text-emerald-500" />} title="Beribadah" sub="5 Waktu" status="pending" />
                                </Link>

                                {/* 3. Olahraga */}
                                <Link href={route('student.habit.exercise')} className="block">
                                    <HabitCard icon={<PersonSimpleRun weight="fill" className="text-red-500" />} title="Olahraga" sub="30 Menit" status="pending" />
                                </Link>

                                {/* 4. Makan Sehat */}
                                <Link href={route('student.habit.healthyfood')} className="block">
                                    <HabitCard icon={<Carrot weight="fill" className="text-orange-500" />} title="Makan Sehat" sub="4 Sehat 5S" status="pending" />
                                </Link>

                                {/* 5. Gemar Belajar */}
                                <Link href={route('student.habit.learn')} className="block">
                                    <HabitCard icon={<BookOpen weight="fill" className="text-blue-500" />} title="Gemar Belajar" sub="Membaca/PR" status="pending" />
                                </Link>

                                {/* 6. Bantu Orang Tua */}
                                <Link href={route('student.habit.social')} className="block">
                                    <HabitCard icon={<Users weight="fill" className="text-purple-500" />} title="Bantu Orang Tua" sub="Min. 1 Kebaikan" status="pending" />
                                </Link>

                                {/* 7. Tidur Cepat (Habit yang baru kita buat) */}
                                <Link href={route('student.habit.sleep')} className="col-span-2 block">
                                    <HabitCard icon={<MoonStars weight="fill" className="text-indigo-500" />} title="Tidur Cepat" sub="21:00 WIB" span status="pending" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* SIDEBAR WIDGETS: Leaderboard & Tasks */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            {/* LEADERBOARD WIDGET */}
                            <div className="bg-card/80 backdrop-blur-md p-6 rounded-4xl border border-border shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <Crown weight="fill" className="text-amber-500" /> Peringkat Kelas
                                    </h3>
                                    <Link href="#" className="text-xs font-bold text-brand-primary hover:underline">Lihat Semua</Link>
                                </div>
                                <div className="space-y-4">
                                    {leaderboardData.map((student, index) => (
                                        <div key={student.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted transition-colors relative overflow-hidden">
                                            {index === 0 && <div className="absolute left-0 top-0 h-full w-1 bg-amber-500"></div>}
                                            <div className="flex items-center gap-3">
                                                <div className={`font-black w-6 text-center ${index === 0 ? 'text-amber-500 text-lg' : 'text-muted-foreground'}`}>#{index + 1}</div>
                                                <img src={student.avatar} className="w-10 h-10 rounded-full border-2 border-border" />
                                                <p className="font-bold text-sm">{student.name}</p>
                                            </div>
                                            <div className="font-black text-sm flex items-center gap-1">
                                                {student.xp.toLocaleString()} <span className="text-[10px] text-muted-foreground">XP</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* MINI TASK LIST */}
                            <div className="bg-card/80 backdrop-blur-md p-6 rounded-4xl border border-border shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-sm">Target Tambahan</h3>
                                    <button className="p-1.5 bg-muted rounded-lg hover:bg-border transition">
                                        <Plus weight="bold" size={14} />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <TaskItem title="PR Matematika Hal. 50" urgent />
                                    <TaskItem title="Membaca Buku Cerita" done />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </main>

            {/* MOBILE BOTTOM NAV (Hanya muncul di layar kecil) */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border p-4 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <MobileNavItem icon={<House weight="fill" />} active />
                <MobileNavItem icon={<ChartBar weight="bold" />} />
                <div className="relative -top-6 p-4 bg-brand-primary rounded-full shadow-lg shadow-brand-primary/30 text-white">
                    <Plus weight="bold" size={24} />
                </div>
                <MobileNavItem icon={<Trophy weight="bold" />} />
                <Link href={route('student.profile')}>
                    <MobileNavItem icon={<User weight="bold" />} />
                </Link>
            </nav>
        </div>
    );
}

// --- SUB-COMPONENTS UNTUK KERAPIHAN KODE ---

function NavItem({ icon, label, active = false, badge = 0 }) {
    return (
        <Link href="#" className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all group relative overflow-hidden ${active ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
            <div className="flex items-center gap-4 relative z-10">
                <span className={`text-xl transition-transform group-hover:scale-110 ${active ? '' : 'opacity-70 group-hover:opacity-100'}`}>{icon}</span>
                <span className="text-sm">{label}</span>
            </div>
            {badge > 0 && <span className={`text-xs font-black px-2 py-0.5 rounded-full ${active ? 'bg-white text-brand-primary' : 'bg-brand-primary text-white'}`}>{badge}</span>}
            {!active && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>}
        </Link>
    );
}

function HabitCard({ icon, title, sub, status = 'pending', span = false }) {
    const statusColors = {
        done: 'bg-brand-primary/10 border-brand-primary/30',
        pending: 'bg-card border-border hover:border-brand-primary/50',
        locked: 'bg-muted/50 border-transparent opacity-70 grayscale'
    };

    return (
        <motion.div
            whileHover={status !== 'locked' ? { y: -5, scale: 1.02 } : {}}
            whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
            className={`${statusColors[status]} p-5 rounded-[2rem] border shadow-sm cursor-pointer relative overflow-hidden group transition-all duration-300 ${span ? 'col-span-2' : ''}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-3xl shadow-inner-sm group-hover:rotate-6 transition-transform`}>
                    {icon}
                </div>
                {status === 'done' ? (
                    <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-primary/30">
                        <CheckCircle weight="fill" size={20} />
                    </div>
                ) : status === 'locked' ? (
                    <LockKey weight="fill" className="text-muted-foreground" size={24} />
                ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-border group-hover:border-brand-primary transition-colors"></div>
                )}
            </div>
            <div>
                <h4 className="font-bold text-foreground text-base leading-tight mb-1">{title}</h4>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{sub}</p>
            </div>
            {status === 'pending' && <CaretRight className="absolute bottom-4 right-4 text-border group-hover:text-brand-primary transition-colors group-hover:translate-x-1" weight="bold" />}
        </motion.div>
    );
}

function TaskItem({ title, done = false, urgent = false }) {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${done ? 'bg-muted/50 border-transparent opacity-60' : urgent ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-card border-border hover:bg-muted'}`}>
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${done ? 'bg-brand-primary border-brand-primary text-white' : urgent ? 'border-red-400' : 'border-muted-foreground'}`}>
                {done && <CheckCircle weight="fill" size={16} />}
            </div>
            <p className={`text-sm font-bold ${done ? 'line-through' : ''}`}>{title}</p>
        </div>
    );
}

function MobileNavItem({ icon, active = false }) {
    return (
        <button className={`p-3 rounded-2xl transition-all ${active ? 'text-brand-primary bg-brand-primary/10' : 'text-muted-foreground'}`}>
            {React.cloneElement(icon, { size: 26 })}
        </button>
    );
}