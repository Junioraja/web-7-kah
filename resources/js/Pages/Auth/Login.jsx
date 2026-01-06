import { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    GraduationCap,
    Presentation,
    UserCheck,
    Eye,
    EyeOff,
    ArrowRight,
    Sparkles,
    ArrowLeft,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { router } from "@inertiajs/react";

export default function Login() {
    // State Role & Tipe Guru
    const [role, setRole] = useState("siswa");
    const [guruType, setGuruType] = useState("pns");
    const [showPassword, setShowPassword] = useState(false);

    // --- CONFIG TEMA (RAHASIA TRANSISI HALUS) ---
    const roleThemes = {
        siswa: {
            bg: "bg-sky-500", // Warna Header
            bgHover: "hover:bg-sky-600", // Warna Hover Button
            text: "text-sky-500", // Warna Teks Aktif
            textLight: "text-sky-100", // Teks Header Pudar
            border: "focus:border-sky-500", // Border Input
            ring: "focus:ring-sky-500", // Ring Input
            shadow: "shadow-sky-200", // Shadow Button
            iconBg: "bg-sky-50", // Background Icon Tab
            blob: "bg-sky-200", // Background Blob
        },
        guru: {
            bg: "bg-blue-600",
            bgHover: "hover:bg-blue-700",
            text: "text-blue-600",
            textLight: "text-blue-100",
            border: "focus:border-blue-500",
            ring: "focus:ring-blue-500",
            shadow: "shadow-blue-200",
            iconBg: "bg-blue-50",
            blob: "bg-blue-200",
        },
        orangtua: {
            bg: "bg-indigo-600",
            bgHover: "hover:bg-indigo-700",
            text: "text-indigo-600",
            textLight: "text-indigo-100",
            border: "focus:border-indigo-500",
            ring: "focus:ring-indigo-500",
            shadow: "shadow-indigo-200",
            iconBg: "bg-indigo-50",
            blob: "bg-indigo-200",
        },
    };

    // Ambil tema saat ini berdasarkan state role
    const activeTheme = roleThemes[role];

    const { data, setData, post, processing } = useForm({
        role: "siswa",
        identifier: "",
        password: "",
        guru_type: "pns",
    });

    // --- LOGIKA OTOMATIS GANTI ROLE DARI URL ---
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const roleParam = searchParams.get("role");

        if (roleParam && ["siswa", "guru", "orangtua"].includes(roleParam)) {
            setRole(roleParam);
            setData("role", roleParam);
        }
    }, []);

    const submit = (e) => {
    e.preventDefault(); // Mencegah reload browser biasa
    post('/login');     // Mengirim data via Inertia
};

    // Fungsi ganti role dengan update data form & URL
    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setData({ ...data, role: newRole, identifier: "" });

        // Update URL tanpa refresh (Optional UX improvement)
        const url = new URL(window.location);
        url.searchParams.set("role", newRole);
        window.history.pushState({}, "", url);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-700">
            <Head title="Masuk - TunasHebat" />

            {/* Background Blobs (Ikut Berubah Warna) */}
            <div
                className={`fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 transition-colors duration-1000 ${activeTheme.blob}`}
            ></div>
            <div
                className={`fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3 transition-colors duration-1000 ${activeTheme.blob}`}
            ></div>

            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-xl border border-white relative z-10 overflow-hidden transition-all duration-500">
                {/* --- HEADER DINAMIS --- */}
                <div
                    className={`${activeTheme.bg} p-8 pb-12 text-center text-white relative transition-colors duration-500 ease-in-out`}
                >
                    {/* Tombol Kembali ke Beranda */}
                    <Link
                        href="/"
                        className={`absolute top-6 left-6 ${activeTheme.textLight} hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10`}
                        title="Kembali ke Beranda"
                    >
                        <ArrowLeft size={24} />
                    </Link>

                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner">
                            <Sparkles
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                            />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Selamat Datang!
                    </h2>
                    <p
                        className={`${activeTheme.textLight} text-sm mt-1 transition-colors duration-500`}
                    >
                        Silakan masuk sesuai peran Anda.
                    </p>
                </div>

                <div className="p-8 -mt-8 bg-white rounded-t-[2.5rem] relative">
                    {/* --- ROLE TABS --- */}
                    <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
                        {["siswa", "guru", "orangtua"].map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => handleRoleChange(item)}
                                className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                                    role === item
                                        ? "bg-white shadow-md scale-100"
                                        : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                                }`}
                            >
                                <div
                                    className={`transition-colors duration-300 ${
                                        role === item
                                            ? roleThemes[item].text
                                            : "text-slate-400 group-hover:text-slate-500"
                                    }`}
                                >
                                    {item === "siswa" && (
                                        <GraduationCap
                                            size={20}
                                            className="mb-1"
                                        />
                                    )}
                                    {item === "guru" && (
                                        <Presentation
                                            size={20}
                                            className="mb-1"
                                        />
                                    )}
                                    {item === "orangtua" && (
                                        <UserCheck size={20} className="mb-1" />
                                    )}
                                </div>
                                <span
                                    className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                                        role === item
                                            ? roleThemes[item].text
                                            : ""
                                    }`}
                                >
                                    {item === "orangtua" ? "Ortu" : item}
                                </span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* 1. ROLE SISWA (INPUT ANGKA SAJA) */}
                        {role === "siswa" && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <Label className="text-slate-600 font-semibold ml-1">
                                    NIS (Nomor Induk Siswa)
                                </Label>
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Contoh: 123456"
                                    className={`mt-1.5 h-12 rounded-xl bg-slate-50 border-slate-200 transition-all duration-300 focus:bg-white ${activeTheme.ring} ${activeTheme.border}`}
                                    value={data.identifier}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        );
                                        setData("identifier", value);
                                    }}
                                    autoFocus
                                />
                            </div>
                        )}

                        {/* 2. ROLE GURU (MICRO SWITCH) */}
                        {role === "guru" && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-slate-600 font-semibold ml-1">
                                            {guruType === "pns"
                                                ? "NIP (Nomor Induk Pegawai)"
                                                : "Nama Lengkap"}
                                        </Label>

                                        {/* Micro Switch Guru */}
                                        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setGuruType("pns");
                                                    setData("identifier", "");
                                                }}
                                                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-300 ${
                                                    guruType === "pns"
                                                        ? "bg-white text-blue-600 shadow-sm"
                                                        : "text-slate-400 hover:text-slate-600"
                                                }`}
                                            >
                                                PNS
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setGuruType("honorer");
                                                    setData("identifier", "");
                                                }}
                                                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-300 ${
                                                    guruType === "honorer"
                                                        ? "bg-white text-blue-600 shadow-sm"
                                                        : "text-slate-400 hover:text-slate-600"
                                                }`}
                                            >
                                                Honorer
                                            </button>
                                        </div>
                                    </div>

                                    <Input
                                        key={guruType}
                                        type="text"
                                        inputMode={
                                            guruType === "pns"
                                                ? "numeric"
                                                : "text"
                                        }
                                        placeholder={
                                            guruType === "pns"
                                                ? "Contoh: 19850101..."
                                                : "Masukkan Nama Lengkap"
                                        }
                                        className={`h-12 rounded-xl bg-slate-50 border-slate-200 transition-all duration-300 focus:bg-white ${activeTheme.ring} ${activeTheme.border}`}
                                        value={data.identifier}
                                        onChange={(e) => {
                                            let value = e.target.value;
                                            if (guruType === "pns") {
                                                value = value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                );
                                            }
                                            setData("identifier", value);
                                        }}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}

                        {/* 3. ROLE ORANG TUA */}
                        {role === "orangtua" && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <Label className="text-slate-600 font-semibold ml-1">
                                    Email Terdaftar
                                </Label>
                                <Input
                                    type="email"
                                    placeholder="nama@email.com"
                                    className={`mt-1.5 h-12 rounded-xl bg-slate-50 border-slate-200 transition-all duration-300 focus:bg-white ${activeTheme.ring} ${activeTheme.border}`}
                                    value={data.identifier}
                                    onChange={(e) =>
                                        setData("identifier", e.target.value)
                                    }
                                    autoFocus
                                />
                            </div>
                        )}

                        {/* --- PASSWORD FIELD --- */}
                        <div className="relative">
                            <Label className="text-slate-600 font-semibold ml-1">
                                Kata Sandi
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`mt-1.5 h-12 rounded-xl bg-slate-50 border-slate-200 pr-10 transition-all duration-300 focus:bg-white ${activeTheme.ring} ${activeTheme.border}`}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 translate-y-[-20%] text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* --- TOMBOL SUBMIT --- */}
                        <Button
                            className={`w-full h-12 rounded-xl text-md font-bold shadow-lg transition-all duration-500 active:scale-95 ${activeTheme.bg} ${activeTheme.bgHover} ${activeTheme.shadow}`}
                            disabled={processing}
                        >
                            Masuk Sekarang{" "}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>

                        {/* Link Register / Lupa Password */}
                        <div className="text-center pt-2 h-6">
                            {role === "orangtua" ? (
                                <p className="text-slate-500 text-sm animate-in fade-in duration-300">
                                    Belum punya akun?{" "}
                                    <Link
                                        href="/register"
                                        className={`font-bold transition-colors duration-300 hover:underline ${activeTheme.text}`}
                                    >
                                        Daftar Orang Tua
                                    </Link>
                                </p>
                            ) : (
                                <p className="text-slate-400 text-xs animate-in fade-in duration-300">
                                    Lupa NIS/NIP/Password? Hubungi Admin
                                    Sekolah.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
