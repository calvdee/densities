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

    // $scope.chartOptions = {xMin: DefaultMinX, xMax: DefaultMaxX};
    // $scope.data = [1, 2, 3, 4];

    $scope.hovered = function(d){
        $scope.barValue = d;
        $scope.$apply();
    };
    $scope.barValue = 'None';
  });
