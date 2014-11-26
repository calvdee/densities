'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('densitiesApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _PdfFactory_, ___) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      PdfFactory: _PdfFactory_,
      _: ___
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

  it('should have domain [0,20]', function () {
    expect(scope.domain.min).toEqual(0);
    expect(scope.domain.max).toEqual(100);
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
