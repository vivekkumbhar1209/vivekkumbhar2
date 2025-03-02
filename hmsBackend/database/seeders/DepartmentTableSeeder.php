<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DepartmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
            ['department_name' => 'Cardiology', 'hod' => 'Dr. John Smith'],
            ['department_name' => 'Neurology', 'hod' => 'Dr. Emily Johnson'],
            ['department_name' => 'Orthopedics', 'hod' => 'Dr. Robert Brown'],
            ['department_name' => 'Pediatrics', 'hod' => 'Dr. Sophia Davis'],
            ['department_name' => 'Gynecology', 'hod' => 'Dr. Olivia Wilson'],
            ['department_name' => 'Dermatology', 'hod' => 'Dr. Michael Martinez'],
            ['department_name' => 'Oncology', 'hod' => 'Dr. William Anderson'],
            ['department_name' => 'Psychiatry', 'hod' => 'Dr. Linda Thomas'],
            ['department_name' => 'Radiology', 'hod' => 'Dr. Daniel Jackson'],
            ['department_name' => 'Emergency Medicine', 'hod' => 'Dr. Patricia White'],
        ];

        foreach ($departments as $department) {
            DB::table('departments')->insert([
                'department_name' => $department['department_name'],
                'hod'             => $department['hod'],
                'created_at'      => Carbon::now(),
                'updated_at'      => Carbon::now(),
            ]);
        }
    }
}
