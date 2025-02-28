<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogOutController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [LogOutController::class, 'logout']);

    //all team members add your post/get routes in this middleware group function since all the links are protected in this group. Only authenticated user with valid authentication token will be able to access these links
});
