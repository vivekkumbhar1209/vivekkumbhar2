<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Department;
use Illuminate\Http\JsonResponse;

class UpdateDepartment extends Controller 
{
    public function updateDepartment(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'department_name' => ['sometimes', 'string', 'max:255'],
            'hod' => ['sometimes', 'string', 'max:255']
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 403,
                "message" => "Validation failed",
                'validationErrors' => $validator->errors()
            ], 403);
        }

        // Check if any data is provided
        if (!$request->hasAny(['department_name', 'hod','departmentID'])) {
            return response()->json([
                "status" => 400,
                "message" => "No data provided for update"
            ], 400);
        }

        // Find the department by ID
        $department = Department::find($request->departmentID);

        if (!$department) {
            return response()->json([
                "status" => 404,
                "message" => "Department not found"
            ], 404);
        }

        // Update the department details
        $department->update($request->only(['department_name', 'hod']));

        return response()->json([
            "status" => 200,
            "message" => "Department updated successfully",
            "data" => $department
        ], 200);
    }
}
