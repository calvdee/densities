'use strict';

describe('Service: PdfFactory', function () {

  // load the service's module
  beforeEach(module('densitiesApp'));


  var PdfFactory
      ,_;

  function toPrecision(x, n) {
    // console.log(x)
    // console.log(n)
    return (parseFloat(x.toPrecision(n)));
  }

  
  beforeEach(inject(function (_PdfFactory_, ___) {
    PdfFactory = _PdfFactory_;
    _ = ___;
  }));

  it('should generate values for Gamma', function () {
    var pdfs = PdfFactory.pdfs;

    // PDF Factory exists
    expect(pdfs).not.toBeUndefined();

    var xs = [1, 2, 3, 4, 5]
      , ys = [0.30326533, 0.18393972, 0.11156508, 0.06766764, 0.04104250]
      , shape = 1
      , scale = 2;

    // Create parameters
    var params = [shape, scale]
    var densities = pdfs.gamma.f(xs, params);

    // Map densities onto truncated decimal
    densities.map(function(x){ return toPrecision(x, 3); })
    // Map ys onto truncated decimal
    ys.map(function(x){ return toPrecision(x, 3); })

    // Compare ys and densities
    expect(toPrecision(densities[0], 3)).toEqual(toPrecision(ys[0], 3));
    expect(toPrecision(densities[1], 3)).toEqual(toPrecision(ys[1], 3));
    expect(toPrecision(densities[2], 3)).toEqual(toPrecision(ys[2], 3));
  });

  it('should generate values for Beta', function () {
    var pdfs = PdfFactory.pdfs;

    expect(pdfs).not.toBeUndefined();

    // Use data from R tests
    var xs = [0.01, 0.1, 0.25, 0.5, 1]
      , ys = [3.1991347, 1.0610330, 0.7351052, 0.6366198, 3.1991347]
      , a = 1
      , b = 2

    // Create parameters
    var params = [a, b]
    var densities = pdfs.beta.f(xs, params)

    // Map densities onto truncated decimal
    // densities.map(function(x){ return toPrecision(x, 3); })
    // ys.map(function(x){ return toPrecision(x, 3); })

    // expect(toPrecision(densities[0], 3)).toEqual(toPrecision(ys[0], 3));
    // expect(toPrecision(densities[1], 3)).toEqual(toPrecision(ys[1], 3));
    // expect(toPrecision(densities[2], 3)).toEqual(toPrecision(ys[2], 3));
  });

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
