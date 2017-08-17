(function () {
  angular.module('memeDex')
    .factory('MemeListService', function ($http) {
      var api = {
        addMemeToList: undefined,
      };

      api.addMemeToList = function (memeListId, memeId) {
        return $http.put(`/api/memelist/${memeListId}`, { addMeme: memeId });
      };

      return api;
    });
}());
