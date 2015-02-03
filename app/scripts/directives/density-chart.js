'use strict';

/**
 * @ngdoc directive
 * @name densitiesApp.directive:barChart
 * @description
 * # barChart
 */
angular.module('densitiesApp')
  .directive('densityChart', function (d3) {
    var chart = d3.custom.density();
	return {
        restrict: 'E',
        replace: true,
        template: '<div class="chart"></div>',
        scope:{
            data: '=data',
            hovered: '&hovered',
            opts: '=opts',
            density: '&density'
        },
        link: function(scope, element, attrs) {

            var chartOpts = scope.opts;

            var chartEl = d3.select(element[0]);
            // chart.on('customHover', function(d, i){
            //     scope.hovered({args:d});
            // });

            scope.$watch('data', function (newVal, oldVal) {
                chartEl.datum(newVal).call(chart, chartOpts);
            });

            // scope.$watch('height', function(d, i){
            //     chartEl.call(chart.height(scope.height));
            // })
        }
    };
  });
