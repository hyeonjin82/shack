(function(){
    "use strict"

    angular.module("carResourceMock", ["ngMockE2E"])
        .run(function($httpBackend) {
        var cars = [
            {
                "id": 1,
                "serial": 234233,
                "make": "TESLA",
                "model": "MRX",
                "color": "red",
                "year": 2014,
                "regdate": "2012/01/01",
                "enginetype": "V6",
                "listprice": 57838,
                "image": "car.jpg",
                "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            },
            {
                "id": 2,
                "serial": 23455,
                "make": "LANDROVER",
                "model": "XKR",
                "color": "red",
                "year": 2013,
                "regdate": "2012/01/01",
                "enginetype": "V4",
                "listprice": 63617,
                "image": "car2.jpg",
                "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s the industry's standard dummy text ever since the 1500s"
            },
            {
                "id": 3,
                "serial": 456545,
                "make": "MERCE",
                "model": "RX4",
                "color": "white",
                "year": 2008,
                "regdate": "2012/01/01",
                "enginetype": "V8",
                "listprice": 47805,
                "image": "car2.jpg",
                "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  the industry's standard dummy text ever since the 1500s the industry's standard dummy text ever since the 1500s the industry's standard dummy text ever since the 1500s"
            },
            {
                "id": 4,
                "serial": 456454,
                "make": "aaaaa",
                "model": "RX8",
                "color": "black",
                "year": 2001,
                "regdate": "2012/01/01",
                "enginetype": "V8",
                "listprice": 47805,
                "image": "car.jpg",
                "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  the industry's standard dummy text ever since the 1500s the industry's standard dummy text ever since the 1500s "
            },
            {
                "id": 5,
                "serial": 45655,
                "make": "bbbbb",
                "model": "RX5",
                "color": "blud",
                "year": 2002,
                "regdate": "2012/01/01",
                "enginetype": "V8",
                "listprice": 47805,
                "image": "car2.jpg",
                "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s"
            },
            {
                "id": 100,
                "serial": 456545,
                "make": "cccccc",
                "model": "RX6",
                "color": "glay",
                "year": 2003,
                "regdate": "2012/01/01",
                "enginetype": "V8",
                "listprice": 47805,
                "image": "car.jpg",
                "description" : "Lorem setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s been the industry's standard dummy text ever since the 1500s"

            }];

        var carUrl = "/api/cars";

        $httpBackend.whenGET(carUrl).respond(cars);

        var editingRegex = new RegExp(carUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var car = {"id": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < cars.length; i++) {
                    if (cars[i].id == id) {
                        car = cars[i];
                        break;
                    }
                };
            }
            return [200, car, {}];
        });

        $httpBackend.whenPOST(carUrl).respond(function (method, url, data) {
           var car = angular.fromJson(data);
            
            if(!car.id) {
                car.id = cars[cars.length - 1].id + 1;
                cars.push(car);
             } else {
                for (var i = 0; i < cars.length; i++) {
                    if(cars[i].id == car.id) {
                        cars[i] = car;
                        break;
                    }
                }
            }
            return [200, car, {}];
        });


        $httpBackend.whenGET(/\.html$/).passThrough();
        $httpBackend.whenGET(/asset/).passThrough();
    });
}());