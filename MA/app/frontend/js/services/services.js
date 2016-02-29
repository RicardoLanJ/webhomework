'use strict';

(function(){
	angular
    .module('MA')
    .factory('homeworkService', homeworkService);

	homeworkService.$inject = ['$http', '$q'];

	function homeworkService($http, $q) {
		var AllHomework = [];

		var service = {
			AllHomework : AllHomework, 
			createHomework : createHomework,
			readHomework : readHomework,
			updateHomework : updateHomework,
			deleteHomework : deleteHomework,
		};
		return service;

		function createHomework(newHomework) {
			console.log('create homeworks');
			
			$http.post('/homeworkTask/create', newHomework)
				.success(function(mes) {
					//
					if (mes) console.log(mes);
					console.log('create new homework');
				})
				.error(function (error, status) {
					console.log(error + ' (code:' + status + ')');
				});
			
		}

		function readHomework() {
			console.log('read homeworks');
			var defered = $q.defer();
			$http.get('/homeworkTask')
				.success(function(data) {
					if (data === '0') {
						console.log('no homework');
						AllHomework = [];
					} else {
						AllHomework = data;
						console.log(data);				
					}
					defered.resolve(AllHomework);
				})
				.error(function (error, status) {
					console.log(error + ' (code:' + status + ')');
				});
			return defered.promise;
		}

		function updateHomework(newHomework) {                    //un ok
			console.log('update homeworks');
			$http.put('/homeworkTask/' + newHomework._id , newHomework)
				.success(function() {
					//
					console.log('update new homework');
				})
				.error(function (error, status) {
					console.log(error + ' (code:' + status + ')');
				});
		}

		function deleteHomework(theHomework) {
			console.log('delete homeworks' );
			$http.delete('/homeworkTask/' + theHomework._id)
				.success(function(data) {
					console.log('delete a homework');
				})
				.error(function (error, status) {
					console.log(error + ' (code:' + status + ')');
				});
		}
	}
})();

(function(){
	angular
    .module('MA')
    .factory('DatePickService', DatePickService);

    DatePickService.$inject = [];

    function DatePickService() {
    	var theTime = new Date();

    	var service = {
    		setTime : setTime,
    		getTime : getTime,
    	};
    	return service;

    	function setTime(newtime) {
    		theTime = newtime;
    	}

    	function getTime() {
    		return theTime;
    	}
    }

})();