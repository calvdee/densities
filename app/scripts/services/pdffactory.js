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

	  // Beta
	  pdfs.beta = {
			name: 'Beta', 
			params: [
				{ name: 'Shape (α)', minValue: 1, maxValue: 100, value: 1, step: 0.1 }, 
			 	{ name: 'Shape (β)', minValue: 0, maxValue: 100, value: 1, step: 0.1}
			 ], 
			domain: 20, 
			f: dbeta
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

		// Compute a function f over the domain
		function compute(xs, f) {
			var ys = [];
			xs.forEach(function(x) {
				var y = f(x);
				ys.push(y);
			});
			return ys;
		}

		// Generates density values for the Gamma distribution over the interval [a,b]
		function dgamma(xs, params) { 
			var shape = params[0];
			var scale = params[1];
			var f = function(x) { return Math.pow(1/scale, shape)*Math.pow(x, shape-1)*Math.exp(-x*1/scale)/gamma(shape); }
			var densities = compute(xs, f)
			return densities;
		}

		function dbeta(xs, params) {
			var a = params[0]
				, b = params[1]
				, f = function(x) { return Math.pow(x, a-1) * Math.pow(1-x, b-1)/beta(a,b); }

			var densities = compute(xs, f)
		}
  });
