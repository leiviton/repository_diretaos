angular.module('starter.controllers')
    .controller('DeliverymanServicoCtrl',[
        '$scope','$state','$stateParams','$cart','ClientOrder',
        '$ionicLoading','$ionicPopup','Cupom','$cordovaBarcodeScanner',
        'User','$localStorage','DeliverymanOrder','$cordovaGeolocation','$ionicHistory','ionicToast','Sincronizar','$ionicModal',
        function ($scope,$state,$stateParams,$cart,ClientOrder,
                  $ionicLoading,$ionicPopup,Cupom,$cordovaBarcodeScanner,
                  User,$localStorage,DeliverymanOrder,$cordovaGeolocation,$ionicHistory,ionicToast,Sincronizar,$ionicModal) {

            $scope.checked_sAla = false;
            $scope.checked_sSen = false;
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });

            $scope.createServico = function(u) {
                var obj = {};

                var value_servico = '';
                var var_servico = $localStorage.get('var_servico');

                console.log(u);

                if(u.ajustar==true){
                    value_servico+='A';
                }
                if(u.cadastrar==true){
                    value_servico+='B';
                }
                if(u.configurar==true){
                    value_servico+='C';
                }
                if(u.desativar==true){
                    value_servico+='D';
                }
                if(u.instalar==true){
                    value_servico+='E';
                }
                if(u.oustrosServicos==true){
                    value_servico+='F';
                }
                if(u.recuperar==true){
                    value_servico+='G';
                }
                if(u.revisar==true){
                    value_servico+='H';
                }
                if(u.reparar==true){
                    value_servico+='I';
                }
                if(u.refazer==true){
                    value_servico+='J';
                }
                if(u.reconfigurar==true){
                    value_servico+='L';
                }
                if(u.reinstalar==true){
                    value_servico+='M';
                }
                if(u.retirar==true){
                    value_servico+='N';
                }
                if(u.substituir==true){
                    value_servico+='O';
                }
                if(u.testar==true){
                    value_servico+='P';
                }
                if(u.treinar==true){
                    value_servico+='Q';
                }


                console.log(value_servico);




                if (var_servico=='S_ALA') {
                    obj = {
                        "S_ALA":value_servico
                    };


                    $scope.checked_sAla = true;

                }else if(var_servico=='S_SEN'){
                    obj = {
                        "S_SEN":value_servico
                    };
                    $scope.checked_sSen = true;
                }else if(var_servico=='S_COM'){
                    obj = {
                        "S_COM":value_servico
                    };
                    $scope.checked_sCom = true;
                }else if(var_servico=='S_MON'){
                    obj = {
                        "S_MON":value_servico
                    };
                    $scope.checked_sMon = true;
                }else if(var_servico=='S_BAT'){
                    obj = {
                        "S_BAT":value_servico
                    };
                    $scope.checked_sBat = true;
                }else if(var_servico=='S_BATS'){
                    obj = {
                        "S_BATS":value_servico
                    };
                    $scope.checked_sBats = true;
                }else if(var_servico=='S_SIR'){
                    obj = {
                        "S_SIR":value_servico
                    };
                    $scope.checked_sSir = true;
                }else if(var_servico=='S_MOD'){
                    obj = {
                        "S_MOD":value_servico
                    };
                    $scope.checked_sMod = true;
                }else if(var_servico=='S_DISP'){
                    obj = {
                        "S_DISP":value_servico
                    };
                    $scope.checked_sDisp = true;
                }else if(var_servico=='S_SENHA'){
                    obj = {
                        "S_SENHA":value_servico
                    };
                    $scope.checked_sSenha = true;
                }else if(var_servico=='S_ENE'){
                    obj = {
                        "S_ENE":value_servico
                    };
                    $scope.checked_sEne = true;
                }else if(var_servico=='S_CABO'){
                    obj = {
                        "S_CABO":value_servico
                    };
                    $scope.checked_sCabo = true;
                }else if(var_servico=='S_OUTA'){
                    obj = {
                        "S_OUTA":value_servico
                    };
                    $scope.checked_sOuta = true;
                }else if(var_servico=='S_CAM'){
                    obj = {
                        "S_CAM":value_servico
                    };
                    $scope.checked_sCam = true;
                }else if(var_servico=='S_CAMV'){
                    obj = {
                        "S_CAMV":value_servico
                    };
                    $scope.checked_sCamv = true;
                }else if(var_servico=='S_GRAV'){
                    obj = {
                        "S_GRAV":value_servico
                    };
                    $scope.checked_sGrav = true;
                }else if(var_servico=='S_ACE'){
                    obj = {
                        "S_ACE":value_servico
                    };
                    $scope.checked_sAce = true;
                }else if(var_servico=='S_STAND'){
                    obj = {
                        "S_STAND":value_servico
                    };
                    $scope.checked_sStand = true;
                }else if(var_servico=='S_HASTE'){
                    obj = {
                        "S_HASTE":value_servico
                    };
                    $scope.checked_sHaste = true;
                }else if(var_servico=='S_MOLA'){
                    obj = {
                        "S_MOLA":value_servico
                    };
                    $scope.checked_sMola = true;
                }else if(var_servico=='S_FIO'){
                    obj = {
                        "S_FIO":value_servico
                    };
                    $scope.checked_sFio = true;
                }else if(var_servico=='S_RADIO'){
                    obj = {
                        "S_RADIO":value_servico
                    };
                    $scope.checked_sRadio = true;
                }else if(var_servico=='S_RADIOO'){
                    obj = {
                        "S_RADIOO":value_servico
                    };
                    $scope.checked_sRadioo = true;
                }else if(var_servico=='S_FIBRA'){
                    obj = {
                        "S_FIBRA":value_servico
                    };
                    $scope.checked_sFibra = true;
                }else if(var_servico=='S_FIBRAO'){
                    obj = {
                        "S_FIBRAO":value_servico
                    };
                    $scope.checked_sFibra = true;
                }

                $cart.addServicos(var_servico,obj);

                for(var i in u){
                    u[i] = false;
                }
               
                 $cart.limpaVarServico();
                
                $scope.modal.hide();
            };

            $scope.openModal = function(ser) {
               

                $cart.addVarServicos(ser);
                $scope.modal.show();
            };

            $scope.goToDeliveryClose = function () {
                $ionicPopup.confirm({
                    title: 'Atenção',
                    template: 'Deseja fechar esta Ordem?'
                }).then(function(res) {
                    $ionicLoading.show({
                        template: '<ion-spinner></ion-spinner><br> Aguarde ...'
                    });

                    if(res) {


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

                                    var v = {veiculos: angular.copy($scope.veiculo)};

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
                                        servicos: s.servicos,
                                        veiculo: v.veiculos
                                    };

                                    $cart.addClose(or);
                                    $cart.removeOrders(indice);

                                    var qtd = $localStorage.get('qtdOrder');

                                    if(qtd > 0){
                                        var q = qtd - 1;
                                        $localStorage.set('qtdOrder',q);
                                    }
                                    $ionicLoading.hide();

                                    ionicToast.show('Ordem fechada com sucesso', 'top', false, 3500);
                                    $cart.clear();
                                    $cart.clearIndex();
                                    $ionicHistory.clearHistory();
                                    $ionicHistory.nextViewOptions({
                                        disableBack: true,
                                        historyRoot: true
                                    });
                                    $state.go('deliveryman.order');
                                    console.log(ax);
                                }, function(err) {
                                    $ionicLoading.hide();
                                });

                    } else {
                        $ionicLoading.hide();
                    }
                });
            };
        }]);
