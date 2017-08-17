(function () {
  angular.module('memeDex')
    .controller('LandingController', function ($log) {
      var model = this;
      model.listitems = [
        { _id: 1, value: 'apple' },
        { _id: 2, value: 'bapple' },
        { _id: 3, value: 'capple' },
        { _id: 4, value: 'dapple' },
        { _id: 5, value: 'eapple' },
      ];
      $log.info('landing controller invoked');
    });
}());
