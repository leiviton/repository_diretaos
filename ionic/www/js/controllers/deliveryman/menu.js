angular.module('starter.controllers')
    .controller('DeliverymanMenuCtrl',[
        '$scope','$state','$ionicLoading','UserData','OAuthToken','$cart','$localStorage',
        function ($scope, $state,$ionicLoading,UserData,OAuthToken,$cart,$localStorage) {

            $scope.user = UserData.get();

            $scope.logout = function () {
                $cart.clear();
                $localStorage.setObject('login',null);
                UserData.set(null);
                OAuthToken.removeToken();
                $state.go('login');
            }
    }]);