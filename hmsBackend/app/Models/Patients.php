<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patients extends Model
{
    protected $table      = 'patients';
    protected $primaryKey = 'patientID';
    public $incrementing  = true;

    protected $fillable = [
        'patient_name',
        'patient_email',
        'patient_mobile',
        'emergency_name',
        'emergency_no',
        'patient_address',
        'patient_gender',
        'patient_dob',
        'patient_age',
        'profilePhoto',
    ];

    public function opdRegistrations()
    {
        return $this->hasMany(OpdRegistration::class, 'patientID', 'patientID');
    }
}
