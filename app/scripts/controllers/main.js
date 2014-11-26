'use strict';

/**
 * @ngdoc function
 * @name densitiesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the densitiesApp
 */
angular.module('densitiesApp')
  .controller('MainCtrl', function ($scope, PdfFactory, _) {
        // ::todo: defaults should come from a factory
        var DefaultDomainMin = 0;
        var DefaultDomainMax = 100;
        var DefaultCurrentX = 20;

        $scope.domain = { min: DefaultDomainMin, max: DefaultDomainMax, current: 0 };
        $scope.densities = PdfFactory.pdfs;
        $scope.params = null;
        $scope.density = null;
        
        $scope.hasDensity = function () {
            return $scope.density !== null;
        }

        $scope.hasParams = function () {
            return $scope.params !== null;
        }

        $scope.generateDensityValues = function (density, min, max) {

        }
  });
