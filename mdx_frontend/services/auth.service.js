(function () {
  angular.module('memeDex')
    .factory('AuthService', function ($http, $rootScope, $log) {
      var api = {
        logInUser: undefined,
        logOutUser: undefined,
        getLoggedInUser: undefined,
        isLoggedIn: undefined,
      };
      var loggedInUser = null;


      api.isLoggedIn = function () {
        return $http.get('/api/auth/loggedin');
      };

      api.getLoggedInUser = function () {
        return $http.get('/api/auth/loggedin');
      };

      api.logInUser = function (userCredentials) {
        return new Promise(function (resolve, reject) {
          $http.post('/api/auth/login', userCredentials)
            .then(function (loginSuccessful) {
              loggedInUser = loginSuccessful.data;
              $rootScope.loggedInUser = loggedInUser;
              resolve(loggedInUser);
            })
            .catch(function (loginFailure) {
              reject(loginFailure);
            });
        });
      };

      api.logOutUser = function () {
        return new Promise(function (resolve, reject) {
          $http.post('/api/auth/logout', loggedInUser)
            .then(function (logoutSuccess) {
              loggedInUser = false;
              $rootScope.loggedInUser = null;
              resolve(logoutSuccess);
            })
            .catch(reject);
        });
      };

      return api;
    });
}());
