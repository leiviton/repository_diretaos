angular.module('starter.services')
    .factory('UserData',['$localStorage','User','OAuth','OAuthToken','$state','$ionicLoading','$ionicPopup','DeliverymanOrder',
        function ($localStorage,User,OAuth,OAuthToken,$state,$ionicLoading,$ionicPopup,DeliverymanOrder) {
        var key = 'user';
        return {
            set: function (value) {
                return $localStorage.setObject(key,value);
            },
            get: function () {
                return $localStorage.getObject(key);
            },
            login: function (o) {
                $ionicLoading.show({
                    template: 'Aguarde'
                });
                var promise = OAuth.getAccessToken(o);
                $localStorage.setObject('login',o);
                promise

                    .then(function (data) {
                        return User.authenticated({include:'client'}).$promise;
                    })
                    .then(function (data) {
                        DeliverymanOrder.query({
                            id:null,
                            orderBy:'created_at',
                            sortedBy:'asc'
                        },function (result) {
                            console.log('result',result);
                            if(result.data!=null){
                                /*for (var i=0;i<result.data.length;i++){
                                    orderFactory.insert(result.data[i]);
                                    var o = result.data[i];
                                    var query = "INSERT INTO dados_orders (id,user_id,status,service,defect,number_os_sise,priority,name,phone1,phone2,type,address,address_number,district,city,state,plano,id_plano) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                                    var values = [o.id,o.user_id,o.status,o.service,o.defect,o.number_os_sise,o.priority,o.name,o.phone1,o.phone2,o.type,o.address,o.address_number,o.district,o.city,o.state,o.plano,o.id_plano];
                                    $cordovaSQLite.execute(db, query, values)
                                        .then(
                                            function(res) {
                                                console.log('INSERTED ID: '+res.insertId);
                                            },
                                            function(err) {
                                                console.log('ERROR: '+err.message);
                                            }
                                        );
                                }*/
                            }

                        });
                        $localStorage.setObject(key,data.data);
                        if (data.data.role=='client'){
                            $ionicLoading.hide();
                            $state.go('client.checkout');
                        }else{
                            $ionicLoading.hide();
                            $state.go('deliveryman.home');
                        }
                },function (responseError) {
                    $localStorage.setObject(key,null);
                    OAuthToken.removeToken();
                    var login = $localStorage.getObject('login');
                    if(login==null){
                        $ionicPopup.alert({
                            title:'Advertência',
                            template:'Usuário e/ou senha inválidos'
                        });
                    }else{
                        $state.go('deliveryman.home');
                    }
                    $ionicLoading.hide();
                    console.debug(responseError);
                });
            }
        }
    }]);