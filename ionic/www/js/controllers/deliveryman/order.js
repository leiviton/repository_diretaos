angular.module('starter.controllers')
    .controller('DeliverymanOrderCtrl',[
        '$scope','$state','$ionicLoading','$stateParams','$ionicActionSheet','DeliverymanOrder','$ionicPopup','$cordovaGeolocation','$localStorage',
        function ($scope, $state,$ionicLoading,$stateParams,$ionicActionSheet,DeliverymanOrder,$ionicPopup,$cordovaGeolocation,$localStorage) {

            $scope.items = [];

            $ionicLoading.show({
               template: 'Carregando...'
            });
            $scope.doRefresh = function () {
              getOrders().then(function (data) {
                  $localStorage.setObject('orders',data.data);
                  console.log('orders refresh',$localStorage.getObject('orders'));
                  $scope.items = $localStorage.getObject('orders');
                  $scope.$broadcast('scroll.refreshComplete');
              },function (dataError) {
                  $scope.$broadcast('scroll.refreshComplete');
              });
            };

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
                                    devolver:1,
                                    status: 0,
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
            $scope.openOrderDetail = function (order) {
                console.log(order);
                if (order.status == 1) {
                    $state.go('deliveryman.view_close', {id: order.id});
                }else {
                    $state.go('deliveryman.view_order', {id: order.id});
                }
            };
            function getOrders() {
                $scope.items = $localStorage.getObject('orders');
                $ionicLoading.hide();
            }
            getOrders();


    }]);