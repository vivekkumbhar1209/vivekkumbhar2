<?php
namespace App\Http\Controllers;

use App\Models\Disease;
use Illuminate\Http\Request;
use Validator;

class AddDisease extends Controller
{
    public function addDisease(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'diseaseName'        => ['required'],
            'diseaseDescription' => ['required', 'max:200'],
            'isActive'           => ['required'],

        ]);
        if ($validator->fails()) {
            return response()->json([
                "status"           => 403,
                "message"          => "validation failed",
                'validationErrors' => $validator->errors(),
            ], 403);
        } else {
            $disease = Disease::create([
                'diseaseName'        => $request->diseaseName,
                'diseaseDescription' => $request->diseaseDescription,
                'isActive'           => $request->isActive,
            ]);
            return response()->json([
                "status"  => 200,
                "message" => "New Entry Added in Disease Table",
                "data"    => $disease,
            ], 200);
        }
    }
}
