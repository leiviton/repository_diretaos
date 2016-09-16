angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl',[
                  '$scope','$state','$stateParams','DeliverymanOrder','$ionicLoading','$cordovaGeolocation','$ionicPopup','$cart',
        function ($scope,$state, $stateParams, DeliverymanOrder,$ionicLoading,$cordovaGeolocation,$ionicPopup,$cart) {
        var watch;
        $scope.order = [];
        $scope.equipe = [];
        $scope.actions = [];
        $scope.visitors = [];
        $scope.exibir = [];
        $ionicLoading.show({
           template: 'Carregando...'
        });
        DeliverymanOrder.get({id:$stateParams.id},function (data) {

            $scope.order = data.data;
            console.log($scope.order);
            $scope.actions = $scope.order.actions.data;
            console.log('actions',$scope.actions);
            for (var i=0;i < $scope.actions.length;i++){
                if ($scope.actions[i].key=="Visita"){
                    console.log($scope.actions[i].key);
                    $scope.visitors[i] = $scope.actions[i];
                    console.log($scope.visitors[i].key);
                }
            }
            if ($scope.visitors.length == 0) {
                $scope.exibir = 1;
            } else {
                $scope.exibir = 0;
            }

            $ionicLoading.hide();
        },function (dataError) {
            $ionicLoading.hide();
        });
        $scope.goToOrder = function () {
            $ionicPopup.confirm({
                title: 'Atenção',
                template: 'Cliente não se encontra?'
            }).then(function(res) {
                if(res) {
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
                        var posOptions = {timeout: 30000, enableHighAccuracy: false, maximumAge: 0};

                        $cordovaGeolocation
                            .getCurrentPosition(posOptions)
                            .then(function (position) {
                                var lat = position.coords.latitude;
                                var long = position.coords.longitude;

                                console.log(lat,long);

                                DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                    devolver:1,
                                    status: 0,
                                    lat: lat,
                                    long: long
                                },function (data) {
                                    console.log(data);
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


        
        function stopWatchPosition() {
            if(watch && typeof watch =='object' && watch.hasOwnProperty('watchID')){
                $cordovaGeolocation.clearWatch(watch.watchID);
            }
        }
    }]);