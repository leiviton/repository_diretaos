<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="theme-color" content="#2196f3">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Direta Telecom</title>

	<link href="https://bootswatch.com/paper/bootstrap.min.css" rel="stylesheet">

	<!-- Fonts -->
	<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
<style>
	.login{
		margin-top: 120px !important;
	}
</style>
</head>
<body>
@if(Auth::user())
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Ordens online</a>
			</div>

			<div class="collapse navbar-collapse" id="navbar">
				<ul class="nav navbar-nav">
					@if(Auth::user())
						@if(Auth::user()->role == 'admin')
							<li><a href="{{ route('admin.categories.index') }}"></a></li>
							<li><a href="{{ route('admin.products.index') }}">Produtos</a></li>
							<li><a href="{{ route('admin.clients.index') }}">Clientes</a></li>
							<li><a href="{{ route('admin.orders.index') }}">Ordens</a></li>
							<li><a href="{{ route('admin.cupoms.index') }}"></a></li>
						@elseif(Auth::user()->role == 'client')
							<li><a href="{{ route('customer.order.index') }}">Minhas Ordens</a></li>
						@endif
					@endif
				</ul>

				<ul class="nav navbar-nav navbar-right">
					@if(auth()->guest())
						@if(!Request::is('auth/login'))
							<li><a href="{{ url('/auth/login') }}">Login</a></li>
						@endif
						@else
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ auth()->user()->name }} <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="{{ url('/auth/logout') }}">Logout</a></li>
							</ul>
						</li>
					@endif
				</ul>
			</div>
		</div>
	</nav>
	@endif
	<div class="container">
	@yield('content')
	</div>
	<!-- Scripts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>

	@yield('post-script')
	<script>
		$(function() {
			$('[rel="tooltip"]').tooltip();
		});
	</script>
</body>
</html>
