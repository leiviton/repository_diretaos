@extends('app')

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" data-background-color="purple">
                        <h4>Nova Categoria</h4>
                        </div>
                        <div class="card-content">
                            @include('errors._check')
                            {!! Form::open(['route'=>'admin.categories.store','class'=>'form-horizontal']) !!}
                            @include('admin.categories._form')
                            <div class="clearfix"></div>
                            <div class="form-group">
                                {!! Form::submit('Criar Categoria',['class'=>'btn btn-primary pull-left']) !!}
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection