<?php

namespace App\Http\Controllers;

use App\Models\DoctorAvailability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoctorAvailabilityController extends Controller
{
   public function updateAvailability(Request $request)
   {
    $validator=Validator::make($request->all(),[
        'availability_status'=>['required', 'in:Available,Unavailable'],
        'available_start_time'=>['nullable', 'required_if:availability_status,Available',],
        'available_end_time'=>['nullable', 'required_if:availability_status,Available','after:available_start_time'],
        'unavailable_start_date'=>['nullable', 'required_if:availability_status,Unavailable','date'],
        'unavailable_end_date'=>['nullable', 'required_if:availability_status,Unavailable','after_or_equal:unavailable_start_date','date'],
        'reason' =>['nullable', 'string'],
    ]);

    if ($validator->fails()) {
        return response()->json([
            "status"           => 403,
            "message"          => "Validation failed",
            'validationErrors' => $validator->errors(),
        ]);
    }
     else
      {
        $availability=DoctorAvailability::create([
            'userID'                 => $request->userID,
            'availability_status'    => $request->availability_status,
            'available_start_time'   => $request->available_start_time,
            'available_end_time'     => $request->available_end_time,
            'unavailable_start_date' => $request->unavailable_start_date,
            'unavailable_end_date'   => $request->unavailable_end_date,
            'reason'                 => $request->reason,

        ]);
      }

      return response()->json([
        "status"  => 200,
        "message" => "Availability updated successfully",
        "data"    => $availability,
    ]);

   }
}
