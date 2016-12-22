angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl',[
                  '$scope','$state','$stateParams','DeliverymanOrder','$ionicLoading',
        '$cordovaGeolocation','$ionicPopup','$cart','$localStorage','$order','Sincronizar',
        function ($scope,$state, $stateParams, DeliverymanOrder,$ionicLoading,
                  $cordovaGeolocation,$ionicPopup,$cart,$localStorage,$order,Sincronizar) {
        var item = [];
        $scope.order = [];
        $scope.equipe = [];
        $scope.actions = [];
        $scope.visitors = [];
        $scope.exibir = [];
        $scope.link = "https://google.com/maps/place/";

        console.log($stateParams.index);
        var orders = $localStorage.getObject('orders');
            var message = 'Enviando';
            $ionicLoading.show({
                template: message + ' <ion-spinner></ion-spinner>'
            });
            for (var i=0;i < orders.items.length;i++){
                if (orders.items[i].id == $stateParams.id){
                    $scope.order = orders.items[i];
                    initMarkes($scope.order);
                }
            }

            function initMarkes(order) {
                var address = order.cep + ', ' +
                    order.endereco +',' +
                    order.bairro +', '+
                    order.cidade +' - '+
                    order.estado;
                console.log('address',address);
                $scope.link = "https://google.com/maps/place/"+address;
            }

            if ($scope.order.actions.data.length>0) {
                $scope.actions = $scope.order.actions.data;
            }

            for (var i=0;i < $scope.actions.length;i++){
                    $scope.visitors[i] = $scope.actions[i];
            }
            if ($scope.visitors.length <= 0) {
                $scope.exibir = 1;
            } else {
                $scope.exibir = 0;
            }
            $ionicLoading.hide();

        $scope.goToOrder = function () {
            $ionicPopup.confirm({
                title: 'Atenção',
                template: 'Cliente não se encontra?'
            }).then(function(res) {
                if(res) {
                    $ionicLoading.show({
                        template: '<ion-spinner></ion-spinner><br> Aguarde'
                    });
                    var posOptions = {timeout: 30000, enableHighAccuracy: true, maximumAge: 0};

                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;

                            var item = {
                                id: $stateParams.id,
                                lat: lat,
                                long:long,
                                status: 0,
                                data: Sincronizar.dataHoje()
                            };
                            $cart.addVisitas(item);
                            $state.go('deliveryman.order');

                        }, function(err) {
                            // error
                            $ionicLoading.hide();
                        });
                } else {
                    $ionicLoading.hide();
                }
            });
        };

        $scope.goToDelivery = function (o,i) {

                $ionicPopup.confirm({
                    title: 'Atenção',
                    template: 'Deseja iniciar esta Ordem?',
                    cssClass: 'animated fadeInDown'

                }).then(function(res) {
                    if(res) {
                        $ionicLoading.show({
                            template: '<ion-spinner></ion-spinner><br> Aguarde'
                        });
                        var posOptions = {timeout: 30000, enableHighAccuracy: true, maximumAge: 0};

                        $cordovaGeolocation
                            .getCurrentPosition(posOptions)
                            .then(function (position) {
                                var lat = position.coords.latitude;
                                var long = position.coords.longitude;
                                $cart.updateStatus($stateParams.index,'Iniciada');
                                var item = {
                                    id: $stateParams.id,
                                    lat: lat,
                                    long:long,
                                    status: 1,
                                    inic: Sincronizar.dataHojeSql(),
                                    data: Sincronizar.dataHoje()
                                };
                                $cart.addIni(item);
                                $state.go('deliveryman.view_close', {id: $scope.order.id,index:i});
                            }, function(err) {
                                // error
                                $ionicLoading.hide();
                            });
                    }else {
                        $ionicLoading.hide();
                    }
                });
            };
            $scope.giveBack = function () {
               $ionicPopup.confirm({
                    title: 'Atenção',
                    template: 'Deseja devolver esta Ordem?',
                    cssClass: 'animated fadeInDown'
                }).then(function(res) {
                    if(res) {

                        $ionicLoading.show({
                            template: '<ion-spinner></ion-spinner><br> Aguarde'
                        });
                        var posOptions = {timeout: 30000, enableHighAccuracy: true, maximumAge: 0};
                        $cordovaGeolocation
                            .getCurrentPosition(posOptions)
                            .then(function (position) {
                                var lat = position.coords.latitude;
                                var long = position.coords.longitude;

                                console.log(lat,long);
                                item = {
                                    id:$stateParams.id,
                                    lat:lat,
                                    long:long,
                                    status:3,
                                    data: Sincronizar.dataHoje()
                                };
                                $cart.addDevol(item);
                                $cart.removeOrders($stateParams.index);
                                var qtd = $localStorage.get('qtdOrder');
                                if(qtd > 0){
                                    var q = qtd - 1;
                                    $localStorage.set('qtdOrder',q);
                                }
                                $ionicLoading.hide();
                                $state.go('deliveryman.order');
                            }, function(err) {
                                // error
                                $ionicLoading.hide();
                            });
                    }else {
                        $ionicLoading.hide();
                    }
                });
            };
    }]);