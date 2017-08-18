(function () {
  angular.module('memeDex')
    .factory('UserService', function ($http) {
      var api = {
        findUserById: undefined,
        createUser: undefined,
        addUserToFavorites: undefined,
        getAllUsers: undefined,
        deleteUser: undefined,
        updateUser: undefined,
        getAllFavoritesForUser: undefined,
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

      api.updateUser = function (userId, user) {
        return $http.put(`/api/user/${userId}`, user);
      };

      api.getAllFavoritesForUser = function (userId) {
        return $http.get(`/api/user/${userId}/favorites`);
      };

      return api;
    });
}());
