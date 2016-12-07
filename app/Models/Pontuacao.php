<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Pontuacao extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'pontuacao';

    protected $fillable = [
        'ORDERM',
        'HORA_INICIO',
        'HORA_FIM',
        'qtd',
        'serial',
        'code_control'
    ];

    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
