(function(){
	'use strict';

	var controllerId = 'MainController';

	angular
		.module('shack')
		.controller(controllerId, MainController)


		MainController.$inject = [
			'$scope',
			'$mdDialog',
			'$mdToast',
			'$mdSidenav',
			'$mdMedia',
			'carResource',
			'$window'
		];

		function MainController($scope, $mdDialog, $mdToast, $mdSidenav, $mdMedia, carResource, $window){
			$scope.show = false;
			$scope.searchText= '';
			$scope.cars = [];

			carResource.query(function(data) {
				$scope.cars = data;
			});


			$scope.toggleFilter = function () {
				$mdSidenav('left').toggle();
			};
			$scope.showSearch = function () {
				$scope.show = !$scope.show;
			}
			$scope.openToast = function (message) {
				$mdToast.show($mdToast.simple()
					.textContent(message)
					.position('bottom left')
					.hideDelay(3000));
			};

			$scope.addCar = function (ev) {

				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

				$mdDialog.show({
					templateUrl: './main/addCar.html',
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: useFullScreen
				}).then(function (car) {
					$scope.cars.push(car);
					$scope.openToast("Car added");
				}, function () {
					console.log('You cancelled the dialog.');
				});

			};
			$scope.goHub =function () {
				$window.location.href = 'https://github.com/alexpark90/shack';
			};
		}

})();