<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Iot extends Model
{
    use HasFactory;

    protected $table = 'iot';
    protected $fillable = ['suhu', 'kelembaban'];
}
