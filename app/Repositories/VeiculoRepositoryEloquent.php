<?php

namespace CodeDelivery\Repositories;

use CodeDelivery\Presenters\VeiculoPresenter;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Repositories\VeiculoRepository;
use CodeDelivery\Models\Veiculo;
use CodeDelivery\Validators\VeiculoValidator;

/**
 * Class VeiculoRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class VeiculoRepositoryEloquent extends BaseRepository implements VeiculoRepository
{

    protected $skipPresenter = false;

    public function model()
    {
        return Veiculo::class;
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
        return VeiculoPresenter::class;
    }


}
