<?php

namespace App\Http\Controllers;
use App\Models\Patients;
use App\Http\Resources\PatientResource;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    //fetch all patients
    public function index()
    {
        return PatientResource::collection(Patients::all());

    }

    /**
     * Fetch a single patient by ID.
     */
    public function show($id)
    {
        $patient = Patients::find($id);
    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }
    return new PatientResource($patient);
    }
}
