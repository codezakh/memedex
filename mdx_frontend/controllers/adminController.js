(function () {
  angular.module('memeDex')
    .controller('AdminController', function ($log, MemeService, $routeParams,
      UserService, MemeListService, $route, AuthService) {
      var vm = this;

      AuthService.getLoggedInUser()
        .then(function (response) {
          vm.loggedInUser = response.data;
        });
      function init() {
        UserService.getAllUsers()
          .then(function (allUsers) {
            vm.allUsers = allUsers.data;
          });
        MemeListService.getAllMemeLists()
          .then(function (allLists) {
            vm.allLists = allLists.data;
          });
        MemeService.getAllMemes()
          .then(function (allMemes) {
            vm.allMemes = allMemes.data;
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

      vm.addUserToFavorites = function (userId) {
        UserService.addUserToFavorites(userId, vm.newFavorite)
          .then(function () {
            $route.reload();
          });
      };

      vm.updateUser = function (userId, user) {
        UserService.updateUser(userId, user)
          .then(function () {
            $route.reload();
          });
      };

      vm.removeFavorite = function (userFavoriteIdx, user) {
        user.favoritedUsers.splice(userFavoriteIdx, 1);
        vm.updateUser(user._id, user);
      };

      vm.createMemeList = function () {
        MemeListService.createMemeList(vm.newMemeList)
          .then(function () {
            $route.reload();
          });
      };

      vm.deleteMemeList = function (memeListId) {
        MemeListService.deleteMemeList(memeListId)
          .then(function () {
            $route.reload();
          });
      };

      vm.updateMemeList = function (memeListId, memeList) {
        MemeListService.updateMemeList(memeListId, memeList)
          .then(function () {
            $route.reload();
          });
      };

      vm.addMemeToList = function (memeListId) {
        MemeListService.addMemeToList(memeListId, vm.newMemeToList)
          .then(function () {
            $route.reload();
          });
      };

      vm.removeMemeFromList = function (addMemeIdx, memeList) {
        memeList.containedMemes.splice(addMemeIdx, 1);
        MemeListService.updateMemeList(memeList._id, memeList)
          .then(function () {
            $route.reload();
          });
      };
    });
}());
