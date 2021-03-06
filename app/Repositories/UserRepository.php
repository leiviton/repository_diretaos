<?php

namespace CodeDelivery\Repositories;

use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Interface UserRepository
 * @package namespace CodeDelivery\Repositories;
 */
interface UserRepository extends RepositoryInterface
{
    public function updateDeviceToken($id,$deviceToken);
    public function countUsers();
}
