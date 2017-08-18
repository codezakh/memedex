(function () {
  angular.module('memeDex')
    .controller('MemeListController', function ($log, MemeListService, AuthService, $route) {
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

      vm.createMemeList = function () {
        vm.newMemeList.owner = vm.loggedInUser._id;
        MemeListService.createMemeList(vm.newMemeList)
          .then(function () {
            $route.reload();
          });
      };

      $log.info('landing controller invoked');
    });
}());
