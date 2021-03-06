(function () {
  angular.module('memeDex')
    .controller('LandingController', function ($log, MemeService, MemeListService,
      AuthService, $route) {
      var vm = this;
      vm.showSuccessfulAddition = false;
      AuthService.getLoggedInUser()
        .then(function (response) {
          vm.loggedInUser = response.data;
          MemeListService.getAllMemeListsForUser(vm.loggedInUser._id)
            .then(function (allMemeListsResponse) {
              vm.listitems = allMemeListsResponse.data;
            });
        });

      function init() {
        MemeService.getAllMemes()
          .then(function (allMemes) {
            $log.info(allMemes);
            vm.allMemes = allMemes.data;
            vm.filteredMemes = vm.allMemes;
          });
      }

      init();

      vm.addMemeToList = function (memeListId) {
        console.log(vm.selectedMemeId);
        MemeListService.addMemeToList(memeListId, vm.selectedMemeId)
          .then(function (success) {
            vm.showSuccessfulAddition = true;
          });
      };

      vm.selectMeme = function (memeId) {
        vm.showSuccessfulAddition = false;
        vm.selectedMemeId = memeId;
      };

      vm.searchMemes = function () {
        vm.filteredMemes = _.filter(vm.filteredMemes, function (singleMeme) {
          return _.includes(singleMeme.memeText.toLowerCase(), vm.memeSearchBoxValue.toLowerCase());
        });
      };
      $log.info('landing controller invoked');
    });
}());
