<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Auxiliary extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = "funciona";
    protected $fillable = [
        'CODFUN',
        'FUNCIONARIO',
        'NOMECOM',
        'CPF',
        'FUNCAO',
        'status',
        'id_user'
    ];

    public function auxiliaryItem(){
        return $this->hasMany(AuxiliaryItems::class);
    }

    public function user(){
        return $this->belongsTo(User::class,'id_user','id');
    }


}
