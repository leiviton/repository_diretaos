<?php


namespace CodeDelivery\Services;


use CodeDelivery\Repositories\CupomRepository;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use Dmitrovskiy\IonicPush\PushProcessor;

class OrderService{
    /**
     * @var OrderRepository
     */
    private $orderRepository;
    /**
     * @var CupomRepository
     */
    private $cupomRepository;
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var PushProcessor
     */
    private $pushProcessor;
    /**
     * @var UserRepository
     */
    private $userRepository;


    public function __construct(
        OrderRepository $orderRepository,
        UserRepository $userRepository,
        CupomRepository $cupomRepository,
        ProductRepository $productRepository,
        PushProcessor $pushProcessor
    )
    {

        $this->orderRepository = $orderRepository;
        $this->cupomRepository = $cupomRepository;
        $this->productRepository = $productRepository;
        $this->pushProcessor = $pushProcessor;
        $this->userRepository = $userRepository;
    }

    public function create(array $data){

        \DB::beginTransaction();

        try {
            $data['status'] = 0;

            if (isset($data['cupom_id'])){
                unset($data['cupom_id']);
            }
            if (isset($data['cupom_code'])){
                $cupom = $this->cupomRepository->findByField('code',$data['cupom_code'])->first();
                $data['cupom_id'] = $cupom->id;
                $cupom->used = 1;
                $cupom->save();
                unset($data['cupom_code']);
            }
            $items = $data['items'];
            $order = $this->orderRepository->create($data);

            $total = 0;
            foreach ($items as $item){
                $item['price'] = $this->productRepository->find($item['product_id'])->price;
                $order->items()->create($item);
                $total += $item['price'] * $item['qtd'];
            }

            $order->total = $total;

            if (isset($cupom)){
                $order->total = $total - $cupom->value;
            }
            $order->save();

            \DB::commit();

            return $order;
        } catch (\Exception $e){
             \DB::rollback();
            throw $e;
        }
    }

    public function updateStatus($id,$idDeliveryman,$status,$lat,$long,$service=null,$ax=null,$items=null,$sinc,$inic=null,$close=null,$v=null,$veiculo=null,$pontuacao=null){
        $order = $this->orderRepository->getByIDAndDeliveryman((int)$id,$idDeliveryman);

        $order->flag_sincronizado = 0;
        $order->sinc_at = $sinc;
        $action = [];
        $action['deliveryman_id'] = $idDeliveryman;
        switch ((int)$status) {
            case 0:
                $order->status = 'Pendente';
                $action['key'] = "Visita";
                $action['data'] = $v;
                $action['action'] = "Visita ao cliente $order->name da $order->number_os_sise";
                $action['geo_location'] = $lat.','.$long;
                $action['link_geo'] = 'https://google.com/maps/place/'.$lat.','.$long;
                $order->actions()->create($action);
                $order->save();
                break;
            case 1:
                $order->status = 'Iniciada';
                $order->ini_at = $inic;
                $action['key'] = "Iniciar";
                $action['data'] = $v;
                $action['action'] = "Iniciou a ordem $order->number_os_sise";
                $action['geo_location'] = $lat.','.$long;
                $action['link_geo'] = 'https://google.com/maps/place/'.$lat.','.$long;
                $order->actions()->create($action);
                if((int)($order->status == 1 && !$order->hash)){
                    $order->hash = md5((new \DateTime())->getTimestamp());
                }
                $order->save();
                break;
            case 2:
                $order->status = 'Executada';
                $order->close_at = $close;
                $action['key'] = "Executada";
                $action['data'] = $v;
                $action['action'] = "Executou a ordem $order->number_os_sise";
                $action['geo_location'] = $lat.','.$long;
                $action['link_geo'] = 'https://google.com/maps/place/'.$lat.','.$long;
                $order->actions()->create($action);
                $order->service = $service;
                $auxiliares = $ax;
                if ($auxiliares<>null) {
                    foreach ($auxiliares as $axs) {
                        $order->auxiliarys()->create($axs);
                    }
                }
                $ite = $items;
                if ($ite<>null){
                    foreach ($ite as $i){
                        $order->items()->create($i);
                    }
                }
                $vei = $veiculo;
                if($vei<>null){
                   $order->veiculo = (int) $vei['V_NOME'];
                   $order->CODVEI = $vei['CODVEI'];
                }
                $pont = $pontuacao;
                if($pont<>null){
                    $order->pontuacao()->create($pont);
                }
                $order->save();
                break;
            case 3:
                $order->status = 'Aguardando PCP';
                $action['key'] = "Devolucao";
                $action['data'] = $v;
                $action['action'] = "Devolução da $order->number_os_sise para o PCP";
                $action['geo_location'] = $lat.','.$long;
                $action['link_geo'] = 'https://google.com/maps/place/'.$lat.','.$long;
                $order->actions()->create($action);
                $order->save();
                break;
        }
        return $order;
    }


}

