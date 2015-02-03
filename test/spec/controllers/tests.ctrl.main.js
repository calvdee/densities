'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('densitiesApp'));

  var MainCtrl,
    scope,
    d3,
    PdfFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AppConfig_, _PdfFactory_, _d3_) {
    d3 = _d3_;
    PdfFactory = _PdfFactory_;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      AppConfig: _AppConfig_,
      PdfFactory: _PdfFactory_,
      d3: _d3_
    });
  }));

  it('should attach a list of densities to the scope', function () {
    // expect(scope.densities.length).toBeGreaterThan(0);
  });

  it('should indicate if there is a density selected', function() {
    expect(scope.hasDensity()).toBe(false);
    scope.density = {};
    expect(scope.hasDensity()).toBe(true);
  });

  it('should indicate if there are parameters selected', function() {
    expect(scope.hasParams()).toBe(false);
    scope.params = [];
    expect(scope.hasParams()).toBe(true);
  });

  it('should calculate XYs for xs and ys', function () {
    // Setup the pdf factory and toXy function
    var pdfs = PdfFactory.pdfs
    // Create domain/range
    var domain = d3.range(0, 20, 0.01)
    var range = pdfs.chisq.f(domain, [1])
    // Get the xys
    var xys = scope.toXy(domain, range)
    expect(xys.length).toBeGreaterThan(0)
  });


  it('should generate density values for an interval', function () {
    // expect(scope.generateDensityValues)
  });

  // it('should create a new distribution model with default parameters', function() {
  //   scope.densities.forEach(function (d) {
  //     expect(scope.newDistribution(d).paramValues.length).toBeGreaterThan(0);
  //   });
  // });
});
