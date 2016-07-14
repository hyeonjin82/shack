(function() {
    "use strict"

    angular.module('shack')
           .controller('AddCarController' , AddCarController);


    AddCarController.$inject = [
        '$scope',
        '$mdDialog',
        'Upload',
        '$timeout'
    ];

    function AddCarController($scope, $mdDialog,  Upload, $timeout) {

        $scope.colors = ['red', 'blue', 'yellow', 'white', 'black'];

        $scope.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

        $scope.date = new Date();

        $scope.save = function (file) {
            file.upload = Upload.upload({
                url: 'https://localhost:8181/asset/images/',
                data: {username: this.car.id, file: file},
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            $mdDialog.hide(this.car);
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }

}());