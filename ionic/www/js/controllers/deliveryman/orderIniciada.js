angular.module('starter.controllers')
    .controller('DeliverymanOrderIniciadaCtrl',[
        '$scope','$state','$ionicLoading','$ionicActionSheet','DeliverymanOrder',
        function ($scope, $state,$ionicLoading,$ionicActionSheet,DeliverymanOrder) {

        $scope.items = [];

        $ionicLoading.show({
           template: 'Carregando...'
        });

        $scope.doRefresh = function () {
          getOrders().then(function (data) {

              $scope.items = data.data;

              $scope.$broadcast('scroll.refreshComplete');
          },function (dataError) {
              $scope.$broadcast('scroll.refreshComplete');
          });
        };
        
        $scope.openOrderDetail = function (order) {
            console.log(order);
            $state.go('deliveryman.view_order',{id: order.id});
        };
            $scope.showActionSheet = function (order) {
                $ionicActionSheet.show({
                    buttons:[
                        {text:'Ver detalhes'},
                        ],
                    titleText:'O que fazer?',
                    cancelText:'Cancelar',
                    cancel:function () {

                    },
                    buttonClicked:function (index) {
                        switch (index){
                            case 0:
                                $state.go('deliveryman.view_order',{id: order.id});
                                break;
                            case 1:
                                break
                        }
                    }
                });
            };
            function getOrders() {
                return DeliverymanOrder.query({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'asc',
                }).$promise;
            }

            getOrders().then(function (data) {
                $scope.items = data.data;
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });
    }]);