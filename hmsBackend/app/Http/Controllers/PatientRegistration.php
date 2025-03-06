<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Models\Patients;

class PatientRegistration extends Controller
{
    public function registerPatient(Request $request)
{
    // Convert FormData to an associative array (only needed for FormData, not JSON)
    $data = $request->all();

    $validator = Validator::make($data, [
        'patient_name' => ['required', 'string', 'max:255'],
        'patient_email' => ['required', 'email', 'unique:patients,patient_email'],
        'patient_mobile' => ['required', 'digits:10', 'regex:/^[6-9]\d{9}$/'],
        'emergency_name' => ['nullable', 'string', 'max:255'],
        'emergency_no' => ['nullable', 'digits:10', 'regex:/^[6-9]\d{9}$/'],
        'patient_address' => ['required', 'string', 'max:500'],
        'patient_gender' => ['required', 'in:Male,Female,Others'],
        'patient_dob' => ['required', 'date', 'before:today'],
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 403,
            'message' => 'Validation failed',
            'errors' => $validator->errors(),
        ]);
    }

    try {
        $patient_dob = Carbon::parse($request->patient_dob);
        $age = $patient_dob->age;
    } catch (\Exception $e) {
        return response()->json([
            'status' => 500,
            'message' => 'Invalid date format',
            'error' => $e->getMessage(),
        ]);
    }
    

    /*return response()->json([
        'status' => 200,
        'message' => 'Patient registered successfully',
        'data' => [
            'patient_name' => $request->patient_name,
            'patient_email' => $request->patient_email,
            'patient_mobile' => $request->patient_mobile,
            'emergency_name' => $request->emergency_name,
            'emergency_no' => $request->emergency_no,
            'patient_address' => $request->patient_address,
            'patient_gender' => $request->patient_gender,
            'patient_dob' => $request->patient_dob,
            'patient_age' => $age,
        ]
    ]);
    */

    //Insert Data into Database
        try {
            $patient = Patients::create([
                'patient_name' => $request->patient_name,
                'patient_email' => $request->patient_email,
                'patient_mobile' => $request->patient_mobile,
                'emergency_name' => $request->emergency_name,
                'emergency_no' => $request->emergency_no,
                'patient_address' => $request->patient_address,
                'patient_gender' => $request->patient_gender,
                'patient_dob' => $request->patient_dob,
                'patient_age' => $age,
            ]);
              return response()->json([
                'status' => 200,
                'message' => 'Patient registered successfully',
                'data' => $patient
            ]);

            } catch (\Exception $e) {
               return response()->json([
                'status' => 500,
                'message' => 'Failed to register patient',
                'error' => $e->getMessage(),
            ]);
            }

}

/*// ✅ Delete a Patient by ID
public function deletePatient($id)
{
    // Find the patient by ID
    $patient = Patients::find($id);

    // Check if patient exists
    if (!$patient) {
        return response()->json([
            'status' => 404,
            'message' => 'Patient not found',
        ]);
    }

    // Delete the patient
    try {
        $patient->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Patient deleted successfully',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 500,
            'message' => 'Failed to delete patient',
            'error' => $e->getMessage(),
        ]);
    }*/
}




