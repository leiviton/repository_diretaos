<?php

namespace CodeDelivery\Repositories;

use CodeDelivery\Presenters\NotificationPresenter;
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

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Notification::class;
    }

    
    public function read($id){
        return $this->model->where(['bit_read'=>0,'user_id'=>$id])->get();
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
