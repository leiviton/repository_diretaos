<div class="form-group label-floating col-md-6">
    <label class="control-label">Nome</label>
    {!! Form::text('user[name]',null,['class'=>'form-control','required']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-6">
    <label class="control-label">Email</label>
    {!! Form::email('user[email]',null,['class'=>'form-control','required']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-6">
    <label class="control-label">Telefone</label>
    {!! Form::text('phone',null,['class'=>'form-control','required']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-10">
    <label class="control-label">Endereço</label>
    {!! Form::text('address',null,['class'=>'form-control','required']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-6">
    <label class="control-label">Cidade</label>
    {!! Form::text('city',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-6">
    <label class="control-label">Estado</label>
    {!! Form::text('state',null,['class'=>'form-control','required']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-6">
    <label class="control-label">CEP</label>
    {!! Form::text('zipcode',null,['class'=>'form-control','required']) !!}
</div>