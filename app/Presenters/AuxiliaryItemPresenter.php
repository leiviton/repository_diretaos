<?php

namespace CodeDelivery\Presenters;

use CodeDelivery\Transformers\AuxiliaryItemTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class AuxiliaryItemPresenter
 *
 * @package namespace CodeDelivery\Presenters;
 */
class AuxiliaryItemPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new AuxiliaryItemTransformer();
    }
}
