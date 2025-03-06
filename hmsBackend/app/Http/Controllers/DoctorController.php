<?php
namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function getDoctorByDepartmentID(Request $request)
    {
        $doctors = Doctor::join('users', 'doctors.userID', '=', 'users.id')
            ->join('departments', 'doctors.departmentID', '=', 'departments.departmentID')
            ->where('doctors.departmentID', $request->selectedDepartment)
            ->select('doctors.*', 'users.name', 'users.email', 'departments.department_name')
            ->get();

        if (! $doctors) {
            return response()->json([
                'status'  => 404,
                'message' => 'No Doctors available',
            ]);
        } else {
            return response()->json([
                'status'     => 200,
                'message'    => 'Doctor data served',
                'doctorData' => $doctors,
            ]);
        }

    }
}
