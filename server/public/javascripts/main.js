/**
 * Created by ziv-private on 12/11/17.
 */
var app = angular.module("AsifHayir", ["ngRoute", "firebase"]);
app.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common['auth-token'] = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiZjA2YWU3MGJhMjVkNzZiNWM0ZjMyYTk4YTU0N2JlYjE4YmM0MGUifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGVmdHJpZ2h0LTJlNWRlIiwibmFtZSI6IkFtaXQgS2VuZGxlciIsInBpY3R1cmUiOiJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8xMDE1NjI3MjIwMjIxNTkwMy9waWN0dXJlIiwiYXVkIjoibGVmdHJpZ2h0LTJlNWRlIiwiYXV0aF90aW1lIjoxNTI2MTQzNTU3LCJ1c2VyX2lkIjoiTFJsR2wxYWlXbWRUM2dTdTBpY3NHcHNyWmRiMiIsInN1YiI6IkxSbEdsMWFpV21kVDNnU3UwaWNzR3BzclpkYjIiLCJpYXQiOjE1MjYxNDM1NTcsImV4cCI6MTUyNjE0NzE1NywiZW1haWwiOiJhbWl0QGtlbmRsZXIuY28udWsiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZmFjZWJvb2suY29tIjpbIjEwMTU2MjcyMjAyMjE1OTAzIl0sImVtYWlsIjpbImFtaXRAa2VuZGxlci5jby51ayJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.D9q3gDwJfWTOBzbaBUE1VUUFoSxLB-80u6uTvXCkTcoA1zj9jfc6a0L75ybA_uPDnXDlAefWGBEcdYNoO7r7MvbMRcfaAG4vT3zncPBnLsr5jlq2VpF1pv2YiVaoP_N2_Vor576uCvaLzcE2XWhvNdUopE_rcAmFNcezR43Uk8PykAKD9yN0atMLJ_JnYVleA6JMj4DYL-GMrB4yIKDsuFChTESApEx9EbAmn91O2Zo29JHXZV7IeL_N2-CaAJowNuJvt4tkZESGmoknXxtW8M1z7v9NBS5iiXY3wZHrpXd1E7o3UZErzDrpWoKW7QxjOskySFavljZkXPjR-7A93g";
    
    // // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyCLjvInkTICWVDqRKx7HcGztQD--pI0mEE",
    //     authDomain: "leftright-2e5de.firebaseapp.com",
    //     databaseURL: "https://leftright-2e5de.firebaseio.com",
    //     projectId: "leftright-2e5de",
    //     storageBucket: "leftright-2e5de.appspot.com",
    //     messagingSenderId: "371521623116"
    // };
    // firebase.initializeApp(config);

    $routeProvider    
        .when('/',{
            controller: "AuthCtrl",
            templateUrl: "javascripts/modules/login/login.html",
        
        })
        .when("/donations", {
            templateUrl : "javascripts/modules/donations/screen/donationsScreen.html",
            controller: 'donations'
        })
        .when("/vehicles", {
            templateUrl : "javascripts/modules/vehicles/screen/vehiclesScreen.html",
            controller: 'vehicles'
        })    
        .when("/volunteers", {
            templateUrl : "javascripts/modules/volunteers/screen/volunteersScreen.html",
            controller: 'volunteers'
        })    
        .when("/statistics", {
            templateUrl : "javascripts/modules/statistics/statistics.html",
            controller: 'statistics'
        })   
        .when("/routes", {
            templateUrl : "javascripts/modules/routes/screen/routesScreen.html",
            controller: 'routes'
        })    
        .when("/findv", {
            templateUrl : "javascripts/modules/findv/findv.html",
            controller: 'findv'
        }) 
        .when("/photolabels", {
            templateUrl : "javascripts/modules/photolabels/photolabels.html",
            controller: 'photolabels'
        })           
        .otherwise({
            redirectTo : "/"
        });
});

$(function() {
    // Set the active class to the current tab
    $('header nav a[href^="#!/' + location.hash.split("/")[1] + '"]').addClass('active');

    // Remove this class when clicking another tab
    $("header nav a").click(function() {
        $("header nav a.active").removeClass("active");
    });
});