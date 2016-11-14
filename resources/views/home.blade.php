@extends('app')

@section('content')
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="card card-stats">
						<div class="card-header" data-background-color="orange">
							<i class="material-icons">content_copy</i>
						</div>
						<div class="card-content">
							<p class="category">Ordens Abertas</p>
							<h3 class="title">{{$abertas}}</h3>
						</div>

					</div>
				</div>
				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="card card-stats">
						<div class="card-header" data-background-color="green">
							<i class="material-icons">store</i>
						</div>
						<div class="card-content">
							<p class="category">Abertas hoje</p>
							<h3 class="title">{{$dia}}</h3>
						</div>
					</div>
				</div>
				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="card card-stats">
						<div class="card-header" data-background-color="red">
							<i class="material-icons">info_outline</i>
						</div>
						<div class="card-content">
							<p class="category">Fechadas Hoje</p>
							<h3 class="title">{{$fechadas}}</h3>
						</div>

					</div>
				</div>

				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="card card-stats">
						<div class="card-header" data-background-color="blue">
							<i class="material-icons">face</i>
						</div>
						<div class="card-content">
							<p class="category">Usuarios</p>
							<h3 class="title">{{$users}}</h3>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-4">
					<div class="card">
						<div class="card-header card-chart" data-background-color="green">
							<div class="ct-chart" id="dailySalesChart"></div>
						</div>
						<div class="card-content">
							<h4 class="title">Daily Sales</h4>
							<p class="category"><span class="text-success"><i class="fa fa-long-arrow-up"></i> 55%  </span> increase in today sales.</p>
						</div>
						<div class="card-footer">
							<div class="stats">
								<i class="material-icons">access_time</i> updated 4 minutes ago
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-4">
					<div class="card">
						<div class="card-header card-chart" data-background-color="orange">
							<div class="ct-chart" id="emailsSubscriptionChart"></div>
						</div>
						<div class="card-content">
							<h4 class="title">Email Subscriptions</h4>
							<p class="category">Last Campaign Performance</p>
						</div>
						<div class="card-footer">
							<div class="stats">
								<i class="material-icons">access_time</i> campaign sent 2 days ago
							</div>
						</div>

					</div>
				</div>

				<div class="col-md-4">
					<div class="card">
						<div class="card-header card-chart" data-background-color="red">
							<div class="ct-chart" id="completedTasksChart"></div>
						</div>
						<div class="card-content">
							<h4 class="title">Completed Tasks</h4>
							<p class="category">Last Campaign Performance</p>
						</div>
						<div class="card-footer">
							<div class="stats">
								<i class="material-icons">access_time</i> campaign sent 2 days ago
							</div>
						</div>
					</div>
				</div>
			</div>


		</div>
	</div>
@endsection