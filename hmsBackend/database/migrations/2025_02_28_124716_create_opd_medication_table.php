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
        Schema::create('opd_medication', function (Blueprint $table) {
            $table->bigIncrements('medicationID');
            $table->unsignedBigInteger('consultationID');
            $table->foreign('consultationID')->references('consultationID')->on('opd_consultation')->onDelete('cascade');
            $table->unsignedBigInteger('medicineID');
            $table->foreign('medicineID')->references('medicineID')->on('medicine')->onDelete('cascade');
            $table->text('dosage');
            $table->integer('days');
            $table->integer('total_quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opd_medication');
    }
};
