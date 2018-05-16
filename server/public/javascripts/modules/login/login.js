var app = angular.module("AsifHayir");

// var ref = firebase.database().ref();

app.controller("AuthCtrl", function($scope, $location, $firebaseAuth){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCLjvInkTICWVDqRKx7HcGztQD--pI0mEE",
        authDomain: "leftright-2e5de.firebaseapp.com",
        databaseURL: "https://leftright-2e5de.firebaseio.com",
        projectId: "leftright-2e5de",
        storageBucket: "leftright-2e5de.appspot.com",
        messagingSenderId: "371521623116"
    };
    firebase.initializeApp(config);

    // const FACEBOOK_APP_ID = "1946764752034197";
    // // $window.fbAsyncInit = function() {
    // FB.init({ 
    //     appId: FACEBOOK_APP_ID,
    //     status: true, 
    //     // cookie: true, 
    //     xfbml: true,
    //     version: 'v2.4'
    // });
    // // };

    $("#loginModal").modal();

    var Auth = $firebaseAuth();
    var provider = new firebase.auth.FacebookAuthProvider();

    // var auth = $firebaseAuth(ref);

	// $scope.provider = '';
	$scope.authData;

     // any time auth state changes, add the user data to scope
     Auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
      });

      $scope.signUp = function () {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            var user = firebase.auth().currentUser;
            logUser(user); // Optional
        }, function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
      }
    //   Auth.$onAuth(function(authData){
	// 	$scope.authData = authData;
	// 	if(authData) {
	// 		$scope.cachedProfile = getCachedProfile();
	// 		createUser();
	// 		$location.path("/donations");
	// 	}
	// 	console.log($scope.authData);
	// });

    // FB.Event.subscribe('auth.authResponseChange', checkLoginState);

    // FB.init({
    //     appId      : "1946764752034197",
    //     status     : true,
    //     xfbml      : true,
    //     version    : 'v2.6'
    // });

    // FB.Event.subscribe('auth.authResponseChange', checkLoginState);

    // function checkLoginState(event) {
    //     if (event.authResponse) {
    //       // User is signed-in Facebook.
    //       var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    //         unsubscribe();
    //         // Check if we are already signed-in Firebase with the correct user.
    //         if (!isUserEqual(event.authResponse, firebaseUser)) {
    //           // Build Firebase credential with the Facebook auth token.
    //           var credential = firebase.auth.FacebookAuthProvider.credential(
    //               event.authResponse.accessToken);
    //           // Sign in with the credential from the Facebook user.
    //           firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function(error) {
    //             // Handle Errors here.
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             // The email of the user's account used.
    //             var email = error.email;
    //             // The firebase.auth.AuthCredential type that was used.
    //             var credential = error.credential;
    //             // ...
    //           });
    //         } else {
    //           // User is already signed-in Firebase with the correct user.
    //         }
    //       });
    //     } else {
    //       // User is signed-out of Facebook.
    //       firebase.auth().signOut();
    //     }
    //   }

	// function login () {
    //     firebase.auth().signInWithPopup(provider).then(function(result) {
    //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //         var token = result.credential.accessToken;
    //         // The signed-in user info.
    //         var user = result.user;
    //         // ...
    //       }).catch(function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         // The email of the user's account used.
    //         var email = error.email;
    //         // The firebase.auth.AuthCredential type that was used.
    //         var credential = error.credential;
    //         // ...
    //       });

    //     // Auth.$signInWithPopup(provider);
	
	// }

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