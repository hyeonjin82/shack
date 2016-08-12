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
			'$window',
			'carService'
		];

		function MainController($scope, $mdDialog, $mdToast, $mdSidenav, $mdMedia, carResource, $window,carService){
			$scope.show = false;
			$scope.searchText= '';
			$scope.cars = [];

			carService.allCars().then(function (data) {
				$scope.cars = data;
			}, function (errResponse) {

			});

			// carResource.query(function(data) {
			// 	$scope.cars = data;
			// });

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
					carResource.save(car);
					$scope.openToast("Car added");
				}, function () {
					console.log('You cancelled the dialog.');
				});

			};

			$scope.editCar = function (ev, id) {

				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

				$scope.car = carResource.get({id: id}).$promise;

				$mdDialog.show({
					templateUrl: './car_edit/car_edit.html',
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: useFullScreen,
					locals: {
						car: $scope.car
					}
				}).then(function (car) {
					// $scope.cars.push(car);
					// carResource.save(car);
					$scope.openToast("Car updated");
				}, function () {
					console.log('You cancelled the dialog.');
				});

			};

			$scope.signIn = function (ev) {

				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

				$mdDialog.show({
					templateUrl: './user/login/login.html',
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: useFullScreen
				}).then(function (car) {
					// $scope.cars.push(car);
					// carResource.save(car);
					// $scope.openToast("Car added");
				}, function () {
					console.log('You cancelled the dialog.');
				});

			};
			
			$scope.goHub =function () {
				$window.location.href = 'https://gitlab.com/HyeonjinLee/Shack-Security_Backend';
			};
		}

})();