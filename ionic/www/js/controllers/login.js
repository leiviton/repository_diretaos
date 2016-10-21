angular.module('starter.controllers')
    .controller('loginCtrl',['$scope','OAuth','OAuthToken','$ionicPopup','$state','UserData','$ionicLoading','$localStorage','$redirect',
        function ($scope,OAuth,OAuthToken,$ionicPopup,$state,UserData,$ionicLoading,$localStorage,$redirect) {

        $scope.user = {
            username: '',
            password: ''
        };

        var log = $localStorage.getObject('login');
        $scope.login = function () {
                console.log($scope.user.username);
                console.log(log);
            if(log!=null) {
                if ($scope.user.username === log.username && $scope.user.password === log.password) {
                    console.log('logou')
                    $redirect.redirectAfterLogin();
                } else {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: 'Usuário e/ou senha inválidos'
                    });
                }
            }else{
                UserData.login($scope.user);
            }
        };
    }]);