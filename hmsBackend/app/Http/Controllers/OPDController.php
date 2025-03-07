<?php
namespace App\Http\Controllers;

use App\Models\OpdRegistration;
use App\Models\Patients;
use DB;
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

            //checking if patient is already registered for OPD
            $existingEntry = OpdRegistration::where('patientID', $request->selectedPatientID)->where('doctorID', $request->selectedDoctor)->first();

            if ($existingEntry) {
                return response()->json([
                    'status'  => 409,
                    'message' => 'Duplicate Entry. Cannot add same patient twice',
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

    public function getPatientsWithOPDStatus()
    {
        $patients = Patients::select(
            'patientID',
            'patient_name',
            'patient_mobile',
            'patient_age',
            'patient_gender',
            'created_at',
            'updated_at',
            DB::raw("(SELECT COUNT(*) FROM opd_registration WHERE opd_registration.patientID = patients.patientID) as opdRegistered")
        )->orderBy('created_at', 'desc')
            ->get();

        // Transform numeric value to 'registered'/'not registered'
        $patients->transform(function ($patient) {
            $patient->opdRegistered = $patient->opdRegistered > 0 ? 'registered' : 'not registered';
            return $patient;
        });

        return response()->json([
            'status'  => 200,
            'message' => 'Patients with OPD Status',
            'data'    => $patients,
        ]);

    }

}
