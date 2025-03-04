<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use HasFactory;


class Doctor extends Model
{
    
    protected $table = 'doctors';

    protected $primaryKey = 'doctorID'; // Primary key

    public $timestamps = true; // Enable timestamps

    protected $fillable = [
        'userID',
        'specialization',
        'experience',
        'departmentID',
        'consultation_fee',
    ];

    // Define relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'departmentID', 'departmentID');
    }
}
