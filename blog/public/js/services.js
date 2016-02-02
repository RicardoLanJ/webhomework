'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

//register userServe
angular.module('myApp.services').factory('accountServe', accountServe);

function accountServe ($http, $q) {
	var accountServe = {};

	accountServe.checkUser = checkUser;
	accountServe.setCurrentUser = setCurrentUser;
	accountServe.addAccount = addAccount;
	accountServe.checkUserUnique = checkUserUnique;
	
	accountServe.currentUser = {};

	return accountServe;

	function checkUser (user) {
		return Promise.resolve('lalala');
	}

	function setCurrentUser (user) {
		currentUser = user;
	}

	function checkUserUnique (user) {
		var defer = $q.defer();
		$http
		.post('/accountApi/checkUnique', user)
		.success(function(unique){
			defer.resolve();
		});
		return defer.promise;
	}

	function addAccount (user) {
		$http.put('/accountApi/addAccount', user);
	}
}