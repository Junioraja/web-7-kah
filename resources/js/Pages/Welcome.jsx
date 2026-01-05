import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Pastikan framer-motion terinstall
import { X } from "lucide-react";
import { useMediaQuery } from "@/Hooks/use-media-query";
import {
    Sparkles,
    ArrowRight,
    PlayCircle,
    Sun,
    HeartHandshake,
    Activity,
    Carrot,
    BookOpen,
    Users,
    Moon,
    GraduationCap,
    Presentation,
    UserCheck,
    Menu,
    Bell,
    PieChart,
    CheckCircle2,
    Lightbulb,
    Trophy,
} from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from "@/Components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

export default function Welcome() {
    const [scrolled, setScrolled] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // DATA KEBIASAAN
    const habits = [
        {
            title: "Bangun Pagi",
            icon: <Sun className="w-6 h-6 text-white" />,
            theme: "orange",
            gradient: "from-orange-400 to-amber-500",
            bgLight: "bg-orange-50",
            borderColor: "border-orange-100",
            checkColor: "text-orange-500",
            imgUrl: "/images/lari-pagi.jpeg", // Pastikan gambar ada di public/images
            desc: "Menyiapkan mental juara sebelum matahari terbit.",
            benefits: [
                "Waktu persiapan lebih panjang",
                "Tidak terburu-buru",
                "Otak lebih segar",
            ],
            tips: "Letakkan alarm jauh dari kasur agar terpaksa bangun untuk mematikannya.",
        },
        {
            title: "Beribadah",
            icon: <HeartHandshake className="w-6 h-6 text-white" />,
            theme: "emerald",
            gradient: "from-emerald-400 to-green-500",
            bgLight: "bg-emerald-50",
            borderColor: "border-emerald-100",
            checkColor: "text-emerald-500",
            imgUrl: "/images/beribadah.jpeg",
            desc: "Menjalankan kewajiban agama sebagai pondasi jiwa.",
            benefits: [
                "Hati menjadi tenang",
                "Melatih disiplin waktu",
                "Bentuk rasa syukur",
            ],
            tips: "Siapkan peralatan ibadah yang bersih dan wangi agar lebih khusyuk.",
        },
        {
            title: "Olahraga",
            icon: <Activity className="w-6 h-6 text-white" />,
            theme: "red",
            gradient: "from-red-400 to-rose-500",
            bgLight: "bg-red-50",
            borderColor: "border-red-100",
            checkColor: "text-red-500",
            imgUrl: "/images/Olahraga.jpeg",
            desc: "Bergerak aktif minimal 15 menit agar tubuh bugar.",
            benefits: [
                "Jarang sakit",
                "Konsentrasi meningkat",
                "Mood lebih happy",
            ],
            tips: "Pilih olahraga yang kamu suka (main bola/sepeda) agar tidak terasa berat.",
        },
        {
            title: "Makan Sehat",
            icon: <Carrot className="w-6 h-6 text-white" />,
            theme: "green",
            gradient: "from-green-400 to-lime-500",
            bgLight: "bg-green-50",
            borderColor: "border-green-100",
            checkColor: "text-green-500",
            imgUrl: "/images/makan-sehat.jpeg",
            desc: "Nutrisi seimbang untuk energi dan pertumbuhan.",
            benefits: [
                "Energi stabil seharian",
                "Pertumbuhan optimal",
                "Kulit lebih sehat",
            ],
            tips: "Minum air putih 1 gelas sebelum makan untuk pencernaan yang baik.",
        },
        {
            title: "Gemar Belajar",
            icon: <BookOpen className="w-6 h-6 text-white" />,
            theme: "blue",
            gradient: "from-blue-400 to-indigo-500",
            bgLight: "bg-blue-50",
            borderColor: "border-blue-100",
            checkColor: "text-blue-500",
            imgUrl: "/images/membaca.jpeg",
            desc: "Membaca dan mengulang pelajaran dengan fokus.",
            benefits: [
                "Wawasan luas",
                "Mudah saat ujian",
                "Melatih daya ingat",
            ],
            tips: "Matikan notifikasi HP atau simpan di ruangan lain saat sedang belajar.",
        },
        {
            title: "Bermasyarakat",
            icon: <Users className="w-6 h-6 text-white" />,
            theme: "purple",
            gradient: "from-purple-400 to-violet-500",
            bgLight: "bg-purple-50",
            borderColor: "border-purple-100",
            checkColor: "text-purple-500",
            imgUrl: "/images/bermasyarakat.jpeg",
            desc: "Membantu orang tua dan bersosialisasi.",
            benefits: [
                "Disayang orang tua",
                "Punya banyak teman",
                "Melatih empati",
            ],
            tips: "Mulai dengan hal kecil: Senyum dan sapa tetangga saat bertemu.",
        },
        {
            title: "Tidur Cepat",
            icon: <Moon className="w-6 h-6 text-white" />,
            theme: "indigo",
            gradient: "from-indigo-400 to-slate-500",
            bgLight: "bg-indigo-50",
            borderColor: "border-indigo-100",
            checkColor: "text-indigo-500",
            imgUrl: "/images/tidur-cepat.jpeg",
            desc: "Istirahat cukup maksimal jam 21.00 malam.",
            benefits: [
                "Bangun lebih segar",
                "Tinggi badan optimal",
                "Tidak mengantuk",
            ],
            tips: "Redupkan lampu kamar 30 menit sebelum tidur agar mengantuk.",
        },
    ];

    const handleScroll = (e, id) => {
        e.preventDefault(); // Mencegah loncat kasar default anchor
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen font-sans text-slate-600 bg-sky-50 selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
            <Head title="Jurnal Karakter Anak Hebat" />

            {/* BACKGROUND BLOBS */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-sky-200 rounded-full blur-3xl opacity-40 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            {/* NAVBAR */}
            <nav
                className={`fixed w-full z-50 top-0 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
                        : "bg-transparent py-6"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-400/30">
                                <Sparkles size={20} fill="currentColor" />
                            </div>
                            <span className="font-bold text-xl text-slate-800 tracking-tight">
                                Tunas<span className="text-sky-500">Hebat</span>
                            </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a
                                href="#home"
                                className="text-slate-600 hover:text-sky-600 font-medium transition"
                            >
                                Beranda
                            </a>
                            <a
                                href="#features"
                                onClick={(e) => handleScroll(e, "features")}
                                className="text-slate-600 hover:text-sky-600 font-medium transition cursor-pointer"
                            >
                                7 Kebiasaan
                            </a>
                            <Button
                                asChild
                                className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-6"
                            >
                                <Link href="/login">Masuk</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section
                id="home"
                className="relative pt-32 pb-20 lg:pt-48 lg:pb-32"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-semibold text-sky-600">
                                    Platform Jurnal Karakter Siswa
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15]">
                                Membangun <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                                    Generasi Emas
                                </span>{" "}
                                Indonesia
                            </h1>
                            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                                Aplikasi monitoring harian yang menghubungkan
                                Murid, Guru, dan Orang Tua untuk membentuk 7
                                kebiasaan hebat sejak dini.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-base font-bold shadow-xl shadow-slate-900/20 cursor-pointer"
                                    onClick={(e) => handleScroll(e, "role")}
                                >
                                    Mulai Jurnal{" "}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-14 px-8 bg-white border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-600 rounded-xl text-base font-bold cursor-pointer"
                                    onClick={(e) => handleScroll(e, "features")} // <--- INI KUNCINYA
                                >
                                    <PlayCircle className="mr-2 w-6 h-6 text-sky-500" />
                                    Pelajari Kebiasaan
                                </Button>
                            </div>
                            <div className="flex items-center gap-8 pt-4 border-t border-slate-200/60">
                                <div>
                                    <p className="text-2xl font-bold text-sky-600">
                                        1k+
                                    </p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                                        Siswa Aktif
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative lg:h-[600px] flex items-center justify-center">
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut",
                                }}
                                className="relative w-full max-w-md aspect-[4/5] bg-white rounded-[2.5rem] shadow-2xl border-8 border-white overflow-hidden ring-1 ring-slate-900/5"
                            >
                                <div className="h-32 bg-gradient-to-b from-sky-500 to-sky-400 p-6 flex flex-col justify-between text-white">
                                    <div className="flex justify-between items-center">
                                        <Menu className="w-6 h-6" />
                                        <Bell className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sky-100 text-sm">
                                            Selamat Pagi,
                                        </p>
                                        <p className="font-bold text-2xl">
                                            Dwi Sunanto
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="bg-sky-50 p-4 rounded-2xl flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white">
                                            <PieChart className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">
                                                Progress Hari Ini
                                            </p>
                                            <div className="w-32 h-2 bg-sky-200 rounded-full mt-1">
                                                <div className="w-3/4 h-full bg-sky-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                                                    <Sun size={18} />
                                                </div>
                                                <span className="font-semibold text-sm">
                                                    Bangun Pagi
                                                </span>
                                            </div>
                                            <CheckCircle2
                                                className="text-green-500 w-5 h-5"
                                                fill="currentColor"
                                                color="white"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                                    <HeartHandshake size={18} />
                                                </div>
                                                <span className="font-semibold text-sm">
                                                    Beribadah
                                                </span>
                                            </div>
                                            <CheckCircle2
                                                className="text-green-500 w-5 h-5"
                                                fill="currentColor"
                                                color="white"
                                            />
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                        }}
                                        className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 z-10"
                                    >
                                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                                            <Sparkles
                                                className="w-6 h-6"
                                                fill="currentColor"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">
                                                Hebat!
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Streak 5 Hari
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROLE SELECTION */}
            <section id="role" className="py-20 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            Siapa Kamu?
                        </h2>
                        <p className="text-slate-500">
                            Pilih peranmu untuk masuk ke dasbor yang disesuaikan
                            dengan kebutuhanmu.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <RoleCard
                            title="Murid"
                            icon={<GraduationCap className="w-8 h-8" />}
                            color="sky"
                            desc="Isi jurnal harian, lihat grafik progress, dan kumpulkan lencana prestasi."
                            link="/login"
                        />
                        <RoleCard
                            title="Guru"
                            icon={<Presentation className="w-8 h-8" />}
                            color="blue"
                            desc="Pantau aktivitas kelas, berikan feedback, dan validasi kebiasaan siswa."
                            link="/login"
                        />
                        <RoleCard
                            title="Orang Tua"
                            icon={<UserCheck className="w-8 h-8" />}
                            color="indigo"
                            desc="Dukungan dari rumah, lihat perkembangan anak, dan komunikasi dengan guru."
                            link="/login"
                        />
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-12 text-center md:text-left">
                        <span className="text-sky-500 font-bold tracking-wider uppercase text-sm">
                            Kurikulum Karakter
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">
                            7 Kebiasaan Utama
                        </h2>
                        <p className="text-slate-500 mt-2">
                            Klik kartu untuk melihat manfaat dan tips
                            melakukannya.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {habits.map((habit, index) => (
                            <HabitModal
                                key={index}
                                habit={habit}
                                isDesktop={isDesktop}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-white border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                            <Sparkles size={16} fill="currentColor" />
                        </div>
                        <span className="font-bold text-slate-700">
                            TunasHebat
                        </span>
                    </div>
                    <p className="text-slate-400 text-sm">
                        © 2025 Education Platform Indonesia. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function RoleCard({ title, icon, color, desc, link }) {
    return (
        <Link
            href={link}
            className={`group relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-${color}-300 shadow-lg shadow-slate-200/50 hover:shadow-${color}-500/20 transition-all duration-300 hover:-translate-y-2`}
        >
            <div
                className={`absolute top-0 left-0 w-full h-2 bg-${color}-500 rounded-t-3xl`}
            ></div>
            <div
                className={`w-16 h-16 bg-${color}-50 rounded-2xl flex items-center justify-center text-${color}-500 mb-6 group-hover:scale-110 transition duration-300`}
            >
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm mb-6">{desc}</p>
            <div
                className={`w-full py-3 rounded-xl bg-slate-50 text-slate-700 font-bold group-hover:bg-${color}-500 group-hover:text-white transition-colors flex items-center justify-center gap-2`}
            >
                Masuk {title} <ArrowRight className="w-4 h-4" />
            </div>
        </Link>
    );
}

// --- ULTIMATE ANIMATED MODAL (PERBAIKAN CENTER & SUDUT) ---
function HabitModal({ habit, isDesktop }) {
    const [open, setOpen] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    };

    // Varian khusus untuk Icon (Zoom In) agar tidak bentrok dengan posisi
    const iconScaleVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 },
        },
    };

    const TriggerCard = (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95, rotate: -1 }}
            className="group relative p-4 rounded-3xl border border-slate-100 bg-white hover:shadow-xl transition-all cursor-pointer h-full flex flex-col items-center justify-center gap-3 overflow-hidden"
            onClick={() => setOpen(true)}
        >
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${habit.gradient} transition-opacity duration-300`}
            ></div>
            <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${habit.gradient} shadow-md flex items-center justify-center`}
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                {habit.icon}
            </motion.div>
            <h4 className="font-bold text-slate-700 text-sm leading-tight relative z-10 text-center">
                {habit.title}
            </h4>
        </motion.div>
    );

    const AnimatedContent = (
        <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Header Image */}
            <div className="relative h-64 w-full shrink-0">
                <img
                    src={habit.imgUrl}
                    // FIX 1: Hapus rounded di sini, biarkan Parent yang memotong (overflow-hidden)
                    className="w-full h-full object-cover"
                    alt={habit.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

                {/* Tombol Close */}
                {isDesktop ? (
                    <DialogTrigger asChild>
                        <button
                            className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </DialogTrigger>
                ) : (
                    <DrawerClose asChild>
                        <button className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors">
                            <X size={20} />
                        </button>
                    </DrawerClose>
                )}

                {/* Floating Icon Wrapper (POSISI STATIC) */}
                {/* FIX 2: Div biasa untuk posisi, agar translate-x tidak tertimpa animasi */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10">
                    {/* Motion Div di dalamnya hanya untuk animasi Scale/Muncul */}
                    <motion.div
                        variants={iconScaleVariants}
                        className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${habit.gradient} shadow-xl flex items-center justify-center ring-4 ring-white`}
                    >
                        <div className="scale-150">{habit.icon}</div>
                    </motion.div>
                </div>
            </div>

            {/* Body */}
            <div className="px-6 pt-14 pb-32 text-center">
                <motion.h3
                    variants={itemVariants}
                    className="text-3xl font-extrabold text-slate-900 mb-2"
                >
                    {habit.title}
                </motion.h3>
                <motion.p
                    variants={itemVariants}
                    className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm mx-auto"
                >
                    {habit.desc}
                </motion.p>

                <motion.div variants={itemVariants} className="mt-8 text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 pl-1">
                        Manfaat Utama
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {habit.benefits.map((benefit, i) => (
                            <motion.div
                                variants={itemVariants}
                                key={i}
                                className={`p-3 rounded-2xl bg-white border-2 ${habit.borderColor} shadow-sm flex items-center gap-3`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full ${habit.bgLight} flex items-center justify-center shrink-0`}
                                >
                                    <CheckCircle2
                                        size={16}
                                        className={habit.checkColor}
                                    />
                                </div>
                                <span className="text-slate-700 font-semibold text-sm">
                                    {benefit}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-6 relative overflow-hidden rounded-2xl bg-slate-900 text-white p-5 text-left shadow-lg group"
                >
                    <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${habit.gradient} blur-3xl opacity-40 -mr-10 -mt-10`}
                    ></div>
                    <div className="relative z-10 flex items-start gap-4">
                        <div className="p-2 bg-white/10 rounded-xl">
                            <Lightbulb className="text-yellow-300" size={24} />
                        </div>
                        <div>
                            <h5 className="font-bold text-yellow-300 text-xs uppercase tracking-wide mb-1">
                                Tips Jitu
                            </h5>
                            <p className="font-bold text-lg leading-tight">
                                "{habit.tips}"
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );

    // --- RENDER DESKTOP ---
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{TriggerCard}</DialogTrigger>
                {/* Parent Wrapper dengan Overflow Hidden agar sudut gambar terpotong rapi */}
                <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none rounded-[2.5rem] bg-white shadow-2xl">
                    <div className="max-h-[85vh] overflow-y-auto scrollbar-hide relative">
                        {AnimatedContent}

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="px-6 pb-8 -mt-20 relative z-20 bg-white"
                        >
                            <Button
                                asChild
                                className={`w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-${habit.theme}-500/20 bg-gradient-to-r ${habit.gradient} hover:opacity-90 hover:scale-[1.02] transition-all`}
                            >
                                <Link href="/login">Mulai Sekarang</Link>
                            </Button>
                        </motion.div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // --- RENDER MOBILE ---
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{TriggerCard}</DrawerTrigger>
            <DrawerContent className="bg-slate-50 border-none rounded-t-[2.5rem] h-[92vh] flex flex-col after:!bg-slate-300">
                <div className="mx-auto w-16 h-1.5 flex-shrink-0 rounded-full bg-slate-300 mb-2 mt-4" />

                {/* Parent Wrapper dengan Overflow Hidden & Radius untuk Mobile */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative rounded-t-[2.5rem] overflow-hidden bg-white mx-2 mt-2 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                    {AnimatedContent}
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="p-4 bg-white border-t border-slate-100 pb-8 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50"
                >
                    <Button
                        asChild
                        className={`w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-${habit.theme}-500/20 bg-gradient-to-r ${habit.gradient} hover:opacity-90 transition-all active:scale-95`}
                    >
                        <Link href="/login">Mulai Kebiasaan Ini</Link>
                    </Button>
                </motion.div>
            </DrawerContent>
        </Drawer>
    );
}
