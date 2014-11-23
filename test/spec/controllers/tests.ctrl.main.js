'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('densitiesApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _DistFactory_) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      DistFactory: _DistFactory_
    });
  }));

  it('should attach a list of densities to the scope', function () {
    expect(scope.densities.length).toBeGreaterThan(0);
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

  // it('should create a new distribution model with default parameters', function() {
  //   scope.densities.forEach(function (d) {
  //     expect(scope.newDistribution(d).paramValues.length).toBeGreaterThan(0);
  //   });
  // });
});
