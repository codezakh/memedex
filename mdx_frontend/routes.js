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
        '/login',
        {
          templateUrl: 'views/loginView.html',
          controller: 'LoginController',
          controllerAs: 'model',
        },
      )
      .when(
        '/register',
        {
          templateUrl: 'views/registerView.html',
          controller: 'RegisterController',
          controllerAs: 'model',
        },
      )
      .when(
        '/memelist',
        {
          templateUrl: 'views/memeListView.html',
          controller: 'MemeListController',
          controllerAs: 'model',
        },
      )
      .when(
        '/meme/:memeId',
        {
          templateUrl: 'views/memeDetailView.html',
          controller: 'MemeDetailController',
          controllerAs: 'model',
        },
      )
      .when(
        '/user/:userId',
        {
          templateUrl: 'views/userDetailView.html',
          controller: 'UserDetailController',
          controllerAs: 'model',
        },
      )
      .when(
        '/admin',
        {
          templateUrl: 'views/adminView.html',
          controller: 'AdminController',
          controllerAs: 'model',
        },
      )
      .otherwise(
        '/login',
      );
  });
