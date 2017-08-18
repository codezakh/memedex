(function () {
  angular.module('memeDex')
    .factory('MemeListService', function ($http) {
      var api = {
        addMemeToList: undefined,
        getAllMemeLists: undefined,
        createMemeList: undefined,
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

      return api;
    });
}());
