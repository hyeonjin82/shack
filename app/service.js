(function () {
    "use strict"

    angular.module("shack")
        .service('Session', function () {
            this.create = function (data) {
                this.id = data.id;
                this.login = data.login;
                this.firstName = data.firstName;
                this.lastName = data.familyName;
                this.email = data.email;
                this.userRoles = [];
                angular.forEach(data.authorities, function (value, key) {
                    this.push(value.name);
                }, this.userRoles);
            };
            this.invalidate = function () {
                this.id = null;
                this.login = null;
                this.firstName = null;
                this.lastName = null;
                this.email = null;
                this.userRoles = null;
            };
            return this;
        }).service('AuthSharedService', function ($rootScope, $http, $resource, authService, Session) {
        return {
            login: function (userName, password, rememberMe) {
                var config = {
                    params: {
                        username: userName,
                        password: password
                    },
                    ignoreAuthModule: 'ignoreAuthModule'
                };
                $http.post('http://localhost:8080/shacksecu/api/authenticate', '', config)
                    .success(function (data, status, headers, config) {
                        authService.loginConfirmed(data);
                    }).error(function (data, status, headers, config) {
                    $rootScope.authenticationError = true;
                    Session.invalidate();
                });
            },
            getAccount: function () {
                $rootScope.loadingAccount = true;
                $http.get('account/profile')
                    .then(function (response) {
                        authService.loginConfirmed(response.data);
                    });
            },
            isAuthorized: function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    if (authorizedRoles == 'user') {
                        return true;
                    }
                    authorizedRoles = [authorizedRoles];
                }
                var isAuthorized = false;
                angular.forEach(authorizedRoles, function (authorizedRole) {
                    var authorized = (!!Session.login &&
                    Session.userRoles.indexOf(authorizedRole) !== -1);
                    if (authorized || authorizedRole == 'user') {
                        isAuthorized = true;
                    }
                });
                return isAuthorized;
            },
            logout: function () {
                $rootScope.authenticationError = false;
                $rootScope.authenticated = false;
                $rootScope.account = null;
                $http.get('logout');
                Session.invalidate();
                authService.loginCancelled();
            }
        };
    }).service('UsersService', function ($log, $resource) {
        return {
            getAll: function () {
                var userResource = $resource('users', {}, {
                    query: {method: 'GET', params: {}, isArray: true}
                });
                return userResource.query();
            }
        }
    });

}());

