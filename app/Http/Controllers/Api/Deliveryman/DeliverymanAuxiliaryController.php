<?php

namespace CodeDelivery\Http\Controllers\Api\Deliveryman;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\AuxiliaryRepository;
use CodeDelivery\Services\OrderService;

class DeliverymanAuxiliaryController extends Controller
{


    /**
     * @var AuxiliaryRepository
     */
    private $repository;
    /**
     * @var OrderService
     */
    private $orderService;

    public function  __construct(AuxiliaryRepository $repository, OrderService $orderService)
    {
        $this->repository = $repository;
        $this->orderService = $orderService;
    }

    public function index(){
        $auxliares = $this->repository->skipPresenter(false)->all();

        return $auxliares;
    }

    public function store(array $data){
        $auxiliary = $this->repository->create($data);
        return $auxiliary;
    }



}
