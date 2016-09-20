angular.module('starter.controllers')
    .controller('DeliverymanHomeCtrl',[
        '$scope','$state','$ionicLoading','DeliverymanOrder','$localStorage',
        function ($scope, $state,$ionicLoading,DeliverymanOrder,$localStorage) {

            $scope.count = 0;
            $ionicLoading.show({
                template: 'Aguarde'
            });
            function getOrders() {
                return DeliverymanOrder.query({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'asc'
                }).$promise;
            }

            getOrders().then(function (data) {
                $localStorage.setObject('orders',data.data);
                $ionicLoading.hide();
                var orders = $localStorage.getObject('orders');
                if (orders.length == null){
                    $scope.count = 0;
                }else{
                    $scope.count = orders.length;
                }
                console.log('orders',orders);
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });
    }]);