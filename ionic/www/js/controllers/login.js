angular.module('starter.controllers')
    .controller('loginCtrl',['$scope','OAuth','OAuthToken','$ionicPopup','$state','UserData','$ionicLoading',
        function ($scope,OAuth,OAuthToken,$ionicPopup,$state,UserData,$ionicLoading) {

        $scope.user = {
            username: '',
            password: ''
        };
            $ionicLoading.show({
                template: 'Carregando...'
            });
        $scope.login = function () {
            UserData.login($scope.user);
            $ionicLoading.hide();
        };
    }]);