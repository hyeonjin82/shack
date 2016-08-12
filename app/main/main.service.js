(function() {
    "use strict"

    angular.module("shack")
        .factory("carResource", ["$resource", carResource])
        .factory("carService",['$http', '$q', carService]);

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

    function carService($http, $q) {

        return {

            allCars: function() {
                console.log("all cars");
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/SpringHibernateRestService/api/car/list'
                }).then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('Error while get car list!!');
                            return $q.reject(errResponse);
                        }
                    );
            },

            detailCar: function(carId) {
                console.log("detail car");
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/SpringHibernateRestService/api/car/' + carId
                }).then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while get detail car!!');
                        return $q.reject(errResponse);
                    }
                );
            }

            // createUser: function(user){
            //     return $http.post('http://localhost:8080/SpringMVC4RestAPI/user/', user)
            //         .then(
            //             function(response){
            //                 return response.data;
            //             },
            //             function(errResponse){
            //                 console.error('Error while creating user');
            //                 return $q.reject(errResponse);
            //             }
            //         );
            // },
            //
            // updateUser: function(user, id){
            //     return $http.put('http://localhost:8080/SpringMVC4RestAPI/user/'+id, user)
            //         .then(
            //             function(response){
            //                 return response.data;
            //             },
            //             function(errResponse){
            //                 console.error('Error while updating user');
            //                 return $q.reject(errResponse);
            //             }
            //         );
            // },
            //
            // deleteUser: function(id){
            //     return $http.delete('http://localhost:8080/SpringMVC4RestAPI/user/'+id)
            //         .then(
            //             function(response){
            //                 return response.data;
            //             },
            //             function(errResponse){
            //                 console.error('Error while deleting user');
            //                 return $q.reject(errResponse);
            //             }
            //         );
            // }

        };

    }

}());