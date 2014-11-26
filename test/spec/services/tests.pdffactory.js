'use strict';

describe('Service: PdfFactory', function () {

  // load the service's module
  beforeEach(module('densitiesApp'));


  var PdfFactory
      ,_;

  function toPrecision(x, n) {
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
      , ps = [0.30326533, 0.18393972, 0.11156508, 0.06766764, 0.04104250]
      , a = 1
      , b = 2;

    var params = { 'a': a, 'b': b };

    var gammas = pdfs.gamma.f(xs, params);

    gammas.map(function(x){ return toPrecision(x, 3); })
    ps.map(function(x){ return toPrecision(x, 3); })

    expect(toPrecision(gammas[0], 3)).toEqual(toPrecision(ps[0], 3));
    expect(toPrecision(gammas[1], 3)).toEqual(toPrecision(ps[1], 3));
    expect(toPrecision(gammas[2], 3)).toEqual(toPrecision(ps[2], 3));
  });

  // it('should have gamma distribution with alpha and beta', function () {
  //   var xs = []
  //     , ps = []
  //     , a = 1
  //     , b = 2;

  //   var dGammas = DistFactory.dgamma(xs, a, b);

  //   expect(dGammas[0]).toEqual(ps[0]);
  //   expect(dGammas[1]).toEqual(ps[1]);
  //   expect(dGammas[2]).toEqual(ps[2]);
  // });

});
