(function () {
  angular.module('memeDex')
    .factory('MemeListService', function ($http) {
      var api = {
        addMemeToList: undefined,
        getAllMemeLists: undefined,
        createMemeList: undefined,
        deleteMemeList: undefined,
        updateMemeList: undefined,
        getAllMemeListsForUser: undefined,
      };

      api.addMemeToList = function (memeListId, memeId) {
        return $http.put(`/api/memelist/${memeListId}`, { addMeme: memeId });
      };

      api.getAllMemeLists = function () {
        return $http.get('/api/memelist');
      };

      api.createMemeList = function (memelist) {
        return $http.post('/api/memelist', memelist);
      };

      api.deleteMemeList = function (memeListId) {
        return $http.delete(`/api/memelist/${memeListId}`);
      };

      api.updateMemeList = function (memeListId, memeList) {
        return $http.put(`/api/memelist/${memeListId}`, memeList);
      };

      api.getAllMemeListsForUser = function (userId) {
        return $http.get(`/api/memelist?user=${userId}`);
      };

      return api;
    });
}());
