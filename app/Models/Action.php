<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Action extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'actions';

    protected $fillable = [
        'deliveryman_id',
        'order_id',
        'key',
        'action',
        'geo_location',
        'data',
        'link_geo'
    ];
    public function deliveryman(){
        return $this->belongsTo(User::class);
    }
    public function order(){
        return $this->belongsTo(Order::class);
    }

}
