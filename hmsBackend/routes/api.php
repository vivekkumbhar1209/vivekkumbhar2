<?php

use App\Http\Controllers\AddDisease;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DeptReg;
use App\Http\Controllers\DoctorAvailabilityController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogOutController;
use App\Http\Controllers\MedicineCategoryController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\OPDController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientRegistration;
use App\Http\Controllers\UpdateDepartment;
use App\Http\Controllers\UserRegistration;
use App\Http\Controllers\EnquiryController;

use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    //all team members add your post/get routes in this middleware group function since all the links are protected in this group. Only authenticated user with valid authentication token will be able to access these links

    //Implementation is done for this api in the frontend
    Route::post('/logout', [LogOutController::class, 'logout']);
    Route::post('/addDisease', [AddDisease::class, 'addDisease']);
    Route::post('/registerDepartment', [DeptReg::class, 'registerDepartment']);
    Route::get('/getDept', [DeptReg::class, 'getDept']);
    Route::post('/updateDepartment', [UpdateDepartment::class, 'updateDepartment']);
    Route::post('/registerpatient', [PatientRegistration::class, 'registerPatient']);
    Route::put('/updateuser/{id}', [UserRegistration::class, 'updateUser']);
    Route::post('/registeruser', [UserRegistration::class, 'registerUser']); //this will register all users
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{id}', [PatientController::class, 'show']);
    Route::get('/viewAllUsers', [UserRegistration::class, 'getAllUsers']);
    Route::get('/patientbypid/{pid}', [PatientRegistration::class, 'getPatientByPID']);//dhanu this scan barcode pid and fetch details

    Route::get('/getMedicines', [MedicineController::class, "getMedicines"]);

    Route::get('/getDept', [DeptReg::class, 'getDepartments']);
    Route::get('/getMedicineCategory', [MedicineCategoryController::class, 'getMedicineCategory']);
    Route::get('/getMedicineCategories', [MedicineController::class, 'getMedicineCategories']);
    Route::post('/addMedicine', [MedicineController::class, 'addMedicine']);
    Route::get('/getMedicines', [MedicineController::class, 'getMedicines']);
    Route::post('/add-medicine', [MedicineController::class, 'addMedicine']);
    Route::post('/updateavailability', [DoctorAvailabilityController::class, 'updateAvailability']);//update availability of doctor
    Route::get('/getavailabilityofdoctor', [DoctorAvailabilityController::class, 'getAvailabilityOfDoctor']);

    Route::get('/getDept', [DepartmentController::class, 'allDepartment']);
    Route::post('/addMedicineCategory', [MedicineCategoryController::class, 'addCategory']);

    Route::post('/getMedCategory', [MedicineCategoryController::class, 'getMedCategory']);
    Route::post('/addMedicine', [MedicineController::class, 'addMedicine']);

    Route::post('/getDoctorByDeparmentID', [DoctorController::class, 'getDoctorByDepartmentID']);
    Route::post('/registerOPDPatient', [OPDController::class, 'registerOPDPatient']);

    Route::get('/getdiseases', [AddDisease::class, 'getDisease']);
    Route::get('/getMedicine/{medicineId}', [MedicineController::class, 'getMedicine']);
    Route::post('/updateMedicine/{medicineId}', [MedicineController::class, 'updateMedicine']);

    Route::get('/getdiseases', [AddDisease::class, 'getDisease']);
    Route::get('/getPatientsWithOPDStatus', [OPDController::class, 'getPatientsWithOPDStatus']);
    Route::get('/getMedicines', [MedicineController::class, 'getMedicines']);
    //done by vivek
    Route::post('/getMedCategory', [MedicineCategoryController::class, 'getMedCategory']);
    Route::post('/addMedicine', [MedicineController::class, 'addMedicine']);

    Route::get('/getOpdQueue', [OPDController::class, 'getOpdQueue']);
    Route::post('/dequeue', [OPDController::class, 'deQueue']);
    Route::post('/updatePatientQueueStatus', [OPDController::class, 'updatePatientQueueStatus']);

    Route::post('/getProfilePhoto', [OPDController::class, 'showProfilePhoto']);

});

Route::post('/submit-enquiry', [EnquiryController::class, 'store']);


Route::post('/forgot-password', [UserRegistration::class, 'forgotPassword']);
Route::post('/update-password', [UserRegistration::class, 'updatePassword']);
