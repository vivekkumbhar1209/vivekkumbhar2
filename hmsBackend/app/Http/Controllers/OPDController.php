<?php
namespace App\Http\Controllers;

use App\Events\QueueUpdated;
use App\Models\OpdQueue;
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

                $queue = OpdQueue::create([
                    'patientID' => $request->selectedPatientID,
                    'doctorID'  => $request->selectedDoctor,
                    'status'    => 'Waiting',
                ]);

                if ($data && $queue) {

                    return response()->json([
                        'status'  => 200,
                        'message' => 'Patient registered and added to queue successfully',
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

    public function getOpdQueue()
    {

        $queue = DB::table('opd_queue')->join('patients', 'opd_queue.patientID', '=', 'patients.patientID')->join('doctors', 'opd_queue.doctorID', '=', 'doctors.doctorID')->join('users', 'doctors.userID', '=', 'users.id')->select('patients.patient_name', 'patients.patientID', 'users.name', 'patients.patient_age', 'patients.patient_gender', 'opd_queue.status', 'opd_queue.queueID', 'users.id')->orderBy('opd_queue.created_at', 'desc')->get();

        broadcast(new QueueUpdated($queue))->toOthers();

        return response()->json([
            'status'  => 200,
            'message' => 'Queue request successful',
        ]);
    }

    public function deQueue(Request $request)
    {
        $request->validate([
            'queueID'   => 'required',
            'patientID' => 'required',
        ]);

        $deQueue                = DB::table('opd_queue')->where('queueID', $request->queueID)->delete();
        $deletedOPDRegistration = DB::table('opd_registration')->where('patientID', $request->patientID)->delete();

        if ($deQueue && $deletedOPDRegistration) {

            $data = DB::table('opd_queue')->join('patients', 'opd_queue.patientID', '=', 'patients.patientID')->join('doctors', 'opd_queue.doctorID', '=', 'doctors.doctorID')->join('users', 'doctors.userID', '=', 'users.id')->select('patients.patient_name', 'patients.patientID', 'users.name', 'patients.patient_age', 'patients.patient_gender', 'opd_queue.status', 'opd_queue.queueID', 'users.id')->orderBy('opd_queue.created_at', 'desc')->get();

            broadcast(new QueueUpdated($data))->toOthers();

            return response()->json([
                'status'  => 200,
                'message' => 'De Queued Successfully',
            ]);
        } else {
            return response()->json([
                'status'  => 409,
                'message' => 'Database Error Encountered',
            ]);
        }

    }

}
