(function () {
  angular.module('memeDex')
    .factory('UserService', function ($http) {
      var api = {
        findUserById: undefined,
        createUser: undefined,
        addUserToFavorites: undefined,
      };

      api.findUserById = function (userId) {
        return $http.get(`/api/user/${userId}`);
      };

      api.createUser = function (user) {
        return $http.post('/api/user', user);
      };

      api.addUserToFavorites = function (userId, userToFavoriteId) {
        return $http.post(`/api/user/${userId}`, { addFavorite: userToFavoriteId });
      };
    });
}());
