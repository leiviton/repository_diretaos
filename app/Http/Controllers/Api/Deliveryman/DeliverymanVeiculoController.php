<?php

namespace CodeDelivery\Http\Controllers\Api\Deliveryman;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\VeiculoRepository;
use CodeDelivery\Services\OrderService;

use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class DeliverymanVeiculoController extends Controller
{


    /**
     * @var AuxiliaryRepository
     */
    private $repository;
    /**
     * @var OrderService
     */
    private $orderService;

    public function  __construct(VeiculoRepository $repository, OrderService $orderService)
    {
        $this->repository = $repository;
        $this->orderService = $orderService;
    }

    public function index(){
        $id = Authorizer::getResourceOwnerId();
        $veiculos = $this->repository->skipPresenter(false)->all();

        return $veiculos;
    }

    public function store(array $data){
        $auxiliary = $this->repository->create($data);
        return $auxiliary;
    }



}
