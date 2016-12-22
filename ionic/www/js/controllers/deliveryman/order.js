angular.module('starter.controllers')
    .controller('DeliverymanOrderCtrl',[
        '$scope','$state','$ionicLoading','$stateParams','$ionicActionSheet','DeliverymanOrder','$ionicPopup','$cordovaGeolocation','$localStorage','$cordovaSQLite',
        function ($scope, $state,$ionicLoading,$stateParams,$ionicActionSheet,DeliverymanOrder,$ionicPopup,$cordovaGeolocation,$localStorage,$cordovaSQLite) {

            $scope.items = [];

            $ionicLoading.show({
               template: 'Carregando...'
            });

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