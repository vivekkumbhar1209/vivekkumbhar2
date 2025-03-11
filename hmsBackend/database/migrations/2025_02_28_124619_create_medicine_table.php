<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('medicine', function (Blueprint $table) {
            $table->id('medicineID');  // Auto-generated primary key
            $table->unsignedBigInteger('categoryID'); // Foreign key
            $table->string('medicine_name');
            $table->decimal('cost', 8, 2); // Cost with precision
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('categoryID')->references('id')->on('medicine_category')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};
