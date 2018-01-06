angular.module("AsifHayir").factory('DonationsService', function($http) {
    return {
        getDonations: function() {
            // TODO
            return $http.get('https://jsonplaceholder.typicode.com/posts'); 
        }
    };
});

angular.module("AsifHayir").controller("donations", function ($scope, DonationsService) {
    
    DonationsService.getDonations().then(function (data) {
        
        // אוכל בגדים ורהיטים
        //condition: "חדש משומש בלוי",
        //status: "חדש. ממתין לשיבוץ. ממתין לאיסוף. נאסף",
        //type:"נשים גברים ילדים"
        // TODO
        $scope.donations = [
            {
                id: 1,
                donor: "שמנצלר",
                organization: "",
                description: "פיתות",
                type: "אוכל",
                address: "חנה סנש 15 הרצליה",
                date: "04/01/2018",
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
                id: 2,
                donor: "מאי דרורי",
                organization: "",
                description: "כל מיני בגדים",
                type: "ביגוד",
                address: "השיטה 34 אורנית",
                date: "08/01/2018",
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
                id: 3,
                donor: "צופן מזרחי",
                organization: "",
                description: "שולחן כתיבה",
                type: "ריהוט",
                address: "בן גוריון 5 רמת גן",
                date: "07/01/2018",
                fromHour: "16:00",
                toHour: "20:00",
                comments: "אחלה שולחן",
                status: "ממתין לאיסוף",
                advanced: {
                    condition: "בלוי"
                }
            },
            {
                id: 3,
                donor: "צופן מזרחי",
                organization: "",
                description: "שולחן כתיבה",
                type: "ריהוט",
                address: "בן גוריון 5 רמת גן",
                date: "07/01/2018",
                fromHour: "16:00",
                toHour: "20:00",
                comments: "אחלה שולחן",
                status: "ממתין לאיסוף",
                advanced: {
                    condition: "בלוי"
                }
            },
            {
                id: 3,
                donor: "צופן מזרחי",
                organization: "",
                description: "שולחן כתיבה",
                type: "ריהוט",
                address: "בן גוריון 5 רמת גן",
                date: "07/01/2018",
                fromHour: "16:00",
                toHour: "20:00",
                comments: "אחלה שולחן",
                status: "ממתין לאיסוף",
                advanced: {
                    condition: "בלוי"
                }
            },
            {
                id: 3,
                donor: "צופן מזרחי",
                organization: "",
                description: "שולחן כתיבה",
                type: "ריהוט",
                address: "בן גוריון 5 רמת גן",
                date: "07/01/2018",
                fromHour: "16:00",
                toHour: "20:00",
                comments: "אחלה שולחן",
                status: "ממתין לאיסוף",
                advanced: {
                    condition: "בלוי"
                }
            },
            {
                id: 3,
                donor: "צופן מזרחי",
                organization: "",
                description: "שולחן כתיבה",
                type: "ריהוט",
                address: "בן גוריון 5 רמת גן",
                date: "07/01/2018",
                fromHour: "16:00",
                toHour: "20:00",
                comments: "אחלה שולחן",
                status: "ממתין לאיסוף",
                advanced: {
                    condition: "בלוי"
                }
            }
        ];
    });

    
});