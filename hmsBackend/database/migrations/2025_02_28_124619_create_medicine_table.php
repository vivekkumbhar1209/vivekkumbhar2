<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categoryID');
            $table->string('medicine_name');
            $table->decimal('cost', 10, 2);
            $table->timestamps();

            $table->foreign('categoryID')->references('id')->on('medicine_categories')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('medicines');
    }
};
