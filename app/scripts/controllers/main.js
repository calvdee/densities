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

    $scope.dists = [
    	{ name: 'Gamma', params: ['alpha', 'beta'], defaults: [1, 2] }
    ];
    $scope.dist = {}
    $scope.models = [];

    $scope.newDistribution = function(dist) {
        return {
            paramValues: dist.defaults
        };
    }
  });
