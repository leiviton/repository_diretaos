<?php

namespace CodeDelivery\Transformers;

use CodeDelivery\Models\Ordem;
use Illuminate\Database\Eloquent\Collection;
use League\Fractal\TransformerAbstract;

/**
 * Class OrderTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class OrdemTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['items'];
    protected $defaultIncludes = ['auxiliary','actions'];

    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Ordem $model)
    {
        return [
            'ordem' => $model->id,
            'data' => $model->DH_OS,
            'cliente' => $model->TITULAR,
            'melhor_horario' => $model->O_MELHOR,
            'problema' => $model->O_PROBLEMA,
            'prioridade' => $model->PRIORIDADE,
            'endereco' => $model->ENDERECO,
            'bairro' => $model->BAIRRO,
            'cidade' => $model->CIDADE,
            'estado' => $model->ESTADO,
            'cep' => $model->CEP,

        ];
    }

    protected function getArrayProductNames(Collection $items){
        $names = [];
        foreach ($items as $item){
            $names[] = $item->product->name;
        }
        return $names;
    }


    public function includeCupom(Ordem $model){
        if (!$model->cupom){
            return null;
        }
            return $this->item($model->cupom, new CupomTransformer());
    }
    public function includeItems(Ordem $model){
        return $this->collection($model->items,new OrderItemTransformer());
    }

    public function includeActions(Ordem $model){
        return $this->collection($model->actions,new ActionTransformer());
    }

    public function includeAuxiliary(Ordem $model){
        return $this->collection($model->auxiliarys,new AuxiliaryItemTransformer());
    }

}
