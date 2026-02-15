import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, UserCircle, Envelope, Phone, GraduationCap,
    MapPin, CalendarBlank, StarFour, Trophy, Fire, Coins,
    Lightning, Crown, ShieldCheck, PencilSimple, CheckCircle, Storefront
} from '@phosphor-icons/react';
import Swal from 'sweetalert2';

export default function Profile({ user, rank, xpForNext, xpProgress }) {
    const { flash } = usePage().props;
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('pribadi'); // pribadi, tambahan, lencana, koleksi
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        agama: user.agama || '',
        nama_orang_tua: user.nama_orang_tua || '',
        nama_guru_wali: user.nama_guru_wali || '',
        nama_rt_murid: user.nama_rt_murid || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(route('student.profile.update'), formData, {
            onSuccess: () => {
                setIsEditing(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Profil Anda telah diperbarui.',
                    confirmButtonColor: 'hsl(var(--brand-primary))',
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat memperbarui profil.',
                    confirmButtonColor: '#ef4444',
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Head title="Profil Saya" />

            {/* Header with Back Button */}
            <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.visit(route('student.dashboard'))}
                        className="p-2 rounded-xl hover:bg-muted transition-colors"
                    >
                        <ArrowLeft size={24} weight="bold" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black">Profil Saya</h1>
                        <p className="text-sm text-muted-foreground">Kelola informasi pribadi Anda</p>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Card & Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-brand-primary to-brand-secondary p-8 rounded-5xl text-white shadow-xl relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border-4 border-white/40 shadow-lg">
                                        <UserCircle size={80} weight="fill" />
                                    </div>
                                    <h2 className="text-2xl font-black mb-1">{user.name}</h2>
                                    <p className="text-sm opacity-90 font-medium">NIS: {user.nis || '-'}</p>
                                    <div className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                                        <p className="text-xs font-bold uppercase tracking-wider">{user.kelas || 'Kelas'} - {user.jurusan || 'Jurusan'}</p>
                                    </div>
                                </div>

                                {/* Level Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm font-bold mb-2 opacity-90">
                                        <span>Level {user.level}</span>
                                        {xpForNext && <span>{xpProgress}%</span>}
                                    </div>
                                    <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${xpProgress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-white rounded-full shadow-lg"
                                        />
                                    </div>
                                    {xpForNext && (
                                        <p className="text-xs mt-2 opacity-80">Butuh {xpForNext} XP lagi untuk level berikutnya</p>
                                    )}
                                </div>

                                {/* Rank Badge */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center gap-3">
                                        <Crown size={32} weight="fill" className="text-amber-300" />
                                        <div>
                                            <p className="text-xs opacity-80 font-medium">Rank Semester</p>
                                            <p className="font-black text-lg">{rank}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative */}
                            <StarFour className="absolute -right-8 -top-8 text-white/10" size={200} weight="fill" />
                        </motion.div>

                        {/* Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <StatCard
                                icon={<Lightning weight="fill" className="text-yellow-500" />}
                                label="Total XP"
                                value={user.xp.toLocaleString()}
                                bgColor="bg-yellow-50 dark:bg-yellow-500/10"
                            />
                            <StatCard
                                icon={<Coins weight="fill" className="text-blue-500" />}
                                label="Koin Hebat"
                                value={user.koin.toLocaleString()}
                                bgColor="bg-blue-50 dark:bg-blue-500/10"
                            />
                            <StatCard
                                icon={<StarFour weight="fill" className="text-purple-500" />}
                                label="Bintang"
                                value={user.bintang}
                                bgColor="bg-purple-50 dark:bg-purple-500/10"
                            />
                            <StatCard
                                icon={<Fire weight="fill" className="text-orange-500" />}
                                label="Streak"
                                value={`${user.streak_count} hari`}
                                bgColor="bg-orange-50 dark:bg-orange-500/10"
                            />
                        </motion.div>
                    </div>

                    {/* Right Column: Profile Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-card/80 backdrop-blur-md border border-border rounded-5xl p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black">Profil Saya</h3>
                                {(activeTab === 'pribadi' || activeTab === 'tambahan') && (
                                    !isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-colors"
                                        >
                                            <PencilSimple weight="bold" />
                                            Edit Profil
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 bg-muted text-foreground rounded-xl font-bold hover:bg-border transition-colors"
                                        >
                                            Batal
                                        </button>
                                    )
                                )}
                            </div>

                            {/* Tab Navigation */}
                            <div className="flex gap-2 mb-6 p-1 bg-muted/50 rounded-2xl overflow-x-auto">
                                <TabButton
                                    active={activeTab === 'pribadi'}
                                    onClick={() => setActiveTab('pribadi')}
                                    icon={<UserCircle weight="bold" />}
                                    label="Informasi Pribadi"
                                />
                                <TabButton
                                    active={activeTab === 'tambahan'}
                                    onClick={() => setActiveTab('tambahan')}
                                    icon={<GraduationCap weight="bold" />}
                                    label="Info Tambahan"
                                />
                                <TabButton
                                    active={activeTab === 'lencana'}
                                    onClick={() => setActiveTab('lencana')}
                                    icon={<Trophy weight="bold" />}
                                    label="Lencana"
                                />
                                <TabButton
                                    active={activeTab === 'koleksi'}
                                    onClick={() => setActiveTab('koleksi')}
                                    icon={<Storefront weight="bold" />}
                                    label="Koleksi"
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Tab Content: Informasi Pribadi */}
                                {activeTab === 'pribadi' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                label="Nama Lengkap"
                                                icon={<UserCircle weight="bold" />}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                disabled={!isEditing}
                                                required
                                            />
                                            <FormField
                                                label="NIS"
                                                icon={<ShieldCheck weight="bold" />}
                                                value={user.nis || '-'}
                                                disabled
                                            />
                                            <FormField
                                                label="Email"
                                                icon={<Envelope weight="bold" />}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                disabled={!isEditing}
                                                type="email"
                                            />
                                            <FormField
                                                label="No. HP"
                                                icon={<Phone weight="bold" />}
                                                value={formData.phone_number}
                                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                            <FormField
                                                label="Kelas"
                                                icon={<GraduationCap weight="bold" />}
                                                value={user.kelas || '-'}
                                                disabled
                                            />
                                            <FormField
                                                label="Jurusan"
                                                icon={<GraduationCap weight="bold" />}
                                                value={user.jurusan || '-'}
                                                disabled
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-muted-foreground mb-2">
                                                Agama
                                            </label>
                                            <select
                                                value={formData.agama}
                                                onChange={(e) => setFormData({ ...formData, agama: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl font-medium focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="">Pilih Agama</option>
                                                <option value="Islam">Islam</option>
                                                <option value="Kristen">Kristen</option>
                                                <option value="Katolik">Katolik</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Buddha">Buddha</option>
                                                <option value="Konghucu">Konghucu</option>
                                            </select>
                                        </div>

                                        {isEditing && (
                                            <button
                                                type="submit"
                                                className="w-full md:w-auto px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-lg hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle weight="fill" size={24} />
                                                Simpan Perubahan
                                            </button>
                                        )}
                                    </motion.div>
                                )}

                                {/* Tab Content: Informasi Tambahan */}
                                {activeTab === 'tambahan' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                label="Nama Guru Wali"
                                                icon={<GraduationCap weight="bold" />}
                                                value={formData.nama_guru_wali}
                                                onChange={(e) => setFormData({ ...formData, nama_guru_wali: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                            <FormField
                                                label="Nama Orang Tua"
                                                icon={<UserCircle weight="bold" />}
                                                value={formData.nama_orang_tua}
                                                onChange={(e) => setFormData({ ...formData, nama_orang_tua: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                            <FormField
                                                label="Nama RT"
                                                icon={<MapPin weight="bold" />}
                                                value={formData.nama_rt_murid}
                                                onChange={(e) => setFormData({ ...formData, nama_rt_murid: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                            <div>
                                                <label className="block text-sm font-bold text-muted-foreground mb-2">No. Absen</label>
                                                <div className="bg-muted/50 px-4 py-3 rounded-2xl border-2 border-border">
                                                    <p className="font-bold">{user.no_absen || '-'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <button
                                                type="submit"
                                                className="w-full md:w-auto px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-lg hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle weight="fill" size={24} />
                                                Simpan Perubahan
                                            </button>
                                        )}
                                    </motion.div>
                                )}

                                {/* Tab Content: Lencana */}
                                {activeTab === 'lencana' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="bg-muted/30 p-12 rounded-3xl border-2 border-dashed border-border text-center">
                                            <Trophy size={64} className="mx-auto text-muted-foreground mb-4" weight="fill" />
                                            <h4 className="font-bold text-lg mb-2">Sistem Lencana Segera Hadir!</h4>
                                            <p className="text-sm text-muted-foreground font-medium mb-1">Kumpulkan XP dan Level up untuk unlock badges</p>
                                            <p className="text-xs text-muted-foreground">Badge otomatis terbuka saat mencapai level tertentu</p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Tab Content: Koleksi Item */}
                                {activeTab === 'koleksi' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="bg-muted/30 p-12 rounded-3xl border-2 border-dashed border-border text-center">
                                            <Storefront size={64} className="mx-auto text-muted-foreground mb-4" weight="fill" />
                                            <h4 className="font-bold text-lg mb-2">Belum Ada Item</h4>
                                            <p className="text-sm text-muted-foreground font-medium mb-1">Beli tema & skin di Toko dengan Koin Hebat!</p>
                                            <p className="text-xs text-muted-foreground">Item yang sudah dibeli akan muncul di sini</p>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

// Sub-components
function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${active
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                    : 'text-muted-foreground hover:bg-card hover:text-foreground'
                }`}
        >
            {React.cloneElement(icon, { size: 18 })}
            {label}
        </button>
    );
}

function StatCard({ icon, label, value, bgColor }) {
    return (
        <div className={`${bgColor} p-4 rounded-3xl border border-border`}>
            <div className="flex flex-col items-center text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-xs text-muted-foreground font-bold uppercase mb-1">{label}</p>
                <p className="text-xl font-black">{value}</p>
            </div>
        </div>
    );
}

function FormField({ label, icon, value, onChange, disabled, type = "text", required = false }) {
    return (
        <div>
            <label className="block text-sm font-bold text-muted-foreground mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {icon}
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className="w-full pl-12 pr-4 py-3 bg-background border-2 border-border rounded-2xl font-medium focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>
        </div>
    );
}

function InfoItem({ label, value }) {
    return (
        <div className="bg-muted/50 p-4 rounded-2xl">
            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">{label}</p>
            <p className="font-bold">{value}</p>
        </div>
    );
}
