angular.module("AsifHayir").factory('DonationsService', function($http, $q) {
    return {
        flatDonationWithProducts: function (givaway, productsIdsOptional) {
            var donations = [];

            givaway.products.forEach((product, index) => {
                if (!productsIdsOptional || (productsIdsOptional && 
                    productsIdsOptional.indexOf(product._id) != -1)) {

                    var donation = angular.copy(givaway);
                    delete donation.products;
                    donation.product = product;
                    donations.push(donation);
                }
            });

            return donations;
        },
        getDonations: function() {
            // TODO
            return $http.get('/giveaways');

            // var deferred = $q.defer();
            // var donations = [
                
            //     // image	url	                
            //     // pickupTime	PickupTim
            //     {
            //         _id: 1,
            //         includeInAlgorithm: true,
            //         contactName: "עמית קנדלר",
            //         contactPhone: "0525310385",
            //         title: "חלב",
            //         type: 0,
            //         address: {
            //             location:{
            //                 coordinates: [31.95906228990288,34.77139596361667]
            //             },
            //             city: "הרצליה",
            //             streetName: "חנה סנש",
            //             houseNumber: "1",
            //             aptNumber: "13",
            //             isBuisness: true
            //         },
            //         pickupTime: {
            //             isAllDay: true
            //         },
            //         description: "חלב 3%",
            //         status: "חדש",
            //         advanced: {
            //             isPacked: true,
            //             isHot: false,
            //             kosher: true,
            //             amount: 3,
            //             amountType: 2
            //         }
            //     },
            //     {
            //         _id: 2,
            //         includeInAlgorithm: true,
            //         contactName: "מאי דרורי",
            //         contactPhone: "0525310388",
            //         title: "חולצות",
            //         type: 1,
            //         address: {
            //             location:{
            //                 coordinates: [32.013013644060564,34.7459377348423]
            //             },
            //             city: "אורנית",
            //             streetName: "השיטה",
            //             houseNumber: "34",
            //             aptNumber: "0",
            //             isBuisness: false
            //         },
            //         pickupTime: {
            //             isAllDay: false,
            //             start: "08:00",
            //             end: "22:00"
            //         },
            //         description: "חולצות ארוכות",
            //         status: "חדש",
            //         advanced: {
            //             condition: "חדש",
            //             type: "נשים",
            //             amount: 3,
            //             amountType: 0
            //         }
            //     },
            //     {
            //         _id: 3,
            //         includeInAlgorithm: true,
            //         contactName: "צופן מזרחי",
            //         contactPhone: "0525320388",
            //         title: "שולחן כתיבה",
            //         type: 2,
            //         address: {
            //             location:{
            //                 coordinates: [32.017962429354704,34.79571953415871]
            //             },
            //             city: "רמת גן",
            //             streetName: "בן גוריון",
            //             houseNumber: "5",
            //             aptNumber: "0",
            //             isBuisness: true
            //         },
            //         pickupTime: {
            //             isAllDay: false,
            //             start: "08:00",
            //             end: "12:00"
            //         },
            //         description: "",
            //         status: "חדש",
            //         advanced: {
            //             condition: "בלוי",
            //             amount: 1,
            //             amountType: 0
            //         }
            //     }
            // ];
            // deferred.resolve(donations);
            // return deferred.promise;   
        },
        getDonationsByIds: function(ids) {

            // TODO
            return $http.post('/getGiveawaysByIds', ids);

            // var deferred = $q.defer();
            // var donations = [
                
            //     // image	url	                
            //     // pickupTime	PickupTim
            //     {
            //         _id: 1,
            //         includeInAlgorithm: true,
            //         contactName: "שמנצלר",
            //         contactPhone: "0525310385",
            //         title: "פיתות",
            //         type: 0,
            //         address: {
            //             location:{
            //                 coordinates: [31.95906228990288,34.77139596361667]
            //             },
            //             city: "הרצליה",
            //             streetName: "חנה סנש",
            //             houseNumber: "1",
            //             aptNumber: "13",
            //             isBuisness: true
            //         },
            //         pickupTime: {
            //             isAllDay: true
            //         },
            //         description: "אחלה פיתות",
            //         status: "חדש",
            //         advanced: {
            //             isPacked: true,
            //             isHot: false,
            //             kosher: true,
            //             amount: 10,
            //             amountType: 1
            //         }
            //     },
            //     {
            //         _id: 2,
            //         includeInAlgorithm: true,
            //         contactName: "מאי דרורי",
            //         contactPhone: "0525310388",
            //         title: "כל מיני בגדים",
            //         type: 1,
            //         address: {
            //             location:{
            //                 coordinates: [32.013013644060564,34.7459377348423]
            //             },
            //             city: "אורנית",
            //             streetName: "השיטה",
            //             houseNumber: "34",
            //             aptNumber: "0",
            //             isBuisness: false
            //         },
            //         pickupTime: {
            //             isAllDay: false,
            //             start: "08:00",
            //             end: "22:00"
            //         },
            //         description: "אחלה מכנסיים",
            //         status: "חדש",
            //         advanced: {
            //             condition: "חדש",
            //             type: "נשים",
            //             amount: 3,
            //             amountType: 0
            //         }
            //     },
            //     {
            //         _id: 3,
            //         includeInAlgorithm: true,
            //         contactName: "צופן מזרחי",
            //         contactPhone: "0525320388",
            //         title: "שולחן כתיבה",
            //         type: 2,
            //         address: {
            //             location:{
            //                 coordinates: [32.017962429354704,34.79571953415871]
            //             },
            //             city: "רמת גן",
            //             streetName: "בן גוריון",
            //             houseNumber: "5",
            //             aptNumber: "0",
            //             isBuisness: true
            //         },
            //         pickupTime: {
            //             isAllDay: false,
            //             start: "08:00",
            //             end: "12:00"
            //         },
            //         description: "",
            //         status: "חדש",
            //         advanced: {
            //             condition: "בלוי",
            //             amount: 1,
            //             amountType: 0
            //         }
            //     }
            // ];
            // deferred.resolve(donations);
            // return deferred.promise;  
        }
        // planRoute: function (donations, vehiclesAmount) {
        //     // return $http.post('/planRoute', {
        //     //     donations: donations,
        //     //     vehiclesAmount: vehiclesAmount
        //     // }); 

        //     // TODO
        //     var deferred = $q.defer();
        //     var route = {
        //         _id: 1,
        //         date: "10.1.2018",
        //         organizationId: 1,
        //         paths: [{
        //             vehicleId: 1,
        //             donations: [1,2]
        //         },
        //         {
        //             vehicleId: 2,
        //             donations: [3,4]
        //         }]
        //     };
        //     deferred.resolve(route);
        //     return deferred.promise;   
        // }
    };
});