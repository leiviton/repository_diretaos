@extends('app')

@section('content')
	<div class="full-page" data-image='../../assets/img/login.jpeg'>
		<!--   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " -->
		<div class="content">
			<div class="container">
				<div class="row">
					<div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
						<form class="login" method="POST" action="{{ url('/auth/login') }}">
							{!! csrf_field() !!}
							<div class="card card-login">
								<div class="card-header text-center" data-background-color="blue">
									<h4 class="card-title">Login</h4>
								</div>
								<div class="card-content">
									<div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">face</i>
                                            </span>
										<div class="form-group label-floating is-empty">
											<label class="control-label">Seu login</label>
											<input type="text" class="form-control" name="email" value="{{ old('email') }}">
											<span class="material-input"></span>
										</div>
									</div>
									<div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">lock_outline</i>
                                            </span>
										<div class="form-group label-floating is-empty">
											<label class="control-label">Password</label>
											<input type="password" class="form-control" name="password">
											<span class="material-input"></span>
										</div>
									</div>

								</div>
								<div class="footer text-center">

									<button type="submit" class="btn btn-info">Entrar</button>

									<a class="btn btn-danger btn-simple" href="{{ url('/password/email') }}">Esqueceu senha?</a>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

@endsection
