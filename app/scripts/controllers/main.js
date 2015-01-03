'use strict';

/**
 * @ngdoc function
 * @name densitiesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the densitiesApp
 */
angular.module('densitiesApp')
  .controller('MainCtrl', function ($scope, PdfFactory, _, d3) {
        // ::todo: defaults should come from a factory
        var DefaultDomainMin = 0;
        var DefaultDomainMax = 100;
        var DefaultCurrentX = 20;

        $scope.domain = { min: DefaultDomainMin, max: DefaultDomainMax, current: 0 };
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
            var densities =  $scope.density.f(domain, params)
            return densities
        }

        $scope.onRecalculate = function () {
            // Use the model to calculate densities over the domain
            var domain = d3.range($scope.domain.min, $scope.domain.current)
            var range = $scope.generateDensityValues(domain, $scope.density.params)
            var xys = $scope.toXY(domain, range)

            $scope.data = xys
            console.log(xys)
        }

        $scope.toXY = function(domain, range) {
            var xys = []
            for(var i = 0; i < domain.length; i++)
                xys.push({ x: domain[i], y: range[i]})
            return xys
        }

        $scope.$watch('density', function(newValue, oldValue) {
          if(newValue !== oldValue)
            $scope.domain.current = newValue.domain
        });

  });
