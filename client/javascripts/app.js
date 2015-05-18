/*global angular, BookListCtrl, BookDetailCtrl */


/**
 *
 * Writing AngularJS Documentation
 * change tests
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var myApp = angular.module('myApp', ['myApp.services', 'ngRoute','ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        // Get all books
        $routeProvider.when('/', {
            templateUrl: 'partials/home.html',
            controller: HomeCtrl
        });

        // When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/"
        });

    }]);
