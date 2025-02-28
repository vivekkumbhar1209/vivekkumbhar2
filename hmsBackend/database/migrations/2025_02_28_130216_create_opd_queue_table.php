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
        Schema::create('opd_queue', function (Blueprint $table) {
            $table->bigIncrements('queueID');
            $table->unsignedBigInteger('patientID');
            $table->foreign('patientID')->references('patientID')->on('patients')->onDelete('cascade');
            $table->unsignedBigInteger('doctorID');
            $table->foreign('doctorID')->references('doctorID')->on('doctors')->onDelete('cascade');
            $table->enum('status',['Waiting','In progress','Completed','Expired']);
            $table->integer('token_no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opd_queue');
    }
};
