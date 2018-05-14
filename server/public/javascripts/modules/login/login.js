var app = angular.module("AsifHayir");
// angular.module("fireLearning", ["firebase", "ngRoute", "ui.bootstrap"]);
var ref = firebase.database().ref();
// new Firebase("https://leftright-2e5de.firebaseio.com");


app.factory("Auth", function($firebaseAuth){
	return $firebaseAuth();
});

app.controller("AuthCtrl", function($scope, $location, Auth){
    $("#loginModal").modal();

    // var auth = $firebaseAuth(ref);

	$scope.provider = '';
	$scope.authData;

     // any time auth state changes, add the user data to scope
     Auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
      });

    //   Auth.$onAuth(function(authData){
	// 	$scope.authData = authData;
	// 	if(authData) {
	// 		$scope.cachedProfile = getCachedProfile();
	// 		createUser();
	// 		$location.path("/donations");
	// 	}
	// 	console.log($scope.authData);
	// });

	$scope.login = function(provider) {
        Auth.$signInWithPopup(provider);
		// Auth.$authWithOAuthPopup(provider,  { scope: 'email' })
		// .catch(function(error){
		// 	console.error(error);
		// })
	}

	$scope.logout = function() {
		Auth.$unauth();
	}

	var createUser = function() {
		ref.createUser($scope.cachedProfile, function(error, userData) {
			if (error) {
	 			switch (error.code) {
					case "EMAIL_TAKEN":
						console.log("The new user account cannot be created because the email is already in use.");
						break;
					case "INVALID_EMAIL":
						console.log("The specified email is not a valid email.");
						break;
					default:
						console.log("Error creating user:", error);
				}
			} else {
				console.log("Successfully created user account with uid:", userData.uid);
			}
		});
	}

	var getCachedProfile = function() {
		if(!$scope.authData) return "";

		switch($scope.authData.provider) {
			case "github":
				return $scope.authData.github.cachedUserProfile;
				break;
			case "facebook":
				return $scope.authData.facebook.cachedUserProfile;
				break;
			case "google":
				return $scope.authData.google.cachedUserProfile;
				break;
			default:
				return "";
		}
	}

	$scope.getUserImage = function() {
		if(!$scope.authData) return "";
		
		switch($scope.authData.provider) {
			case "github":
				return $scope.authData.github.cachedUserProfile.avatar_url ? $scope.authData.github.cachedUserProfile.avatar_url : "";
				break;
			case "facebook":
				return $scope.authData.facebook.profileImageURL ? $scope.authData.facebook.profileImageURL : "";
				break;
			case "google":
				return $scope.authData.google.profileImageURL ? $scope.authData.google.profileImageURL : "";
				break;
			default:
				return "";
		}
	}

//   $scope.openUserLoginUsingEmail = function (size) {
//     $scope.userLoginModal = null;
//     $scope.userLoginModal = $modal.open({
//       animation: $scope.animationsEnabled,
//       templateUrl: 'userLoginUsingEmail.html',
//       controller: 'AuthCtrl',
//       size: size,
//       scope: $scope,
//     });
//     console.log($scope);
//     console.log($scope.userLoginModal);
//     $scope.userLoginModal.result.then(function () {
     
//     }, function () {
//       console.log('Modal dismissed at: ' + new Date());
//     });
//   };
  
  $scope.loginUsingEmail = function () {
    $scope.userLoginModal.close($scope.userEmail);
  };

  $scope.cancelLogin = function () {
    console.log($scope);
    $scope.userLoginModal.dismiss('cancel');
  };
});