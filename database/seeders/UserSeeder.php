<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User; 
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. DATA MURID (Lengkap dengan semua Wali)
        User::create([
            'name' => 'Budi Santoso',
            'nis' => '12345',
            'phone_number' => '08123456789',
            'password' => Hash::make('password'),
            'role' => 'siswa',
            'agama' => 'Islam',
            'nama_orang_tua' => 'Bapak Ahmad',
            'nama_guru_wali' => 'Ibu Retno', // Nama Guru Wali
            'nama_rt_murid' => 'Bapak Mulyono',
            'kelas' => '10',
            'jurusan' => 'RPL',
            'no_absen' => 1,
        ]);

        // 2. DATA GURU WALI
        User::create([
            'name' => 'Ibu Retno',
            'nip' => '19870101202001',
            'password' => Hash::make('password'),
            'role' => 'guru',
            'kelas' => '10',
            'jurusan' => 'RPL',
            'absen_awal' => 1,
            'absen_akhir' => 20,
        ]);

        // 3. DATA ORANG TUA
        User::create([
            'name' => 'Bapak Ahmad',
            'email' => 'ahmad_ortu@gmail.com',
            'phone_number' => '08999999999',
            'password' => Hash::make('password'),
            'role' => 'orangtua',
            'child_nis' => '12345', // Menunjuk ke Budi
        ]);

        // 4. DATA KETUA RT
        User::create([
            'name' => 'Bapak Mulyono',
            'phone_number' => '08555555555',
            'password' => Hash::make('password'),
            'role' => 'rt',
            'jabatan_rt' => 'Ketua RT 01',
        ]);
    }
}
