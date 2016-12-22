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
        'S_ALA',
        'S_SEN',
        'S_COM',
        'S_MON',
        'S_BAT',
        'S_BATS',
        'S_SIR',
        'S_MOD',
        'S_DISP',
        'S_SENHA',
        'S_ENE',
        'S_CABO',
        'S_OUTA',
        'S_CAM',
        'S_CAMV',
        'S_GRAV',
        'S_ACE',
        'S_STAND',
        'S_CERCA',
        'S_MOLA',
        'S_FIO',
        'S_RADIO',
        'S_RADIOO',
        'S_FIBRA',
        'S_FIBRAO',
        'S_LBRA1',
        'S_BRA1',
        'S_LBRA2',
        'S_BRA2',
        'S_LBRA3',
        'S_BRA3',
        'S_LBRA4',
        'S_BRA4',
        'S_LBRA5',
        'S_BRA5'
    ];

    public function order(){
        return $this->belongsTo(Order::class,'ORDEM','id');
    }

}
