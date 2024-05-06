<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function versions()
    {
        return $this->hasMany(GameVersion::class, 'id', 'game_id');
    }
}
