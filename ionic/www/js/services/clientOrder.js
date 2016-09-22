angular.module('starter.services')
    .factory('ClientOrder',['$resource','appConfig',function ($resource,appConfig) {
        var url = appConfig.baseUrl + '/api/client/order/:id';
        return $resource(url,{id:'@id'},{
            query:{
                isArray: false
            }
        });
    }])
    .factory('DeliverymanOrder',['$resource','appConfig','$localStorage',function ($resource,appConfig,$localStorage) {
        var url = appConfig.baseUrl + '/api/deliveryman/order/:id';

        return $resource(url,{id:'@id'},{
            query:{
                isArray: false
            },
            updateStatus:{
                method: 'PATCH',
                url: url + '/update-status'
            },
            geo:{
                method: 'POST',
                url: url + '/geo'
            },
            count:{
                method: 'GET',
                url: appConfig.baseUrl +'/api/deliveryman/count'
            },
            countD:{
                method: 'GET',
                url: appConfig.baseUrl +'/api/deliveryman/countD'
            }
            ,countMi:{
                method: 'GET',
                url: appConfig.baseUrl +'/api/deliveryman/countMi'
            },
            countDi:{
                method: 'GET',
                url: appConfig.baseUrl +'/api/deliveryman/countDi'
            },
            get:{
                method: 'GET',
                url: appConfig.baseUrl +'/api/notification'
            }
        });

    }]);