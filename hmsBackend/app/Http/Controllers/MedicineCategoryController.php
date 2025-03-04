<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\MedicineCategory;

class MedicineCategoryController extends Controller
{
    public function addCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => ['required'],
            'description' => ['required', 'min:25', 'max:200']
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 403,
                "message" => "Validation failed",
                "validationErrors" => $validator->errors()
            ],403);
        }else{
            $category = MedicineCategory::create([
                'category_name' => $request->category_name,
                'description' => $request->description
            ]);
    
            return response()->json([
                "status" => 200,
                "message" => "Medicine category added successfully",
                "data" => $category
            ], 200);
        }        
    }
}
