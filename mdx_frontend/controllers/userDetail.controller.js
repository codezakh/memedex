(function () {
  angular.module('memeDex')
    .controller('UserDetailController', function ($log, MemeListService, UserService, $routeParams) {
      var vm = this;
      var userId = $routeParams.userId;

      MemeListService.getAllMemeListsForUser(userId)
        .then(function (allMemeLists) {
          vm.allMemeLists = allMemeLists.data;
        });

      UserService.findUserById(userId)
        .then(function (foundUser) {
          vm.foundUser = foundUser.data;
          vm.foundFavoritedUsers = [];
          _.forEach(foundUser.favoritedUsers, function (favoritedUser) {
            UserService.findUserById(favoritedUser)
              .then(function (foundFavoritedUser) {
                vm.foundFavoritedUsers.push(foundFavoritedUser.data);
                $log.info(vm.foundFavoritedUsers);
              });
          });
        });
    });
}());
