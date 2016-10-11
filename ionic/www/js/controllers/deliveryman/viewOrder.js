angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl',[
                  '$scope','$state','$stateParams','DeliverymanOrder','$ionicLoading',
        '$cordovaGeolocation','$ionicPopup','$cart','$localStorage','$order',
        function ($scope,$state, $stateParams, DeliverymanOrder,$ionicLoading,
                  $cordovaGeolocation,$ionicPopup,$cart,$localStorage,$order) {
        var item = [];
        $scope.order = [];
        $scope.equipe = [];
        $scope.actions = [];
        $scope.visitors = [];
        $scope.exibir = [];
        $scope.link = "https://google.com/maps/place/";

        console.log($stateParams.index);
        var orders = $localStorage.getObject('orders');
            $ionicLoading.show({
               template: 'Carregando...'
            });
            for (var i=0;i < orders.items.length;i++){
                if (orders.items[i].id == $stateParams.id){
                    $scope.order = orders.items[i];
                    initMarkes($scope.order);
                }
            }

            function initMarkes(order) {
                var address = order.zipcode + ', ' +
                    order.address +',' +
                    order.address_number +', '+
                    order.city +' - '+
                    order.state;
                console.log('address',address);
                //createMarkerClient(address);
                $scope.link = "https://google.com/maps/place/"+address;
            }



            if ($scope.order.actions.data.length>0) {
                $scope.actions = $scope.order.actions.data;
            }

            for (var i=0;i < $scope.actions.length;i++){
                    $scope.visitors[i] = $scope.actions[i];
            }
            if ($scope.visitors.length <= 0) {
                $scope.exibir = 1;
            } else {
                $scope.exibir = 0;
            }
            $ionicLoading.hide();

        $scope.goToOrder = function () {
            $ionicPopup.confirm({
                title: 'Atenção',
                template: 'Cliente não se encontra?',
                cssClass: 'animated fadeInDown'
            }).then(function(res) {
                if(res) {
                    $ionicLoading.show({
                        template: 'Gravando visita'
                    });
                    var posOptions = {timeout: 30000, enableHighAccuracy: false, maximumAge: 0};

                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;

                            DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                devolver: null,
                                status: 0,
                                lat: lat,
                                long: long
                            },function (data) {
                                $scope.order = data;
                                $scope.equipe = $cart.getAux();
                                $ionicLoading.hide();
                                $state.go('deliveryman.order');
                            });
                        }, function(err) {
                            // error
                            $ionicLoading.hide();
                        });
                } else {
                    $ionicLoading.hide();
                }
            });
        };

        $scope.goToDelivery = function () {

                $ionicPopup.confirm({
                    title: 'Atenção',
                    template: 'Deseja iniciar esta Ordem?',
                    cssClass: 'animated fadeInDown'

                }).then(function(res) {
                    if(res) {
                        $ionicLoading.show({
                            template: 'Iniciando'
                        });
                        var posOptions = {timeout: 30000, enableHighAccuracy: false, maximumAge: 0};

                        $cordovaGeolocation
                            .getCurrentPosition(posOptions)
                            .then(function (position) {
                                var lat = position.coords.latitude;
                                var long = position.coords.longitude;
                                $cart.updateStatus($stateParams.index,'Iniciada');
                                var item = {
                                    id: $stateParams.id,
                                    lat: lat,
                                    long:long,
                                    status: 'Iniciada'
                                };
                                $cart.addIni(item);
                                $state.go('deliveryman.view_close', {id: $scope.order.id});
                                /*DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                    devolver: null,
                                    status: 1,
                                    lat: lat,
                                    long: long
                                },function (data) {
                                    $scope.order = data;
                                    $scope.equipe = $cart.getAux();
                                    $ionicLoading.hide();
                                    $state.go('deliveryman.view_close', {id: $scope.order.id});
                                });*/
                            }, function(err) {
                                // error
                                $ionicLoading.hide();
                            });
                    }else {
                        $ionicLoading.hide();
                    }
                });
            };
            $scope.giveBack = function () {
               $ionicPopup.confirm({
                    title: 'Atenção',
                    template: 'Deseja devolver esta Ordem?',
                    cssClass: 'animated fadeInDown'
                }).then(function(res) {
                    if(res) {
                        $ionicLoading.show({
                            template: 'Notificando PCP'
                        });
                        var posOptions = {timeout: 30000, enableHighAccuracy: false, maximumAge: 0};
                        $cordovaGeolocation
                            .getCurrentPosition(posOptions)
                            .then(function (position) {
                                var lat = position.coords.latitude;
                                var long = position.coords.longitude;

                                console.log(lat,long);


                                item = {
                                    id:$stateParams.id,
                                    lat:lat,
                                    long:long,
                                    status:3
                                };
                                DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                    status: 3,
                                    lat: lat,
                                    long: long
                                },function (data) {
                                    $order.addItem(item);
                                    $order.removeItem($stateParams.index);
                                    //$localStorage.setObject('orders_update',{items:{}});
                                    console.log('update',$localStorage.getObject('orders_update'));

                                    console.log(data);
                                    $ionicLoading.hide();
                                    $state.go('deliveryman.home');
                                });
                            }, function(err) {
                                // error
                                $ionicLoading.hide();
                            });
                    }else {
                        $ionicLoading.hide();
                    }
                });
            };
    }]);