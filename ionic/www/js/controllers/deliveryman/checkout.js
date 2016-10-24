angular.module('starter.controllers')
    .controller('DeliverymanCheckoutCtrl',[
        '$scope','$state','$cart','DeliverymanOrder','$ionicLoading','$ionicPopup','Cupom','$cordovaBarcodeScanner','User',
        function ($scope,$state,$cart,DeliverymanOrder,$ionicLoading,$ionicPopup,Cupom,$cordovaBarcodeScanner,User) {


        var aux = $cart.getAux();
        $scope.items = aux.auxiliar;

        $scope.removeItem = function (i) {
           $cart.removeAux(i);
           $scope.items.splice(i,1);
        };

            $scope.openListAuxiliares = function () {
                $state.go('deliveryman.view_auxiliary');
            };
        $scope.verTrabalhos = function () {
          $state.go('deliveryman.order');
        };


        $scope.openProductDetail = function (i) {
          $state.go('client.checkout_item_detail',{index:i});
        };
    }]);
