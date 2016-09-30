angular.module('starter.controllers')
    .controller('DeliverymanViewProductRadioCtrl',[
        '$scope','$state','Product','$ionicLoading','$cart',
        function ($scope, $state, Product,$ionicLoading,$cart) {

        $scope.products = [];
        $ionicLoading.show({
           template: 'Carregando...'
        });

        Product.radio(function (data) {
            $scope.products = data.data;
            console.log(data.data);
            $ionicLoading.hide();
        },function (dataError) {
            $ionicLoading.hide();
        });

        $scope.addItem = function (item) {
            item.qtd = 1;
            $cart.addItem(item);
            $state.go('deliveryman.checkout_radio');
        };
    }]);