angular.module("AsifHayir").controller("volunteers", function ($scope, VolunteersService) {
    
    VolunteersService.getVolunteers().then(function (data) {
        $scope.volunteers = data;       
    });

    $scope.onOpenDialog = function (volunteer) {
        $scope.volunteer = angular.copy(volunteer);
    }

    $scope.addVolunteer = function() {

        // TODO: delete this 
        $scope.volunteer._id = 1;
        $scope.volunteers.push($scope.volunteers);

        // TODO remove from comment
        // VolunteersService.addVolunteer($scope.volunteer).then(function () {
        //     VolunteersService.getVolunteers().then(function (data) {
        //         $scope.volunteers = data;
        //     })
        // })
    }

    $scope.updateVolunteer = function () {

        // Find the index of the volunteer we want to update
        var volunteerToUpdateIndex = $scope.volunteers.findIndex(volunteer => volunteer._id == $scope.volunteer._id);

        // Udate the volunteer
        VolunteersService.updateVolunteer($scope.volunteer).then(function () {
            $scope.volunteers[volunteerToUpdateIndex] = $scope.volunteer;
        })
    }

    $scope.deleteVolunteer = function (index) {
        VolunteersService.deleteVolunteer($scope.volunteers[index]._id).then(function () {
            $scope.volunteers.splice(index, 1)
        })
    }
    
});