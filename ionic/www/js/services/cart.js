angular.module('starter.services')
    .service('$cart',['$localStorage',function ($localStorage) {
        var key = 'cart', cartAux = $localStorage.getObject(key);
        var key1 = 'auxiliar', aux = $localStorage.getObject(key1);
        var key2 = 'orders_update', oax = $localStorage.getObject(key2);
        var key3 = 'order_close', oc = $localStorage.getObject(key3);
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
        this.clear = function () {
            initCart();
            initOc();
        };
        this.get = function () {
            return $localStorage.getObject(key);
        };
        this.getAux = function () {
            return $localStorage.getObject(key1);
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
    }]);