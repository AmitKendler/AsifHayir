angular.module("AsifHayir").factory('RoutesService', function($http, $q) {
    return {
        getRoutes: function() {
            // TODO
            // return $http.get('/routes');

            var deferred = $q.defer();
            var routes = [
                {
                    _id: 1,
                    date: "10.1.2018",
                    organizationId: 1,
                    paths: [{
                        vehicleId: 1,
                        driver: 1,
                        helper: 2,
                        donations: [1,2]
                    },
                    {
                        vehicleId: 2,
                        driver: 3,
                        helper: 4,
                        donations: [3,4]
                    }]
                },
                {
                    _id: 2,
                    date: "12.1.2018",
                    organizationId: 1,                
                    paths: [{
                        vehicleId: 1,
                        driver: 3,
                        helper: 4,
                        donations: [1,2]
                    },
                    {
                        vehicleId: 2,
                        driver: 2,
                        helper: 1,
                        donations: [3,4]
                    }]
                }
            ];
            deferred.resolve(routes);
            return deferred.promise;    
        }
    };
});