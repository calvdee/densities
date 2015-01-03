'use strict';

/**
 * @ngdoc function
 * @name densitiesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the densitiesApp
 */
angular.module('densitiesApp')
  .controller('MainCtrl', function ($scope, PdfFactory, AppConfig, _, d3) {
        // ::todo: defaults should come from a factory
        var domainMin = AppConfig.chart.domainMin;
        var domainMax = AppConfig.chart.domainMax;
        var domainCurrent = AppConfig.chart.domainCurrent;

        $scope.chartOpts = AppConfig.chart;

        $scope.domain = { min: domainMin, max: domainMax, current: domainCurrent };
        $scope.densities = PdfFactory.pdfs;
        $scope.params = null;
        $scope.density = null;
        $scope.data = [];
        
        $scope.hasDensity = function () {
            return $scope.density !== null;
        }

        $scope.hasParams = function () {
            return $scope.params !== null;
        }

        $scope.generateDensityValues = function (domain, params) {
            var densities =  $scope.density.f(domain, params);
            return densities;
        }

        $scope.onDensity = function (density) {
            var newDensity = density;
            var oldDensity = $scope.density;

            if(newDensity !== oldDensity){
                $scope.domain.current = newDensity.domain;
                $scope.density = newDensity;

                // Immediately compute the chart
                $scope.computeChart();
            }
        }

        $scope.computeChart = function () {
            // Use the model to calculate densities over the domain
            var domain = d3.range($scope.domain.min, $scope.domain.current, 0.01);
            console.log(domain)
            var range = $scope.generateDensityValues(domain, $scope.density.params);
            var xys = $scope.toXY(domain, range);            

            $scope.data = xys;
        }

        $scope.toXY = function(domain, range) {
            var xys = []
            for(var i = 0; i < domain.length; i++)
                xys.push({ x: domain[i], y: range[i]})
            return xys
        }
  });
