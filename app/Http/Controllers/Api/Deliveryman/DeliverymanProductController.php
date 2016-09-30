<?php

namespace CodeDelivery\Http\Controllers\Api\Deliveryman;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\ProductRepository;

class DeliverymanProductController extends Controller
{


    /**
     * @var ProductRepository
     */
    private $repository;

    public function  __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }


    public function index(){
        $products = $this->repository->skipPresenter(false)->all();

        return $products;
    }

    public function fibra(){

        $category = 1;
        $products = $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function ($query)use($category){
                return $query->where('category_id','=',$category);
            })->all();

        return $products;
    }

    public function radio(){

        $category = 2;
        $products = $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function ($query)use($category){
                return $query->where('category_id','=',$category);
            })->all();

        return $products;
    }

    public function seguranca(){

        $category = 3;
        $products = $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function ($query)use($category){
                return $query->where('category_id','=',$category);
            })->all();

        return $products;
    }



}
