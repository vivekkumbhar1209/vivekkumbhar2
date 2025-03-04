<?php
namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicineCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('medicine_category')->insert([
            [
                'categoryID'    => 1,
                'category_name' => 'Pain Relief',
                'description'   => 'Medicines used to relieve pain, such as analgesics.',
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'categoryID'    => 2,
                'category_name' => 'Antibiotics',
                'description'   => 'Drugs that fight bacterial infections.',
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'categoryID'    => 3,
                'category_name' => 'Vitamins & Supplements',
                'description'   => 'Nutritional supplements and vitamins.',
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'categoryID'    => 4,
                'category_name' => 'Cold & Flu',
                'description'   => 'Medicines for cold, flu, and related symptoms.',
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'categoryID'    => 5,
                'category_name' => 'Allergy Relief',
                'description'   => 'Antihistamines and other allergy medications.',
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
        ]);
    }
}
