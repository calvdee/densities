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

    expect(pdfs).not.toBeUndefined();

    var xs = [1, 2, 3, 4, 5]
      , ys = [0.30326533, 0.18393972, 0.11156508, 0.06766764, 0.04104250]
      , a = 1
      , b = 2;

    var params = [a, b]
    var densities = pdfs.gamma.f(xs, params);

    densities.map(function(x){ return toPrecision(x, 3); })
    ys.map(function(x){ return toPrecision(x, 3); })

    expect(toPrecision(densities[0], 3)).toEqual(toPrecision(ys[0], 3));
    expect(toPrecision(densities[1], 3)).toEqual(toPrecision(ys[1], 3));
    expect(toPrecision(densities[2], 3)).toEqual(toPrecision(ys[2], 3));
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
