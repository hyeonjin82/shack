(function(){
    'use strict';
    
    angular
        .module('shack')
        .controller('CarDetailController', CarDetailController);

    CarDetailController.$inject = [
        '$scope',
        'car'
    ];

    function CarDetailController($scope, car){
        $scope.car = car;
    }
})();