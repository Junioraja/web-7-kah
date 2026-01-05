import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    StarFour, ShieldCheck, IdentificationCard, ChalkboardTeacher, 
    EnvelopeSimple, LockKey, ArrowRight, Eye, EyeSlash, 
    CaretLeft, Student, UsersThree 
} from '@phosphor-icons/react';

export default function Login() {
    const [activeTab, setActiveTab] = useState('student');
    const [teacherSubTab, setTeacherSubTab] = useState('pns');
    const [showPassword, setShowPassword] = useState(false); // State untuk toggle mata password

    const { data, setData, post, processing, errors } = useForm({
        role: 'student',
        identity: '',
        password: '',
        remember: false,
        teacher_type: 'pns',
    });

    const handleRoleChange = (role) => {
        setActiveTab(role);
        setData({ ...data, role: role, identity: '' });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const config = {
        student: { label: "Nomor Induk Siswa (NIS)", placeholder: "Contoh: 12345678", icon: IdentificationCard },
        teacher: { 
            label: teacherSubTab === 'pns' ? "NIP Guru" : "Nama Lengkap Guru", 
            placeholder: teacherSubTab === 'pns' ? "Contoh: 1980..." : "Nama sesuai Dapodik", 
            icon: teacherSubTab === 'pns' ? IdentificationCard : ChalkboardTeacher 
        },
        parent: { label: "Alamat Email", placeholder: "nama@email.com", icon: EnvelopeSimple }
    };

    const ActiveIcon = config[activeTab].icon;

    return (
        <div className="bg-brand-50 min-h-screen flex items-center justify-center p-4 font-sans text-slate-900">
            <Head title="Masuk - TunasHebat" />
            
            <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl shadow-brand-500/10 overflow-hidden flex flex-col md:flex-row animate-in fade-in duration-500">
                
                {/* LEFT COLUMN: BRANDING */}
                <div className="md:w-1/2 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cube-coat.png')] opacity-10"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                                <StarFour weight="fill" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">TunasHebat</span>
                        </div>
                        <h2 className="text-3xl font-extrabold leading-tight mb-4 text-white">Mari Bentuk Kebiasaan Hebat Bersama!</h2>
                        <p className="text-blue-100 italic">"Karakter besar dibangun dari kebiasaan-kebiasaan kecil yang dilakukan setiap hari."</p>
                    </div>
                    
                    <div className="hidden md:block relative z-10">
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                                <ShieldCheck weight="fill" />
                            </div>
                            <p className="text-xs text-blue-50">Sistem keamanan data terpadu untuk Murid, Guru, dan Orang Tua.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: FORM AREA */}
                <div className="md:w-1/2 p-8 lg:p-12 bg-white relative">
                    
                    {/* Tombol Back ke Landing Page */}
                    <Link href="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-[#0ea5e9] transition-colors mb-6 group text-sm font-medium">
                        <CaretLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                        Kembali
                    </Link>

                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Selamat Datang!</h3>
                    <p className="text-slate-500 text-sm mb-6">Pilih peran Anda untuk masuk.</p>

                    {/* ROLE TABS DENGAN LOGO */}
                    <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8">
                        <button type="button" onClick={() => handleRoleChange('student')} 
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'student' ? 'shadow-sm bg-white text-[#0ea5e9]' : 'text-slate-500 hover:text-slate-700'}`}>
                            <Student size={18} weight={activeTab === 'student' ? "fill" : "bold"} />
                            <span>Murid</span>
                        </button>
                        <button type="button" onClick={() => handleRoleChange('teacher')} 
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'teacher' ? 'shadow-sm bg-white text-[#0ea5e9]' : 'text-slate-500 hover:text-slate-700'}`}>
                            <ChalkboardTeacher size={18} weight={activeTab === 'teacher' ? "fill" : "bold"} />
                            <span>Guru</span>
                        </button>
                        <button type="button" onClick={() => handleRoleChange('parent')} 
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'parent' ? 'shadow-sm bg-white text-[#0ea5e9]' : 'text-slate-500 hover:text-slate-700'}`}>
                            <UsersThree size={18} weight={activeTab === 'parent' ? "fill" : "bold"} />
                            <span>Orang Tua</span>
                        </button>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {activeTab === 'teacher' && (
                            <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100 animate-in slide-in-from-top-1">
                                <button type="button" onClick={() => { setTeacherSubTab('pns'); setData('teacher_type', 'pns'); }} className={`flex-1 py-1 text-[10px] font-bold rounded-md transition ${teacherSubTab === 'pns' ? 'bg-white shadow-sm text-[#0ea5e9]' : 'text-slate-400'}`}>PNS</button>
                                <button type="button" onClick={() => { setTeacherSubTab('honorer'); setData('teacher_type', 'honorer'); }} className={`flex-1 py-1 text-[10px] font-bold rounded-md transition ${teacherSubTab === 'honorer' ? 'bg-white shadow-sm text-[#0ea5e9]' : 'text-slate-400'}`}>HONORER</button>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">{config[activeTab].label}</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0ea5e9]">
                                    <ActiveIcon size={20} />
                                </div>
                                <input 
                                    type={activeTab === 'parent' ? 'email' : 'text'}
                                    placeholder={config[activeTab].placeholder}
                                    value={data.identity}
                                    onChange={e => setData('identity', e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20 outline-none transition text-sm text-slate-700"
                                    required
                                />
                            </div>
                            {errors.identity && <p className="text-red-500 text-xs mt-1 font-medium">{errors.identity}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="block text-sm font-semibold text-slate-700">Kata Sandi</label>
                                <Link href={route('password.request')} className="text-xs font-semibold text-[#0ea5e9] hover:underline">Lupa Password?</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0ea5e9]">
                                    <LockKey size={20} />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20 outline-none transition text-sm text-slate-700"
                                    required
                                />
                                {/* Tombol Mata Password */}
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#0ea5e9] transition-colors"
                                >
                                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                        </div>

                        <button disabled={processing} type="submit" className="w-full py-3.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                            <span>{processing ? 'Memproses...' : 'Masuk Sekarang'}</span>
                            <ArrowRight weight="bold" />
                        </button>
                    </form>

                    {activeTab === 'parent' && (
                        <p className="text-center text-slate-400 text-xs mt-8 animate-in fade-in">
                            Belum punya akun? <Link href={route('register')} className="text-[#0ea5e9] font-bold hover:underline">Daftar Akun Baru</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}