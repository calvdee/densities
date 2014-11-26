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
    
  	return {
		pdfs:   		
		{
			
        	gamma: { name: 'Gamma', params: [{ name: 'Alpha', value: 1 }, { name: 'Beta', value: 2 }], domain: 20, f: dgamma }
        }
  	};

  	// Generates values using the gamma function defined as (n-1)!
	function gamma(num) {
	    var rval=1;
	    for (var i = 2; i <= num-1; i++)
	        rval = rval * i;
	    return rval;
	}

	// Generates density values over the interval [a,b]
	function dgamma(xs, params) { 
		var a = params.a;
		var b = params.b;
		var densities = [];
		xs.forEach(function(x) {
			densities.push(Math.pow(1/b, a)*Math.pow(x, a-1)*Math.exp(-x*1/b)/gamma(a));
		});
		return densities;
	}

  });
