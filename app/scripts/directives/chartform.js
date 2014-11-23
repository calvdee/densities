'use strict';

/**
 * @ngdoc directive
 * @name densitiesApp.directive:chartForm
 * @description
 * # chartForm
 */
angular.module('densitiesApp')
  .directive('chartForm', function (d3) {
    return {
        restrict: 'E',
        replace: true,

        controller: function ChartCtrl ($scope) {
            $scope.randomData = function(){
                return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
            }
            $scope.update = function(d, i) { 
                // $scope.data = $scope.randomData(); 
                console.log(d);
            };
        },
        template: '<div class="form">' +
                'Shape: {{options.height}}<br />' +
                '<input type="range" ng-model="options.height" min="100" max="800" ng-click="update()"/>' +
                'Scale: {{options.height}}<br />' +
                '<input type="range" ng-model="options.height" min="100" max="800" ng-click="update()"/>' +
                '<br /><button ng-click="update()">Update Data</button>'
    }
  });