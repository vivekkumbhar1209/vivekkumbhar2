<?php
namespace App\Http\Controllers;

use App\Models\MedicineCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicineCategoryController extends Controller
{
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
        } else {
            MedicineCategory::create([
                'category_name' => $request->category_name,
                'description'   => $request->description,
            ]);

            return response()->json([
                "status"  => 200,
                "message" => "Medicine category added successfully",
            ], 200);
        }
               
    }


    public function getMedCategory(){

        return response()->json(MedicineCategory::all(), 200);
    }


}
