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

  it('should attach a list of distributions to the scope', function () {
    expect(scope.dists.length).toBeGreaterThan(0);
  });

  it('should create a gamma distribution model with alpha and beta parameters', function() {
    expect(scope.newDistribution())
  });
});
