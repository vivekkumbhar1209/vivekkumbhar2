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
        Schema::create('patient_vitals', function (Blueprint $table) {
            $table->bigIncrements('vitals_ID');
            $table->unsignedBigInteger('patientID');
            $table->foreign('patientID')->references('patientID')->on('patients')->onDelete('cascade');
            $table->decimal('temperature')->nullable();
            $table->string('blood_pressure')->nullable();
            $table->decimal('weight')->nullable();
            $table->decimal('height')->nullable();
            $table->enum('blood_group',['A+','B+','AB+','O+','A-','B-','AB-','O-','Unknown']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_vitals');
    }
};
