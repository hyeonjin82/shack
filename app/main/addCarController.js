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

        $scope.date = new Date();

        $scope.save = function () {
            $mdDialog.hide(this.car);
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }

}());