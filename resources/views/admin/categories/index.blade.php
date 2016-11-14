@extends('app')

@section('content')
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header" data-background-color="purple">
                    <h4>Categorias</h4>
                    <p class="category">Lista de categorias</p>
                </div>
                <a href="{{ route('admin.categories.create') }}" class="btn btn-primary btn-round" id="category"><i class="material-icons">favorite</i> Nova Categoria</a>
                <div class="card-content table-responsive">
                    <table class="table">
                        <thead class="text-primary">
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
                                    <a href="{{ route('admin.categories.edit',['id'=>$category->id]) }}" title="Editar" rel="tooltip" data-placement="top"><span class="material-icons">create</span></a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    {!! $categories->render() !!}
                    </div>
                </div>
            </div>
    </div>
@endsection