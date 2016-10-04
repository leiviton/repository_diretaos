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
                console.log(order);
                if (order.status == 'Iniciada') {
                    $state.go('deliveryman.view_close', {id: order.id, index: index});
                }else {
                    $state.go('deliveryman.view_order', {id: order.id, index: index});
                }
            };
            function getOrders() {
                return DeliverymanOrder.query({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'desc'
                }).$promise;
            }

            getOrders().then(function (data) {
                if(data.data.length==0){
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
                $localStorage.setObject('orders',{items:data.data});

                $scope.items = $localStorage.getObject('orders').items;
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });
            getOrders();


    }]);