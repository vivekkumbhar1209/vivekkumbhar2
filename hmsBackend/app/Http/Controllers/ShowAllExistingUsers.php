<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ShowAllExistingUsers extends Controller
{
    //Retrieves all existing users from users table.
    public function AllExistingUsers(Request $request) {


      // Get the params sent from the frontend fetch req. 
      //   },
        // params: {
        //   sortBy: sortBy,
        //   order: order,
        // },
      $sortBy = $request->query("sortBy", "name");
      $order = $request->query("order", "asc");

      // second argument in the query method is a default value
      $requestParams = $request->all();
      $users = User::orderBy($sortBy, $order)->get();
      
      return response()->json([
        "status" => 200,
        "message" => "Users Data",
        "Users" => $users,
        "params" => $requestParams,
      ]);
      
    }

}
