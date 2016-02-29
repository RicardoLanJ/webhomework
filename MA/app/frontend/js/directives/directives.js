'use strict';

(function(){

	angular
    .module('MA')
    .directive('homeworkstatu', homeworkstatu);

	function homeworkstatu() {
		return {
			scope : {
				homeworkstatu : '='
			},
			restrict : 'A',
			link : linkFun,
		};

		function linkFun(scope, element, attrs) {
			var deadline = new Date(scope.homeworkstatu);
			var now = new Date(), upload = deadline.setDate(deadline.getDate() - 1);
			if (upload > now) {
				element.addClass('status-future').text('future');
			} else if (now > deadline) {
				element.addClass('status-present').text('present');
			} else {
				element.addClass('status-end').text('end');
			}
		}
	}

})();