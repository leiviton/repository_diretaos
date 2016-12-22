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

    public function sincronizar(Request $request){
        $read = $request->get('notification');
        $orders = $request->get('orders');
        $orini = $request->get('orini');
        $ordevol = $request->get('ordevol');
        $visita = $request->get('visita');
        $sinc_at = $request->get('sinc_at');
        $pontuacao = $request->get('servicos');
        $veiculo = $request->get('veiculo');

        $id_user = Authorizer::getResourceOwnerId();
        if($read && $read<>null){
           foreach ($read as $not){
                $id = $not['id'];
                $r = $not['read'];
                $c = $not['confirmation'];
                $this->notificationService->update($id,$id_user,$r,$c);
           }
        }

        if($visita && $visita <> null){
            foreach ($visita as $v){
                $v['service']=null;
                $v['items']=null;
                $v['auxiliary']=null;
                $v['status']=0;
                $v['inic']=null;
                $v['close']=null;
                $this->updateStatus($v,$sinc_at);
            }
        }

        if($ordevol && $ordevol <> null){
            foreach ($ordevol as $od){
                $od['service']=null;
                $od['items']=null;
                $od['auxiliary']=null;
                $od['status']=3;
                $od['inic']=null;
                $od['close']=null;
                $this->updateStatus($od,$sinc_at);
            }
        }

        if($orini && $orini <> null){
            foreach ($orini as $or){
                $or['service']=null;
                $or['items']=null;
                $or['auxiliary']=null;
                $or['status']=1;
                $or['close']=null;
                $this->updateStatus($or,$sinc_at);
            }
        }

        if($orders && $orders <> null){
            foreach ($orders as $o){
                $o['inic']=null;
                $o['status'] = 2;
                $this->updateStatus($o,$sinc_at,$veiculo,$pontuacao);
            }
        }

        return $this->index();
    }

    public function index(){
        $id = Authorizer::getResourceOwnerId();
        $orders = $this->repository
            ->skipPresenter(false)
            ->with(['items'])
            ->scopeQuery(function ($query)use($id){
                return $query->where('user_deliveryman_id','=',$id)
                    ->whereRaw('(status = ? or status = ?)',['Pendente','Iniciada'])->orderBy('prioridade','desc')->orderBy('created_at','asc');
            })->paginate();

        return $orders;
    }

    public function show($id){
        $idDeliveryman= Authorizer::getResourceOwnerId();

        return $this->repository
            ->skipPresenter(false)
            ->getByIdAndDeliveryman($id,$idDeliveryman);
    }

    public function updateStatus($order,$sinc,$veiculo=null,$pontuacao=null){
        $idDeliveryman = Authorizer::getResourceOwnerId();
        $auxiliarys = $order['auxiliary'];

        if ($auxiliarys != null){
            $auxiliarys = $order['auxiliary'];
        }

        $items = null;
        if ($order['items']!=null){
            $items = $order['items'];
        }

        return $this->orderService->updateStatus($order['id'],$idDeliveryman,
            $order['status'],
            $order['lat'],
            $order['long'],
            $order['service'],
            $auxiliarys,
            $items,
            $sinc,
            $order['inic'],
            $order['close'],
            $order['data'],
            $veiculo,
            $pontuacao
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
        return (int) $this->repository->countM($idDeliveryman,$request->get('status'));
    }

    public function countD(Request $request){
        $idDeliveryman= Authorizer::getResourceOwnerId();
        return (int) $this->repository->countD($idDeliveryman,$request->get('status'));
    }
    public function countMi(Request $request){
        $idDeliveryman= Authorizer::getResourceOwnerId();
        return (int) $this->repository->countMi($idDeliveryman,$request->get('status'));
    }

    public function countDi(Request $request){
        $idDeliveryman= Authorizer::getResourceOwnerId();
        return (int) $this->repository->countDi($idDeliveryman,$request->get('status'));
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
