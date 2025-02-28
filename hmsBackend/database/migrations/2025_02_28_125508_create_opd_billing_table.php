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
        Schema::create('opd_billing', function (Blueprint $table) {
            $table->bigIncrements('billID');
            $table->unsignedBigInteger('consultationID');
            $table->foreign('consultationID')->references('consultationID')->on('opd_consultation')->onDelete('cascade');
            $table->decimal('consultation_fee');
            $table->decimal('total_fee');
            $table->enum('mode',['Cash','UPI','Bank transfer']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opd_billing');
    }
};
