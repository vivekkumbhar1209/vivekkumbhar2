<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Hash;
use App\Models\User;
use App\Models\Doctor;

class UserRegistration extends Controller
{
    public function registerUser(Request $request)
    {
        $data= $request->all();
        $validator = Validator::make($data, ['role'=>['required']]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>403,
                'message'=>'Validation failed',
                'errors'=>$validator->errors(),
            ]);
        }
       //\Log::info("User Role:", ['role' => $request->role]);  //for debugging

        //add valiadtion if user is Receptionist
        if($request->role=='Receptionist')
        {
            ///\Log::info("Processing receptionist");//for debugging
            
            $validator = Validator::make($data, [
                'name'=>['required'],
                'email'=>['required', 'email', 'unique:users,email'],
                'password'=>['required','string','min:8','regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'],
                'gender'=>['required', 'in:Male,Female,Other'],
                'date_Of_Birth' => ['nullable','date', 'before:today'],
                'mobile'=>['required', 'regex:/^[789][0-9]{9}$/', 'unique:users,mobile'],
                'address'=>['required', 'string', 'min:5', 'max:255'],
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=>422,
                    'message'=>'Validation failed',
                    'errors'=>$validator->errors(),
                ],422);
            }
          //calculate age
          try 
          {
            if ($request->date_Of_Birth) {
                $date_Of_Birth = Carbon::parse($request->date_Of_Birth);
                $age = $date_Of_Birth->age;
            } else {
                $age = 0;
            }
          }
            catch(\Exception $e)
            {
                return response()->json([
                    'status'=>500,
                    'message'=>'Invalid data',
                    'errors'=>$e->getMessage(),
                ]);

            }
        
          
            //Add receptionist data into database
           $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Encrypt password
                'role' => $request->role,
                'gender' => $request->gender,
                'date_Of_Birth' => $request->date_Of_Birth,
                'age' => $age, // Save calculated age
                'mobile' => $request->mobile,
                'address' => $request->address,
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'User registered successfully!',
                'user' => $user,
            ]);

        }//end of if


    //adding and validating doctors data
    else if($request->role=='Doctor')
        {
            $validator = Validator::make($data, [
                'name'=>['required'],
                'email'=>['required', 'email', 'unique:users,email'],
                'password'=>['required','string','min:8','regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'],
                'gender'=>['required', 'in:Male,Female,Other'],
                'date_Of_Birth' => ['nullable','date', 'before:today'],
                'mobile'=>['required', 'regex:/^[789][0-9]{9}$/', 'unique:users,mobile'],
                'address'=>['required', 'string', 'min:5', 'max:255'],
                'specialization'=>['required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z\s]+$/'],
                'experience'=>['required', 'integer', 'min:0'],
                'departmentID'=>['required','integer'],
                'consultation_fee'=>['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'],
                ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=>422,
                    'message'=>'Validation failed',
                    'errors'=>$validator->errors(),
                ],422);
            }
            //calculate age
            try{
                if ($request->date_Of_Birth) {
                    $date_Of_Birth = Carbon::parse($request->date_Of_Birth);
                    $age = $date_Of_Birth->age;
                } else {
                    $age = 0;
                }
            }
            catch(\Exception $e)
            {
                return response()->json([
                    'status'=>500,
                    'message'=>'Invalis data',
                    'errors'=>$e->getMessage(),
                ]);

            }
            //enter data into doctor and user table
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Encrypt password
                'role' => $request->role,
                'gender' => $request->gender,
                'date_Of_Birth' => $request->date_Of_Birth,
                'age' => $age, // Save calculated age
                'mobile' => $request->mobile,
                'address' => $request->address,
            ]);
            $doctor = Doctor::create([
                'userID' => $user->id,
                'specialization' => $request->specialization,
                'experience' => $request->experience,
                'departmentID' => $request->departmentID,
                'consultation_fee' => $request->consultation_fee,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Doctor registered successfully',
                'user' => $user,
                'doctor' => $doctor,
            ]);
        } //else if end            
        
    }//end of function

    /*public function demo( Request $request){
        return response()->json([
            'status'=> 200,
            'message'=>'data reached backend',
            'formData'=>$request->all()
        ]);
    }*/
}
