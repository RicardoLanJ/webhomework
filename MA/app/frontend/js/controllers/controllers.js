'use strict';

/*---------------------HomeworkManagerCtrl----------------*/
(function() {
	angular.module('MA')
	.controller('HomeworkModalInstanceCtrl', HomeworkModalInstanceCtrl)
	.controller('TimePickerCtrl', TimePickerCtrl)
	.controller('HomeworkManagerCtrl', HomeworkManagerCtrl);
	
	
	HomeworkManagerCtrl.$inject = ['$uibModal', 'homeworkService'];
	HomeworkModalInstanceCtrl.$inject = ['$uibModalInstance', 'homeworkService', 'thisHomework', 'isAdd', 'DatePickService'];

	function HomeworkManagerCtrl($uibModal, homeworkService) {
		var vm = this;

		vm.CulUploadDay = CulUploadDay;
		vm.OpenChangeModal = OpenChangeModal;

		//init
		homeworkService.readHomework().then(function(data){
			vm.AllHomework = data;
			console.log('load homework finish');

		});
		

		//fun
		function OpenChangeModal(HomeworkIndex) {
			var alterHomework = {};
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'ModifyBox.html',
				controller: 'HomeworkModalInstanceCtrl',
				controllerAs: 'ModifyBox',
				resolve: {
					isAdd : function() {
						return (HomeworkIndex === -1);
					},
					thisHomework : function() {
						angular.copy(vm.AllHomework[HomeworkIndex], alterHomework);
						alterHomework.index = HomeworkIndex;
						return alterHomework;
					}
				}
			});

			modalInstance.result.then(handle, cancel);

			function handle(dowhat) {
				var index = alterHomework.index;
				delete alterHomework.index;
				
				if (dowhat === 'save') {
					vm.AllHomework[index] = alterHomework;
					//homeworkService do something here
					homeworkService.updateHomework(alterHomework);
				} else if (dowhat === 'delete') {
					vm.AllHomework.splice(index, 1);
					//homeworkService do something here
					homeworkService.deleteHomework(alterHomework);
				} else if (dowhat === 'add') {
					vm.AllHomework.unshift(alterHomework);
					homeworkService.createHomework(alterHomework);
					//
				} else {
					console.log('homework hasn\'t changed');
				}
			}

			function cancel() {
				//empty
			}
		}
	}

	function HomeworkModalInstanceCtrl($uibModalInstance, homeworkService, thisHomework, isAdd, DatePickService) {
		var vm = this;

		vm.oldHomework = {};
		vm.newHomework = thisHomework;
		angular.copy(thisHomework, vm.oldHomework);
		vm.title = '';
		vm.buttonShow = true;

		active();

		function active() {
			if (isAdd) {
				vm.title = '添加作业';
				vm.buttonShow = false;
			} else {
				vm.title = '修改作业';
				vm.buttonShow = true;
			}
		}

		vm.delete = function() {
			$uibModalInstance.close('delete');
		};

		vm.save = function() {
			thisHomework.deadline = DatePickService.getTime();
			thisHomework.deadline.setHours(23);
			thisHomework.deadline.setMinutes(0);
			if (vm.oldHomework !== thisHomework)
				$uibModalInstance.close('save');
			else
				$uibModalInstance.close(null);
		};

		vm.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		vm.add = function() {
			thisHomework.setupTime = new Date();
			thisHomework.deadline = DatePickService.getTime();
			thisHomework.deadline.setHours(23);
			thisHomework.deadline.setMinutes(0);
			//thisHomework.uploadTime = d.setDate(d.getDate() - 5);
			$uibModalInstance.close('add');
		};
	}

	TimePickerCtrl.$inject = ['DatePickService']
	function TimePickerCtrl(DatePickService) {
		var vm = this;

		vm.open = open;
		vm.dt = new Date();
		vm.minDate = new Date();
		vm.change = change;

		function open() {
			vm.opened = true;
		}

		function change() {
			DatePickService.setTime(vm.dt);
			console.log(vm.dt);
		}
	}

	function CulUploadDay(deadline) {
		var newdeadline = new Date(deadline);
		return newdeadline.setDate(newdeadline.getDate() - 1);
	}

})();

(function(){
	angular.module('MA')
	.controller('StudentModalInstanceCtrl', StudentModalInstanceCtrl)
	.controller('StudentManagerCtrl', StudentManagerCtrl);

	StudentManagerCtrl.$inject = ['$uibModal'];
	function StudentManagerCtrl($uibModal) {
		var vm = this;
		
		var Tas = [
			{
				username: 'ta',
				role: 'TA',
			}
		];

		var students = [
			{
				username: '大伟',
				role: 'student',
			}
		];
		vm.students = students;
		vm.Tas = Tas;

		

		vm.OpenAddModal = OpenAddModal;

		function OpenAddModal(index) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'addStudentBox.html',
				controller: 'StudentModalInstanceCtrl',
				controllerAs: 'StuBox',
				resolve: {}
			});

			modalInstance.result.then(handle, cancel);

			function handle() {
				
			}

			function cancel() {
				
			}
		}
		
	}

	StudentModalInstanceCtrl.$inject = ['$uibModalInstance'];
	function StudentModalInstanceCtrl($uibModalInstance) {
		var vm = this;

		vm.title = '干干干';

		vm.cancel = cancel;


		function cancel() {
			$uibModalInstance.dismiss('cancel');
		};
	}


})();