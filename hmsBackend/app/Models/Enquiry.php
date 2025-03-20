<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    use HasFactory;

    protected $table = 'enquiry_form'; // Table name
    protected $fillable = ['name', 'email', 'mobile_no', 'address', 'message'];
}
