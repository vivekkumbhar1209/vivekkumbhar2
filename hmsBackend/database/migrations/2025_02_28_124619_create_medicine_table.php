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
        Schema::create('medicine', function (Blueprint $table) {
            $table->bigIncrements('medicineID');
            $table->unsignedBigInteger('categoryID');
            $table->foreign('categoryID')->references('categoryID')->on('medicine_category')->onDelete('cascade');
            $table->text('medicine_name');
            $table->decimal('cost');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicine');
    }
};
