<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name'          => 'Receptionist One',
                'email'         => 'receptionist@example.com',
                'password'      => Hash::make('password123'),
                'gender'        => 'Female',
                'date_Of_Birth' => '1990-05-15',
                'age'           => 34,
                'mobile'        => '9876543210',
                'address'       => '123 Receptionist Street, City, Country',
                'role'          => 'Receptionist',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name'          => 'Dr. John Doe',
                'email'         => 'doctor@example.com',
                'password'      => Hash::make('password123'),
                'gender'        => 'Male',
                'date_Of_Birth' => '1985-06-10',
                'age'           => 39,
                'mobile'        => '9876543211',
                'address'       => '456 Doctor Street, City, Country',
                'role'          => 'Doctor',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name'          => 'Admin User',
                'email'         => 'admin@example.com',
                'password'      => Hash::make('admin123'),
                'gender'        => 'Male',
                'date_Of_Birth' => '1980-01-20',
                'age'           => 44,
                'mobile'        => '9876543212',
                'address'       => '789 Admin Avenue, City, Country',
                'role'          => 'Admin',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ]);
    }
}
