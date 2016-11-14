@extends('app')

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" data-background-color="purple">
                            <h4 class="title">Editar O.S #{{ $order->number_os_sise }}</h4>
                            <p class="category">Cliente:  {{ $order->name }}</p>
                        </div>
                        <div class="card-content">
                            <h5>Data de abertura: {{ $order->created_at }}</h5>
                            <p>Endereço Cliente:<br>{{ $order->client->address }}</p><br>
                            {!! Form::model($order,['route'=>['admin.orders.update', $order->id]]) !!}
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Status</label>
                                        {!! Form::select('status',$list_status,null,['class'=>'form-control','id'=>'status']) !!}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Técnico</label>
                                        {!! Form::select('user_deliveryman_id',$deliveryman,null,['class'=>'form-control','id'=>'user_deliveryman_id']) !!}
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="form-group">
                                    {!! Form::submit('Salvar',['class'=>'btn btn-primary pull-left','id'=>'submit']) !!}
                                </div>
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection