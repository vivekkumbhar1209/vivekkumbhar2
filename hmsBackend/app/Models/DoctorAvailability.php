<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorAvailability extends Model
{
    use HasFactory;
    protected $table = 'doctor_availability';
    protected $primaryKey = 'availability_ID';
    public $timestamps = true;
    protected $fillable = [
        'userID',
        'availability_status',
        'available_start_time',
        'available_end_time',
        'unavailable_start_date',
        'unavailable_end_date',
        'reason',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

}
