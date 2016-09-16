angular.module('starter.controllers')
    .controller('DeliverymanViewAuxiliaryCtrl',[
        '$scope','$state','Auxiliary','$ionicLoading','$cart',
        function ($scope, $state, Auxiliary,$ionicLoading,$cart) {

        $scope.auxiliary = [];
        $ionicLoading.show({
           template: 'Carregando...'
        });
        Auxiliary.query(function (data) {
            console.log(data);
            $scope.auxiliary = data.data;
            $ionicLoading.hide();
        },function (dataError) {
            $ionicLoading.hide();
        });

        $scope.addItem = function (auxiliary,order) {
            $cart.addAux(auxiliary);
            $state.go('deliveryman.checkout');
        };
    }]);