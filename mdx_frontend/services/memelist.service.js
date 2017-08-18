(function () {
  angular.module('memeDex')
    .factory('MemeListService', function ($http) {
      var api = {
        addMemeToList: undefined,
        getAllMemeLists: undefined,
      };

      api.addMemeToList = function (memeListId, memeId) {
        return $http.put(`/api/memelist/${memeListId}`, { addMeme: memeId });
      };

      api.getAllMemeLists = function () {
        return $http.get('/api/memelist');
      };

      return api;
    });
}());
