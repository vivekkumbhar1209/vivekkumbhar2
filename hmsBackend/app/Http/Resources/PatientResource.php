<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->patientID,
            'name' => $this->patient_name,
            'email' => $this->patient_email,
            'mobile' => $this->patient_mobile,
            'emergency_contact' => [
                'name' => $this->emergency_name,
                'number' => $this->emergency_no,
            ],
            'address' => $this->patient_address,
            'gender' => $this->patient_gender,
            'dob' => $this->patient_dob,
            'age' => $this->patient_age,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
