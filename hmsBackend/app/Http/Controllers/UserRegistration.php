<?php
namespace App\Http\Controllers;
// use App\Controller\Log;
use App\Models\Doctor;
use App\Models\User;
use Carbon\Carbon;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


class UserRegistration extends Controller
{
    
        //Retrieves all existing medicines from medicines table.
        // Get the params sent from the frontend fetch req.
    public function getAllUsers(Request $request)
    {
        //Retrieves all existing medicines from medicines table.
        // Get the params sent from the frontend fetch req.
        //   },
        // params: {
        //   sortBy: sortBy,
        //   order: order,
        // },
        // params: {
        //   sortBy: sortBy,
        //   order: order,
        // },
        $sortBy = $request->query("sortBy", "name");
        $order  = $request->query("order", "asc");

        

        // second argument in the query method is a default value
        $users = User::orderBy($sortBy, $order)->get();

        return response()->json([
            "status"  => 200,
            "message" => "Users Data",
            "Users"   => $users,
            //   "params" => $requestParams,
        ]);
    }

    public function registerUser(Request $request)
    {
        $data      = $request->all();
        $validator = Validator::make($data, ['role' => ['required']]);
        if ($validator->fails()) {
            return response()->json([
                'status'  => 403,
                'message' => 'Validation failed',
                'errors'  => $validator->errors(),
            ]);
        }
        //\Log::info("User Role:", ['role' => $request->role]);  //for debugging

        //add valiadtion if user is Receptionist
        if ($request->role == 'Receptionist' || $request->role=="Admin") {
            //Log::info("Processing receptionist ----------------------------------------------------------------------------------------------");//for dadebugging

            $validator = Validator::make($data, [
                'name'          => ['required'],
                'email'         => ['required', 'email', 'unique:users,email'],
                'password'      => ['required', 'string', 'min:8', 'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'],
                'gender'        => ['required', 'in:Male,Female,Others'],
                'date_Of_Birth' => ['nullable', 'date', 'before:today'],
                'mobile'        => ['required', 'regex:/^[789][0-9]{9}$/', 'unique:users,mobile'],
                'address'       => ['required', 'string'],
               'profilePhoto' => ['nullable'],
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'  => 422,
                    'message' => 'Validation failed',
                    'errors'  => $validator->errors(),
                ], 422);
            }
            //calculate age
            try
            {
                if ($request->date_Of_Birth) {
                    $date_Of_Birth = Carbon::parse($request->date_Of_Birth);
                    $age           = $date_Of_Birth->age;
                } else {
                    $age = 0;
                }
            } catch (\Exception $e) {
                return response()->json([
                    'status'  => 500,
                    'message' => 'Invalid data',
                    'errors'  => $e->getMessage(),
                ]);

            }

            //file is storing at storage/app/public  folder

            if ($request->hasFile('profilePhoto')) {
                $image = $request->file('profilePhoto');
                $formattedUsername = preg_replace('/\s+/', '_', strtolower($request->name));
                $imageName = $formattedUsername . '_' . now()->format('Y-m-d_H-i-s') . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('profile_photos', $imageName, 'public');
            } else {
                $path = null;
            }
            
            //Log::info("Profile Photo Path: " . $path); // Debugging
            //Add receptionist data into database
            $user = User::create([
                'name'          => $request->name,
                'email'         => $request->email,
                'password'      => Hash::make($request->password), // Encrypt password
                'role'          => $request->role,
                'gender'        => $request->gender,
                'date_Of_Birth' => $request->date_Of_Birth,
                'age'           => $age, // Save calculated age
                'mobile'        => $request->mobile,
                'address'       => $request->address,
                'profilePhoto' => $path,
                
                
            ]);

            return response()->json([
                'status'  => 200,
                'message' => 'User registered successfully!',
                'user'    => $user,
            ]);

        } //end of if

        //adding and validating doctors data
// Adding and validating doctors' data
else if ($request->role == 'Doctor') {
  $validator = Validator::make($data, [
      'name'             => ['required'],
      'email'            => ['required', 'email', 'unique:users,email'],
      'password'         => ['required', 'string', 'min:8', 'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'],
      'gender'           => ['required', 'in:Male,Female,Others'],
      'date_Of_Birth'    => ['nullable', 'date', 'before:today'],
      'mobile'           => ['required', 'regex:/^[789][0-9]{9}$/', 'unique:users,mobile'],
      'address'          => ['required', 'string'],
      'experience'       => ['required', 'integer', 'min:0'],
      'departmentID'     => ['required', 'integer'],
      'consultation_fee' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'],
      'profilePhoto' => ['nullable'],

      
  ]);

  if ($validator->fails()) {
      return response()->json([
          'status'  => 422,
          'message' => 'Validation failed',
          'errors'  => $validator->errors(),
      ], 422);
  }

  // Calculate age
  try {
      if ($request->date_Of_Birth) {
          $date_Of_Birth = Carbon::parse($request->date_Of_Birth);
          $age           = $date_Of_Birth->age;
      } else {
          $age = 0;
      }
  } catch (\Exception $e) {
      return response()->json([
          'status'  => 500,
          'message' => 'Invalid data',
          'errors'  => $e->getMessage(),
      ]);
  }

  if ($request->hasFile('profilePhoto')) {
    $image = $request->file('profilePhoto');
    $formattedUsername = preg_replace('/\s+/', '_', strtolower($request->name));
    $imageName = $formattedUsername . '_' . now()->format('Y-m-d_H-i-s') . '.' . $image->getClientOriginalExtension();
    $path = $image->storeAs('profile_photos', $imageName, 'public');
} else {
    $path = null;
}

  // Enter data into the doctor and user table
  $user = User::create([
      'name'          => $request->name,
      'email'         => $request->email,
      'password'      => Hash::make($request->password), // Encrypt password
      'role'          => $request->role,
      'gender'        => $request->gender,
      'date_Of_Birth' => $request->date_Of_Birth,
      'age'           => $age, // Save calculated age
      'mobile'        => $request->mobile,
      'address'       => $request->address,
      'profilePhoto'=>$path,
  ]);

  
  $doctor = Doctor::create([
      'userID'           => $user->id,
      'experience'       => $request->experience,
      'departmentID'     => $request->departmentID,
      'consultation_fee' => $request->consultation_fee,
  ]);

  return response()->json([
      'status'  => 200,
      'message' => 'Doctor registered successfully',
      'user'    => $user,
      'doctor'  => $doctor,
  ]);
} // else if end

    } //end of function

   // Edit or update users
public function updateUser(Request $request, $id)
{
    $data = $request->all();
    $validator = Validator::make($data, ['role'=>['required']]);
    if($validator->fails())
    {
        return response()->json([
            'status'=>403,
            'message'=>'Validation failed',
            'errors'=>$validator->errors(),
        ]);
    }

    //add validation if user is Receptionist
    if($request->role=='Receptionist')
    {
        $validator = Validator::make($data, [
            'name'=>['required'],
            'email'=>['required', 'email', 'unique:users,email,'.$id],
            'password'=>['nullable','string','min:8','regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'],
            'gender'=>['required', 'in:Male,Female,Others'],
            'date_Of_Birth' => ['nullable','date', 'before:today'],
            'mobile'=>['required', 'regex:/^[789][0-9]{9}$/', 'unique:users,mobile,'.$id],
            'address'=>['required', 'string'],
            'profilePhoto' => ['nullable|image|mimes:jpeg,png,jpg,gif|max:2048'],
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'message'=>'Validation failed',
                'errors'=>$validator->errors(),
            ],422);
        }

        try {
            if ($request->date_Of_Birth) {
                $date_Of_Birth = Carbon::parse($request->date_Of_Birth);
                $age = $date_Of_Birth->age;
            } else {
                $age = 0;
            }
        } catch(\Exception $e) {
            return response()->json([
                'status'=>500,
                'message'=>'Invalid data',
                'errors'=>$e->getMessage(),
            ]);
        }

        // Update receptionist data into database
        $user = User::where('id', $id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : null, // Only update password if provided
            'role' => $request->role,
            'gender' => $request->gender,
            'date_Of_Birth' => $request->date_Of_Birth,
            'age' => $age, // Save calculated age
            'mobile' => $request->mobile,
            'address' => $request->address,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'User updated successfully!',
            'user' => User::find($id),
        ]);
    }

    // Update doctor data
    else if($request->role=='Doctor')
    {
        $validator = Validator::make($data, [
            'name'=>['required'],
            'email'=>['required', 'email', 'unique:users,email,'.$id],
            'password'=>['nullable','string','min:8','regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'],
            'gender'=>['required', 'in:Male,Female,Others'],
            'date_Of_Birth' => ['nullable','date', 'before:today'],
            'mobile'=>['required', 'regex:/^[789][0-9]{9}$/', 'unique:users,mobile,'.$id],
            'address'=>['required', 'string'],
            'experience'=>['required', 'integer', 'min:0'],
            'departmentID'=>['required','integer'],
            'consultation_fee'=>['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'],
            'profilePhoto' => ['nullable|image|mimes:jpeg,png,jpg,gif|max:2048'],
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'message'=>'Validation failed',
                'errors'=>$validator->errors(),
            ],422);
        }

        try {
            if ($request->date_Of_Birth) {
                $date_Of_Birth = Carbon::parse($request->date_Of_Birth);
                $age = $date_Of_Birth->age;
            } else {
                $age = 0;
            }
        } catch(\Exception $e) {
            return response()->json([
                'status'=>500,
                'message'=>'Invalid data',
                'errors'=>$e->getMessage(),
            ]);
        }

        // Update doctor and user data
        User::where('id', $id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : null, // Only update password if provided
            'role' => $request->role,
            'gender' => $request->gender,
            'date_Of_Birth' => $request->date_Of_Birth,
            'age' => $age, // Save calculated age
            'mobile' => $request->mobile,
            'address' => $request->address,
        ]);

        Doctor::where('userID', $id)->update([
            'experience' => $request->experience,
            'departmentID' => $request->departmentID,
            'consultation_fee' => $request->consultation_fee,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Doctor updated successfully!',
            'user' => User::find($id),
            'doctor' => Doctor::where('userID', $id)->first(),
        ]);
    }
}

}
