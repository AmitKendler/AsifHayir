/**
 * Created by ziv-private on 12/11/17.
 */
var app = angular.module("AsifHayir", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider        
        .when("/donations", {
            templateUrl : "javascripts/modules/donations/screen/donationsScreen.html",
            controller: 'donations'
        })
        .when("/vehicles", {
            templateUrl : "javascripts/modules/vehicles/screen/vehiclesScreen.html",
            controller: 'vehicles'
        })    
        .when("/volunteers", {
            templateUrl : "javascripts/modules/donations/screen/donationsScreen.html",
            controller: 'volunteers'
        })    
        .when("/statistics", {
            templateUrl : "javascripts/modules/donations/screen/donationsScreen.html",
            controller: 'statistics'
        })        
        .otherwise({
            redirectTo : "/donations"
        });
});