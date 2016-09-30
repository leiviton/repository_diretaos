angular.module('starter.controllers')
    .controller('DeliverymanCheckoutSuccessful',[
        '$scope','$state','$cart','$localStorage',
        function ($scope,$state,$cart,$localStorage) {
            var cart = $cart.get();
            $scope.items = cart.items;
            $scope.order = $localStorage.getObject('order_close');
            $cart.clear();
            $scope.openListOrder = function () {
                $state.go('deliveryman.order');
            };
    }]);