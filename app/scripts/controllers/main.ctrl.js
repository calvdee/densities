'use strict';

/**
 * @ngdoc function
 * @name densitiesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the densitiesApp
 */
angular.module('densitiesApp')
  .controller('MainCtrl', function ($scope, AppConfig, PdfFactory, d3) {

        // From AppConfig =================================================================
        var domainMin = 0
        var domainMax = 1
        var domainCurrent = AppConfig.chart.domainCurrent;

        $scope.chartOpts = AppConfig.chart;
        $scope.infos = AppConfig.infos;

        // Density configuration =================================================================
        $scope.densities = PdfFactory.pdfs;
        $scope.params = null;
        $scope.density = null;
        $scope.data = [];
        
        /**
        * True if the scope currently has a density function defined,
        * false otherwise.
        */ 
        $scope.hasDensity = function () {
            console.log($scope.density)
            return $scope.density !== null;
        }

        /**
        * True if the scope currently has parameters defined,
        * false otherwise.
        */ 
        $scope.hasParams = function () {
            return $scope.params !== null;
        }

        /**
        * Fired when the density function changes in the view.
        */ 
        $scope.onDensity = function (density) {
            // Create new and old densities
            var newDensity = density
              , oldDensity = $scope.density

            // Only swap densities if there's been a new density selected
            if(newDensity !== oldDensity){
                $scope.density = newDensity;

                // Immediately compute the chart
                $scope.computeChart();
            }
        }

        /**
        * Generates density values using the support and parameters.  Uses
        * the density function of the density defined on the scope.
        */ 
        $scope.computeChart = function () {
            // Get the support from the density
            var support = d3.range($scope.density.support[0], $scope.density.support[1], 0.01);
            
            // Extract parameter values from 'value' defined on denisty parameters
            var param_values = [];
            $scope.density.params.map(function(x) { param_values.push(x.value); });
            
            // Calculate the densities
            var densities =  $scope.density.f(support, param_values);

            // Map onto (x, y) objects
            var xys = $scope.toXy(support, densities);      

            // Trigger the model to re-draw the chart      
            $scope.data = xys;
        }

        /**
        * Maps the domain and range onto a list of {x,y} pairs.
        */ 
        $scope.toXy = function(domain, range) {
            var xys = []
            for(var i = 0; i < domain.length; i++)
                xys.push({ x: domain[i], y: range[i]})
            return xys
        }
  });
