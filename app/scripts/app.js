'use strict';

/**
 * @ngdoc overview
 * @name densitiesApp
 * @description
 * # densitiesApp
 *
 * Main module of the application.
 */
angular
  .module('densitiesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'underscore',
    'ui.bootstrap',
    'ui.slider',
    'angulartics', 
    'angulartics.google.analytics'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/splash.html',
        controller: 'SplashCtrl'
      })
      .when('/app', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/splash', {
        templateUrl: 'views/splash.html',
        controller: 'SplashCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
