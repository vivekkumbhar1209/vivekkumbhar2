<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//instruction - do not use this route file since it is not needed as per our hms requirement. All the routes are to be added in the routes/api.php file for api creation
