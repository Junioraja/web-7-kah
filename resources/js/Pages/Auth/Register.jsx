import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Envelope, IdentificationCard, LockKey, ArrowLeft, Eye, EyeSlash } from '@phosphor-icons/react';

export default function Register() {
    // State untuk toggle liat password
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        child_nis: '', 
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0ea5e9] to-[#38bdf8] flex items-center justify-center p-4 font-sans text-slate-700 relative overflow-hidden">
            <Head title="Daftar Wali - TunasHebat" />

            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-white/20 rounded-full blur-[100px] animate-pulse"></div>
            
            <div className="bg-white/90 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[2.5rem] w-full max-w-md overflow-hidden relative z-10">
                
                <div className="p-8 lg:p-10">
                    <Link href={route('login')} className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 transition text-xs font-bold mb-8 uppercase tracking-widest">
                        <ArrowLeft size={16} weight="bold" /> Kembali ke Masuk
                    </Link>

                    <h2 className="text-3xl font-black text-slate-900 leading-tight">Daftar Akun Wali</h2>
                    <p className="text-slate-500 text-sm mt-2 mb-8 italic">"Pantau kebaikan ananda setiap hari."</p>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Nama Lengkap */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nama Lengkap</label>
                            <div className="relative group">
                                <User size={18} className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                                <input 
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Nama Ayah / Ibu..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl focus:border-sky-500 outline-none transition text-sm font-medium"
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Aktif</label>
                            <div className="relative group">
                                <Envelope size={18} className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                                <input 
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl focus:border-sky-500 outline-none transition text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* NIS ANAK (Key Penghubung) */}
                        <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl space-y-1.5">
                            <label className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] ml-1">NIS Anak (Link Akun)</label>
                            <div className="relative group">
                                <IdentificationCard size={18} className="absolute left-4 top-3.5 text-sky-300 group-focus-within:text-sky-500 transition-colors" />
                                <input 
                                    type="text"
                                    value={data.child_nis}
                                    onChange={(e) => setData('child_nis', e.target.value)}
                                    placeholder="Masukkan NIS Anak..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-sky-200 rounded-xl focus:border-sky-500 outline-none transition text-sm font-medium"
                                    required
                                />
                            </div>
                            <p className="text-[9px] text-sky-400 font-bold italic mt-1 ml-1">*Pastikan NIS sesuai untuk menghubungkan data.</p>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Buat Sandi</label>
                            <div className="relative group">
                                <LockKey size={18} className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-100 rounded-2xl focus:border-sky-500 outline-none transition text-sm font-medium"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-300 hover:text-sky-500 transition-colors">
                                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Password Confirmation */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Ulangi Sandi</label>
                            <div className="relative group">
                                <LockKey size={18} className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                                <input 
                                    type={showPasswordConfirm ? "text" : "password"}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-100 rounded-2xl focus:border-sky-500 outline-none transition text-sm font-medium"
                                    required
                                />
                                <button type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className="absolute right-4 top-3.5 text-slate-300 hover:text-sky-500 transition-colors">
                                    {showPasswordConfirm ? <EyeSlash size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button disabled={processing} className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl shadow-lg shadow-sky-500/30 transition transform active:scale-95 disabled:opacity-70 mt-4 uppercase text-xs tracking-widest">
                            {processing ? "Mendaftarkan..." : "Verifikasi & Daftar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}