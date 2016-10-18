<?php

namespace CodeDelivery\Repositories;

use Carbon\Carbon;
use CodeDelivery\Presenters\OrderPresenter;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Models\Order;
use CodeDelivery\Validators\OrderValidator;

/**
 * Class OrderRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class OrderRepositoryEloquent extends BaseRepository implements OrderRepository
{
    protected $skipPresenter = true;

    public function getByIdAndDeliveryman($id,$idDeliveryman){
        $result = $this->model->where('id',$id)
            ->where('user_deliveryman_id',$idDeliveryman)
            ->where('status','!=','Executada')
            ->first();
        if ($result){
            return $this->parserResult($result);
        }
        throw (new ModelNotFoundException())->setModel($this->model());
    }

    public function getByIdAndClient($id,$idClient){
        $result = $this->model->where('id',$id)
            ->where('client_id',$idClient)
            ->first();
        if ($result){
            return $this->parserResult($result);
        }
        throw (new ModelNotFoundException())->setModel($this->model());
    }

    public function countM($id,$status){

        return (int) $this->model
            ->where('user_deliveryman_id',$id)
            ->whereRaw('(status = ? or status = ?) and priority = ?',['Pendente','Iniciada','Critica'])
            ->get()->count();
    }

    public function countD($id,$status){

        return (int) $this->model
            ->where('user_deliveryman_id',$id)
            ->whereRaw('(status = ? or status = ?) and priority =?',['Pendente','Iniciada','Alta'])
            ->get()->count();

    }

    public function countDi($id,$status){

        return (int) $this->model->where('updated_at', '>=', Carbon::now()->startOfDay())
            ->where('user_deliveryman_id',$id)->where('status','Executada')->get()->count();

    }
    public function countMi($id,$status){

        return (int) $this->model->where('updated_at', '>=', Carbon::now()->startOfMonth())
            ->where('user_deliveryman_id',$id)
            ->where('status','Executada')->get()->count();
    }


    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Order::class;
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
        return OrderPresenter::class;
    }

}
