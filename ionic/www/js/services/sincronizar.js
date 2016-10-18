angular.module('starter.services')
    .factory('Sincronizar',['$cart','$localStorage','DeliverymanOrder','$state','$redirect','$timeout','$ionicLoading'
            ,function ($cart,$localStorage,DeliverymanOrder,$state,$redirect,$timeout,$ionicLoading) {
            return {
                    sincronizar: function () {
                            var read = [];
                            var order = [];
                            var orini = [];

                            if ($cart.getNot().items.length > 0){
                                    read = $cart.getNot().items;
                            }else{
                                    read = null;
                            }


                            if ($cart.getClose().items.length > 0){
                                    order = $cart.getClose().items;
                            }else{
                                    order = null;
                            }

                            if($cart.getInic().items.length > 0){
                                    orini = $cart.getInic().items;
                            }else{
                                    orini = null;
                            }

                            DeliverymanOrder.updateNotification({
                                            notification: read,
                                            order: order,
                                            orini: orini
                                    },function (data) {
                                            console.log(data);
                                            $localStorage.setObject('orders',{items:data.data});
                                            $localStorage.set('qtdOrder',data.data.length);
                                            $cart.clearClose();

                                    });

                            $localStorage.set('sincronizado',this.dataHoje());
                    },
                    getOrders: function () {
                           return DeliverymanOrder.query({
                                    id:null,
                                    orderBy:'created_at',
                                    sortedBy:'asc'
                            },function (data) {
                                    $localStorage.setObject('orders',{items:data.data});
                                    $localStorage.set('qtdOrder',data.data.length);
                            },function (error) {
                                    console.log('error',error);
                            });
                    },
                    getNotification: function () {

                                    DeliverymanOrder.countN({
                                            id: null,
                                            orderBy: 'created_at',
                                            sortedBy: 'asc'
                                    }, function (data) {
                                            $localStorage.setObject('notification', {items: data.data});
                                    });
                    },
                    dataHoje: function () {
                            var data = new Date();
                            var dia = data.getDate();
                            var mes = data.getMonth() + 1;
                            if (dia < 10){
                                    dia = "0" + dia;
                            }
                            if (mes < 10) {
                                    mes = "0" + mes;
                            }
                            var ano = data.getFullYear();
                            var horas = new Date().getHours();
                            if (horas < 10) {
                                    horas = "0" + horas;
                            }
                            var minutos = new Date().getMinutes();
                            if (minutos < 10) {
                                    minutos = "0" + minutos;
                            }
                            var result = dia+"/"+mes+"/"+ano+" - "+horas + "h" + minutos;
                            return result;
                    },
                    countOrder: function () {
                            DeliverymanOrder.count({id:null,status:0},function (data) {
                                    $localStorage.setObject('orders_pendentes_criticas',data[0]);
                            });
                            DeliverymanOrder.countD({id:null,status:0},function (data) {
                                    $localStorage.setObject('orders_pendentes_alta',data[0]);
                            });
                            DeliverymanOrder.countMi({id:null,status:2},function (data) {
                                    $localStorage.setObject('orders_fechadas_mes',data[0]);
                            });
                            DeliverymanOrder.countDi({id:null,status:2},function (data) {
                                    $localStorage.setObject('orders_fechadas_dia',data[0]);
                            });
                    },
                    iniciaOrder: function () {
                            if($cart.getInic().items.length!=0){
                                    var orders = $cart.getInic().items;
                                    for(var i = 0; i < orders.length; i++){
                                            DeliverymanOrder.updateStatus({id: orders[i].id},{
                                                    status:1,
                                                    lat: orders[i].lat,
                                                    long: orders[i].long
                                            });
                                    }
                                    $localStorage.setObject('orders_iniciadas',{items:[]});
                            }
                    },
                    closeOrder: function () {
                            if($cart.getClose().items.length!=0){
                                    var ord = $cart.getClose().items;
                                    for(var i = 0; i < ord.length; i++){
                                            DeliverymanOrder.updateStatus({id: ord[i].id},{
                                                    status:2,
                                                    lat: ord[i].lat,
                                                    long: ord[i].long,
                                                    items: ord[i].items,
                                                    service: ord[i].service,
                                                    auxiliary:ord[i].auxiliary
                                            });
                                    }
                                    $localStorage.setObject('orders_close',{items:[]});
                            }
                    }
            }
}]);