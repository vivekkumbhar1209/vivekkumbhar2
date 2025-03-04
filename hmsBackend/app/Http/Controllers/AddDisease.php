<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\Disease;

class AddDisease extends Controller
{
    public function addDisease(Request $request){
        
        $validator = Validator::make($request->all(),[
                'diseaseName'=>['required'],
                'diseaseDescription'=>['required','min:25','max:200'],
                'isActive'=>['required']

            ]);
            if($validator->fails()){
                return response()->json([
                    "status"=>403,
                    "message"=>"validation failed",
                    'validationErrors'=>$validator->errors()
                ],403);
            }else{
                $disease = Disease::create([
                    'diseaseName'=>$request->diseaseName,
                    'diseaseDescription'=>$request->diseaseDescription,
                    'isActive'=>$request->isActive
                ]);
                return response()->json([
                    "status"=>200,
                    "message"=>"validation successful",
                    "data"=>$disease
                ],200);
            }
    }
}
