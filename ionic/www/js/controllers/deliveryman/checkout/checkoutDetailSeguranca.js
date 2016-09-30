angular.module('starter.controllers')
    .controller('DeliverymanCheckoutDetailSegurancaCtrl',['$scope','$state','$stateParams','$cart' ,function ($scope,$state,$stateParams,$cart) {

        $scope.product = $cart.getItem($stateParams.index);

        $scope.updateSerial = function () {
            $cart.updateSerial($stateParams.index,$scope.product.serial);
            $state.go('deliveryman.checkout_seguranca');
        }
    }]);