angular.module('starter.controllers')
    .controller('DeliverymanSummaryCtrl',[
        '$scope','DeliverymanOrder',
        function ($scope,DeliverymanOrder) {

            DeliverymanOrder.count({id:null,status:0},function (data) {
                $scope.mes = data[0];
            });
            DeliverymanOrder.countD({id:null,status:0},function (data) {
                $scope.dia = data[0];
                if ($scope.atual < $scope.anterior) {
                    console.log($scope.atual, $scope.anterior);
                    $scope.menor = true;
                } else {
                    $scope.menor = false;
                }
            });
            DeliverymanOrder.countMi({id:null,status:2},function (data) {
                $scope.mesI = data[0];
            });
            DeliverymanOrder.countDi({id:null,status:2},function (data) {
                $scope.diaI = data[0];
                if ($scope.mesI > $scope.diaI) {
                    $scope.menorP = true;
                } else {
                    $scope.menorP = false;
                }
            });
    }]);