'use strict';

/**
 * @ngdoc service
 * @name densitiesApp.DistFactory
 * @description
 * # DistFactory
 * Service in the densitiesApp.
 */
angular.module('densitiesApp')
  .service('DistFactory', function DistFactory(_) {
    
  	return {
		dgamma: dgamma
  	};

	function gamma(num) {
	    var rval=1;
	    for (var i = 2; i <= num-1; i++)
	        rval = rval * i;
	    return rval;
	}

	function dgamma(xs, a, b) { 
		var densities = [];
		xs.forEach(function(x) {
			return Math.pow(1/b, a)*Math.pow(x, a-1)*Math.exp(-x*1/b)/gamma(a);
		});
		return densities;
		// return _.map(xs, function(x) { return Math.pow(1/b, a)*Math.pow(x, a-1)*Math.exp(-x*1/b)/gamma(a); });
	}

  });
