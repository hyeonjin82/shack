(function(){
	'use strict';

	var controllerId = 'MainController';

	angular
		.module('shack')
		.controller(controllerId, MainController)
		.controller('addCarController', addCarController);

		MainController.$inject = [
			'$scope',
			'$mdDialog',
			'$mdToast',
			'$mdSidenav',
			'$mdMedia'
		];

		function MainController($scope, $mdDialog, $mdToast, $mdSidenav, $mdMedia){
			$scope.searchCar = '';
			$scope.show = false;
			$scope.searchText= '';

			$scope.cars = [
				{
					"serial": 1,
					"make": "TESLA",
					"model": "MRX",
					"color": "red",
					"year": 2014,
					"enginetype": "V6",
					"listprice": 57838,
					"image": "car.jpg",
					"des" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
				},
				{
					"serial": 2,
					"make": "LANDROVER",
					"model": "XKR",
					"color": "red",
					"year": 2013,
					"enginetype": "V4",
					"listprice": 63617,
					"image": "car2.jpg",
					"des" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s the industry's standard dummy text ever since the 1500s"
				},
				{
					"serial": 3,
					"make": "MERCEDES",
					"model": "RX4",
					"color": "white",
					"year": 2008,
					"enginetype": "V8",
					"listprice": 47805,
					"image": "car2.jpg",
					"des" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  the industry's standard dummy text ever since the 1500s the industry's standard dummy text ever since the 1500s the industry's standard dummy text ever since the 1500s"
				},
				{
					"serial": 4,
					"make": "aaaaa",
					"model": "RX8",
					"color": "black",
					"year": 2001,
					"enginetype": "V8",
					"listprice": 47805,
					"image": "car.jpg",
					"des" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  the industry's standard dummy text ever since the 1500s the industry's standard dummy text ever since the 1500s "
				},
				{
					"serial": 5,
					"make": "bbbbb",
					"model": "RX5",
					"color": "blud",
					"year": 2002,
					"enginetype": "V8",
					"listprice": 47805,
					"image": "car2.jpg",
					"des" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s"
				},
				{
					"serial": 100,
					"make": "cccccc",
					"model": "RX6",
					"color": "glay",
					"year": 2003,
					"enginetype": "V8",
					"listprice": 47805,
					"image": "car.jpg",
					"des" : "Lorem setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s"

				}];

			$scope.toggleFilter = function () {
				$mdSidenav('left').toggle();
			};
			$scope.showSearch = function () {
				$scope.show = !$scope.show
			}
			$scope.openToast = function (message) {
				$mdToast.show($mdToast.simple()
					.textContent(message)
					.position('top right')
					.hideDelay(3000));
			};

			$scope.addCar = function (ev) {

				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
				$mdDialog.show({
					controller: addCarController,
					templateUrl: './main/addCar.html',
					// parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: useFullScreen
				}).then(function (car) {
					console.log('car',car);
					var newCar = {"serial": 100,
						"make": "eeeee",
						"model": "RX7",
						"color": "green",
						"year": 2000,
						"enginetype": "V8",
						"listprice": 47805,
						"image": "car.jpg",
						"des" : "Lorem setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
					};
					$scope.cars.push(newCar);

					$scope.openToast("Car added");

					console.log('You said the information was.');
				}, function () {
					console.log('You cancelled the dialog.');
				});

			};

			$scope.findCar = function() {
				console.log('aasa');
			}

		}

	function addCarController($scope, $mdDialog) {

		$scope.colors = ['red', 'blue', 'yellow', 'white', 'black'];

		$scope.save = function () {
			console.log('add');
			$mdDialog.hide(this.car);
		};
		$scope.cancel = function () {
			console.log('cancel');
			$mdDialog.cancel();
		};

	}
})();