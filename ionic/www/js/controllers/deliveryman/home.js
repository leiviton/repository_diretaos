angular.module('starter.controllers')
    .controller('DeliverymanHomeCtrl',[
        '$scope','$state','$ionicLoading','DeliverymanOrder','$localStorage','$ionicPopup','$timeout',
        function ($scope, $state,$ionicLoading,DeliverymanOrder,$localStorage,$ionicPopup,$timeout) {

            $scope.count = 0;
            $scope.countSinc = 0;
            $scope.countNot = 0;

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

            $ionicLoading.show({
                template: 'Aguarde'
            });

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
                if (orders.items.length==0){
                    $ionicPopup.confirm({
                        title: 'Atenção',
                        template:'Não existem ordens'
                    }).then(function(res) {
                        if (res) {
                            $state.go('deliveryman.home');
                        }else {
                            $state.go('deliveryman.home');
                        }
                    });
                }
                console.log('orders',orders);
                $ionicLoading.hide();
            },function (dataError) {
                ProgressIndicator.showText(false, 'Não foi possivel conectar ao servidor', 'top');
                timeout(5000);
                $ionicLoading.hide();
            });

            function timeout(time) {
                $timeout(function () {
                    ProgressIndicator.hide();
                }, time);

            }
    }]);