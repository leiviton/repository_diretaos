
@extends('app')

@section('content')
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header" data-background-color="green">
                    <h4>Clientes</h4>
                    <p class="category">Lista de clientes</p>
                </div>
                <a href="{{ route('admin.clients.create') }}" class="btn btn-success btn-round" id="category"><i class="material-icons">favorite</i> Novo Cliente</a>
                <table class="table table-striped table-hover">
                    <thead class="text-success">
                    <tr>
                        <th class="col-md-1">#</th>
                        <th>Nome</th>
                        <th class="col-md-2">Ação</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($clients as $client)
                        <tr>
                            <td class="col-md-1">{{ $client->id }}</td>
                            <td>{{ $client->user->name }}</td>
                            <td class="col-md-2">
                                <a href="{{ route('admin.clients.edit',['id'=>$client->id]) }}" title="Editar" rel="tooltip" data-placement="top"><span class="material-icons text-success">create</span></a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
        {!! $clients->render() !!}
            </div>
        </div>
    </div>
@endsection