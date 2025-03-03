<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    // Define the table name (optional if Laravel follows naming convention)
    protected $table = 'departments';

    // Define the primary key (optional if it's "id")
    protected $primaryKey = 'departmentID';

    // Allow mass assignment for these fields
    protected $fillable = ['department_name', 'hod'];
}
