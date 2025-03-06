<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpdRegistration extends Model
{
    use HasFactory;

    protected $table = 'opd_registration'; // Define the table name

    protected $primaryKey = 'opd_registrationID'; // Set primary key

    public $timestamps = true; // Enable timestamps (created_at, updated_at)

    protected $fillable = [
        'patientID',
        'doctorID',
        'reason_For_Visit',
        'status',
    ];

    // Define relationships
    public function patient()
    {
        return $this->belongsTo(Patients::class, 'patientID', 'patientID');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctorID', 'doctorID');
    }
}
