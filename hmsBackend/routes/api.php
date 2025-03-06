<?php

use App\Http\Controllers\AddDisease;
use App\Http\Controllers\DeptReg;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogOutController;
use App\Http\Controllers\MedicineCategoryController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientRegistration;
use App\Http\Controllers\UpdateDepartment;
use App\Http\Controllers\UserRegistration;
use App\Models\Department;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShowAllExistingUsers;


Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    //all team members add your post/get routes in this middleware group function since all the links are protected in this group. Only authenticated user with valid authentication token will be able to access these links

    Route::post('/logout', [LogOutController::class, 'logout']);

    //Implementation is done for this api in the frontend
    Route::post('/adddisease', [AddDisease::class, 'addDisease']);
    Route::post('/registerDepartment', [DeptReg::class, 'registerDepartment']);
    Route::post('/updateDepartment', [UpdateDepartment::class, 'updateDepartment']);
    Route::post('/registerpatient', [PatientRegistration::class, 'registerPatient']);
    Route::put('/updateuser/{id}', [UserRegistration::class, 'updateUser']);
    Route::post('/registeruser', [UserRegistration::class, 'registerUser']);//this will register all users
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{id}', [PatientController::class, 'show']);
    
    // Edit Users : get user data for the particular id
    // Route::get('/')

    // Following routes get all the data for the respective resources : only for rendering purposes
    Route::get('/viewAllUsers', [UserRegistration::class, 'getAllUsers']);
    Route::get('/getDept', [DeptReg::class, 'getDepartments']);
    Route::get('/getMedicines', [MedicineController::class, "getMedicines"]);
    // Route::get('/getDept', function () {
    //     return response()->json([
    //         'status'   => 200,
    //         'message'  => 'Department Data',
    //         'deptData' => Department::all(),
    //     ]);
    // });
    


    //Implementation is not done for these api in the frontend
    Route::post('/addMedicineCategory', [MedicineCategoryController::class, 'addCategory']);
    //Additionally we need to create the following api as well
    // 1. api which will send all the available medicines to the frontend
    // 2. api which will send all the available diseases to the frontend
    // 3. api which will send all the available departments to the frontend
    // 4. api which will update the entries in the disease table based on the form data accepted from the frontend (form is created for this in frontend)
    // 5. api which will add new disease in the disease table based on the form data accepted from the frontend (form is created for this in frontend)

});
