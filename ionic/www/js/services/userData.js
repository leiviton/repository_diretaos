angular.module('starter.services')
    .factory('UserData',['$localStorage','User','OAuth','OAuthToken','$state','$ionicLoading','$ionicPopup',
        function ($localStorage,User,OAuth,OAuthToken,$state,$ionicLoading,$ionicPopup) {
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
                        var token = $localStorage.get('device_token');
                        return User.updateDeviceToken({},{device_token:token}).$promise;
                    })
                    .then(function (data) {
                        return User.authenticated({include:'client',include:'notification'}).$promise;
                    })
                    .then(function (data) {
                    $localStorage.setObject(key,data.data);
                    $localStorage.setObject('notification',{items:data.data.notification.data});
                    if (data.data.role=='client'){
                        $ionicLoading.hide();
                        $state.go('client.checkout');
                    }else{
                        $ionicLoading.hide();
                        $state.go('deliveryman.home');
                    }

                },function (responseError) {
                    $localStorage.setObject(key,null);
                    OAuthToken.removeToken();
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Usuário e/ou senha inválidos'
                    });
                    $ionicLoading.hide();
                    console.debug(responseError);
                });
            }
        }
    }]);