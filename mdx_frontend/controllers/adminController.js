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
      }

      init();

      vm.createUser = function () {
        $log.info(vm.prospectiveUser);
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
    });
}());
