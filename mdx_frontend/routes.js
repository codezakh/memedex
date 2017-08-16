angular.module('memeDex')
  .config(function ($routeProvider) {
    $routeProvider
      .when(
        '/',
        {
          templateUrl: 'views/landing.html',
          controller: 'LandingController',
          controllerAs: 'model',
        },
      );
  });