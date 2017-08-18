(function () {
  angular.module('memeDex')
    .controller('MemeDetailController', function ($log, MemeService, $routeParams) {
      var vm = this;

      function init() {
        MemeService.findMemeById($routeParams.memeId)
          .then(function (retrievedMeme) {
            vm.retrievedMeme = retrievedMeme.data;
          });
      }

      init();
    });
}());
