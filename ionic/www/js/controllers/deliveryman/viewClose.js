angular.module('starter.controllers')
    .controller('DeliverymanViewCloseCtrl',[
        '$scope','$state','$stateParams','DeliverymanOrder','$ionicLoading',
        '$cordovaGeolocation','$ionicPopup','$cart','UserData','$localStorage',
        function ($scope,$state, $stateParams, DeliverymanOrder,$ionicLoading
            ,$cordovaGeolocation,$ionicPopup,$cart,UserData,$localStorage) {
        var watch;
        $scope.user = UserData.get();
        var orders = $localStorage.getObject('orders');
        console.log(orders);
        $scope.order = [];
        var aux = $cart.getAux();
        if(aux.auxiliar.length == 0 || aux.auxiliar==null){
            aux.auxiliar = null;
            $scope.auxiliary = aux.auxiliar;
        }else {
            $scope.auxiliary = aux.auxiliar;
        }

            $scope.openListAuxiliares = function () {
                $state.go('deliveryman.checkout');
            };

        $ionicLoading.show({
           template: 'Carregando...'
        });
        for (var i=0;i < orders.items.length;i++){
            if (orders.items[i].id == $stateParams.id){
                $scope.order = orders.items[i];
            }
        }
        $ionicLoading.hide();
        // DeliverymanOrder.get({id:$stateParams.id, include:"items,cupom"},function (data) {
        //     $scope.order = data.data;
        //     $ionicLoading.hide();
        // },function (dataError) {
        //     $ionicLoading.hide();
        // });

        $scope.goToDeliveryClose = function (o) {
            $ionicPopup.confirm({
                title: 'Atenção',
                template: 'Deseja fechar esta Ordem?'
            }).then(function(res) {
                $ionicLoading.show({
                    template: 'Enviando...'
                });
                if(res) {
                    var posOptions = {timeout: 30000, enableHighAccuracy: false, maximumAge: 0};

                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;

                            console.log(lat,long);
                            var  ax = {auxiliary: angular.copy($scope.auxiliary)};

                            angular.forEach(ax.auxiliary,function (item) {
                                item.auxiliary_id = item.id;
                            });
                            console.log(ax);
                            DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                devolver: null,
                                status: 2,
                                lat: lat,
                                long: long,
                                service: o.service,
                                auxiliary:ax.auxiliary
                            },function (data) {
                                $scope.order = data;
                                console.log(data);
                                $ionicLoading.hide();
                                $state.go('deliveryman.order');
                            });
                        }, function(err) {
                            // error
                            $ionicLoading.hide();
                        });
                } else {
                    $ionicLoading.hide();
                }
            });
        };
    }]);