@extends('app')

@section('content')
        <div class="container-fluid">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header" data-background-color="blue">
                        <h4 class="title">Ordens de Serviço</h4>
                        <p class="category">Lista de ordens de serviço</p>
                    </div>
                    <div class="card-content table-responsive">
                        <table class="table">
                            <thead class="text-info">
                            <tr><th class="col-md-1">#</th>
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
                                        @if($order->status == 'Pendente')
                                            <span class="label label-danger">Pendente</span>
                                        @elseif($order->status == 'Iniciada')
                                            <span class="label label-warning">Iniada</span>
                                        @elseif($order->status == 'Executada')
                                            <span class="label label-success">Executada</span>
                                        @elseif($order->status == 'Aguardando PCP')
                                            <span class="label label-info">Aguardando PCP</span>
                                        @endif
                                    </td>
                                    <td class="text-center">
                                        <a href="https://google.com/maps/place/{{$order->geo}}" title="Ver mapa" rel="tooltip" data-placement="top" target="_blank"><span class="material-icons text-info">room</span></a>
                                    </td>
                                    <td class="text-center">
                                        <a href="https://google.com/maps/place/{{$order->geo_final}}" title="Ver mapa" rel="tooltip" data-placement="top" target="_blank"><span class="material-icons text-info">room</span></a>
                                    </td>
                                    <td class="col-md-2">
                                        <a href="{{ route('admin.orders.edit',['id'=>$order->id]) }}" title="Editar" rel="tooltip" data-placement="top" ><span class="material-icons text-info">create</span></a>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>

                        </table>
                        {!! $orders->render() !!}
                    </div>
                </div>
            </div>
        </div>
@endsection