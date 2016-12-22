<?php

namespace CodeDelivery\Transformers;

use Illuminate\Database\Eloquent\Collection;
use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Order;

/**
 * Class OrderTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class OrderTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['actions'];

    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Order $model)
    {
        return [
            'id'         => (int) $model->id,
            'status'=>$model->status,
            'number_os_sise'=>$model->number_os_sise,
            'phone1' => $model->phone1,
            'phone2' => $model->phone2,
            'type' =>(int) $model->type,
            'plano'=>$model->plano,
            'id_plano'=>$model->id_plano,
            'product'=>$model->product,
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
            'cep' => $model->CEP
        ];
    }

    protected function getArrayProductNames(Collection $items){
        $names = [];
        foreach ($items as $item){
            $names[] = $item->product->name;
        }
        return $names;
    }


    public function includeCupom(Order $model){
        if (!$model->cupom){
            return null;
        }
            return $this->item($model->cupom, new CupomTransformer());
    }
    public function includeItems(Order $model){
        return $this->collection($model->items,new OrderItemTransformer());
    }

    public function includeActions(Order $model){
        return $this->collection($model->actions,new ActionTransformer());
    }

    public function includeAuxiliary(Order $model){
        return $this->collection($model->auxiliarys,new AuxiliaryItemTransformer());
    }

}
