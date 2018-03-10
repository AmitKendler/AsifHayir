angular.module("AsifHayir").factory('DonationsService', function($http, $q) {
    return {
        getDonations: function() {
            // TODO
            // return $http.get('/donations');

            var deferred = $q.defer();
            var donations = [
                {
                    _id: 1,
                    includeInAlgorithm: true,
                    donor: "שמנצלר",
                    organization: "",
                    description: "פיתות",
                    type: "אוכל",
                    address: "חנה סנש 15 הרצליה",
                    date: "4.1.2018",
                    fromHour: "08:00",
                    toHour: "22:00",
                    comments: "אחלה פיתות",
                    status: "חדש",
                    advanced: {
                        isPacked: true,
                        isHot: false,
                        kosher: true,
                        amount: 10
                    }
                },
                {
                    _id: 2,
                    includeInAlgorithm: true,
                    donor: "מאי דרורי",
                    organization: "",
                    description: "כל מיני בגדים",
                    type: "ביגוד",
                    address: "השיטה 34 אורנית",
                    date: "8.1.2018",
                    fromHour: "10:00",
                    toHour: "20:00",
                    comments: "נעלי בית",
                    status: "ממתין לשיבוץ",
                    advanced: {
                        condition: "חדש",
                        type: "נשים",
                        amount: 3
                    }
                },
                {
                    _id: 3,
                    includeInAlgorithm: true,
                    donor: "צופן מזרחי",
                    organization: "",
                    description: "שולחן כתיבה",
                    type: "ריהוט",
                    address: "בן גוריון 5 רמת גן",
                    date: "7.1.2018",
                    fromHour: "16:00",
                    toHour: "20:00",
                    comments: "אחלה שולחן",
                    status: "ממתין לאיסוף",
                    advanced: {
                        condition: "בלוי"
                    }
                },
                {
                    _id: 3,
                    includeInAlgorithm: true,
                    donor: "צופן מזרחי",
                    organization: "",
                    description: "שולחן כתיבה",
                    type: "ריהוט",
                    address: "בן גוריון 5 רמת גן",
                    date: "7.1.2018",
                    fromHour: "16:00",
                    toHour: "20:00",
                    comments: "אחלה שולחן",
                    status: "ממתין לאיסוף",
                    advanced: {
                        condition: "בלוי"
                    }
                },
                {
                    _id: 3,
                    includeInAlgorithm: false,
                    donor: "צופן מזרחי",
                    organization: "",
                    description: "שולחן כתיבה",
                    type: "ריהוט",
                    address: "בן גוריון 5 רמת גן",
                    date: "9.1.2018",
                    fromHour: "16:00",
                    toHour: "20:00",
                    comments: "אחלה שולחן",
                    status: "ממתין לאיסוף",
                    advanced: {
                        condition: "בלוי"
                    }
                },
                {
                    _id: 3,
                    includeInAlgorithm: true,
                    donor: "צופן מזרחי",
                    organization: "",
                    description: "שולחן כתיבה",
                    type: "ריהוט",
                    address: "בן גוריון 5 רמת גן",
                    date: "6.1.2018",
                    fromHour: "16:00",
                    toHour: "20:00",
                    comments: "אחלה שולחן",
                    status: "ממתין לאיסוף",
                    advanced: {
                        condition: "בלוי"
                    }
                },
                {
                    _id: 3,
                    includeInAlgorithm: false,
                    donor: "צופן מזרחי",
                    organization: "",
                    description: "שולחן כתיבה",
                    type: "ריהוט",
                    address: "בן גוריון 5 רמת גן",
                    date: "8.1.2018",
                    fromHour: "16:00",
                    toHour: "20:00",
                    comments: "אחלה שולחן",
                    status: "ממתין לאיסוף",
                    advanced: {
                        condition: "בלוי"
                    }
                }
            ];
            deferred.resolve(donations);
            return deferred.promise;   
        },
        planRoute: function (donations, vehiclesAmount) {
            // return $http.post('/planRoute', {
            //     donations: donations,
            //     vehiclesAmount: vehiclesAmount
            // }); 

            // TODO
            var deferred = $q.defer();
            var route = {
                _id: 1,
                date: "10.1.2018",
                organizationId: 1,
                paths: [{
                    vehicleId: 1,
                    donations: [1,2]
                },
                {
                    vehicleId: 2,
                    donations: [3,4]
                }]
            };
            deferred.resolve(route);
            return deferred.promise;   
        }
    };
});