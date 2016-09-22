angular.module('starter.controllers')
    .controller('DeliverymanNotificationCtrl',[
        '$scope','$state','$ionicLoading','UserData','OAuthToken','$cart','$localStorage',
        function ($scope, $state,$ionicLoading,UserData,OAuthToken,$cart,$localStorage) {
            $scope.notification = $localStorage.getObject('notification').items;

            console.log($scope.notification);
            $scope.exibir = [];
            if($scope.notification<=0){
                $scope.exibir=null;
            }
    }]);