<?php

namespace CodeDelivery\Repositories;

use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Interface OrderRepository
 * @package namespace CodeDelivery\Repositories;
 */
interface OrdemRepository extends RepositoryInterface
{
    public function getByIDAndDeliveryman($id,$idDeliveryman);

    public function getByIdAndClient($id,$idClient);

}
