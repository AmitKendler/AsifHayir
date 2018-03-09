angular.module("AsifHayir").factory('VolunteersService', function($http, $q) {
    return {
        getVolunteers: function() {
            // TODO
            // return $http.get('/volunteers')

            // TODO
            var deferred = $q.defer();
            var volunteers = [
                {
                    _id: 1,
                    identity: 362236985,
                    firstName: "גל",
                    lastName: "דרורי",
                    address: "השיטה 34 אורנית",
                    phone: "052-5310385"                
                },
                {
                    _id: 2,
                    identity: 362236985,
                    firstName: "מאי",
                    lastName: "דרורי",
                    address: "השיטה 34 אורנית",
                    phone: "052-5310385"                
                },
                {
                    _id: 3,
                    identity: 362236985,
                    firstName: "עדי",
                    lastName: "דרורי",
                    address: "השיטה 34 אורנית",
                    phone: "052-5310385"                
                },
                {
                    _id: 4,
                    identity: 362236985,
                    firstName: "איריס",
                    lastName: "דרורי",
                    address: "השיטה 34 אורנית",
                    phone: "052-5310385"                
                }
            ];
            deferred.resolve(volunteers);
            return deferred.promise;
        },
        addVolunteer: function(volunteer) {
            return $http.post('/volunteers/add', {volunteer});
        },
        updateVolunteer: function(volunteer) {
            return $http.post('/volunteers/update', {volunteer});
        },
        deleteVolunteer: function(volunteerId) {
            return $http.post('/volunteers/delete/', {volunteerId});
        }
    };
});