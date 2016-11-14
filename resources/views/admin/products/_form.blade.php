<div class="form-group label-floating col-md-5">
    <label class="control-label">Categoria</label>
    {!! Form::select('category_id',$categories,null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-4">
    <label class="control-label">Produto</label>
    {!! Form::text('name',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-6">
    <label class="control-label">Descrição</label>
    {!! Form::textarea('description',null,['class'=>'form-control']) !!}
</div>
<div class="clearfix"></div>
<div class="form-group label-floating col-md-2">
    <label class="control-label">Preço</label>
    {!! Form::text  ('price',null,['class'=>'form-control']) !!}
</div>