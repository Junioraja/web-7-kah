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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama item (e.g., "Dark Theme", "Rainbow Avatar Border")
            $table->string('description')->nullable();
            $table->enum('type', ['theme', 'avatar_border', 'background', 'emoji_pack'])->default('theme');
            $table->string('preview_image')->nullable(); // Path gambar preview
            $table->integer('price')->default(0); // Harga dalam Koin Hebat
            $table->boolean('is_purchasable')->default(true); // Bisa dibeli atau reward khusus
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
