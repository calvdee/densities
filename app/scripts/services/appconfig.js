'use strict';

/**
 * @ngdoc service
 * @name densitiesApp.AppConfig
 * @description
 * # AppConfig
 * Value in the densitiesApp.
 */
angular.module('densitiesApp')
  .factory('AppConfig', function () {
    
		var config = {};

  	config.chart = {
			width: 900, 
			height: 500
  	};

  	return config;
  });
