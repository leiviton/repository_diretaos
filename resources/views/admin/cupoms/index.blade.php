@extends('app')

@section('content')
    <div class="container">
        <h3>Cupons</h3>
        <a href="{{ route('admin.cupoms.create') }}" class="btn btn-info">Novo Cupom</a>
        <br><br>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th class="col-md-1">#</th>
                <th>Codigo</th>
                <th>Valor</th>
                <th>Usado</th>
                <th class="col-md-2">Ação</th>
            </tr>
            </thead>
            <tbody>
            @foreach($cupoms as $cupom)
                <tr>
                    <td class="col-md-1">{{ $cupom->id }}</td>
                    <td>{{ $cupom->code }}</td>
                    <td>{{ $cupom->value }}</td>
                    <td>
                        @if($cupom->used == 0)
                            <span class="label label-primary">Não usado</span>
                        @else
                           <span class="label label-success">Usado</span>
                        @endif
                    </td>
                    <td class="col-md-2">
                        <a href="{{ route('admin.cupoms.edit',['id'=>$cupom->id]) }}" title="Editar" rel="tooltip" data-placement="top"><span class="glyphicon glyphicon-edit"></span></a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {!! $cupoms->render() !!}
    </div>
@endsection