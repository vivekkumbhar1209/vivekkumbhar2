<?php

use App\Http\Controllers\AddDisease;
use App\Http\Controllers\DeptReg;
use App\Http\Controllers\UpdateDepartment;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogOutController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\MedicineCategoryController;
use App\Http\Controllers\MedicineController;
use App\Models\Department;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientRegistration;
use App\Http\Controllers\UserRegistration;

Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
  
      //all team members add your post/get routes in this middleware group function since all the links are protected in this group. Only authenticated user with valid authentication token will be able to access these links

    Route::post('/logout', [LogOutController::class, 'logout']);
    Route::post('/adddisease',[AddDisease::class,'addDisease']);//disease will add in database table 
    Route::post('/registerDepartment', [DeptReg::class, 'registerDepartment']); // validation and department registration
    Route::post('/updateDepartment', [UpdateDepartment::class, 'updateDepartment']); // department data will be update in database
    Route::post('/addMedicineCategory', [MedicineCategoryController::class, 'addCategory']); // add medicines
    Route::get('/patients', [PatientController::class, 'index']); // Fetch all patients
    Route::get('/patients/{id}', [PatientController::class, 'show']); // Fetch patient by ID
    //Route::post('/addMedicine', [MedicineController::class, 'addMedicine']);


    //api to register patient
    Route::post('/registerpatient',[PatientRegistration::class,'registerPatient']);
    //api to register user
    Route::post('/registeruser',[UserRegistration::class,'registerUser']);

    //this route returns all the rows from the department tables as response to the react frontend
    Route::get('/getDept', function () {
        return response()->json([
            'status'   => 200,
            'message'  => 'Department Data',
            'deptData' => Department::all(),
        ]);
    });

});


