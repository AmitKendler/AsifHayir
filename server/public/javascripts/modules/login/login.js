var app = angular.module("AsifHayir");

app.factory("UserAuth", function($q, $timeout){
    var deferred = $q.defer();
    return {
        finish: function() {
            deferred.resolve();
        },
        userIsReady: function(){
            // var deferred = $q.defer();
            // $timeout(function(){
            //     deferred.resolve("Allo!");
            // },2000);
            return deferred.promise;
        }
    }
 });

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
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

    return $firebaseAuth();
  }
]);

app.controller("AuthCtrl", function($scope, $location, Auth, $http, $timeout, UserAuth){

     // any time auth state changes, add the user data to scope
     Auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser != null) $scope.afterLogin(firebaseUser);
        else {
            $('#loginModal').modal('show');
        }
      });

      $scope.onLogin = function () {
        ($scope.newUser) ? $scope.register() : $scope.login();
      }

      $scope.setToken = function (token) {
        $http.defaults.headers.common['auth-token'] = token;
      }

      $scope.afterLogin = function (user) {
        user.getIdToken(true).then(function(idToken) {
            $scope.setToken(idToken);
            UserAuth.finish();
            $('#loginModal').modal('hide');
            
            $timeout(function(){ 
                if (!location.hash.split("/")[1]) {
                    $location.path('/donations');
                    // $('header nav a[href^="#!/donations"]').addClass('active');
                }
            },1);
        });
      }

      $scope.login = function () {
        Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
        }, function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
      }

      $scope.register = function () {
        Auth.$createUserWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
            $scope.error = error;
        });
      }

	$scope.logout = function() {
		Auth.$unauth();
	}
});