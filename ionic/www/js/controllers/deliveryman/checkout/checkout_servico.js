angular.module('starter.controllers')
    .controller('DeliverymanCheckoutServicoCtrl',[
        '$scope','$state','$stateParams','$cart','ClientOrder',
        '$ionicLoading','$ionicPopup','Cupom','$cordovaBarcodeScanner',
        'User','$localStorage','DeliverymanOrder','$cordovaGeolocation','ionicToast','Sincronizar',
        function ($scope,$state,$stateParams,$cart,ClientOrder,
                  $ionicLoading,$ionicPopup,Cupom,$cordovaBarcodeScanner,
                  User,$localStorage,DeliverymanOrder,$cordovaGeolocation,ionicToast,Sincronizar) {

            var indice = $localStorage.get('close_index');

            $scope.validation = 0;

            $scope.servico = $localStorage.getObject('servicos');

            var aux = $cart.getAux();
            if(aux.auxiliar.length == 0 || aux.auxiliar==null){
                aux.auxiliar = null;
                $scope.auxiliary = aux.auxiliar;
            }else {
                $scope.auxiliary = aux.auxiliar;
            }
            var orders = $localStorage.getObject('order_close');
            console.log(orders);
            var cart = $cart.get();
            console.log('cart',cart);
            $scope.items = cart.items;

            $scope.order = [];

            for (var i=0;i < orders.length;i++){
                if (orders[i].id == $stateParams.id){
                    $scope.order = orders[i];
                }
            }
            console.log($stateParams.id);
            $scope.removeItem = function (i) {
                $cart.removeItem(i);
                $scope.items.splice(i,1);
            };

            $scope.salvarServicos = function (servico) {
                var ser = {
                    'S_ALA': servico.S_ALA,
                    'S_SEN': servico.S_SEN,
                    'S_COM': servico.S_COM,
                    'S_MON': servico.S_MON,
                    'S_BAT': servico.S_BAT,
                    'S_BATS': servico.S_BATS,
                    'S_SIR': servico.S_SIR,
                    'S_MOD': servico.S_MOD,
                    'S_DISP': servico.S_DISP,
                    'S_SENHA': servico.S_SENHA,
                    'S_ENE': servico.S_ENE,
                    'S_CABO': servico.S_CABO,
                    'S_OUTA': servico.S_OUTA,
                    'S_CAMV': servico.S_CAMV,
                    'S_GRAV': servico.S_GRAV,
                    'S_ACE': servico.S_ACE,
                    'S_STAND': servico.S_STAND,
                    'S_CERCA': servico.S_CERCA,
                    'S_HASTE': servico.S_HASTE,
                    'S_MOLA': servico.S_MOLA,
                    'S_FIO': servico.S_FIO,
                    'S_RADIO': servico.S_RADIO,
                    'S_RADIOO': servico.S_RADIOO,
                    'S_FIBRA': servico.S_FIBRA,
                    'S_FIBRAO': servico.S_FIBRAO,
                    'S_LBRA1': servico.S_LBRA1,
                    'S_BRA1': servico.S_BRA1,
                    'S_LBRA2': servico.S_LBRA2,
                    'S_BRA2': servico.S_BRA2,
                    'S_LBRA3': servico.S_LBRA3,
                    'S_BRA3': servico.S_BRA3,
                    'S_LBRA4': servico.S_LBRA4,
                    'S_BRA4': servico.S_BRA4,
                    'S_LBRA5': servico.S_LBRA5,
                    'S_BRA5': servico.S_BRA5
                };

                $cart.addServicos(ser);

                var o = $localStorage.getObject('order_close');

                switch (o.type) {
                    case 1:
                        $state.go('deliveryman.checkout_fibra', {id: o.id, index: $stateParams.index});
                        break;
                    case 2:
                        $state.go('deliveryman.checkout_radio', {id: o.id, index: $stateParams.index});
                        break;
                    case 3:
                        $state.go('deliveryman.checkout_seguranca', {id: o.id, index: $stateParams.index});
                        break;
                    case 4:
                        $state.go('deliveryman.checkout_fibra', {id: o.id, index: $stateParams.index});
                        break;
                    case 5:
                        $state.go('deliveryman.checkout_radio', {id: o.id, index: $stateParams.index});
                        break;
                    case 6:
                        $state.go('deliveryman.checkout_radio', {id: o.id, index: $stateParams.index});
                        break;
                    default:
                        $localStorage.setObject('order_close', null);
                        $ionicPopup.alert({
                            title: 'Informação',
                            template: 'Ocorreu um erro, tente novamente'
                        });
                }
            };


            $scope.goToDeliveryClose = function () {
                $ionicPopup.confirm({
                    title: 'Atenção',
                    template: 'Deseja fechar esta Ordem?'
                }).then(function(res) {
                    $ionicLoading.show({
                        template: 'Enviando...'
                    });

                    if(res) {
                        var v = $cart.get().items;
                        for (var i=0;i<v.length;i++){
                            if(v[i].serial==null || v[i].serial==''){
                                $scope.validation = $scope.validation + 1;
                            }
                        }

                        if (v.length==0){
                            $ionicLoading.hide();
                            ionicToast.show('Voce não adicionou produtos a ordem', 'middle', false, 3500);

                        }else if ($scope.validation>0){
                            $ionicLoading.hide();
                            ionicToast.show('Voce não adicionou serial em todos os produtos', 'middle', false, 3500);


                        }else if($scope.validation==0){
                            var posOptions = {timeout: 30000, enableHighAccuracy: true, maximumAge: 0};

                            $cordovaGeolocation
                                .getCurrentPosition(posOptions)
                                .then(function (position) {
                                    var lat = position.coords.latitude;
                                    var long = position.coords.longitude;

                                    console.log(lat,long);

                                    var  o = {items: angular.copy($scope.items)};
                                    angular.forEach(o.items,function (item) {
                                        item.product_id = item.id;
                                    });

                                    var  s = {servicos: angular.copy($scope.servico)};

                                    var  ax = {auxiliary: angular.copy($scope.auxiliary)};
                                    console.log('o',o);
                                    angular.forEach(ax.auxiliary,function (item) {
                                        item.auxiliary_id = item.id;
                                    });
                                    console.log(ax);
                                    var or = {
                                        id: $stateParams.id,
                                        lat: lat,
                                        long: long,
                                        service: orders.service,
                                        items: o.items,
                                        auxiliary:ax.auxiliary,
                                        status: 2,
                                        close: Sincronizar.dataHojeSql(),
                                        data: Sincronizar.dataHoje(),
                                        servicos: s.servicos
                                    };

                                    $cart.addClose(or);
                                    $cart.removeOrders(indice);
                                    var qtd = $localStorage.get('qtdOrder');

                                    if(qtd > 0){
                                        var q = qtd - 1;
                                        $localStorage.set('qtdOrder',q);
                                    }
                                    $ionicLoading.hide();
                                    $state.go('deliveryman.checkout_successful');
                                    console.log(ax);
                                }, function(err) {
                                    $ionicLoading.hide();
                                });
                        }
                    } else {
                        $ionicLoading.hide();
                    }
                });
            };
        }]);
