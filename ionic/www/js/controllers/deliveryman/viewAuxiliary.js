angular.module('starter.controllers')
    .controller('DeliverymanViewAuxiliaryCtrl',[
        '$scope','$state','Auxiliary','$ionicLoading','$cart','$localStorage',
        function ($scope, $state, Auxiliary,$ionicLoading,$cart,$localStorage) {

            $scope.auxiliary = [];

            $scope.auxiliary = $localStorage.getObject('auxiliary').items;
            
            $scope.addItem = function (auxiliary) {
                $cart.addAux(auxiliary);
                $state.go('deliveryman.checkout');
            };
    }]);