<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Notification extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'user_id',
        'message',
        'read',
        'confirmation',
        'bit_read'
    ];

    public function deliveryman(){
        return $this->belongsTo(User::class,'user_id','id');
    }

}
