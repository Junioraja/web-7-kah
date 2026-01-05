import React from 'react';
import { Head } from '@inertiajs/react';
import { Users, CaretRight, GraduationCap } from '@phosphor-icons/react';

export default function MonitorSiswa({ daftarMurid, guru }) {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <Head title="Pantauan Murid" />
            
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Pantauan Kelas {guru.kelas}</h1>
                <p className="text-slate-500">
                    Menampilkan murid absen {guru.absen_awal} sampai {guru.absen_akhir} - {guru.jurusan}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {daftarMurid.length > 0 ? (
                    daftarMurid.map((murid) => (
                        <div key={murid.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                    {murid.no_absen}
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Total XP</span>
                                    <p className="font-black text-indigo-600">{murid.xp} XP</p>
                                </div>
                            </div>
                            
                            <h3 className="font-bold text-slate-800 text-lg mb-1">{murid.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">NIS: {murid.nis}</p>

                            <button className="w-full py-3 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 font-bold rounded-2xl transition flex items-center justify-center gap-2">
                                Detail Jurnal <CaretRight weight="bold" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <Users size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-400 font-medium">Belum ada murid dalam rentang absen ini.</p>
                    </div>
                )}
            </div>
        </div>
    );
}