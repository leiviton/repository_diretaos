angular.module('starter.controllers')
    .controller('DeliverymanNotificationCtrl',[
        '$scope','$state','$ionicLoading','UserData','OAuthToken','$cart',
        function ($scope, $state,$ionicLoading,UserData,OAuthToken,$cart) {

            $scope.user = UserData.get();

            $scope.logout = function () {
                $cart.clear();
                UserData.set(null);
                OAuthToken.removeToken();
                $state.go('login');
            }

    }]);