(function () {
  angular.module('memeDex')
    .controller('LoginController', function ($log, $location, AuthService) {
      var vm = this;
      vm.login = function () {
        AuthService.logInUser(vm.user)
          .then(function () {
            return $location.path('/').replace();
          });
      };
    });
}());
