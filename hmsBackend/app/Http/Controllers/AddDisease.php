<?php
namespace App\Http\Controllers;

use App\Models\Disease;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AddDisease extends Controller
{
    public function addDisease(Request $request)
    {
        Log::info('Received Data:', $request->all());

        $validator = Validator::make($request->all(), [
            'diseaseName'        => ['required', 'string', 'max:255', 'regex:/^[A-Za-z\s]+$/'],
            'diseaseDescription' => ['required', 'string', 'max:500', 'regex:/^[A-Za-z0-9\s.,!?]+$/'],
            'isActive'           => ['required', 'in:Active,Inactive'],
        ], [
            'diseaseName.required'        => 'Disease name is required.',
            'diseaseName.string'          => 'Disease name must be a valid string.',
            'diseaseName.max'             => 'Disease name should not exceed 255 characters.',
            'diseaseName.regex'           => 'Disease name should only contain alphabets and spaces.',
        
            'diseaseDescription.required' => 'Description is required.',
            'diseaseDescription.string'   => 'Description must be a valid string.',
            'diseaseDescription.max'      => 'Description should not exceed 500 characters.',
            'diseaseDescription.regex'    => 'Description can only contain alphabets, numbers, spaces, and basic punctuation (.,!?).',
        
            'isActive.in'                 => 'Status must be either Active or Inactive.',
        ]);
        

        if ($validator->fails()) {
            return response()->json([
                "status"           => 422,
                "message"          => "Validation failed",
                "validationErrors" => $validator->errors(),
            ], 422);
        }

        try {
            $disease = Disease::create($request->only(['diseaseName', 'diseaseDescription', 'isActive']));

            Log::info('Disease added successfully:', $disease->toArray());

            return response()->json([
                "status"  => 201,
                "message" => "New disease added successfully.",
                "data"    => $disease,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error adding disease:', ['error' => $e->getMessage()]);

            return response()->json([
                "status"  => 500,
                "message" => "Failed to add disease.",
                "error"   => $e->getMessage(),
            ], 500);
        }
    }
}


        // $validator = Validator::make($request->all(), [
        //     'diseaseName'        => ['required'],
        //     'diseaseDescription' => ['required', 'max:200'],
        //     'isActive'           => ['required'],

        // ]);
        // if ($validator->fails()) {
        //     return response()->json([
        //         "status"           => 403,
        //         "message"          => "validation failed",
        //         'validationErrors' => $validator->errors(),
        //     ], 403);
        // } else {
        //     $disease = Disease::create([
        //         'diseaseName'        => $request->diseaseName,
        //         'diseaseDescription' => $request->diseaseDescription,
        //         'isActive'           => $request->isActive,
        //     ]);
        //     return response()->json([
        //         "status"  => 200,
        //         "message" => "New Entry Added in Disease Table",
        //         "data"    => $disease,
        //     ], 200);
        // }
   
