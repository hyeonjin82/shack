(function(){
	'use strict';

	var controllerId = 'MainController';

	angular
		.module('shack')
		.controller(controllerId, MainController);

		MainController.$inject = [
			'$scope',
			'$mdDialog',
			'$mdToast'
		];

		function MainController($scope, $mdDialog, $mdToast, $mdSidenav){
			var vm = this;
			vm.$mdSidenav = $mdSidenav;

			vm.cars = [
				{
					"serial": 154204,
					"make": "TESLA",
					"model": "MRX",
					"color": "red",
					"year": 2014,
					"enginetype": "V6",
					"listprice": 57838,
					"image": "pic0.jpg"
				},
				{
					"serial": 857088,
					"make": "LANDROVER",
					"model": "XKR",
					"color": "red",
					"year": 2013,
					"enginetype": "V4",
					"listprice": 63617,
					"image": "pic1.jpg"
				},
				{
					"serial": 948559,
					"make": "MERCEDES",
					"model": "RX4",
					"color": "white",
					"year": 2008,
					"enginetype": "V8",
					"listprice": 47805,
					"image": "pic2.jpg"
				}];

			vm.toggleSideNav = function () {
				vm.$mdSidenav('left').toggle();
			};
		}
})();