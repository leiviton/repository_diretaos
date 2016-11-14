
@if($errors->any())
    <div class="alert">
        @foreach($errors->all() as $error)
            <div class="alert alert-danger">{{ $error }}</div>
        @endforeach
    </div>
@endif