<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HabitDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'habit_log_id',
        'category',
        'item_name',
        'is_done',
    ];
}
