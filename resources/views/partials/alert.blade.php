@if(session()->has('flash_message'))
    <div class="col-xs-11 col-sm-12 alert alert-alert alert-{{bootstrap_message(session()->get('flash_message_type'))}} alert-with-icon animated fadeInDown" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <i data-notify="icon" class="material-icons">notifications</i><span data-notify="title"></span>
        <span data-notify="message">{{ session()->get('flash_message') }}</span><a href="#" target="_blank" data-notify="url"></a>
    </div>

@endif