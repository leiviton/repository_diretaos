<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="{{ URL::asset('assets/img/apple-icon.png') }}" />
    <link rel="icon" type="image/png" href="{{ URL::asset('assets/img/favicon.png')}}" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Sise Web</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />
    <!-- Bootstrap core CSS     -->
    <link href="{{ URL::asset('assets/css/bootstrap.min.css')}}" rel="stylesheet" />
    <!--  Material Dashboard CSS    -->
    <link href="{{ URL::asset('assets/css/material-dashboard.css')}}" rel="stylesheet"/>
    <!--  CSS for Demo Purpose, don't include it in your project     -->
    <link href="{{ URL::asset('assets/css/demo.css')}}" rel="stylesheet" />
    <!--     Fonts and icons     -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>
</head>
<body>

<div class="wrapper">
    @if(Auth::user())
    <div class="sidebar" data-image="../../assets/img/sidebar-3.jpg">
        <!--
            Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

            Tip 2: you can also add an image using data-image tag
        -->

        <div class="logo">
            <a href="#" class="simple-text">
                <img src="{{ URL::asset('assets/img/logo.png')}}">
            </a>
        </div>

        <div class="sidebar-wrapper">
            <ul class="nav">
        @if(Auth::user())
            @if(Auth::user()->role == 'admin')
                <li>
                    <a href="{{ url('/dashboard') }}">
                        <i class="material-icons">dashboard</i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li>
                    <a href="{{ route('admin.orders.index') }}">
                        <i class="material-icons">content_paste</i>
                        <p>Ordens</p>
                    </a>
                </li>
                <li>
                    <a data-toggle="collapse" href="#pagesExamples" class="collapsed" aria-expanded="false">
                        <i class="material-icons">image</i>
                        <p>Cadastros

                        </p>
                    </a>
                    <div class="collapse" id="pagesExamples">
                        <ul class="nav">
                            <li>
                                <a href="{{ route('admin.categories.index') }}"><p class="text-center">Categorias</p></a>
                            </li>
                            <li>
                                <a href="{{ route('admin.clients.index') }}">
                                    <p class="text-center">Clientes</p>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('admin.products.index') }}">
                                    <p class="text-center">Produtos</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            @elseif(Auth::user()->role == 'client')
                <li>
                    <a href="{{ route('customer.order.index') }}">
                        <i class="material-icons">unarchive</i>
                        <p>Minhas orderns</p>
                    </a>
                </li>
                        <li>
                            <a href="{{ route('customer.order.index') }}">
                                <i class="material-icons">unarchive</i>
                                <p>Minhas orderns</p>
                            </a>
                        </li>
        @endif
    @endif
            </ul>
        </div>
    </div>
    <div class="main-panel">
        <nav class="navbar navbar-default navbar-absolute">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="material-icons">notifications</i>
                                <span class="notification">5</span>
                                <p class="hidden-lg hidden-md">Notifications</p>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Mike John responded to your email</a></li>
                                <li><a href="#">You have 5 new tasks</a></li>
                                <li><a href="#">You're now friend with Andrew</a></li>
                                <li><a href="#">Another Notification</a></li>
                                <li><a href="#">Another One</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">

                            <a href="#pablo" class="dropdown-toggle" data-toggle="dropdown">
                                <p class="title"><i class="material-icons">person</i> Leiviton</p>
                            </a>
                           <ul class="dropdown-menu">
                                <li><a href="#">Trocar Senha</a></li>
                                <li><a href="{{ url('/auth/logout') }}"><i class="material-icons">exit_to_app</i> Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        @endif
        <div class="content">
        @include('partials.alert')
        @yield('content')
        </div>
    </div>
</div>

</body>

<!--   Core JS Files   -->
<script src="{{ URL::asset('assets/js/jquery-3.1.0.min.js')}}" type="text/javascript"></script>
<script src="{{ URL::asset('assets/js/bootstrap.min.js')}}" type="text/javascript"></script>
<script src="{{ URL::asset('assets/js/material.min.js')}}" type="text/javascript"></script>

<!--  Charts Plugin -->
<script src="{{ URL::asset('assets/js/chartist.min.js')}}"></script>

<!--  Notifications Plugin    -->
<script src="{{ URL::asset('assets/js/bootstrap-notify.js')}}"></script>

<!--  Google Maps Plugin    -->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>

<!-- Material Dashboard javascript methods -->
<script src="{{ URL::asset('assets/js/material-dashboard.js')}}"></script>

<!-- Material Dashboard DEMO methods, don't include it in your project! -->
<script src="{{ URL::asset('assets/js/demo.js')}}"></script>


<script type="text/javascript">
    $(document).ready(function(){

        // Javascript method's body can be found in assets/js/demos.js
        demo.initDashboardPageCharts();

    });
</script>

</html>
