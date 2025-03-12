<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id('medicineID');
            $table->unsignedBigInteger('categoryID');
            $table->string('medicine_name');
            $table->decimal('cost', 8, 2);
            $table->timestamps();

            $table->foreign('categoryID')->references('categoryID')->on('medicine_category')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('medicines');
    }
};
