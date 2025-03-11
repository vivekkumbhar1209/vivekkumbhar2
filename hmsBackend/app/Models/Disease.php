<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disease extends Model
{
    use HasFactory;

    protected $table      = 'diseases';
    protected $primaryKey = 'diseaseID';
    public $incrementing  = true;
    protected $keyType    = 'integer';

    protected $fillable = [
        'diseaseName',
        'diseaseDescription',
        'isActive',
    ];
}
