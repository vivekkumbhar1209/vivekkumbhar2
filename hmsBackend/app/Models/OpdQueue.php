<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpdQueue extends Model
{
    use HasFactory;

    protected $table = 'opd_queue'; // Specify the table name

    protected $fillable = [
        'patientID',
        'doctorID',
        'status',
    ];

    public $timestamps = true; // Enable created_at and updated_at

    // Relationship with Patient
    public function patient()
    {
        return $this->belongsTo(Patients::class);
    }

    // Relationship with Doctor
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
