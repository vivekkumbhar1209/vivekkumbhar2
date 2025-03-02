<?php
namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class PatientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Insert 20 fake patient records
        for ($i = 0; $i < 20; $i++) {
            $dob = $faker->dateTimeBetween('-80 years', '-18 years')->format('Y-m-d'); // Random DOB between 18 and 80 years old
            $age = Carbon::parse($dob)->age;                                           // Calculate age based on DOB

            DB::table('patients')->insert([
                'patient_name'    => $faker->name,
                'patient_email'   => $faker->unique()->safeEmail,
                'patient_mobile'  => $faker->phoneNumber,
                'emergency_name'  => $faker->optional()->name,
                'emergency_no'    => $faker->optional()->phoneNumber,
                'patient_address' => $faker->address,
                'patient_gender'  => $faker->randomElement(['Male', 'Female', 'Others']),
                'patient_dob'     => $dob,
                'patient_age'     => $age,
                'created_at'      => Carbon::now(),
                'updated_at'      => Carbon::now(),
            ]);
        }
    }
}
