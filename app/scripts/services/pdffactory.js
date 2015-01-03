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
				{ name: 'Alpha (α)', minValue: 1, maxValue: 100, value: 1 }, 
			 	{ name: 'Beta (β)', minValue: 1, maxValue: 100, value: 2 }
			 ], 
			domain: 20, 
			f: dgamma
	  }

    
  	return {
  		pdfs: pdfs
  	};

	  	// Generates values using the gamma function defined as (n-1)!
		function gamma(num) {
		    var g=1;
		    for (var i = 2; i <= num-1; i++)
		        g = g * i;
		    return g;
		}

		// Generates density values for the Gamma distribution over the interval [a,b]
		function dgamma(xs, params) { 
			var a = params[0].value;
			var b = params[1].value;
			var densities = [];
			xs.forEach(function(x) {
				densities.push(Math.pow(1/b, a)*Math.pow(x, a-1)*Math.exp(-x*1/b)/gamma(a));
			});
			return densities;
		}

  });
