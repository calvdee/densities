'use strict';

/**
 * @ngdoc function
 * @name densitiesApp.controller:ChartctrlCtrl
 * @description
 * # ChartctrlCtrl
 * Controller of the densitiesApp
 */
angular.module('densitiesApp')
  .controller('ChartCtrl', function ($scope, d3) {
  	
    $scope.options = {width: 500, height: 300, 'bar': 'aaa'};
    $scope.data = [1, 2, 3, 4];

    $scope.hovered = function(d){
        $scope.barValue = d;
        $scope.$apply();
    };
    $scope.barValue = 'None';
  });
