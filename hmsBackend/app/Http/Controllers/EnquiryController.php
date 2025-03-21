<?php
namespace App\Http\Controllers;

use App\Events\EnquiryTableUpdated;
use App\Events\NewEnquiry;
use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|max:255',
            'mobile_no' => 'required|string|max:15',
            'address'   => 'required|string',
            'message'   => 'required|string',
        ]);

        $enquiry = Enquiry::create($request->all());
        if ($enquiry) {
            $data = [
                'title'   => 'New Enquiry',
                'message' => $enquiry,
                'name'    => $request->name,
                'mobile'  => $request->mobile_no,
            ];

            broadcast(new NewEnquiry($data))->toOthers();
            broadcast(new EnquiryTableUpdated(true));

            return response()->json(['message' => 'Enquiry submitted successfully!', 'data' => $enquiry], 200);
        } else {
            return response()->json([
                'status'  => 409,
                'message' => 'Unknown Database Error Occurred',
            ]);
        }
    }

    public function retrieveAllEnquiries(Request $request)
    {
        $data = Enquiry::latest()->get();
        if ($data) {
            return response()->json([
                'status'  => 200,
                'message' => 'Success',
                'data'    => $data,
            ]);
        }
    }
}
