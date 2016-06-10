(function() {
    "use strict"

    angular.module("shack")
        .factory("carResource", ["$resource", carResource]);
    
    function carResource($resource) {
        return $resource("/api/cars/:serial");
    }

}());