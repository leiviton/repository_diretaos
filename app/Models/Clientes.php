<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Clientes extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'cm_clientes';

    protected $fillable = [
        'ID_CLIENTE',
        'RAZAO',
        'NOME_CLI',
        'PESSOA',
        'ATIVO',
        'CODGRU',
        'DATACAD',
        'CONTRATO',
        'COD_SGC',
        'LOGRA',
        'ENDERECO',
        'NUMERO',
        'COMP',
        'BAIRRO',
        'CEP',
        'CIDADE',
        'ESTADO',
        'CPF',
        'CGC',
        'CELULAR',
        'RG',
        'EMAIL',
        'USER_ID'
    ];

    public function user(){
        return $this->hasOne(User::class,'id','USER_ID');
    }
}
