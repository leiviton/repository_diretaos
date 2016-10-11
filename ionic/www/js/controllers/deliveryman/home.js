angular.module('starter.controllers')
    .controller('DeliverymanHomeCtrl',[
        '$scope','$state','$ionicLoading','DeliverymanOrder','$localStorage','$ionicPopup','$timeout','Sincronizar','$cart','$window',
        function ($scope, $state,$ionicLoading,DeliverymanOrder,$localStorage,$ionicPopup,$timeout,Sincronizar,$cart,$window) {
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

            var reload = function () {
                $timeout(function () {
                    $window.location.reload(true);
                },100);
            };

            $scope.sincronizar = function() {
                $ionicLoading.show({
                    template: 'Sincronizando...'
                });

                DeliverymanOrder.count({id:null,status:0},function (data) {
                    $localStorage.setObject('orders_pendentes_criticas',data[0]);
                });
                DeliverymanOrder.countD({id:null,status:0},function (data) {
                    $localStorage.setObject('orders_pendentes_alta',data[0]);
                });
                DeliverymanOrder.countMi({id:null,status:2},function (data) {
                    $localStorage.setObject('orders_fechadas_mes',data[0]);
                });
                DeliverymanOrder.countDi({id:null,status:2},function (data) {
                    $localStorage.setObject('orders_fechadas_dia',data[0]);
                });

                var read = $cart.getNot().items;
                var order = $cart.getOrder().items;
                if(read.length!=0) {
                    DeliverymanOrder.updateNotification({
                        notification: read
                    },function (data) {
                        console.log(data);
                        $localStorage.setObject('notification',{items:data.data});
                        $cart.clearNotification();
                        if (order.length==0){
                            getOrders();
                        }
                        $ionicLoading.hide();
                    });
                }else{
                    getNotification();
                    if (order.length==0){
                        getOrders();
                    }
                }
                $localStorage.set('sincronizado',dataHoje());
            };

            function getNotification() {
                return DeliverymanOrder.countN({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'asc'
                },function (data) {
                    $scope.notification = data.data;
                    $localStorage.setObject('notification',{items:data.data})
                    $ionicLoading.hide();
                });
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
                var data = new Date();
                var dia = data.getDate();
                var mes = data.getMonth() + 1;
                if (dia < 10){
                    dia = "0" + dia;
                }
                if (mes < 10) {
                    mes = "0" + mes;
                }
                var ano = data.getFullYear();
                var horas = new Date().getHours();
                if (horas < 10) {
                    horas = "0" + horas;
                }
                var minutos = new Date().getMinutes();
                if (minutos < 10) {
                    minutos = "0" + minutos;
                }
                var result = dia+"/"+mes+"/"+ano+" - "+horas + "h" + minutos;
                return result;
            }
    }]);
;