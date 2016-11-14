<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 08/08/2016
 * Time: 13:15
 */

namespace CodeDelivery\Http\Controllers;


use Illuminate\Http\Request;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;

class OrdersController extends Controller
{
    /**
     * @var OrderRepository
     */
    private $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(){
        $orders = $this->repository->paginate();

        return view('admin.orders.index',compact('orders'));
    }

    public function edit($id, UserRepository $userRepository){
        $list_status = ['Pendente'=>'Pendente','Iniciada'=>'Iniciada','Executada'=>'Executada','Aguardando PCP'=>'Aguardando PCP'];
        $order = $this->repository->find($id);
        $deliveryman = $userRepository->getDeliverymen();
        return view('admin.orders.edit',compact('order','list_status','deliveryman'));
    }

    public function update(Request $request, $id){
        $data = $request->all();

        if( $this->repository->update($data,$id)){
            flash()->success('Salvo com sucesso!');
        }else{
            flash()->error('Não foi possivel salvar, tente novamente!');
        }

        return redirect()->route('admin.orders.index');
    }
}