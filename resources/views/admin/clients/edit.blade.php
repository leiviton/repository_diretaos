@extends('app')

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" data-background-color="purple">
                            <h4 class="title">Editando Cliente: {{ $client->user->name }}</h4>
                        </div>
                        <div class="card-content">
                            @include('errors._check')
                            {!! Form::model($client,['route'=>['admin.clients.update', $client->id]]) !!}
                            @include('admin.clients._form')
                            <div class="clearfix"></div>
                            <div class="form-group">
                                {!! Form::submit('Salvar',['class'=>'btn btn-primary pull-left']) !!}
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection