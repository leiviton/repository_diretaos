<?php

namespace CodeDelivery\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
           'CodeDelivery\Repositories\CategoryRepository',
           'CodeDelivery\Repositories\CategoryRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\ClientRepository',
            'CodeDelivery\Repositories\ClientRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\OrderItemRepository',
            'CodeDelivery\Repositories\OrderItemRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\OrderRepository',
            'CodeDelivery\Repositories\OrderRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\ProductRepository',
            'CodeDelivery\Repositories\ProductRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\UserRepository',
            'CodeDelivery\Repositories\UserRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\CupomRepository',
            'CodeDelivery\Repositories\CupomRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\AuxiliaryRepository',
            'CodeDelivery\Repositories\AuxiliaryRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\AuxiliaryItemsRepository',
            'CodeDelivery\Repositories\AuxiliaryItemsRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\NotificationRepository',
            'CodeDelivery\Repositories\NotificationRepositoryEloquent'
        );
        $this->app->bind(
            'CodeDelivery\Repositories\VeiculoRepository',
            'CodeDelivery\Repositories\VeiculoRepositoryEloquent'
        );
    }
}
