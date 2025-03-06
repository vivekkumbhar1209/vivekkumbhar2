<?php
namespace App\Http\Controllers;

use App\Models\OpdRegistration;
use Illuminate\Http\Request;
use Validator;

class OPDController extends Controller
{
    public function registerOPDPatient(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'selectedPatientID' => ['required'],
            'selectedDoctor'    => ['required'],
            'reason'            => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'           => 403,
                'message'          => 'Validation Errors',
                'validationErrors' => $validator->errors(),
            ]);
        } else {
            $data = OpdRegistration::create([
                'patientID'        => $request->selectedPatientID,
                'doctorID'         => $request->selectedDoctor,
                'reason_For_Visit' => $request->reason,

            ]);
            if ($data) {
                return response()->json([
                    'status'  => 200,
                    'message' => 'Patient Registered Successfully',
                    'data'    => $data,
                ]);
            } else {
                return response()->json([
                    'status'  => 405,
                    'message' => 'Database Error',
                ]);
            }
        }
    }
}
