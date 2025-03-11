<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $table = 'medicines';
    protected $primaryKey = 'medicineID';
    protected $fillable = ['categoryID', 'medicine_name', 'cost'];

    public function category()
    {
        return $this->belongsTo(MedicineCategory::class, 'categoryID', 'categoryID');
    }
}
