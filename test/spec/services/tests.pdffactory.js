'use strict';

describe('Service: PdfFactory', function () {

  // load the service's module
  beforeEach(module('densitiesApp'));


  var PdfFactory
      ,d3
      ,_;

  function toPrecision(x, n) {
    // console.log(x)
    // console.log(n)
    return (parseFloat(x.toPrecision(n)));
  }

  
  beforeEach(inject(function (_PdfFactory_, _d3_, ___) {
    d3 = _d3_;
    PdfFactory = _PdfFactory_;
    _ = ___;
  }));


  it('densities should have support property', function () {
    var pdfs = PdfFactory.pdfs;
    expect(pdfs.gamma.support).not.toBeUndefined()
    // expect(pdfs.beta.support).not.toBeUndefined()
    expect(pdfs.chisq.support).not.toBeUndefined()
  });

  it('should generate values for Gamma', function () {
    var pdfs = PdfFactory.pdfs;

    var xs = [1, 2, 3, 4, 5]
      , ys = [0.30326533, 0.18393972, 0.11156508, 0.06766764, 0.04104250]
      , shape = 1
      , scale = 2;

    // Create parameters
    var params = [shape, scale]
    var densities = pdfs.gamma.f(xs, params);

    // Map densities onto truncated decimal
    var densities_p3 = densities.map(function(x){ return toPrecision(x, 3); })
    // Map ys onto truncated decimal
    var ys_p3 = ys.map(function(x) { return toPrecision(x, 3); })

    // Length of lists are equal
    expect(densities.length).toEqual(ys.length)

    // Compare ys and densities
    expect(densities_p3[0]).toEqual(ys_p3[0], "Wrong calculation");
    expect(densities_p3[1]).toEqual(ys_p3[1], "Wrong calculation");
    expect(densities_p3[2]).toEqual(ys_p3[2], "Wrong calculation");
  });

  it('should generate values for Chi-Squared', function () {

      // Generate the support
      var support = d3.range(1, 6, 1)
      // Use default parameters
      var params = [];
      PdfFactory.pdfs.chisq.params.map(function(x) { return params.push(x.value); } )


      // Expect 1 parameter (n)
      expect(params.length).toEqual(1)

      // Calculate the densities 
      var rDensities =  [0.30326533, 0.18393972, 0.11156508, 0.06766764, 0.04104250]
      var densities = PdfFactory.pdfs.chisq.f(support, params)

      // Precision three
      var rDensities_p_3 = rDensities.map(
        function(d) { return toPrecision(d, 3); })
      var densities_p_3 = densities.map(
        function(d) { return toPrecision(d, 3); })

      console.log("*** R's dchisq calculation: " + rDensities_p_3)
      console.log("*** chisq calculation: " + densities_p_3)

      expect(rDensities.length).toEqual(densities.length)

      // Expect densities to equal (to precision three) the densitiy
      // values calculated in R
      for(var i = 0; i <= rDensities.length; i++)
        expect(densities_p_3[i]).toEqual(rDensities_p_3[i])

      console.log(densities)
  });

  // it('should generate values for Beta', function () {
  //   var pdfs = PdfFactory.pdfs;


  //   expect(pdfs).not.toBeUndefined();

  //   // Use data from R tests
  //   var xs = [0.01, 0.1, 0.25, 0.5, 1]
  //     , ys = [3.1991347, 1.0610330, 0.7351052, 0.6366198, 3.1991347]
  //     , a = pdfs.beta.params[0].value
  //     , b = pdfs.beta.params[1].value

  //   // Create parameters and density values
  //   var params = [a, b]
  //   var densities = pdfs.beta.f(xs, params)

  //   // expect(densities).not.toBeUndefined("densities undefined")

  //   // // Map densities onto truncated decimal
  //   // densities.map(function(x){ return toPrecision(x, 3); })
  //   // // Map ys onto truncated decimal
  //   // ys.map(function(x){ return toPrecision(x, 3); })

  //   // // Compare actual ys with densities
  //   // expect(toPrecision(densities[0], 3)).toEqual(toPrecision(ys[0], 3));
  //   // expect(toPrecision(densities[1], 3)).toEqual(toPrecision(ys[1], 3));
  //   // expect(toPrecision(densities[2], 3)).toEqual(toPrecision(ys[2], 3));
  // });

  // it('should have gamma distribution with alpha and beta', function () {
  //   var xs = []
  //     , ys = []
  //     , a = 1
  //     , b = 2;

  //   var ddensities = DistFactory.dgamma(xs, a, b);

  //   expect(ddensities[0]).toEqual(ys[0]);
  //   expect(ddensities[1]).toEqual(ys[1]);
  //   expect(ddensities[2]).toEqual(ys[2]);
  // });

});
