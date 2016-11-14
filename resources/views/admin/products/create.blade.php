@extends('app')

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" data-background-color="red">
                            <h4>Novo Produto</h4>
                        </div>
                        <div class="card-content">
                            @include('errors._check')
                            {!! Form::open(['route'=>'admin.products.store','class'=>'form-horizontal']) !!}
                            @include('admin.products._form')
                            <div class="clearfix"></div>
                            <div class="form-group">
                                {!! Form::submit('Criar Categoria',['class'=>'btn btn-danger pull-left']) !!}
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection