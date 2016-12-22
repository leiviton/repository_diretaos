<?php

namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Auxiliary;

/**
 * Class AuxiliaryTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class AuxiliaryTransformer extends TransformerAbstract
{

    /**
     * Transform the \Auxiliary entity
     * @param \Auxiliary $model
     *
     * @return array
     */
    public function transform(Auxiliary $model)
    {
        return [
            'id'         => (int) $model->CODFUN,
            'name'       => $model->NOMECOM,
            'id_user'    => (int) $model->id_user,
            ];
    }
}
