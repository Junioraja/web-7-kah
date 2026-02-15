<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            // --- 1. IDENTITAS UTAMA (LOGIN MULTI-OPSI) ---
            $table->id();
            $table->string('name');
            $table->string('email')->unique()->nullable(); 
            $table->string('phone_number')->unique()->nullable(); // Login via No HP
            $table->string('password');
            $table->enum('role', ['siswa', 'guru', 'orangtua', 'rt'])->default('siswa');
            
            // --- 2. IDENTITAS KHUSUS PERAN ---
            $table->string('nis')->unique()->nullable();          // Login Murid
            $table->string('nip')->unique()->nullable();          // Login Guru
            $table->string('nama_honorer')->nullable();           
            $table->string('child_nis')->nullable();              // Link Ortu ke NIS Anak
            $table->string('jabatan_rt')->nullable();             // Khusus Ketua RT

            // --- 3. AKADEMIK, AGAMA & WALI MURID ---
            $table->string('kelas')->nullable();                  
            $table->string('jurusan')->nullable();                
            $table->integer('no_absen')->nullable();              
            $table->string('agama')->nullable();                  // Filter menu Ibadah
            $table->string('nama_orang_tua')->nullable();       
            $table->string('nama_guru_wali')->nullable();    
            $table->string('nama_rt_murid')->nullable();        

            // --- 4. SISTEM PANTAUAN GURU WALI ---
            $table->integer('absen_awal')->nullable();            
            $table->integer('absen_akhir')->nullable();           

            // --- 5. PROGRESS & GAMIFIKASI ---
            $table->integer('xp')->default(0);                    
            $table->integer('koin')->default(0);                  
            $table->integer('bintang')->default(0);               
            $table->integer('streak_count')->default(0);
            $table->integer('level')->default(1);                 // Level 1-100          

            // --- 6. ADMINISTRASI ---
            $table->string('signature_path')->nullable();         
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};