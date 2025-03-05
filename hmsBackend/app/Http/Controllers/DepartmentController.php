<?php
namespace App\Http\Controllers;

use App\Models\Department;

class DepartmentController extends Controller
{
    public function allDepartment()
    {
        return response()->json([
            'status'   => 200,
            'message'  => 'Department Data',
            'deptData' => Department::all(),
        ]);
    }
}
