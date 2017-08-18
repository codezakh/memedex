(function () {
  angular.module('memeDex')
    .factory('AuthService', function ($http) {
      var api = {
        logInUser: undefined,
        logOutUser: undefined,
        getLoggedInUser: undefined,
      };
      var loggedInUser;

      api.getLoggedInUser = function () {
        return loggedInUser;
      };

      api.logInUser = function (userCredentials) {
        return new Promise(function (resolve, reject) {
          $http.post('/api/auth/login', userCredentials)
            .then(function (loginSuccessful) {
              loggedInUser = loginSuccessful.data;
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
              resolve(logoutSuccess);
            })
            .catch(reject);
        });
      };

      return api;
    });
}());
