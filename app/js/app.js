'use strict';
//un-fuck javascript:
var oldss = String.prototype.substring;
String.prototype.substring = function(a,b){
	return oldss.call(this, a != undefined && a<0?a%this.length+this.length:a,
							b != undefined && b<0?b%this.length+this.length:b)
};

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
