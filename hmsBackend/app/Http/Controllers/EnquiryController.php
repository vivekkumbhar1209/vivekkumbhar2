<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Enquiry;
class EnquiryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile_no' => 'required|string|max:15',
            'address' => 'required|string',
            'message' => 'required|string'
        ]);

        $enquiry=Enquiry::create($request->all());

        return response()->json(['message' => 'Enquiry submitted successfully!','data' => $enquiry], 200);
    }
}
