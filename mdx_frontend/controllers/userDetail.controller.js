(function () {
  angular.module('memeDex')
    .controller('UserDetailController', function ($log, MemeListService, UserService, $routeParams, AuthService, $route) {
      var vm = this;
      var userId = $routeParams.userId;


      AuthService.getLoggedInUser()
        .then(function (response) {
          vm.loggedInUser = response.data;
          vm.hideFavoriteButton = _.find(vm.loggedInUser.favoritedUsers, userId);
        });

      MemeListService.getAllMemeListsForUser(userId)
        .then(function (allMemeLists) {
          vm.allMemeLists = allMemeLists.data;
        });

      UserService.findUserById(userId)
        .then(function (foundUser) {
          vm.foundUser = foundUser.data;
          UserService.getAllFavoritesForUser(userId)
            .then(function (foundFavorites) {
              vm.foundFavoritedUsers = foundFavorites.data;
            });
        });

      vm.followUser = function () {
        UserService.addUserToFavorites(vm.loggedInUser._id, userId)
          .then(function () {
            vm.hideFavoriteButton = true;
            $route.reload();
          });
      };
    });
}());
