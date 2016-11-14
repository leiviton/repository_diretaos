@extends('app')

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" data-background-color="red">
                            <h4>Editando Produto: {{ $product->name }}</h4>
                        </div>
                        <div class="card-content">
                            @include('errors._check')
                            {!! Form::model($product,['route'=>['admin.products.update', $product->id]]) !!}
                            @include('admin.products._form')
                            <div class="clearfix"></div>
                            <div class="form-group">
                                {!! Form::submit('Salvar Produto',['class'=>'btn btn-danger pull-left']) !!}
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection