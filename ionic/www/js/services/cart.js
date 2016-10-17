angular.module('starter.services')
    .service('$cart',['$localStorage',function ($localStorage) {
        var key = 'cart', cartAux = $localStorage.getObject(key);
        var key1 = 'auxiliar', aux = $localStorage.getObject(key1);
        var key2 = 'orders_update', oax = $localStorage.getObject(key2);
        var key3 = 'order_close', oc = $localStorage.getObject(key3);
        var key4 = 'login', log = $localStorage.getObject(key4);
        var key5 = 'orders', orders = $localStorage.getObject(key5);
        var key6 = 'notification', notification = $localStorage.getObject(key6);
        var key7 = 'notification_read', notificationread = $localStorage.getObject(key7);
        var key8 = 'sincronizado', sinc = $localStorage.get(key8);
        var key9 = 'orders_iniciadas', inic = $localStorage.get(key9);
        if(!cartAux){
            initCart();
        }
        if(!aux){
            initAux();
        }
        if(!oax){
            initOx();
        }
        if(!oc){
            initOc();
        }
        if(!log){
            initLogin();
        }
        if(!orders){
            initOrders();
        }
        if(!notification){
            initNot();
        }
        if(!notificationread){
            initNotRead();
        }
        if(!sinc){
            initSinc();
        }
        if(!inic){
            initInic();
        }

        this.clear = function () {
            initCart();
            initOc();
            initOx();
        };
        this.clearOrder = function () {
            initOrders();
            initLogin();
            initNot();
        };

        this.clearNotification = function () {
            initNotRead();
        };
        this.get = function () {
            return $localStorage.getObject(key);
        };
        this.getAux = function () {
            return $localStorage.getObject(key1);
        };
        this.getNotification = function () {
            return $localStorage.getObject(key6);
        };
        this.getNot = function () {
            return $localStorage.getObject(key7);
        };

        //get orders
        this.getInic = function () {
            return $localStorage.getObject(key9);
        };
        this.getClose = function () {
            return $localStorage.getObject(key3);
        };
        this.getOrder = function () {
            return $localStorage.getObject(key5);
        };
        this.getItem = function (i) {
            return this.get().items[i];
        };
        this.addItem = function (item) {
            var cart = this.get(), itemAux, exists = false;
            for (var index in cart.items){
                itemAux = cart.items[index];
                if (itemAux.id == item.id){
                    itemAux.serial = item.serial;
                    itemAux.subTotal = calculateSubtotal(itemAux);
                    exists = true;
                    break;
                }
            }
            if (!exists){
                cart.items.push(item);
            }
            $localStorage.setObject(key,cart);
        };
        //auxiliares
        this.addAux = function (item) {
            var cart = this.getAux(), itemAux, exists = false;
            for (var index in cart.auxiliar){
                itemAux = cart.auxiliar[index];
                if (itemAux.id == item.id){
                    exists = true;
                    break;
                }
            }
            if (!exists){
                cart.auxiliar.push(item);
            }
            $localStorage.setObject(key1,cart);
        };

        //notification
        this.addNot = function (item,o) {
            var cart = this.getNot(), itemAux, exists = false;
            for (var index in cart.items){
                itemAux = cart.items[index];
                if (itemAux.id == item.id){
                    itemAux.confirmation = o;
                    exists = true;
                    break;
                }
            }
            if (!exists){
                cart.items.push(item);
            }
            $localStorage.setObject(key7,cart);
        };
        //notificationConf
        this.addIni = function (item) {
            var cart = this.getInic(), itemAux, exists = false;
            for (var index in cart.items){
                itemAux = cart.items[index];
                if (itemAux.id == item.id){
                    exists = true;
                    break;
                }
            }
            if (!exists){
                cart.items.push(item);
            }
            $localStorage.setObject(key9,cart);
        };

        this.addClose = function (item) {
            var cart = this.getClose(), itemAux, exists = false;
            for (var index in cart.items){
                itemAux = cart.items[index];
                if (itemAux.id == item.id){
                    exists = true;
                    break;
                }
            }
            if (!exists){
                cart.items.push(item);
            }
            $localStorage.setObject(key3,cart);
        };
        this.removeAux = function (i) {
            var aux = this.getAux();
            aux.auxiliar.splice(i,1);
            $localStorage.setObject(key1,aux);
        };
        this.removeItem = function (i) {
            var cart = this.get();
            cart.items.splice(i,1);
            cart.total = getTotal(cart.items);
            $localStorage.setObject(key,cart);
        };

        this.removeNotification = function (i) {
            var cart = this.getNotification();
            cart.items.splice(i,1);
            $localStorage.setObject(key6,cart);
        };


        this.removeOrders = function (i) {
            var cart = this.getOrder();
            cart.items.splice(i,1);
            $localStorage.setObject(key5,cart);
        };

        this.updateStatus = function(i, status){
            var cart = this.getOrder(),
                itemAux = cart.items[i];

            itemAux.status = status;
            $localStorage.setObject(key5,cart);
        };

        this.updateSerial = function(i, serial){
            var cart = this.get(),
                itemAux = cart.items[i];
            itemAux.serial = serial;
            $localStorage.setObject(key,cart);
        };

        this.setCupom = function (code,value) {
            var cart = this.get();
            cart.cupom = {
                code: code,
                value: value
            };
            $localStorage.setObject(key,cart);
        };


        this.removeCupom = function () {
            var cart = this.get();
            cart.cupom = {
                code:null,
                value:null
            };
            $localStorage.setObject(key,cart);

        };


        function calculateSubtotal(item) {
            return item.price * item.qtd;
        }
        
        function getTotal(items) {
            var sum = 0;
            angular.forEach(items,function (item) {
                sum += item.subTotal;
            });
            return sum;
        }
        
        function initCart() {
            $localStorage.setObject(key,{
                items:[]
            });
        }

        function initAux() {
            $localStorage.setObject(key1,{
                auxiliar:[]
            });
        }

        function initOx() {
            $localStorage.setObject(key2,{
                items:[]
            });
        }

        function initOc() {
            $localStorage.setObject(key3,{
                items:[]
            });
        }

        function initLogin() {
            $localStorage.setObject(key4,null);
        }

        function initOrders() {
            $localStorage.setObject(key5,{
                items:[]
            });
        }

        function initNot() {
            $localStorage.setObject(key6,{
                items:[]
            });
        }

        function initNotRead() {
            $localStorage.setObject(key7,{
                items:[]
            });
        }

        function initSinc() {
            $localStorage.set(key8,
               '10/10/2016 15h00');
        }

        function initInic() {
            $localStorage.setObject(key9,{
                items:[]
            })
        }
    }]);