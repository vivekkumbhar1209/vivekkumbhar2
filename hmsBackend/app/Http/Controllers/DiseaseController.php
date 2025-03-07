<?php
namespace App\Http\Controllers;

use App\Models\Disease;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DiseaseController extends Controller
{
    public function getAllDiseases()
    {
        $diseases = Disease::all();
        return response()->json(['diseases' => $diseases]);
    }

    public function updateDisease(Request $request, $id)
    {

        Log::info("Update request received for ID: " . $id);

        $disease = Disease::find($id);

        if (! $disease) {
            return response()->json(['message' => 'Disease not found'], 404);
        }

        $validatedData = $request->all();

        $disease->update($validatedData);

        return response()->json([
            'message' => 'Disease updated successfully',
            'disease' => [
                'id'                 => $disease->diseaseID,
                'diseaseName'        => $disease->diseaseName,
                'diseaseDescription' => $disease->diseaseDescription,
                'updated_at'         => $disease->updated_at,
                'created_at'         => $disease->created_at,
            ],
        ], 200, ['Content-Type' => 'application/json']);
    }
}