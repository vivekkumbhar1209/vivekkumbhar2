<?php

namespace App\Http\Controllers;

use App\Models\DoctorAvailability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoctorAvailabilityController extends Controller
{
    public function updateAvailability(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'availability_status' => ['required', 'in:Available,Unavailable'],
            'available_start_time' => ['nullable', 'required_if:availability_status,Available',],
            'available_end_time' => ['nullable', 'required_if:availability_status,Available', 'after:available_start_time'],
            'unavailable_start_date' => ['nullable', 'required_if:availability_status,Unavailable', 'date'],
            'unavailable_end_date' => ['nullable', 'required_if:availability_status,Unavailable', 'after_or_equal:unavailable_start_date', 'date'],
            'reason' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 403,
                "message" => "Validation failed",
                'validationErrors' => $validator->errors(),
            ]);
        } else {
            $availability = DoctorAvailability::where('userID', $request->userID)->first();

            if ($availability) {
                //  Update existing record
                $availability->update([
                    'availability_status' => $request->availability_status,
                    'available_start_time' => $request->available_start_time,
                    'available_end_time' => $request->available_end_time,
                    'unavailable_start_date' => $request->unavailable_start_date,
                    'unavailable_end_date' => $request->unavailable_end_date,
                    'reason' => $request->reason,
                ]);
                $message = "Availability updated successfully";
            } else {
                // Create new record
                $availability = DoctorAvailability::create([
                    'userID' => $request->userID,
                    'availability_status' => $request->availability_status,
                    'available_start_time' => $request->available_start_time,
                    'available_end_time' => $request->available_end_time,
                    'unavailable_start_date' => $request->unavailable_start_date,
                    'unavailable_end_date' => $request->unavailable_end_date,
                    'reason' => $request->reason,
                ]);
                $message = "Availability created successfully";
            }
        }

        return response()->json([
            "status" => 200,
            "message" => "Availability updated successfully",
            "data" => $availability,
        ]);

    }


    //function to return availability details of perticular doctor
    public function getAvailabilityOfDoctor(Request $request)
    {

        $userID = $request->query("doctorId") ? $request->query("doctorId") : auth()->user()->id; // Get the logged-in user ID
        
        $availability = DoctorAvailability::with('user')
            ->where('userID', $userID)
            ->first(); // Fetch only one record for the specific doctor

        if (!$availability) {
            return response()->json([
                "status" => 404,
                "message" => "Availability details not found for this doctor",
            ]);
        }

        return response()->json([
            "status" => 200,
            "message" => "Doctor availability details retrieved successfully",
            "data" => $availability,
        ]);
    }


}
