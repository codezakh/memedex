(function () {
  angular.module('memeDex')
    .factory('MemeService', function ($http) {
      var api = {
        findMemeById: undefined,
        createMeme: undefined,
      };

      api.findMemeById = function (memeId) {
        return $http.get(`/api/meme/${memeId}`);
      };

      api.createMeme = function (meme) {
        return $http.post('/api/meme', meme);
      };

      return api;
    });
}());
