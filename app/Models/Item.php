<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['category', 'price', 'type', 'skin_texture'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'items_users', 'item_id', 'user_id');
    }
}
