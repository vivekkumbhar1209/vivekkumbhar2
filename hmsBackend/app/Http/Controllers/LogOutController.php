<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogOutController extends Controller
{
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'status'  => 200,
            'message' => 'logout successfull',
        ]);
    }
}
