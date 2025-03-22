<?php
namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;
use Validator;

class DataVisualizationController extends Controller
{
    public function getEnquiryRecords(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'recordType' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'  => 200,
                'message' => 'Error',
                'data'    => 'Validation Errors',
            ]);
        } else {
            if ($request->recordType === 'all') {

                $data = Enquiry::whereDate('created_at', today())->latest()->get();
                if ($data) {
                    return response()->json([
                        'status'  => 200,
                        'message' => 'Success',
                        'data'    => $data,
                    ]);
                } else {
                    return response()->json([
                        'status'  => 203,
                        'message' => 'Error',
                        'data'    => 'No Records Found',
                    ]);
                }
            } else if ($request->recordType === 'registered') {

                $data = Enquiry::whereDate('created_at', today())->where('registered', 'yes')->latest()->get();

                if ($data) {
                    return response()->json([
                        'status'  => 200,
                        'message' => 'Success',
                        'data'    => $data,
                    ]);
                } else {
                    return response()->json([
                        'status'  => 203,
                        'message' => 'Error',
                        'data'    => 'No Records Found',
                    ]);
                }

            } else if ($request->recordType === 'not registered') {
                $data = Enquiry::whereDate('created_at', today())->where('registered', 'no')->latest()->get();

                if ($data) {
                    return response()->json([
                        'status'  => 200,
                        'message' => 'Success',
                        'data'    => $data,
                    ]);
                } else {
                    return response()->json([
                        'status'  => 203,
                        'message' => 'Error',
                        'data'    => 'No Records Found',
                    ]);
                }
            }
        }

    }

    public function getEnquiryAnalyticalData()
    {
        $data = [
            'totalEnquiries'       => Enquiry::count(),
            'convertedEnquiries'   => Enquiry::whereDate('created_at', today())->where('registered', 'yes')->latest()->count(),
            'todaysEnquiries'      => Enquiry::whereDate('created_at', today())->count(),
            'pendingRegistrations' => Enquiry::where('registered', 'no')->count(),
        ];

        if ($data) {
            return response()->json([
                'status'  => 200,
                'message' => 'Success',
                'data'    => $data,
            ]);
        }
    }
}
