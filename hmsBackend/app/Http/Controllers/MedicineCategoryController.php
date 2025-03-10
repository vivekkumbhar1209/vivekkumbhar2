<?php

namespace App\Http\Controllers;

use App\Models\MedicineCategory; // Use correct PascalCase model name
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicineCategoryController extends Controller
{
    // Function to add a new medicine category
    public function addMedicineCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => ['required'],
            'description'   => ['required', 'max:200'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status"           => 403,
                "message"          => "Validation failed",
                "validationErrors" => $validator->errors(),
            ], 403);
        }

        // Create new category
        MedicineCategory::create([
            'category_name' => $request->category_name,
            'description'   => $request->description,
        ]);

        return response()->json([
            "status"  => 200,
            "message" => "Medicine category added successfully",
        ], 200);
    }

    // Function to fetch all medicine categories
    public function getMedicineCategory()
{
    $categories = MedicineCategory::all(['categoryID', 'category_name']); // Fetch all categories

    if ($categories->isEmpty()) {
        return response()->json(['message' => 'No categories found'], 404);
    }

    return response()->json($categories, 200);
}
}
