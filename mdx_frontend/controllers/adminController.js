(function () {
  angular.module('memeDex')
    .controller('AdminController', function ($log, MemeService, $routeParams,
      UserService, MemeListService, $route) {
      var vm = this;

      function init() {
        UserService.getAllUsers()
          .then(function (allUsers) {
            vm.allUsers = allUsers.data;
            $log.info(allUsers);
          });
        MemeListService.getAllMemeLists()
          .then(function (allLists) {
            vm.allLists = allLists.data;
          });
      }

      init();

      vm.createUser = function () {
        UserService.createUser(vm.prospectiveUser)
          .then(function () {
            $route.reload();
          });
      };

      vm.deleteUser = function (userId) {
        UserService.deleteUser(userId)
          .then(function () {
            $route.reload();
          });
      };

      vm.createMemeList = function () {
        MemeListService.createMemeList(vm.newMemeList)
          .then(function () {
            $route.reload();
          });
      };
    });
}());
