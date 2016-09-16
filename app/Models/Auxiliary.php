<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Auxiliary extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'id',
        'name'
    ];
    public function auxiliaryItem(){
        return $this->hasMany(AuxiliaryItems::class);
    }

}
