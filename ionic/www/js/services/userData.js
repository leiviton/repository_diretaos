angular.module('starter.services')
    .factory('UserData',['$localStorage','User','OAuth','OAuthToken','$state','$ionicLoading','$ionicPopup','DeliverymanOrder','$redirect','Sincronizar','$cordovaNetwork',
        function ($localStorage,User,OAuth,OAuthToken,$state,$ionicLoading,$ionicPopup,DeliverymanOrder,$redirect,Sincronizar,$cordovaNetwork) {
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
                        template: 'Aguarde'
                    });
                    var promise = OAuth.getAccessToken(o);
                    $localStorage.setObject('login',o);
                    promise
                        .then(function (data) {
                            return User.authenticated({include:'client'}).$promise;
                        })
                        .then(function (data) {
                            Sincronizar.sincronizar();
                            $ionicLoading.hide();
                            $localStorage.setObject(key,data.data);
                            $redirect.redirectAfterLogin();
                        },function (responseError) {
                            $localStorage.setObject(key,null);
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