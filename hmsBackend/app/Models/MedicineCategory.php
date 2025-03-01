<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicineCategory extends Model
{
    protected $table      = 'medicine_category';
    protected $primaryKey = 'categoryID';
    public $incrementing  = true;

    public $timestamps = true;

    protected $fillable = [
        'category_name',
        'description',
    ];

}
