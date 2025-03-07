<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;


class DiseaseController extends Controller
{

}




/*namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Disease;
use Illuminate\Support\Facades\Log;


class DiseaseController extends Controller
{
     public function getAllDiseases()
   {
     $diseases = Disease::all(); // Fetch all diseases
     return response()->json(['diseases' => $diseases]);
   }


     // Update disease details
     public function updateDisease(Request $request, $id)
     {
         // Log request for debugging
         Log::info("Update request received for ID: " . $id);
     
         // Find disease by primary key
         $disease = Disease::find($id);
     
         if (!$disease) {
             return response()->json(['message' => 'Disease not found'], 404);
         }
     
         // Validate request
         $validatedData = $request->all(); 
     
         // Update disease
         $disease->update($validatedData);
     
         // Ensure JSON response
         return  response()->json([
             'message' => 'Disease updated successfully',
             'disease' => [
                 'id' => $disease->diseaseID,
                 'diseaseName' => $disease->diseaseName,
                 'diseaseDescription' => $disease->diseaseDescription,
                 'updated_at' => $disease->updated_at,
                 'created_at' => $disease->created_at
             ]
         ], 200, ['Content-Type' => 'application/json']);
     }
  }

*/



