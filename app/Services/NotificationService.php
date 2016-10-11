<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 08/08/2016
 * Time: 10:49
 */

namespace CodeDelivery\Services;


use CodeDelivery\Repositories\NotificationRepository;


class NotificationService
{


    /**
     * @var NotificationRepository
     */
    private $notificationRepository;

    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    public function update($id,$id_user,$read=null,$confirmation=null){

        $notification = $this->notificationRepository->getByIDAndDeliveryman($id,$id_user);

        if($read!=null){
            $notification->read=$read;
        }
        if($confirmation!=null){
            $notification->confirmation=$confirmation;
            $notification->bit_read=1;
        }

        $notification->save();

        return $notification;

    }
}