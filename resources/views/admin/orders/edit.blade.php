@extends('app')

@section('content')
    <div class="container">
        <h3>O.S #{{ $order->id }}</h3>
        <h4>Cliente:  {{ $order->client->user->name }}</h4>
        <h5>Data de abertura: {{ $order->created_at }}</h5>
        <p>Endereço Cliente:<br>{{ $order->client->address }}</p><br>
        {!! Form::model($order,['route'=>['admin.orders.update', $order->id]]) !!}
        <div class="form-group col-md-3">
            {!! Form::label('Status','Status:') !!}
            {!! Form::select('status',$list_status,null,['class'=>'form-control']) !!}
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-md-3">
            {!! Form::label('Tecnico','Técnico:') !!}
            {!! Form::select('user_deliveryman_id',$deliveryman,null,['class'=>'form-control']) !!}
        </div>
        <div class="clearfix"></div>
        <div class="form-group">
            {!! Form::submit('Salvar',['class'=>'btn btn-primary']) !!}
        </div>
        {!! Form::close() !!}
    </div>
@endsection