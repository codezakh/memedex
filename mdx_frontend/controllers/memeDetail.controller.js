(function () {
  angular.module('memeDex')
    .controller('MemeDetailController', function ($log, MemeService, $routeParams, AuthService) {
      var vm = this;

      AuthService.getLoggedInUser()
        .then(function (response) {
          vm.loggedInUser = response.data;
        });
      function init() {
        MemeService.findMemeById($routeParams.memeId)
          .then(function (retrievedMeme) {
            vm.retrievedMeme = retrievedMeme.data;
          });
      }

      init();
    });
}());
