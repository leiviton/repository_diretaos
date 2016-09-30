angular.module('starter.controllers')
    .controller('DeliverymanNotificationCtrl',[
        '$scope','$state','$ionicLoading','UserData','OAuthToken','$cart','$localStorage','DeliverymanOrder',
        function ($scope, $state,$ionicLoading,UserData,OAuthToken,$cart,$localStorage,DeliverymanOrder) {


                $scope.notification = $localStorage.getObject('notification').items;
                $scope.exibir = [];
                if($scope.notification<=0){
                    $scope.exibir=null;
                }

            $scope.openOrderDetail = function (notification) {
                $state.go('deliveryman.view_notification',{id: notification.id});
            };
    }]);