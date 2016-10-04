angular.module('starter.controllers')
    .controller('logoutCtrl',['$scope','OAuth','OAuthToken','$state','UserData','$cart',
        function ($scope,OAuth,OAuthToken,$state,UserData,$cart) {
            OAuthToken.removeToken();
            UserData.set(null);
            $cart.clear();
            $cart.clearOrder();

            $state.go('login');
    }]);