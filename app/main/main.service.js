(function() {
    "use strict"

    angular.module("shack")
        .factory("carResource", ["$resource", carResource]);

    function carResource($resource) {
        return $resource(
            'http://localhost:8080/shacksecu/api/car/:id',
            {id:'@id'},
            {
                update: {
                    method : 'PUT'
                }
            }
        );
    }

}());