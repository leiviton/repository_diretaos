angular.module('starter.controllers')
    .controller('SincronizarCtrl',['$scope','$ionicLoading','OAuth','OAuthToken','$state','UserData','$cart','$ionicHistory','$redirect',
        function ($scope,$ionicLoading,OAuth,OAuthToken,$state,UserData,$cart,$ionicHistory,$redirect) {


            $ionicLoading.show({
                template: 'Sincronizando...'
            });
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            $ionicLoading.hide();
            $redirect.redirectAfterLogin();
    }]);