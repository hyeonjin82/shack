(function() {
    "use strict"

    angular.module('shack')
           .controller('AddCarController' , AddCarController);


    AddCarController.$inject = [
        '$scope',
        '$mdDialog'
    ];

    function AddCarController($scope, $mdDialog) {

        $scope.colors = ['red', 'blue', 'yellow', 'white', 'black'];

        $scope.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

        $scope.date = new Date();

        $scope.save = function () {
            $mdDialog.hide(this.car);
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }

}());