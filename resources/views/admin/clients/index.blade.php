
@extends('app')

@section('content')
    <div class="container">
        <h3>Clientes</h3>

        <a href="{{ route('admin.clients.create') }}" class="btn btn-info">Novo Cliente</a>
        <br><br>
        <table class="table table-striped table-hover">
            <thead>
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
                        <a href="{{ route('admin.clients.edit',['id'=>$client->id]) }}" title="Editar" rel="tooltip" data-placement="top"><span class="glyphicon glyphicon-edit"></span></a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {!! $clients->render() !!}
    </div>
@endsection