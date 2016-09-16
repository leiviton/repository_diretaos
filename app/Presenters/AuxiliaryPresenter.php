<?php

namespace CodeDelivery\Presenters;

use CodeDelivery\Transformers\AuxiliaryTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class AuxiliaryPresenter
 *
 * @package namespace CodeDelivery\Presenters;
 */
class AuxiliaryPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new AuxiliaryTransformer();
    }
}
