@extends('app')

@section('content')
    <div class="container">
        <h3>Categorias</h3>

        <a href="{{ route('admin.categories.create') }}" class="btn btn-info">Nova Categoria</a>
        <br><br>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th class="col-md-1">#</th>
                <th>Nome</th>
                <th class="col-md-2">Ação</th>
            </tr>
            </thead>
            <tbody>
            @foreach($categories as $category)
                <tr>
                    <td class="col-md-1">{{ $category->id }}</td>
                    <td>{{ $category->name }}</td>
                    <td class="col-md-2">
                        <a href="{{ route('admin.categories.edit',['id'=>$category->id]) }}" title="Editar" rel="tooltip" data-placement="top"><span class="glyphicon glyphicon-edit"></span></a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {!! $categories->render() !!}
    </div>
@endsection