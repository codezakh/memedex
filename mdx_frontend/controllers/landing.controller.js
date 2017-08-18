(function () {
  angular.module('memeDex')
    .controller('LandingController', function ($log, MemeService, MemeListService,
      AuthService) {
      var vm = this;

      AuthService.getLoggedInUser()
        .then(function (response) {
          vm.loggedInUser = response.data;
        });

      function init() {
        MemeService.getAllMemes()
          .then(function (allMemes) {
            $log.info(allMemes);
            vm.allMemes = allMemes.data;
          });
      }

      init();

      vm.listitems = [
        { _id: 1, value: 'apple' },
        { _id: 2, value: 'bapple' },
        { _id: 3, value: 'capple' },
        { _id: 4, value: 'dapple' },
        { _id: 5, value: 'eapple' },
      ];
      $log.info('landing controller invoked');
    });
}());
