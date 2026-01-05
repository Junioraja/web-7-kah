<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
    Schema::create('habit_logs', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->string('habit_type'); // wakeup, worship, food, sleep, dll
        $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending'); 
        $table->integer('points_claimed')->default(0); 
        $table->string('evidence_path')->nullable(); // Lokasi foto bukti
        $table->date('date');
        $table->timestamp('verified_at')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habit_logs');
    }
};
