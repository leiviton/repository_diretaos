<div class="form-group col-md-4">
    {!! Form::label('Name','Nome:') !!}
    {!! Form::text('user[name]',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-4">
    {!! Form::label('Email','Email:') !!}
    {!! Form::text('user[email]',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-4">
    {!! Form::label('Phone','Telefone:') !!}
    {!! Form::text('phone',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-8">
    {!! Form::label('Address','Endereço:') !!}
    {!! Form::text('address',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-4">
    {!! Form::label('City','Cidade:') !!}
    {!! Form::text('city',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-4">
    {!! Form::label('State','Estado:') !!}
    {!! Form::text('state',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-4">
    {!! Form::label('Zipcode','Cep:') !!}
    {!! Form::text('zipcode',null,['class'=>'form-control']) !!}
</div>