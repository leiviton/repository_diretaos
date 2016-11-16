
@extends('app')

@section('content')
    <div class="container">
        <h3>Nova ordem</h3>
        @include('errors._check')
        <div class="container">
            {!! Form::open(['route'=>'customer.order.store','class'=>'form']) !!}
            <div class="form-group">
                <label>Total:</label>
                <p id="total"></p>
                <a href="#" class="btn btn-info" id="btnNewItem">Novo Item</a>
                <br><br>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                    </tr>
                    <tbody>
                    <tr>
                        <td>
                            <select class="form-control" name="items[0][product_id]">
                                @foreach($products as $p)
                                    <option value="{{ $p->id }}" data-price="{{ $p->price }}">{{ $p->name }} --- {{ $p->price }}</option>
                                @endforeach
                            </select>
                        </td>
                        <td class="col-md-3">
                            <input type="number" class="form-control" name="items[0][qtd]" value="1" />
                        </td>
                    </tr>
                    </tbody>
                    </thead>
                </table>
            </div>
            <div class="form-group">
                {!! Form::submit('Salvar',['class'=>'btn btn-primary']) !!}
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

