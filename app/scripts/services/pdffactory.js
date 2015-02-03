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
    

	  
	  // Compute a function f over the domain
	  function compute(xs, f) {
	  	var ys = [];
	  	xs.forEach(function(x) {
	  		var y = f(x);
	  		ys.push(y);
	  	});
	  	return ys;
	  }
	  
  	var pdfs = {};

	  // Gamma ================================================================================================
	  pdfs.gamma = {
			name: 'Gamma', 
			params: [
				{ name: 'Shape (α)', minValue: 1, maxValue: 100, value: 1, step: 2.0 }, 
			 	{ name: 'Scale (β)', minValue: 0, maxValue: 100, value: 2, step: 0.25}
			 ], 
			f: dgamma,
			support: [0, 20]
	  }
		// Generates values using the gamma function defined as (n-1)!
		function gamma(x) {
		    var g = 1;
		    for (var i = 2; i <= x-1; i++) 
		    	g = g * i;
		    return g;
		}
		// Generates density values for the Gamma distribution over the interval [a,b]
		function dgamma(xs, params) { 
			var shape = params[0];
			var scale = params[1];
			// var f = function(x) { return Math.pow(1/scale, shape)*Math.pow(x, shape-1)*Math.exp(-x*1/scale)/gamma(shape); }
			var f = function(x) { return Math.pow(x, shape-1)*Math.exp(-x/scale)/Math.pow(scale, shape)*gamma(shape); }
			var densities = compute(xs, f)
			// console.log('damma computation: ' + densities)
			return densities;
		}

	  // Chi-Square ================================================================================================
	  pdfs.chisq = {
			name: 'Chi-Squared', 
			params: [
				{ name: 'Degrees of Freedom (n)', minValue: 2, maxValue: 20, value: 2, step: 1.0 }, 
			 ], 
			f: dchisq,
			support: [0, 20]
	  }
	  function dchisq (xs, params) {
	  	var k = params[0]
	  		, scale = 2
	  		, shape = k/2
	  	
	  	// Write chi-squred in terms of Gamma
	  	var ys = dgamma(xs, [shape, scale]) 
	  	// console.log("*** dchisq calculation: " + ys)
	  	return ys
	  }
    
  	return {
  		pdfs: pdfs
  	};

  });
