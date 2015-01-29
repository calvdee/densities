'use strict';

/**
 * @ngdoc PDF Service
 * @name densitiesApp.PdfFactory
 * @description 
 * Provides density metadata (name, params, defaults), probability
 * density functions (f), and cumulative distribution functions (F)
 * for continuous distributions.
 * # PdfFactory
 * Service in the densitiesApp.
 */
angular.module('densitiesApp')
  .service('PdfFactory', function PdfFactory(_) {
    
  	var pdfs = {};

	  // Gamma
	  pdfs.gamma = {
			name: 'Gamma', 
			params: [
				{ name: 'Shape (α)', minValue: 1, maxValue: 100, value: 1, step: 2.0 }, 
			 	{ name: 'Scale (β)', minValue: 0, maxValue: 100, value: 2, step: 0.25}
			 ], 
			domain: 20, 
			f: dgamma
	  }

    
  	return {
  		pdfs: pdfs
  	};

		// Generates values using the gamma function defined as (n-1)!
		function gamma(x) {
		    var g = 1;
		    for (var i = 2; i <= x-1; i++) 
		    	g = g * i;
		    return g;
		}

		// Generates values using the beta function defined as (x-1)!(y-1)!/(x + y - 1)!
		function beta (x, y) {
			// Write the function in terms of gamma
			var b = gamma(x) + gamma(y) / gamma(x + y)
			return b;
		}

		function compute(xs, fn) {
			var densities = [];
			xs.forEach(function(x) {
				var y = fn(x);
				densities.push(y);
			});
			return densities;
		}

		// Generates density values for the Gamma distribution over the interval [a,b]
		function dgamma(xs, params) { 
			var shape = params[0];
			var scale = params[1];
			var fn = function(x) { return Math.pow(1/scale, shape)*Math.pow(x, shape-1)*Math.exp(-x*1/scale)/gamma(shape); }
			var densities = compute(xs, fn)
			return densities;
		}

		function dbeta(xs, params) {
			Math.pow(x, a-1) * Math.pow(1-x, b-1)/beta(a,b)
		}
  });
