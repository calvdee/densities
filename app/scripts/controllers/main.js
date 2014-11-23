'use strict';

/**
 * @ngdoc function
 * @name densitiesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the densitiesApp
 */
angular.module('densitiesApp')
  .controller('MainCtrl', function ($scope, DistFactory, _) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    $scope.densities = [
    	{ name: 'Gamma', params: ['alpha', 'beta'], defaults: [1, 2] }
    ];
    $scope.params = null;
    $scope.density = null;
    
    $scope.hasDensity = function () {
        return $scope.density !== null;
    }

    $scope.hasParams = function () {
        return $scope.params !== null;
    }
  });
