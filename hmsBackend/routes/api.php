<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogOutController;
use App\Models\Department;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    //all team members add your post/get routes in this middleware group function since all the links are protected in this group. Only authenticated user with valid authentication token will be able to access these links
    Route::post('/logout', [LogOutController::class, 'logout']);

    //this route returns all the rows from the department tables as response to the react frontend
    Route::get('/getDept', function () {
        return response()->json([
            'status'   => 200,
            'message'  => 'Department Data',
            'deptData' => Department::all(),
        ]);
    });

});
