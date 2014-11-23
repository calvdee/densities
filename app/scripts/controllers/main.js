'use strict';

/**
 * @ngdoc function
 * @name densitiesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the densitiesApp
 */
angular.module('densitiesApp')
  .controller('MainCtrl', function ($scope, DistFactory, _, d3) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    $scope.densities = [
    	{ name: 'Gamma', params: ['alpha', 'beta'], defaults: [1, 2] }
    ];
    $scope.params = [];
    $scope.density = null;
    
    $scope.hasDensity = function () {
        return $scope.density !== null;
    }
  });
