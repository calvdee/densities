'use strict';

/**
 * @ngdoc service
 * @name densitiesApp.d3
 * @description
 * # d3
 * Factory in the densitiesApp.
 */
angular.module('densitiesApp')
  .factory('d3', function ($window) {
    return $window.d3;
  });
