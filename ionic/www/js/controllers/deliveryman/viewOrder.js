angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl',[
                  '$scope','$state','$stateParams','DeliverymanOrder','$ionicLoading','$cordovaGeolocation','$ionicPopup','$cart','$localStorage','$order',
        function ($scope,$state, $stateParams, DeliverymanOrder,$ionicLoading,$cordovaGeolocation,$ionicPopup,$cart,$localStorage,$order) {
        var item = [];
        $scope.order = [];
        $scope.equipe = [];
        $scope.actions = [];
        $scope.visitors = [];
        $scope.exibir = [];
        $scope.link = [];


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


            console.log($scope.order);

            if ($scope.order.actions.data.length>0) {
                $scope.actions = $scope.order.actions.data;
            }

            console.log('actions',$scope.actions);


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
                template: 'Cliente não se encontra?'
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

                            console.log(lat,long);

                            DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                devolver: null,
                                status: 0,
                                lat: lat,
                                long: long
                            },function (data) {
                                $scope.order = data;
                                $scope.equipe = $cart.getAux();
                                console.log($scope.equipe.name);
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
                    template: 'Deseja iniciar esta Ordem?'
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

                                console.log(lat,long);

                                DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                    devolver: null,
                                    status: 1,
                                    lat: lat,
                                    long: long
                                },function (data) {
                                    $scope.order = data;
                                    $scope.equipe = $cart.getAux();
                                    console.log(data);
                                    $ionicLoading.hide();
                                    $state.go('deliveryman.view_close', {id: $scope.order.id});
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
            $scope.giveBack = function () {
               $ionicPopup.confirm({
                    title: 'Atenção',
                    template: 'Deseja devolver esta Ordem?'
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

            function initMarkes(order) {
                var address = $scope.order.zipcode + ', ' +
                    $scope.order.address +',' +
                    $scope.order.address_number +', '+
                    $scope.order.city +' - '+
                    $scope.order.state;
                console.log('address',address);
                createMarkerClient(address);
            }

            function createMarkerClient(address) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: address
                },function (results,status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var lat = results[0].geometry.location.lat(),
                            long = results[0].geometry.location.lng();
                        $scope.link = "https://google.com/maps/place/" + lat+","+long;
                        console.log('link',$scope.link);
                    }
                });
            }

    }]);