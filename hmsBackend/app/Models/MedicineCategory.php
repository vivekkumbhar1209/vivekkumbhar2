<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineCategory extends Model
{
    use HasFactory;
    protected $table  = 'medicine_category';
    protected $primaryKey = 'categoryID';
    public $incrementing  = true;

    public $timestamps = true;

    protected $fillable = [
        'category_name',
        'description',
    ];

}
