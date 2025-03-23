<?php
namespace App\Http\Controllers;

use App\Models\Patients;
use Illuminate\Http\Request;
use Validator;

class AppointmentController extends Controller
{
    public function checkIfPatientIsRegistered(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|digits:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 409,
                'message' => "Error",
                'data'    => $validator->errors(),
            ]);
        } else {

            $exists = Patients::where('patient_mobile', $request->mobile)->first();

            if ($exists) {
                return response()->json([
                    'status'  => 201,
                    'message' => "Record Present",
                    'text'    => 'The patient is already registered. Redirecting to appointment booking page...',
                ]);
            } else {
                return response()->json([
                    'status'  => 202,
                    'message' => "Warning",
                    'text'    => 'Patient does not exist in database. Redirecting to registration page...',
                ]);
            }
        }
    }
}
