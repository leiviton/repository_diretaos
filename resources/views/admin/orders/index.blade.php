@extends('app')

@section('content')
    <div class="container">
        <h3>Ordens de Serviço</h3>

        <a href="#" class="btn btn-info">Nova O.S</a>
        <br><br>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th class="col-md-1">#</th>
                <th>Total</th>
                <th>Data</th>
                <th>Itens</th>
                <th>Técnico</th>
                <th>Status</th>
                <th>Localização Inicial</th>
                <th>Localização Final</th>
                <th class="col-md-2">Ação</th>
            </tr>
            </thead>
            <tbody>
            @foreach($orders as $order)
                <tr>
                    <td class="col-md-1">{{ $order->id }}</td>
                    <td>R$ {{ $order->total }}</td>
                    <td>{{ $order->created_at }}</td>
                    <td>
                        <ul>
                        @foreach($order->items as $item)
                           <li> {{ $item->product->name }} - R$ {{ $item->product->price }} </li>
                        @endforeach
                        </ul>
                    </td>
                    <td>
                        @if($order->deliveryman)
                            {{ $order->deliveryman->name }}
                        @else
                            --
                        @endif
                    </td>
                    <td>
                        @if($order->status == 0)
                            <span class="label label-danger">Pendente</span>
                        @elseif($order->status == 1)
                            <span class="label label-warning">Iniada</span>
                        @else
                            <span class="label label-success">Fechada</span>
                        @endif
                        </td>
                    <td class="text-center">
                        <a href="https://google.com/maps/place/{{$order->geo}}" target="_blank"><span class="glyphicon glyphicon-map-marker"></span></a>
                    </td>
                    <td class="text-center">
                        <a href="https://google.com/maps/place/{{$order->geo_final}}" target="_blank"><span class="glyphicon glyphicon-map-marker"></span></a>
                    </td>
                    <td class="col-md-2">
                        <a href="{{ route('admin.orders.edit',['id'=>$order->id]) }}" title="Editar" rel="tooltip" data-placement="top" ><span class="glyphicon glyphicon-edit"></span></a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {!! $orders->render() !!}
    </div>
@endsection