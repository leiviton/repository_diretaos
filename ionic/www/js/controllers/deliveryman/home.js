angular.module('starter.controllers')
    .controller('DeliverymanHomeCtrl',[
        '$scope','$state','$ionicLoading','DeliverymanOrder','$localStorage','$ionicPopup','$timeout','Sincronizar','$cart','$window','$redirect',
        function ($scope, $state,$ionicLoading,DeliverymanOrder,$localStorage,$ionicPopup,$timeout,Sincronizar,$cart,$window,$redirect) {
            $scope.count = 0;
            $scope.countSinc = 0;
            $scope.countNot = 0;
            $scope.data = [];
            $scope.label = [];
            $scope.color = [];




            var orders = $localStorage.getObject('orders');
            var not = $localStorage.getObject('notification').items;
            $scope.countNot = not.length;
            if (orders.items.length <= 0){
                $scope.count = 0;
            }else{
                $scope.count = orders.items.length;
            }

            if (orders.items.length==0) {
                $ionicPopup.alert({
                    title: 'Atenção',
                    template: 'Não existem ordens pendentes'
                })
            }

            $scope.sincronizar = function() {
                $ionicLoading.show({
                    template: 'Sincronizando...'
                });

                Sincronizar.sincronizar();
                $scope.notification = $localStorage.getObject('notification');
                $redirect.redirectSincronizar();
                $ionicLoading.hide();
            };

            function getNotification() {

            }



            function getOrders() {
                return DeliverymanOrder.query({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'asc'
                },function (data) {
                    $localStorage.setObject('orders',{items:data.data});
                    var orders = $localStorage.getObject('orders');
                    var not = $localStorage.getObject('notification').items;
                    $scope.countNot = not.length;
                    if (orders.items.length <= 0){
                        $scope.count = 0;
                    }else{
                        $scope.count = orders.items.length;
                    }

                    console.log('orders',orders);
                    $ionicLoading.hide();
                },function (error) {
                    $ionicLoading.hide();
                });
            }
            $scope.data = $localStorage.get('sincronizado');

            function dataHoje() {

            }
    }]);
;