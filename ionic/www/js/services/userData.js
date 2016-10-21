angular.module('starter.services')
    .factory('UserData',['$localStorage','User','OAuth','OAuthToken','$state','$ionicLoading','$ionicPopup','DeliverymanOrder','$redirect','Sincronizar','$timeout',
        function ($localStorage,User,OAuth,OAuthToken,$state,$ionicLoading,$ionicPopup,DeliverymanOrder,$redirect,Sincronizar,$timeout) {
        var key = 'user';


        return {
            set: function (value) {
                return $localStorage.setObject(key,value);
            },
            get: function () {
                return $localStorage.getObject(key);
            },
            login: function (o) {

                    $ionicLoading.show({
                        template: 'Sincronizando...',
                        duration:4000
                    });
                    var promise = OAuth.getAccessToken(o);
                    promise
                        .then(function (data) {
                            $localStorage.setObject('login',o);
                            return User.authenticated({include:'client'}).$promise;
                        })
                        .then(function (data) {
                            Sincronizar.sincronizar();
                            $localStorage.setObject(key,data.data);
                            $timeout(function(){
                                    $redirect.redirectSincronizar()},
                                3000);
                        },function (responseError) {
                            $localStorage.setObject('login',null);
                            OAuthToken.removeToken();
                            $ionicPopup.alert({
                                title:'Advertência',
                                template:'Usuário e/ou senha inválidos'
                            });
                            $state.go('login');
                            $ionicLoading.hide();
                            console.debug(responseError);
                        });
                }

        }
    }]);