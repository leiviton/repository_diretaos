<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 17/08/2016
 * Time: 15:26
 */

namespace CodeDelivery\Http\Controllers\Api;


use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\NotificationRepository;
use CodeDelivery\Repositories\UserRepository;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class UserController extends Controller
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var NotificationRepository
     */
    private $notificationRepository;

    public function __construct(UserRepository $userRepository, NotificationRepository $notificationRepository)
    {
        $this->userRepository = $userRepository;
        $this->notificationRepository = $notificationRepository;
    }

    public function authenticated(){
        $id = Authorizer::getResourceOwnerId();

        return $this->userRepository->skipPresenter(false)->find($id);
    }
    public function updateDeviceToken(Request $request){
        $id = Authorizer::getResourceOwnerId();
        $deviceToken = $request->get('device_token');
        return $this->userRepository->updateDeviceToken($id,$deviceToken);
    }

    public function notification(){
        $id = Authorizer::getResourceOwnerId();

        return $this->notificationRepository->skipPresenter(false)->read($id);
    }
}