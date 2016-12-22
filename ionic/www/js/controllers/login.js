angular.module('starter.controllers')
    .controller('loginCtrl',['$scope','OAuth','OAuthToken','$ionicPopup','$state','UserData','$ionicLoading','$localStorage','$redirect','Sincronizar','User','$timeout',
        function ($scope,OAuth,OAuthToken,$ionicPopup,$state,UserData,$ionicLoading,$localStorage,$redirect,Sincronizar,User,$timeout) {

        $scope.user = {
            username: '',
            password: ''
        };
        var log = $localStorage.getObject('login');

        $scope.login = function () {
            var message = 'Aguarde ';
                $ionicLoading.show({
                    template: ' <ion-spinner></ion-spinner> <br> '+ message
                });
            var promise = OAuth.getAccessToken($scope.user);
               promise               
                .then(function (data) {
                    $localStorage.setObject('login',$scope.user);
                    return User.authenticated({include:'client'}).$promise;
                })
                .then(function (data) {
                    Sincronizar.sincronizar();
                    UserData.set(data.data);
                    $timeout(function(){
                                    $redirect.redirectSincronizar()},
                                3000);
                    $ionicLoading.hide(); 
               },function (responseError) {
                   $ionicLoading.hide(); 
                   UserData.set(null);
                   OAuthToken.removeToken();
                   $ionicPopup.alert({
                       title:'Advertência',
                       template:'Usuário e/ou senha inválidos'
                   });
                   console.debug(responseError);
               });
        }
    }]);