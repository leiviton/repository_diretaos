<?php

namespace CodeDelivery\Http\Controllers\Api\Deliveryman;

use CodeDelivery\Events\GetLocationDeliveryman;
use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Models\AuxiliaryItems;
use CodeDelivery\Models\Geo;
use CodeDelivery\Models\OrderItem;
use CodeDelivery\Repositories\AuxiliaryItemsRepository;
use CodeDelivery\Repositories\AuxiliaryRepository;
use CodeDelivery\Repositories\NotificationRepository;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\NotificationService;
use CodeDelivery\Services\OrderService;
use DB;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;


class DeliverymanCheckoutController extends Controller
{

    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var OrderService
     */
    private $orderService;

    private $repository;
    /**
     * @var NotificationRepository
     */
    private $notificationRepository;
    /**
     * @var NotificationService
     */
    private $notificationService;


    public function  __construct(
        OrderRepository $repository,
        UserRepository $userRepository,
        OrderService $orderService,
        NotificationRepository $notificationRepository,
        NotificationService $notificationService

    )
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;

        $this->notificationRepository = $notificationRepository;
        $this->notificationService = $notificationService;
    }

    public function sincronizarNot(Request $request){
        $read = $request->get('notification');
        $id_user = Authorizer::getResourceOwnerId();
        if($read || $read!=null){
           foreach ($read as $not){
                $id = $not['id'];
                $r = $not['read'];
                $c = $not['confirmation'];
                $this->notificationService->update($id,$id_user,$r,$c);
           }
        }
        return $this->countN();
    }

    public function index(){
        $id = Authorizer::getResourceOwnerId();
        $orders = $this->repository
            ->skipPresenter(false)
            ->with(['items'])
            ->scopeQuery(function ($query)use($id){
                return $query->where('user_deliveryman_id','=',$id)
                    ->whereRaw('(status = ? or status = ?)',['Pendente','Iniciada']);
            })->paginate();

        return $orders;
    }

    public function show($id){
        $idDeliveryman= Authorizer::getResourceOwnerId();

        return $this->repository
            ->skipPresenter(false)
            ->getByIdAndDeliveryman($id,$idDeliveryman);
    }

    public function updateStatus(Request $request,$id){
        $idDeliveryman = Authorizer::getResourceOwnerId();
        $auxiliarys = null;
        if ($request->get('auxiliary')!=null){
            $auxiliarys = $request->get('auxiliary');
        }

        $items = null;
        if ($request->get('items')!=null){
            $items = $request->get('items');
        }

        return $this->orderService->updateStatus($id,$idDeliveryman,
            $request->get('status'),
            $request->get('lat'),
            $request->get('long'),
            $request->get('service'),
            $auxiliarys,
            $items
        );


    }

    public function countN(){
        $id= Authorizer::getResourceOwnerId();
        $notifications = $this->notificationRepository
            ->skipPresenter(false)
            ->scopeQuery(function ($query)use($id){
                return $query->where('user_id','=',$id)->where('bit_read','=',0);
            })->all();

        return $notifications;
    }
    public function count(Request $request){
        $idDeliveryman= Authorizer::getResourceOwnerId();
        return $this->repository->skipPresenter(false)->countM($idDeliveryman,$request->get('status'));
    }

    public function countD(Request $request){
        $idDeliveryman= Authorizer::getResourceOwnerId();
        return $this->repository->skipPresenter(false)->countD($idDeliveryman,$request->get('status'));
    }
    public function countMi(Request $request){
        $idDeliveryman= Authorizer::getResourceOwnerId();
        return $this->repository->skipPresenter(false)->countMi($idDeliveryman,$request->get('status'));
    }

    public function countDi(Request $request){
        $idDeliveryman= Authorizer::getResourceOwnerId();
        return $this->repository->skipPresenter(false)->countDi($idDeliveryman,$request->get('status'));
    }

    public function geo(Request $request, Geo $geo, $id){
        $idDeliveryman= Authorizer::getResourceOwnerId();
        $order = $this->repository->getByIDAndDeliveryman($id, $idDeliveryman);
        $geo->lat = $request->get('lat');
        $geo->long = $request->get('long');
        event(new GetLocationDeliveryman($geo,$order));
        return $geo;
    }
}
