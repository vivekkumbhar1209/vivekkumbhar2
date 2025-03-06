<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicine;
use Illuminate\Support\Facades\Validator;
use App\Models\MedicineCategory;
class MedicineController extends Controller
{
    public function getMedicines(Request $request) {
    //Retrieves all existing medicines from medicines table.
        // Get the params sent from the frontend fetch req. 
        //   },
          // params: {
          //   sortBy: sortBy,
          //   order: order,
          // },
        $sortBy = $request->query("sortBy", "medicine_name");
        $order = $request->query("order", "asc");

        // second argument in the query method is a default value
        $medicines = Medicine::orderBy($sortBy, $order)->get();

        return response()->json([
          "status" => 200,
          "message" => "Medicines Data",
          "medicines" => $medicines,
        //   "params" => $requestParams,
        ]);
        
      }

    public function addMedicine(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categoryID' => 'required|integer|exists:medicine_categories,id',
            'medicine_name' => 'required|string|max:255',
            'cost' => 'required|numeric|min:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => "Validation failed",
                "errors" => $validator->errors()
            ], 400);
        }
        try {
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
    public function addMedicineCategory(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'categoryID' => 'required|integer|exists:categories,id',
            'medicine_name' => 'required|string|max:255'
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
            $medicineCategory = MedicineCategory::create([
                'categoryID' => $request->categoryID,
                'medicine_name' => $request->medicine_name
            ]);

            return response()->json([
                "status" => 200,
                "message" => "Medicine Category added successfully",
                "data" => $medicineCategory
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
