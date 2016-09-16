angular.module('starter.services')
    .factory('DeliverymanOrder',['$resource','appConfig',function ($resource,appConfig) {
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
            }
        });

    }]);
