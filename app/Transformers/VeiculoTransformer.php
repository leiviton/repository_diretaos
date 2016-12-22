<?php

namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Veiculo;

/**
 * Class VeiculoTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class VeiculoTransformer extends TransformerAbstract
{

    /**
     * Transform the \Veiculo entity
     * @param \Veiculo $model
     *
     * @return array
     */
    public function transform(Veiculo $model)
    {
        return [
            'CODVEI'         => (int) $model->CODVEI,
            'V_NOME'         => $model->V_NOME,
            'V_PLACA'        => $model->V_PLACA,
        ];
    }


}
