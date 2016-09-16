<?php

namespace CodeDelivery\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Repositories\AuxiliaryItemsRepository;
use CodeDelivery\Models\AuxiliaryItems;
use CodeDelivery\Validators\AuxiliaryItemsValidator;

/**
 * Class AuxuliaryItemsRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class AuxiliaryItemsRepositoryEloquent extends BaseRepository implements AuxiliaryItemsRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return AuxiliaryItems::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
