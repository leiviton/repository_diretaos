<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class AuxiliaryItems extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'equipe';
    protected $fillable = [
        'auxiliary_id',
        'order_id',
    ];
    public function auxiliary(){
        return $this->belongsTo(Auxiliary::class);
    }
    public function order(){
        return $this->belongsTo(Order::class);
    }

}
