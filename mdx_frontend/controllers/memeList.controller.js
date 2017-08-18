(function () {
  angular.module('memeDex')
    .controller('MemeListController', function ($log, MemeListService, AuthService) {
      var vm = this;

      AuthService.getLoggedInUser()
        .then(function (response) {
          vm.loggedInUser = response.data;
        });
      function init() {
        MemeListService.getAllMemeLists()
          .then(function (allMemeLists) {
            $log.info(allMemeLists);
            vm.allMemeLists = allMemeLists.data;
          });
      }

      init();

      $log.info('landing controller invoked');
    });
}());
