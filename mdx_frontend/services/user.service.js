(function () {
  angular.module('memeDex')
    .factory('UserService', function ($http) {
      var api = {
        findUserById: undefined,
        createUser: undefined,
        addUserToFavorites: undefined,
        getAllUsers: undefined,
        deleteUser: undefined,
      };

      api.findUserById = function (userId) {
        return $http.get(`/api/user/${userId}`);
      };

      api.createUser = function (user) {
        return $http.post('/api/user', user);
      };

      api.addUserToFavorites = function (userId, userToFavoriteId) {
        return $http.patch(`/api/user/${userId}`, { addFavorite: userToFavoriteId });
      };

      api.getAllUsers = function () {
        return $http.get('/api/user');
      };

      api.deleteUser = function (userId) {
        return $http.delete(`/api/user/${userId}`);
      };

      return api;
    });
}());
