<?php

namespace App\Helper;

use Illuminate\Support\Facades\Storage;

// Creating a new file helper to extract functions for reusability
class FileHelper {

    /**
     * 
     * Function documentation
     * @param \Illuminate\Http\Request $request
     * @param string @oldFileName
     * @return string|null
     * 
     */

     public static function handleProfilePhoto($request, $oldFileName = null) {
      
      $path = null; // if the user never had a profile photo just return null

      // If file is in the request then add or update
      if ($request->hasFile('profilePhoto')) {
        $image = $request->file('profilePhoto');
        $formattedUsername = preg_replace('/\s+/', '_', strtolower($request->name));
        $imageName = $formattedUsername . '_' . now()->format('Y-m-d_H-i-s') . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('profile_photos', $imageName, 'public');
    }
    
     // If file is not in the request that means not file uploaded, so keep the existing one.
      else {
        $path = $oldFileName;
      } 

    return $path;
  }

}