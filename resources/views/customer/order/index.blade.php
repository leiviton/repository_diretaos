@extends('app')

@section('content')
    <div class="container">
        <h3>Minhas solicitações</h3>

        <a href="{{ route('customer.order.create') }}" class="btn btn-info">Nova Solicitação</a>
        <br><br>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th class="col-md-1">#</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            @foreach($orders as $order)
                <tr>
                    <td class="col-md-1">{{ $order->id }}</td>
                    <td>{{ $order->total }}</td>
                    <td>
                        @if($order->status==0)
                            <span class="label label-danger">Pendente</span>
                        @elseif($order->status==1)
                            <span class="label label-warning">Iniciada</span>
                        @elseif($order->status==2)
                            <span class="label label-success">Finalizada</span>
                        @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {!! $orders->render() !!}
    </div>
@endsection