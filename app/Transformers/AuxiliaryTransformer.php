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
            'id'         => (int) $model->id,
            'name'       => $model->name,
            'status'     => (int) $model->status,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
