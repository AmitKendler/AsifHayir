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
        .otherwise({
            redirectTo : "/donations"
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