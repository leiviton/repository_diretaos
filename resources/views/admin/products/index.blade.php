@extends('app')

@section('content')
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header" data-background-color="red">
                    <h4 class="title">Produtos</h4>
                    <p class="category">Lista de produtos</p>
                </div>
                <a href="{{ route('admin.products.create') }}" class="btn btn-danger btn-round" id="category">Novo Produto</a>
                <div class="card-content table-responsive">
                    <table class="table table-striped table-hover">
                        <thead class="text-danger">
                        <tr>
                            <th class="col-md-1">#</th>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th class="col-md-2">Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($products as $product)
                            <tr>
                                <td class="col-md-1">{{ $product->id }}</td>
                                <td>{{ $product->name }}</td>
                                <td>{{ $product->category->name }}</td>
                                <td>{{ $product->price }}</td>
                                <td class="col-md-2">
                                    <a href="{{ route('admin.products.edit',['id'=>$product->id]) }}" title="Editar" rel="tooltip" data-placement="top"><span class="material-icons text-danger">create</span></a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                     {!! $products->render() !!}
                </div>
            </div>
        </div>
    </div>
@endsection