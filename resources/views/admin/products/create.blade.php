@extends('app')

@section('content')
    <div class="container">
        <h3>Nova Categoria</h3>
        @include('errors._check')
        {!! Form::open(['route'=>'admin.products.store','class'=>'form-horizontal']) !!}
        @include('admin.products._form')
        <div class="clearfix"></div>
        <div class="form-group">
            {!! Form::submit('Criar Categoria',['class'=>'btn btn-primary']) !!}
        </div>
        {!! Form::close() !!}
@endsection