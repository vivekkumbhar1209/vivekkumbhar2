<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicine;
use App\Models\MedicineCategory;
use Illuminate\Support\Facades\Validator;

class MedicineController extends Controller
{
    // Get all medicines with sorting
    public function getMedicines(Request $request) 
    {
        $sortBy = $request->query("sortBy", "medicine_name");
        $order = $request->query("order", "asc");

        $medicines = Medicine::orderBy($sortBy, $order)->get();

        return response()->json([
            "status" => 200,
            "message" => "Medicines Data",
            "medicines" => $medicines,
        ]);
    }

    // Add a new medicine
    public function addMedicine(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categoryID'    => 'required|integer|exists:medicine_category,categoryID', // Corrected foreign key validation
            'medicine_name' => 'required|string|max:255',
            'cost'          => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status"  => 400,
                "message" => "Validation failed",
                "errors"  => $validator->errors(),
            ], 400);
        }

        try {
            $medicine = Medicine::create([
                'categoryID'    => $request->categoryID,
                'medicine_name' => $request->medicine_name,
                'cost'          => $request->cost,
            ]);

            return response()->json([
                "status"  => 200,
                "message" => "Medicine added successfully",
                "data"    => $medicine,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "status"  => 500,
                "message" => "Internal Server Error",
                "error"   => $e->getMessage(),
            ], 500);
        }
    }
}
