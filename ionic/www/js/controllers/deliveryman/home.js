angular.module('starter.controllers')
    .controller('DeliverymanHomeCtrl',[
        '$scope','$ionicLoading','$localStorage','$redirect','$timeout','UserData',
        function ($scope, $ionicLoading,$localStorage,$redirect,$timeout,UserData) {
            var login = $localStorage.getObject('login');

            $scope.sincronizar = function() {
                if(login!=null){
                    UserData.login(login);
                }
            };
            $scope.countNot = $localStorage.getObject('notification').items.length;
            $scope.data = $localStorage.get('sincronizado');
            $scope.count = $localStorage.get('qtdOrder');
    }]);
