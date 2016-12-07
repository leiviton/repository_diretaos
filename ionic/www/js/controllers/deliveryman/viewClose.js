angular.module('starter.controllers')
    .controller('DeliverymanViewCloseCtrl',[
        '$scope','$state','$stateParams','DeliverymanOrder','$ionicLoading',
        '$cordovaGeolocation','$ionicPopup','$cart','UserData','$localStorage','ionicToast','Sincronizar',
        function ($scope,$state, $stateParams, DeliverymanOrder,$ionicLoading
            ,$cordovaGeolocation,$ionicPopup,$cart,UserData,$localStorage,ionicToast,Sincronizar) {
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

        ionicToast.show('Ordem '+$scope.order.number_os_sise+' inicializada com sucesso', 'bottom', false, 3000);

            $scope.openServico = function (o,index) {
                var i = index;
                var order = $localStorage.getObject('order_close');
                var indice = $localStorage.get('close_index');
                if (order.length!=0){
                    $cart.clear();
                }
                if(indice != null){
                    $cart.clearIndex();
                }
                $localStorage.setObject('order_close',o);
                $localStorage.set('close_index',$stateParams.index);

                console.log('indicio',$stateParams.index);
                $state.go('deliveryman.servicos',{id: o.id,index: $stateParams.index});
            };

            $scope.openProduct= function (o) {
                var order = $localStorage.getObject('order_close');
                var indice = $localStorage.get('close_index');
                if (order.length!=0){
                    $cart.clear();
                }

                if(indice != null){
                    $cart.clearIndex();
                }


                $localStorage.setObject('order_close',o);
                $localStorage.set('close_index',$stateParams.index);
            };
        $scope.goToDeliveryClose = function (o) {
            $ionicPopup.confirm({
                title: 'Atenção',
                template: 'Deseja fechar esta Ordem?'
            }).then(function(res) {
                if(res) {
                    $ionicLoading.show({
                        template: 'Enviando...'
                    });
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

                            var or = {
                                id: $stateParams.id,
                                lat: lat,
                                long: long,
                                close: Sincronizar.dataHojeSql(),
                                items:null,
                                service: o.service,
                                auxiliary:ax.auxiliary,
                                data: Sincronizar.dataHoje()
                            };

                            $cart.addClose(or);
                            $cart.removeOrders($stateParams.index);
                            var qtd = $localStorage.get('qtdOrder');
                            if(qtd > 0){
                                var q = qtd - 1;
                                $localStorage.set('qtdOrder',q);
                            }
                            $ionicLoading.hide();
                            $state.go('deliveryman.order');

                            // DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                            //     status: 2,
                            //     lat: lat,
                            //     long: long,
                            //     service: o.service,
                            //     auxiliary:ax.auxiliary
                            // },function (data) {
                            //     $scope.order = data;
                            //     console.log(data);
                            //     $ionicLoading.hide();
                            //     $state.go('deliveryman.order');
                            // });
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