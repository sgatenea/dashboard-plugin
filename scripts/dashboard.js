var app = angular.module("dashboard", []);
app.service("dashSrv", function( $rootScope ) {
	this.getStats = function( s, f ) {
	};
});
app.controller("dashctrl", function( $scope, $interval, dashSrv ) {
    console.log('controller load!');
	var vm = this;
    vm.test = {};
    vm.txt = 'fail';
    vm.showMenu = false;
    vm.sticky = loadStickies();
    vm.newSticky = function() {
      var s = newSticky();
      vm.sticky.push(s);
    };
    vm.deleteSticky = function(id) {
      console.log('remove', id);
      vm.sticky = removeSticky(id);
    };

    vm.calc = createCalculator();
    vm.log = function(msg) {
      console.log(msg);
    };

    vm.clock = getClock();
    $interval(function() {
      vm.clock.time = Date.now();
      vm.clock.update();
    }, 1000);

});
