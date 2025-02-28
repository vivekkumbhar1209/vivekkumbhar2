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
        Schema::create('opd_diagnosis', function (Blueprint $table) {
            $table->bigIncrements('diagnosisID');
            $table->unsignedBigInteger('consultationID');
            $table->foreign('consultationID')->references('consultationID')->on('opd_consultation')->onDelete('cascade');
            $table->text('diagnosis');
            $table->text('remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opd_diagnosis');
    }
};
