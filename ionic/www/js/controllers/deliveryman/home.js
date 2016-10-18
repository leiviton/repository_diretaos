angular.module('starter.controllers')
    .controller('DeliverymanHomeCtrl',[
        '$scope','$ionicLoading','$localStorage','Sincronizar','$redirect','$timeout',
        function ($scope, $ionicLoading,$localStorage,Sincronizar,$redirect,$timeout) {
            $scope.sincronizar = function() {
                $ionicLoading.show({
                    template: 'Sincronizando...',
                    duration:5000
                });
                Sincronizar.sincronizar();
                $timeout(function(){
                    $redirect.redirectSincronizar()},
                    5000);
            };

            $scope.countNot = $localStorage.getObject('notification').items.length;
            $scope.data = $localStorage.get('sincronizado');
            $scope.count = $localStorage.get('qtdOrder');
    }]);
