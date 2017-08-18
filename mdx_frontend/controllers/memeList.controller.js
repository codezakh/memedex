(function () {
  angular.module('memeDex')
    .controller('MemeListController', function ($log, MemeListService) {
      var vm = this;

      function init() {
        MemeListService.getAllMemeLists()
          .then(function (allMemeLists) {
            $log.info(allMemeLists);
            vm.allMemeLists = allMemeLists.data;
          });
      }

      init();

      vm.listitems = [
        { _id: 1, value: 'apple' },
        { _id: 2, value: 'bapple' },
        { _id: 3, value: 'capple' },
        { _id: 4, value: 'dapple' },
        { _id: 5, value: 'eapple' },
      ];
      $log.info('landing controller invoked');
    });
}());
