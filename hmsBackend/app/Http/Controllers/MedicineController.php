<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicine;
use Illuminate\Support\Facades\Validator;

class MedicineController extends Controller
{
    public function addMedicine(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'categoryID' => 'required|integer|exists:category,id',
            'medicine_name' => 'required|string|max:255',
            'cost' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => "Validation failed",
                "errors" => $validator->errors()
            ], 400);
        }

        try {
            // Insert into the database
            $medicine = Medicine::create([
                'categoryID' => $request->categoryID,
                'medicine_name' => $request->medicine_name,
                'cost' => $request->cost
            ]);

            return response()->json([
                "status" => 200,
                "message" => "Medicine added successfully",
                "data" => $medicine
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "status" => 500,
                "message" => "Internal Server Error",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
