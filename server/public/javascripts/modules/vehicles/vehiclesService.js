angular.module("AsifHayir").factory('VehiclesService', function($http, $q) {
    return {
        getVehicles: function() {
            // TODO
            return $http.get('/getVehicles')

            // // TODO
            // var deferred = $q.defer();
            // var vehicles = [
            //     {
            //         _id: 1,
            //         number: 7973155,
            //         type: "tender",
            //         capacity: 20,
            //         image: "https://www.cstatic-images.com/car-pictures/main/USC50FOT113A021001.png"
                    
            //     },
            //     {
            //         _id: 2,
            //         number: 3163258,
            //         type: "hyundai i20",
            //         capacity: 10,
            //         image: "http://www.kia.com/content/dam/kwcms/kme/uk/en/assets/static/gnb/kia-niro-512x288-11.png"
            //     },
            //     {
            //         _id: 3,
            //         number: 9856896,
            //         type: "ford focus",
            //         capacity: 15,
            //         image: "https://www.fordeumedia-b.ford.com/nas/gforcenaslive/gbr/00l/yyh/images/gbr00lyyh1j52lp(a)(a)cozshowroom_0_0.png"
            //     },
            //     {
            //         _id: 4,
            //         number: 9856896,
            //         type: "mazda 2",
            //         capacity: 15                
            //     },
            //     {
            //         _id: 5,
            //         number: 7973155,
            //         type: "tender",
            //         capacity: 20,
            //         image: "https://www.mazda.co.nz/sites/default/files/MDZ3986_Mazda2_GLX_HATCH_Snowflake%20Pearl%20White%20Mica_Front_0.png"                          
            //     }
            // ];
            // deferred.resolve(vehicles);
            // return deferred.promise;
        },
        addVehicle: function(vehicle) {
            return $http.post('/addVehicle', vehicle);
        },
        updateVehicle: function(vehicle) {
            return $http.put(`/updateVehicle/${vehicle._id}`, vehicle);
        },
        deleteVehicle: function(vehicleId) {
            return $http.delete(`/deleteVehicle/${vehicleId}`);
        }
    };
});