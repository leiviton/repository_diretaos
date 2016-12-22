<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Order extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'user_deliveryman_id',
        'status',
        'close_at',
        'ini_at',
        'sinc_at',
        'hash',
        'DH_EXE',
        'ID_TEC',
        'RESPTEC',
        'O_OBSOS',
        'VEICULO',
        'CODVEI',
        'flag_sincronizado'
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

    public function pontuacao(){
        return $this->hasMany(Pontuacao::class);
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

    public function veiculo(){
        return $this->belongsTo(Veiculo::class);
    }


}
