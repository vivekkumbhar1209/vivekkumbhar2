<?php
namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'          => 422,
                'validationError' => $validator->errors(),
            ]);
        } else if ($validator->passes()) {
            $data = User::where('email', $request->email)->first();
            if (! $data || ! Hash::check($request->password, $data->password)) {
                return response()->json([
                    'status'  => 401,
                    'message' => 'Invalid Credentials Entered',
                ]);
            } else {
                $token = $data->createToken('auth_Token')->plainTextToken;
                return response()->json([
                    'status'   => 200,
                    'message'  => 'Valid Credentials',
                    'userData' => $data,
                    'token'    => $token,
                ]);
            }
        } else {
            return response()->json([
                'status'   => 500,
                'message'  => "Unknown Backend Error occurred",
                'userData' => $request->all(),
            ]);
        }
    }
}
