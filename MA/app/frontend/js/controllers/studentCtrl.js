(function() {
	angular.module('MA')
	.controller('studentCtrl', studentCtrl);

	studentCtrl.$inject = ['homeworkService'];

	function studentCtrl(homeworkService) {
		var vm = this;

		homeworkService.readHomework().then(function(data){
			vm.AllHomework = data;
			console.log(vm.AllHomework);
		});
	}


})();