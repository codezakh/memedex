(function () {
  angular.module('memeDex')
    .controller('RegisterController', function ($log, $location, AuthService, UserService) {
      var vm = this;
      vm.createUser = function () {
        UserService.createUser(vm.user)
          .then(function (createdUser) {
            console.log(createdUser)
            AuthService.logInUser(vm.user)
              .then(function () {
                return $location.path('/').replace();
              });
          });
      };
      vm.login = function () {
        AuthService.logInUser(vm.user)
          .then(function () {
            return $location.path('/').replace();
          });
      };
    });
}());
