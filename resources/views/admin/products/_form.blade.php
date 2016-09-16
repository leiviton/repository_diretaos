<div class="form-group col-md-3">
    {!! Form::label('Category_id','Categoria:') !!}
    {!! Form::select('category_id',$categories,null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-4">
    {!! Form::label('Name','Nome:') !!}
    {!! Form::text('name',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-6">
    {!! Form::label('Description','Descrição:') !!}
    {!! Form::textarea('description',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group col-md-2">
    {!! Form::label('Price','Descrição:') !!}
    {!! Form::text  ('price',null,['class'=>'form-control']) !!}
</div>