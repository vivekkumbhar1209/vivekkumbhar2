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
                'name'          => 'John Doe',
                'email'         => 'johndoe@example.com',
                'password'      => Hash::make('password123'), // Hash the password
                'gender'        => 'Male',
                'date_Of_Birth' => '1990-05-15',
                'age'           => 34,
                'mobile'        => '9876543210',
                'address'       => '123 Main Street, City, Country',
                'role'          => 'Admin',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name'          => 'Jane Smith',
                'email'         => 'janesmith@example.com',
                'password'      => Hash::make('password123'),
                'gender'        => 'Female',
                'date_Of_Birth' => '1995-08-20',
                'age'           => 29,
                'mobile'        => '8765432109',
                'address'       => '456 Elm Street, City, Country',
                'role'          => 'Doctor',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ]);
    }
}
