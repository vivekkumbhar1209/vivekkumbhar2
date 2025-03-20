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
        Schema::create('doctor_availability', function (Blueprint $table) {
            $table->bigIncrements('availability_ID');
            $table->unsignedBigInteger('userID');
            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade');
            $table->enum('availability_status',['Available','Unavailable']);
            $table->time('available_start_time')->nullable();
            $table->time('available_end_time')->nullable();
            $table->date('unavailable_start_date')->nullable();
            $table->date('unavailable_end_date')->nullable();
            $table->string('reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor_availability');
    }
};
