<?php

namespace CodeDelivery\Http\Controllers;


use CodeDelivery\Http\Requests\AdminClientRequest;
use CodeDelivery\Repositories\ClientRepository;
use CodeDelivery\Services\ClientService;

use Illuminate\Http\Request;
use CodeDelivery\Http\Requests;


class ClientsController extends Controller
{
    private $repository;
    /**
     * @var ClientService
     */
    private $clientService;

    public function  __construct(ClientRepository $repository, ClientService $clientService){
        $this->repository = $repository;
        $this->clientService = $clientService;
    }
    public function index()
    {
        $clients = $this->repository->paginate();
        return view('admin.clients.index',compact('clients'));
    }

    public function create(){
        return view('admin.clients.create');
    }

    public function store(AdminClientRequest $request)
    {
        $data = $request->all();

        if($this->clientService->create($data)){
            flash()->success('Salvo com sucesso!');
        }else{
            flash()->error('Não foi possivel salvar, tente novamente!');
        }

        return redirect()->route('admin.clients.index');
    }

    public function edit($id)
    {

        $client = $this->repository->find($id);

        return view('admin.clients.edit',compact('client'));
    }

    public function update(AdminClientRequest $request, $id)
    {
        $data = $request->all();

        if($this->clientService->update($data, $id)){
            flash()->success('Salvo com sucesso!');
        }else{
            flash()->error('Não foi possivel salvar, tente novamente!');
        }

        return redirect()->route('admin.clients.index');
    }
}
