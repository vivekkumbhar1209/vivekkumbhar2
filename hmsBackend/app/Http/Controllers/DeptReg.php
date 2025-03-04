<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Department;

class DeptReg extends Controller
{
    public function registerDepartment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'department_name' => ['required',  'max:255'],
            'hod' => ['required', 'max:255']
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 403,
                "message" => "Validation failed",
                'validationErrors' => $validator->errors()
            ], 403);
        }else{
            $department = Department::create([
                'department_name' => $request->department_name,
                'hod' => $request->hod
            ]);
    
            return response()->json([
                "status" => 200,
                "message" => "Department registered successfully",
                "data" => $department
            ], 200);
        }

        
    }
    

}
