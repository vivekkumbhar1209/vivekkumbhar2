<?php
namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('medicines')->insert([
            [
                'medicineID'    => 1,
                'categoryID'    => 1, // Pain Relief
                'medicine_name' => 'Paracetamol',
                'cost'          => 50.00,
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'medicineID'    => 2,
                'categoryID'    => 1, // Pain Relief
                'medicine_name' => 'Ibuprofen',
                'cost'          => 80.00,
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'medicineID'    => 3,
                'categoryID'    => 2, // Antibiotics
                'medicine_name' => 'Amoxicillin',
                'cost'          => 120.00,
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'medicineID'    => 4,
                'categoryID'    => 3, // Vitamins & Supplements
                'medicine_name' => 'Vitamin C',
                'cost'          => 60.00,
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'medicineID'    => 5,
                'categoryID'    => 4, // Cold & Flu
                'medicine_name' => 'Cough Syrup',
                'cost'          => 90.00,
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'medicineID'    => 6,
                'categoryID'    => 5, // Allergy Relief
                'medicine_name' => 'Cetirizine',
                'cost'          => 70.00,
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
        ]);
    }
}
