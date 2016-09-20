angular.module('starter.controllers')
    .controller('loginCtrl',['$scope','OAuth','OAuthToken','$ionicPopup','$state','UserData','$ionicLoading',
        function ($scope,OAuth,OAuthToken,$ionicPopup,$state,UserData,$ionicLoading) {

        $scope.user = {
            username: '',
            password: ''
        };
        $scope.login = function () {
            UserData.login($scope.user);
        };
    }]);