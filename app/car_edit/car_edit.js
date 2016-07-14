/**
 * Created by jin on 2016-06-24.
 */
(function() {
    "use strict"

    angular.module('shack')
        .controller('EditCarController' , EditCarController);


    EditCarController.$inject = [
        '$scope',
        '$mdDialog',
        'FileUploader'
    ];

    function EditCarController($scope, $mdDialog, FileUploader) {

        // $scope.car = carResource.get({id: id}).$promise;

        var uploader = $scope.uploader = new FileUploader({
            url: '*'
        });

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        $scope.colors = ['red', 'blue', 'yellow', 'white', 'black'];

        $scope.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

        $scope.date = new Date();

        $scope.save = function () {
            $mdDialog.hide(this.car);
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };


        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }

}());