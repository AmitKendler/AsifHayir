angular.module("AsifHayir").factory('RoutesService', function($http, $q) {
    return {
        getRoutes: function() {
            return $http.get('/getRoutes');
        },
        updateVolunteer: function(volunteer) {
            return $http.put(`/updateUser/${volunteer._id}`, volunteer);
        },
        updateRoute: function(route) {
            return $http.put(`/updateRoute/${route._id}`, route);
        }
    };
});