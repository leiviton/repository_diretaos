<?php

namespace CodeDelivery\Repositories;

use CodeDelivery\Presenters\AuxiliaryPresenter;
use CodeDelivery\Transformers\AuxiliaryTransformer;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Repositories\AuxiliaryRepository;
use CodeDelivery\Models\Auxiliary;
use CodeDelivery\Validators\AuxiliaryValidator;

/**
 * Class AuxiliaryRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class AuxiliaryRepositoryEloquent extends BaseRepository implements AuxiliaryRepository
{
    protected $skipPresenter = false;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Auxiliary::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function presenter()
    {
        return AuxiliaryPresenter::class;
    }
}
