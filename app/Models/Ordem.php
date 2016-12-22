<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Ordem extends Model implements Transformable
{
    use TransformableTrait;


    protected $fillable = [
        'id',
        'DH_OS',
        'CLIENTE',
        'DH_EXE',
        'ID_PLANO',
        'STATUS',
        'ID_TEC',
        'zipcode',
        'close_at',
        'ini_at',
        'sinc_at'
    ];

    public function items(){
        return $this->hasMany(OrderItem::class);
    }

    public function actions(){
        return $this->hasMany(Action::class);
    }

    public function auxiliarys(){
        return $this->hasMany(AuxiliaryItems::class);
    }

    public function deliveryman(){
        return $this->belongsTo(User::class,'user_deliveryman_id','id');
    }
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function cupom(){
        return $this->belongsTo(Cupom::class);
    }

    public function product(){
        return $this->hasMany(Product::class);
    }
}
