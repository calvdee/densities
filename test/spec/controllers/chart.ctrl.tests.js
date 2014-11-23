'use strict';

describe('Controller: ChartCtrl', function () {

  // load the controller's module
  beforeEach(module('densitiesApp'));

  var ChartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartCtrl = $controller('ChartCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of data to the scope', function () {
    expect(scope.data.length).toBe(4);
  });

  it('should attach options to the scope', function () {
    expect(scope.options).toBeDefined()
  });
});
