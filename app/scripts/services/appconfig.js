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

    var infos = {};

    infos.densities = 'The density function used to compute probability';

  	config.chart = {
      top: 40, 
      right: 20, 
      bottom: 20, 
      left: 30,
			width: 970, 
			height: 500,
			domainMin: 0,
  		domainMax: 100,
  		domainCurrent: 0
  	};
    
    config.infos = infos;

  	return config;
  });
