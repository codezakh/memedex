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
      )
      .when(
        '/memelist',
        {
          templateUrl: 'views/memeListView.html',
        },
      )
      .when(
        '/meme/:memeId',
        {
          templateUrl: 'views/memeDetailView.html',
          controller: 'MemeDetailController',
          controllerAs: 'model',
        },
      );
  });
