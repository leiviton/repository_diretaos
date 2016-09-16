angular.module('starter.controllers')
    .controller('loginCtrl',['$scope','OAuth','OAuthToken','$ionicPopup','$state','UserData','User','$localStorage',
        function ($scope,OAuth,OAuthToken,$ionicPopup,$state,UserData,User,$localStorage) {

        $scope.user = {
            username: '',
            password: ''
        };



        $scope.login = function () {
            var promise = OAuth.getAccessToken($scope.user);
               promise
                    .then(function (data) {
                        var token = $localStorage.get('device_token');
                       return User.updateDeviceToken({},{device_token:token}).$promise;
                    })
                    .then(function (data) {
                            return User.authenticated({include:'client'}).$promise;
                    }).then(function (data) {
                        UserData.set(data.data);
                        if (data.data.role=='client'){
                            $state.go('client.checkout');
                        }else{
                            $state.go('deliveryman.home');
                        }

                   },function (responseError) {
                       UserData.set(null);
                       OAuthToken.removeToken();
                       $ionicPopup.alert({
                           title:'Advertência',
                           template:'Usuário e/ou senha inválidos'
                       });
                       console.debug(responseError);
                   });
            };


    }]);