angular.module('starter.services')
    .factory('Product',['$resource','appConfig',function ($resource,appConfig) {

        return $resource(appConfig.baseUrl + '/api/client/product',{},{
            query:{
                isArray: false
            }
        });

    }])

    .factory('Auxiliary',['$resource','appConfig',function ($resource,appConfig) {

        return $resource(appConfig.baseUrl + '/api/deliveryman/auxiliary',{},{
            query:{
                isArray: false
            }
        });

    }]);