<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Auth;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['id','category','type','user_id','deleted_at','created_at','updated_at'];


    public function setUserIdAttribute($value)
    {
        $this->attributes['user_id'] = 1;
    }

}
