'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

//register userServe
angular.module('myApp').factory('userServe', userServe);

userServe.$inject = [];

function userServe () {
	var userServe = {};
	userServe.checkUser = checkUser;

	return userServe;

	function checkUser (user) {
		return Promise.resolve('lalala');
	}
}