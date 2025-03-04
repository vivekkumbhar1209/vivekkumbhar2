<?php

use App\Http\Controllers\AddDisease;
use App\Http\Controllers\DeptReg;
use App\Http\Controllers\UpdateDepartment;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogOutController;
use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicineCategoryController;
use App\Http\Controllers\MedicineController;


Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [LogOutController::class, 'logout']);
    Route::post('/adddisease',[AddDisease::class,'addDisease']);//disease will add in database table 
    Route::post('/registerDepartment', [DeptReg::class, 'registerDepartment']); // validation and department registration
    Route::post('/updateDepartment', [UpdateDepartment::class, 'updateDepartment']); // department data will be update in database
    Route::post('/addMedicineCategory', [MedicineCategoryController::class, 'addCategory']); // add medicines
    Route::get('/patients', [PatientController::class, 'index']); // Fetch all patients
    Route::get('/patients/{id}', [PatientController::class, 'show']); // Fetch patient by ID
    //Route::post('/addMedicine', [MedicineController::class, 'addMedicine']);


});
