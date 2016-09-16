@extends('app')

@section('content')
    <div class="container">
        <h3>Produtos</h3>

        <a href="{{ route('admin.products.create') }}" class="btn btn-info">Novo Produto</a>
        <br><br>
        <table class="table table-striped table-hover">
            <thead>
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
                        <a href="{{ route('admin.products.edit',['id'=>$product->id]) }}" title="Editar" rel="tooltip" data-placement="top"><span class="glyphicon glyphicon-edit"></span></a>
                        <a href="{{ route('admin.products.destroy',['id'=>$product->id]) }}" title="Excluir " rel="tooltip" data-placement="top"><span class="glyphicon glyphicon-trash"></span></a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {!! $products->render() !!}
    </div>
@endsection