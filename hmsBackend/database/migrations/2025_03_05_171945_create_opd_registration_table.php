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
        Schema::create('opd_registration', function (Blueprint $table) {
            $table->id('opd_registrationID');
            $table->unsignedBigInteger('patientID');
            $table->unsignedBigInteger('doctorID');
            $table->string('reason_For_Visit');
            $table->timestamps();

            $table->foreign('patientID')->references('patientID')->on('patients')->onDelete('cascade');
            $table->foreign('doctorID')->references('doctorID')->on('doctors')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opd_registration');
    }
};
