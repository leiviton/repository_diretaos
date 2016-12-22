<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Veiculo extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'veiculo';
    protected $fillable = [
        'CODVEI',
        'V_NOME',
        'V_COR',
        'V_PLACA',
        'TIPO',
        'NUMERO',
        'ANO',
        'MARCADOR'
    ];

}
