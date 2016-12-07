angular.module('starter.controllers')
    .controller('DeliverymanOrderCtrl',[
        '$scope','$state','$ionicLoading','$stateParams','$ionicActionSheet','DeliverymanOrder','$ionicPopup','$cordovaGeolocation','$localStorage','$cordovaSQLite',
        function ($scope, $state,$ionicLoading,$stateParams,$ionicActionSheet,DeliverymanOrder,$ionicPopup,$cordovaGeolocation,$localStorage,$cordovaSQLite) {

            $scope.items = [];

            $ionicLoading.show({
               template: 'Carregando...'
            });

            $scope.giveBack = function (o) {
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

                                DeliverymanOrder.updateStatus({id: o.id}, {
                                    status: 3,
                                    lat: lat,
                                    long: long
                                },function (data) {
                                    console.log(data);
                                    $ionicLoading.hide();
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
            $scope.openOrderDetail = function (order,index) {
                var i = index;
                if (order.status == 'Iniciada') {
                    $state.go('deliveryman.view_close', {id: order.id,index: i});
                }else {
                    $state.go('deliveryman.view_order', {id: order.id,index: i});
                }
            };
            function getOrders() {
                $scope.items = $localStorage.getObject('orders').items;
                if($scope.items.length==0){
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: 'Não existe novas Ordens'
                    }).then(function(res) {
                        if(res){
                            $state.go('deliveryman.home');
                        }else{
                            $state.go('deliveryman.home');
                        }
                    });
                }

                $ionicLoading.hide();
            }

            getOrders();


    }]);