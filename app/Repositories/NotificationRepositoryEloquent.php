<?php

namespace CodeDelivery\Repositories;

use CodeDelivery\Presenters\NotificationPresenter;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Repositories\NotificationRepository;
use CodeDelivery\Models\Notification;
use CodeDelivery\Validators\NotificationValidator;

/**
 * Class NotificationRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class NotificationRepositoryEloquent extends BaseRepository implements NotificationRepository
{
    protected $skipPresenter = true;

    public function getByIdAndDeliveryman($id,$idDeliveryman){

        $result = $this->model->where('id',$id)
            ->where('user_id',$idDeliveryman)
            ->where('bit_read',0)
            ->first();
        if ($result){
            return $this->parserResult($result);
        }
        throw (new ModelNotFoundException())->setModel($this->model());
    }


    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Notification::class;
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
        return NotificationPresenter::class;
    }
}
