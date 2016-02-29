//login controller
// control as

(function() { //iife

	angular.module('MA')
	.controller('signinCtrl', signinCtrl);

	function signinCtrl ($scope, $http, $location) {
		var vm = this;
		vm.user = {};
		vm.signInMessage = '';
		vm.signin = signin;
		vm.validator = validator;


		function signin () {
			console.log(vm.user);
			$http.post('/signin', vm.user)
				.success(function() {
					console.log('ok');                     //delete me
					$location.path('/admin');
				})
				.error(function(data,tentatives) {
					console.log(data);                     //delete me
					//
				});
		}

		function validator () {
			return (vm.user.username !== '' && vm.user.password !== '');
		}

		/*var dev = true;
		function addAdmin () {   //for test
			if (!dev) return;
			console.log('admin ok');                     //delete me
			dev = false;
			var user = {};
			user.username = 'whoisyourdad';                                      //admin had set
			user.password = 'showmethemoney';
			user.remember = false;
			console.log(user);                     //delete me
			$http.post('/signup', user).success(function () {
				console.log('signup ok');                     //delete me
		    	$location.path='/admin';
		    })
		    .error(function (data) {
		    	console.log(data);                     //delete me
		    	$scope.signUpMessage = data;
		    });
		    return true;
		}*/
	}

})();
