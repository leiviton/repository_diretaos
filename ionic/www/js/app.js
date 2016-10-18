// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter.controllers',[]);
angular.module('starter.services',[]);
angular.module('starter.filters',[]);
angular.module('starter.run',[]);

var db;

angular.module('starter', [
    'ionic','ionic-toast','ionic.service.core','starter.controllers','starter.services','starter.filters','starter.run',
    'angular-oauth2','ngResource','ngCordova','pusher-angular','permission','http-auth-interceptor','chart.js'
])
    .constant('appConfig',{
        //baseUrl:'http://leiviton.com.br/direta_dev/public',
        baseUrl:'http://186.233.72.22/public',
        //baseUrl:'http://192.168.137.201:8000',
        pusherKey: '9da90fc97b93c4ce952a',
        redirectAfterLogin:{
            client:'client.order',
            deliveryman:'deliveryman.home'
        }
    })
    .run(function($ionicPlatform,$window,appConfig,$localStorage,UserData,$state,$ionicPopup,$timeout,$cordovaSQLite,$cordovaNetwork,$rootScope) {

        $window.client = new Pusher(appConfig.pusherKey);
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {

                    var type = $cordovaNetwork.getNetwork();

                    var isOnline = $cordovaNetwork.isOnline();

                    var isOffline = $cordovaNetwork.isOffline();


                    // listen for Online event
                    $rootScope.$on('networkOnline', function(event, networkState){
                        var onlineState = networkState;
                    });

                    // listen for Offline event
                    $rootScope.$on('networkOffline', function(event, networkState){
                        var offlineState = networkState;
                    });

                if(isOffline){
                        var login = $localStorage.getObject('login');
                        console.log('login',login);
                        if (login!=null){
                            $state.go('deliveryman.home');
                        }else {
                            $state.go('login');
                        }
                    }else {
                        var login = $localStorage.getObject('login');
                        console.log('login',login);
                        if (login!=null){
                            UserData.login(login);
                        }else {
                            $state.go('login')
                        }

                        /*Ionic.io();
                        var push = new Ionic.Push({
                            debug:true,
                            onNotification: function (message) {
                                $ionicPopup.alert({
                                    title:'Atenção',
                                    template: message
                                });
                            }
                        });
                        push.register(function (token) {
                            $localStorage.set('device_token',token.token);
                        });*/
                    }


                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }

            //banco local
            /*try {
                db = $cordovaSQLite.openDB({name:"leiviton.db",location:'default'});
            } catch (error) {
                alert(error);
            }

            //tabela de orders
            $cordovaSQLite.execute(db,
                "CREATE TABLE IF NOT EXISTS dados_orders (id integer primary key,user_id integer,status integer,service text,defect text,number_os_sise text,priority integer,name text,phone1 text,phone2 text,type text,address text,address_number text,district text,city text,state text,plano text,id_plano text)").then(
                function(res) {
                    console.log(res);
                },
                function(err) {
                    console.log('ERROR: '+err.message);
                }
            );

            $cordovaSQLite.execute(db,
                "CREATE TABLE IF NOT EXISTS orders_iniciadas (id integer,user_id integer,status integer,service text,geo text)").then(
                function(res) {
                    console.log(res);
                },
                function(err) {
                    console.log('ERROR: '+err.message);
                }
            );

            $cordovaSQLite.execute(db,
                "CREATE TABLE IF NOT EXISTS orders_fechadas (id integer,user_id integer,status integer,service text,number_os_sise text,geo text)").then(
                function(res) {
                    console.log(res);
                },
                function(err) {
                    console.log('ERROR: '+err.message);
                }
            );

            $cordovaSQLite.execute(db,
                "CREATE TABLE IF NOT EXISTS orders_devolvidas (id integer,user_id integer,status integer,number_os_sise text)").then(
                function(res) {
                    console.log(res);
                },
                function(err) {
                    console.log('ERROR: '+err.message);
                }
            );

            $cordovaSQLite.execute(db,
                "CREATE TABLE IF NOT EXISTS orders_visitas (id integer,user_id integer,status integer,data text,geo text,number_os_sise text)").then(
                function(res) {
                    console.log(res);
                },
                function(err) {
                    console.log('ERROR: '+err.message);
                }
            );

            $cordovaSQLite.execute(db,
                "CREATE TABLE IF NOT EXISTS usuario (id integer,username text,password text)").then(
                function(res) {
                    console.log(res);
                },
                function(err) {
                    console.log('ERROR: '+err.message);
                }
            );

            /*$cordovaSQLite.execute(db,"DELETE FROM dados_orders",[])
                .then(function(res) {
                    console.log(res);
                });*/
        });
    })
    /*.factory('orderFactory', function($cordovaSQLite) {
        //db = $cordovaSQLite.openDB({name:"leiviton.db",location:'default'});
        return {
            insert: function (o) {
                console.log('o', o);
                var id = o.id, user_id = o.user_id;
                console.log('desmembrado o', [o.id, o.user_id, o.status, o.service, o.defect, o.number_os_sise, o.priority, o.name, o.phone1, o.phone2, o.type, o.address, o.address_number, o.district, o.city, o.state, o.plano, o.id_plano]);
                var query = "INSERT INTO dados_orders (id,user_id,status,service,defect,number_os_sise,priority,name,phone1,phone2,type,address,address_number,district,city,state,plano,id_plano) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                var values = [o.id, o.user_id, o.status, o.service, o.defect, o.number_os_sise, o.priority, o.name, o.phone1, o.phone2, o.type, o.address, o.address_number, o.district, o.city, o.state, o.plano, o.id_plano];
                $cordovaSQLite.execute(db, query, values)
                    .then(
                        function (res) {
                            console.log('INSERTED ID: ' + res.insertId);
                        },
                        function (err) {
                            console.log('ERROR: ' + err.message);
                        }
                    );

            },
            select: function () {
                $cordovaSQLite.execute(db, "SELECT * FROM dados_orders", [])
                    .then(function (res) {
                        if (res.rows.length > 0) {
                            var first = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                first[i] = res.rows.item(i);
                                console.log('dados',first[i]);
                            }
                            return first;
                        } else {
                            console.log('nada encontrado')
                        }
                    });
            },
            delete: function (id) {
                var query = "DELETE FROM dados_orders WHERE id=?";
                $cordovaSQLite.execute(db, query, [id]).then(
                    function (res) {
                        console.log(res);
                    },
                    function (err) {
                        console.log('ERRO:', err);
                    }
                );
            },
            update: function (id, status, service) {
                var query = "UPDATE dados_orders SET status=?,service=? WHERE id=?";
                var values = [status, service, id];
                $cordovaSQLite.execute(db, query, values).then(
                    function (res) {
                        console.log(res);
                    },
                    function (err) {
                        console.log('ERRO:', err);
                    }
                );
            }
        }
    })*/
    .config(function ($stateProvider, $urlRouterProvider,OAuthProvider,OAuthTokenProvider,appConfig,$provide){

        OAuthProvider.configure({
            baseUrl: appConfig.baseUrl,
            clientId: 'appid01',
            clientSecret: 'secret',
            grantPath: '/oauth/access_token'
        });

        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false
            }
        });
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl:'templates/login.html',
                controller:'loginCtrl'
            })
            .state('logout',{
                url:'/logout',
                controller:'logoutCtrl'
            })
            .state('home',{
                url:'/home',
                templateUrl:'templates/home.html',
                controller:function ($scope) {
                    
                }
            })

            //rotas client
            .state('client',{
                abstract: true,
                cache:false,
                url:'/client',
                templateUrl:'templates/client/menu.html',
                controller: 'ClientMenuCtrl',
                data:{
                    permissions:{
                        only:['client-role']
                    }
                }
            })
            .state('client.checkout',{
                cache: false,
                url:'/checkout',
                templateUrl: 'templates/client/checkout.html',
                controller: 'ClientCheckoutCtrl'
            })
            .state('client.order',{
                url:'/order',
                templateUrl: 'templates/client/order.html',
                controller: 'ClientOrderCtrl'
            })
            .state('client.view_order',{
                url:'/view_order/:id',
                templateUrl: 'templates/client/view_order.html',
                controller: 'ClientViewOrderCtrl'
            })
            .state('client.view_delivery',{
                cache:false,
                url:'/view_delivery/:id',
                templateUrl: 'templates/client/view_delivery.html',
                controller: 'ClientViewDeliveryCtrl'
            })
            .state('client.checkout_item_detail',{
                url:'/checkout/detail/:index',
                templateUrl: 'templates/client/checkout_item_detail.html',
                controller: 'ClientCheckoutDetailCtrl'
            })
            .state('client.checkout_successful',{
                cache: false,
                url:'/checkout/successful',
                templateUrl:'templates/client/checkout_successful.html',
                controller:'ClientCheckoutSuccessful'
            })
            .state('client.view_products',{
                cache:false,
                url:'/view_products',
                templateUrl: 'templates/client/view_products.html',
                controller: 'ClientViewProductCtrl'
            })
            //rotas deliveryman
            .state('deliveryman',{
                abstract: true,
                cache:false,
                url:'/deliveryman',
                templateUrl:'templates/deliveryman/menu.html',
                controller: 'DeliverymanMenuCtrl',
                data:{
                    permissions:{
                        only:['deliveryman-role']
                    }
                }
            })
            .state('deliveryman.home',{
                cache:false,
                url:'/home',
                templateUrl:'templates/deliveryman/home.html',
                controller:'DeliverymanHomeCtrl'
            })
            .state('deliveryman.sincronizar',{
                cache:false,
                url:'/sincronizar',
                templateUrl:'templates/deliveryman/sincronizar.html',
                controller:'SincronizarCtrl'
            })
            .state('deliveryman.notification',{
                cache: false,
                url:'/notification',
                templateUrl:'templates/deliveryman/notification.html',
                controller:'DeliverymanNotificationCtrl'
            })
            .state('deliveryman.order',{
                cache:false,
                url:'/order',
                templateUrl: 'templates/deliveryman/order.html',
                controller: 'DeliverymanOrderCtrl'
            })
            .state('deliveryman.view_order',{
                cache: false,
                url:'/view_order/:id/:index',
                templateUrl: 'templates/deliveryman/view_order.html',
                controller: 'DeliverymanViewOrderCtrl'
            })
            .state('deliveryman.view_close',{
                cache: false,
                url:'/view_close/:id/:index',
                templateUrl: 'templates/deliveryman/view_order_close.html',
                controller: 'DeliverymanViewCloseCtrl'
            })
            .state('deliveryman.view_notification',{
                cache: false,
                url:'/view_notification/:id',
                templateUrl: 'templates/deliveryman/view_notification.html',
                controller: 'DeliverymanViewNotificationCtrl'
            })
            .state('deliveryman.view_auxiliary',{
                url:'/view_auxiliary',
                templateUrl: 'templates/deliveryman/view_auxiliary.html',
                controller: 'DeliverymanViewAuxiliaryCtrl'
            })
            .state('deliveryman.checkout',{
                cache:false,
                url:'/checkout',
                templateUrl: 'templates/deliveryman/checkout.html',
                controller: 'DeliverymanCheckoutCtrl'
            })

            //produtos

            .state('deliveryman.view_product_fibra',{
                url:'/view_product_fibra',
                templateUrl: 'templates/deliveryman/product/view_product_fibra.html',
                controller: 'DeliverymanViewProductFibraCtrl'
            })
            .state('deliveryman.checkout_successful',{
                cache: false,
                url:'/checkout/successful',
                templateUrl:'templates/deliveryman/checkout/checkout_successful.html',
                controller:'DeliverymanCheckoutSuccessful'
            })
            .state('deliveryman.checkout_fibra',{
                cache:false,
                url:'/checkout_fibra/:id',
                templateUrl: 'templates/deliveryman/checkout/checkout_fibra.html',
                controller: 'DeliverymanCheckoutFibraCtrl'
            })
            .state('deliveryman.checkout_item_detail',{
                url:'/checkout/detail/:index',
                templateUrl: 'templates/deliveryman/checkout/checkout_item_detail.html',
                controller: 'DeliverymanCheckoutDetailCtrl'
            })
            .state('deliveryman.view_product_radio',{
                url:'/view_product_radio',
                templateUrl: 'templates/deliveryman/product/view_product_radio.html',
                controller: 'DeliverymanViewProductRadioCtrl'
            })
            .state('deliveryman.checkout_radio',{
                cache:false,
                url:'/checkout_radio/:id',
                templateUrl: 'templates/deliveryman/checkout/checkout_radio.html',
                controller: 'DeliverymanCheckoutRadioCtrl'
            })
            .state('deliveryman.checkout_item_detail_radio',{
                url:'/checkout/radio/detail/:index',
                templateUrl: 'templates/deliveryman/checkout/checkout_item_detail_radio.html',
                controller: 'DeliverymanCheckoutDetailRadioCtrl'
            })
            .state('deliveryman.view_product_seguranca',{
                url:'/view_product_seguranca',
                templateUrl: 'templates/deliveryman/product/view_product_seguranca.html',
                controller: 'DeliverymanViewProductSegurancaCtrl'
            })
            .state('deliveryman.checkout_seguranca',{
                cache:false,
                url:'/checkout_seguranca/:id',
                templateUrl: 'templates/deliveryman/checkout/checkout_seguranca.html',
                controller: 'DeliverymanCheckoutSegurancaCtrl'
            })
            .state('deliveryman.checkout_item_detail_seguranca',{
                url:'/checkout/seguranca/detail/:index',
                templateUrl: 'templates/deliveryman/checkout/checkout_item_detail_seguranca.html',
                controller: 'DeliverymanCheckoutDetailSegurancaCtrl'
            })
            .state('deliveryman.summary',{
                cache: false,
                url:'/summary',
                templateUrl:'templates/deliveryman/summary.html',
                controller: 'DeliverymanSummaryCtrl'
            });

        //$urlRouterProvider.otherwise("/login");
        $provide.decorator('OAuthToken',['$localStorage','$delegate',function ($localStorage,$delegate) {
            Object.defineProperties($delegate,{
                setToken:{
                    value:function (data) {
                        return $localStorage.setObject('token',data);
                    },
                    enumarable:true,
                    configurable:true,
                    writable:true
                },
                getToken:{
                    value:function () {
                        return $localStorage.getObject('token');
                    },
                    enumarable:true,
                    configurable:true,
                    writable:true

                },
                removeToken:{
                    value:function () {
                        return $localStorage.setObject('token',null);
                    },
                    enumarable:true,
                    configurable:true,
                    writable:true
                }
            });
            return $delegate;
        }]);

        $provide.decorator('oauthInterceptor',['$delegate',function ($delegate) {
            delete $delegate['responseError'];
            return $delegate;
        }]);
    });

