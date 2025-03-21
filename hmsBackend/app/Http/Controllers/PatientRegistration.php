<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Patients;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class PatientRegistration extends Controller
{
    public function registerPatient(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'patient_name' => 'required|string|max:255',
            'patient_email' => 'nullable|email|unique:patients,patient_email',
            'patient_mobile' => 'required|string|max:20',
            'patient_address' => 'nullable|string',
            'patient_gender' => 'nullable|in:Male,Female,Others',
            'patient_dob' => 'nullable|date|before_or_equal:today',
            'patient_adhar' => 'nullable|string|digits:12|unique:patients,patient_adhar',
            'registration_fee' => 'nullable|in:Paid,Unpaid',
            'profilePhoto' => 'nullable',
            'emergency_name' => 'nullable|string|max:255',
            'emergency_no' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Calculate age
            $age = null;
            if ($request->filled('patient_dob')) {
                $age = Carbon::parse($request->patient_dob)->age;
            }

            // Handle profile photo - file or base64 string
            $photoPath = null;
            if ($request->hasFile('profilePhoto')) {
                // If photo is sent as a file (multipart/form-data)
                $photoPath = $request->file('profilePhoto')->store('uploads/patient_photos', 'public');
            } elseif ($request->filled('profilePhoto') && str_starts_with($request->profilePhoto, 'data:image')) {
                // If photo is sent as base64 string
                $imageData = $request->profilePhoto;
                preg_match('/data:image\/(\w+);base64,/', $imageData, $type);
                $image = substr($imageData, strpos($imageData, ',') + 1);
                $image = base64_decode($image);

                $extension = $type[1]; // jpg, png etc.
                $filename = 'uploads/patient_photos/' . uniqid() . '.' . $extension;
                Storage::disk('public')->put($filename, $image);
                $photoPath = $filename;
            }

            $feeStatus = $request->registration_fee ?? 'Unpaid';

            // Save patient record
            $patient = new Patients();
            $patient->patient_name = $request->patient_name;
            $patient->patient_email = $request->patient_email;
            $patient->patient_mobile = $request->patient_mobile;
            $patient->patient_address = $request->patient_address;
            $patient->patient_gender = $request->patient_gender;
            $patient->patient_dob = $request->patient_dob;
            $patient->patient_age = $age;
            $patient->patient_adhar = $request->patient_adhar;
            $patient->registration_fee = $feeStatus;
            $patient->emergency_name = $request->emergency_name;
            $patient->emergency_no = $request->emergency_no;
            $patient->profilePhoto = $photoPath;
            $patient->save();

            $generatedPID = 'PID' . str_pad($patient->patientID, 6, '0', STR_PAD_LEFT);
            $patient->save();
            
            return response()->json([
                'status' => true,
                'message' => 'Patient registered successfully',
                'data' => [
                    'patient' => $patient,
                    'generatedPID' => $generatedPID,
                    'profilePhotoUrl' => $photoPath ? asset('storage/' . $photoPath) : null,
                ],
            ], 200);

        } catch (\Exception $e) {
            Log::error('Patient Registration Error: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

     // ✅ Add this NEW METHOD here 👇 to fetch patient by PID
     public function getPatientByPID($pid)
{
    try {
        // Convert PID000123 → 123
        $id = intval(str_replace('PID', '', $pid));

        // Fetch patient by ID column (default Laravel)
        $patient = Patients::find($id);

        if (!$patient) {
            return response()->json([
                'status' => false,
                'message' => 'Patient not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $patient,
            'generatedPID' => 'PID' . str_pad($patient->id, 6, '0', STR_PAD_LEFT),
            'profilePhotoUrl' => $patient->profilePhoto ? asset('storage/' . $patient->profilePhoto) : null,
        ], 200);

    } catch (\Exception $e) {
        Log::error('Get patient by PID error: ' . $e->getMessage());

        return response()->json([
            'status' => false,
            'message' => 'Internal Server Error',
            'error' => $e->getMessage(),
        ], 500);
    }
  }
 }




/*use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patients;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PatientRegistration extends Controller
{
    public function registerPatient(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'patient_name' => 'required|string|max:255',
            'patient_email' => 'nullable|email|unique:patients,patient_email',
            'patient_mobile' => 'required|string|max:20',
            'patient_address' => 'nullable|string',
            'patient_gender' => 'nullable|in:Male,Female,Others',
            'patient_dob' => 'nullable|date|before_or_equal:today',
            'patient_adhar' => 'nullable|string|digits:12|unique:patients,patient_adhar',
            'registration_fee' => 'nullable|in:Paid,Unpaid',
            'profilePhoto' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
            'emergency_name' => 'nullable|string|max:255',
            'emergency_no' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        }

        try {
            // Calculate age from DOB if provided
            $age = null;
            if ($request->filled('patient_dob')) {
                $age = Carbon::parse($request->patient_dob)->age;
            }

            // Handle profile photo
            $photoPath = null;
            if ($request->hasFile('profilePhoto')) {
                $photoPath = $request->file('profilePhoto')->store('uploads/patient_photos', 'public');
            }

            // Handle registration fee
            $feeStatus = $request->filled('registration_fee') ? 'Paid' : 'Unpaid';

            // Store data
            $patient = new Patients();
            $patient->patient_name = $request->patient_name;
            $patient->patient_email = $request->patient_email;
            $patient->patient_mobile = $request->patient_mobile;
            $patient->patient_address = $request->patient_address;
            $patient->patient_gender = $request->patient_gender;
            $patient->patient_dob = $request->patient_dob;
            $patient->patient_age = $age;
            $patient->patient_adhar = $request->patient_adhar;
            $patient->registration_fee = $feeStatus;
            $patient->emergency_name = $request->emergency_name;
            $patient->emergency_no = $request->emergency_no;
            $patient->profilePhoto = $photoPath;
            $patient->save();

            return response()->json([
                'status' => 200,
                'message' => 'Patient registered successfully',
                'data' => $patient,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ]);
        }
    }
}
*/