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
        Schema::create('patients', function (Blueprint $table) {
            $table->bigIncrements('patientID');
            $table->string('patient_name');
            $table->string('patient_email')->unique();
            $table->string('patient_mobile');
            $table->string('emergency_name')->nullable();
            $table->string('emergency_no')->nullable();
            $table->text('patient_address');
            $table->enum('patient_gender', ['Male', 'Female', 'Others']);
            $table->date('patient_dob');
            $table->integer('patient_age');
            $table->string('profilePhoto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
