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
    Schema::create('habit_details', function (Blueprint $table) {
        $table->id();
        $table->foreignId('habit_log_id')->constrained('habit_logs')->onDelete('cascade');
        $table->string('category'); // lunch, glass, rawatib, extra_worship
        $table->string('item_name'); // Gelas 1, Karbohidrat, Tahajjud, dll
        $table->boolean('is_done')->default(false);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habit_details');
    }
};
