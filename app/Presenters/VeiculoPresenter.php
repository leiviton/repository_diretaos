<?php

namespace CodeDelivery\Presenters;

use CodeDelivery\Transformers\VeiculoTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class VeiculoPresenter
 *
 * @package namespace CodeDelivery\Presenters;
 */
class VeiculoPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new VeiculoTransformer();
    }
}
