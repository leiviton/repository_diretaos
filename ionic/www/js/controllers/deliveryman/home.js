angular.module('starter.controllers')
    .controller('DeliverymanHomeCtrl',[
        '$scope','$state','$ionicLoading','DeliverymanOrder','$localStorage','$ionicPopup','$timeout',
        function ($scope, $state,$ionicLoading,DeliverymanOrder,$localStorage,$ionicPopup,$timeout) {
            $scope.count = 0;
            $scope.countSinc = 0;
            $scope.countNot = 0;
            $scope.data = [];
            $scope.label = [];
            $scope.color = [];
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

            $ionicLoading.show({
                template: 'Sincronizando...'
            });

            $scope.sincronizar = function() {
                $ionicPopup.confirm({
                    title: 'Atenção',
                    template: 'Deseja sincronizar?'
                }).then(function(res) {
                    if (res) {
                        getOrders();
                    }else {
                        $ionicLoading.hide();
                    }
                });
            };

            function sincronizar(or) {
                   return DeliverymanOrder.updateStatus({id: or.id}, {
                            status: or.status,
                            lat: or.lat,
                            long: or.long
                        }).$promise;
            }

            function getNotification() {
                return DeliverymanOrder.countN({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'asc'
                }).$promise;
            }

            getNotification().then(function (data) {
                $scope.notification = data.data;
                $localStorage.setObject('notification',{items:data.data})
            });

            getNotification();
            function getOrders() {
                if($localStorage.getObject('orders_update').items.length>0) {
                    console.log($localStorage.getObject('orders_update').items.length);
                    var a = $localStorage.getObject('orders_update').items;
                    for(var i = 0; i<a.length;i++){
                        sincronizar(a[i]);
                    }
                    $localStorage.setObject('orders_update',{items:[]})
                }
                return DeliverymanOrder.query({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'asc'
                }).$promise;
            }

            getOrders().then(function (data) {

                $localStorage.setObject('orders',{items:data.data});
                var orders = $localStorage.getObject('orders');
                var o = $localStorage.getObject('orders_update').items;
                $scope.countSinc = o.length;

                var not = $localStorage.getObject('notification').items;
                for (var i = 0; i<not.length;i++){
                    if (not[i].bit_read==0){
                        $scope.countNot++;
                    }
                }

                if (orders.items.length <= 0){
                    $scope.count = 0;
                }else{
                    $scope.count = orders.items.length;
                }
                if (orders.items.length==0) {
                    $ionicLoading.show({
                        template: 'Não existe ordens abertas'
                    });
                }
                console.log('orders',orders);
                $ionicLoading.hide();
            },function (dataError) {

                $ionicLoading.hide();
            });

            $scope.data = dataHoje();

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