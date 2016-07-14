(function () {
    "use strict"

    angular.module("shack")
        .factory('AuthRestangular', AuthRestangular)
        .factory('AuthenticationFactory', AuthenticationFactory);


    AuthRestangular.$inject = [
        '$state',
        '$rootScope',
        'Restangular',
        '$log',
        'ApplicationContext',
        'configuration'

    ];

    AuthenticationFactory.$inject = [
        '$rootScope',
        '$state',
        '$log',
        'AuthRestangular',
        'ApplicationContext',
        'eventConstants', 
        'ezfb'
    ];

    function AuthRestangular($state, $rootScope, Restangular, $log, ApplicationContext, configuration) {


        return Restangular.withConfig(function (RestangularConfigurer) {

            // use only if for some reason regular rest calls need to know the contents of headers
//        RestangularConfigurer.setFullResponse(true);

            // something like www.bearchoke.com:8080/api
            //$log.debug("Base URL is: " + configuration.baseUrl);
            RestangularConfigurer.setBaseUrl(configuration.restBaseUrl);

            // we want to tell restangular what version of the backend rest api we want to use plus include security tokens
            RestangularConfigurer.setDefaultHeaders(ApplicationContext.getHeaders());

            RestangularConfigurer.setDefaultHttpFields(ApplicationContext.getHttpFields());

            /*
             This is where we capture the x-auth-token we receive when we successfully log in
             */
            RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                if (response.headers('X-Auth-Token')) {
                    if (!data) {
                        data = {};
                    }

                    // add token to result
                    data.authToken = response.headers('X-Auth-Token');
                    ApplicationContext.setAuthToken(data.authToken);

                    // set updated headers on Restangular
                    RestangularConfigurer.setDefaultHeaders(ApplicationContext.getHeaders());
                }
                if (data.headerName === 'X-CSRF-TOKEN' && data.parameterName === '_csrf') {
                    //$log.info("CSRF token intercepted");
                    // add srf token to ApplicationContext
                    ApplicationContext.setCsrfToken(data);

                    // set updated headers on Restangular
                    RestangularConfigurer.setDefaultHeaders(ApplicationContext.getHeaders());
                }
                return data;
            });

            /*
             This is the interceptor we go to when we try to call a secured url
             */
            RestangularConfigurer.setErrorInterceptor(function (response, deferred) {
                //$log.error("Response URL: " + response.config.url);
                if (response.status === 401 && response.config.url.search(/\/authenticate/) === -1) {
                    $log.error("API Request unauthorized from state: " + $state.current.name);
                    $rootScope.$emit("event.login.unauthorized");
                    return false;
                }

                return true;
            });
        });

    }

    function AuthenticationFactory($rootScope, $state, $log, AuthRestangular, ApplicationContext, eventConstants, ezfb) {

        var self = {

            login: function (username, password, success, error) {

                $log.debug('Attempting to authenticate...');

                // authenticate with the server
                AuthRestangular.one('authenticate').customPOST({
                    username: username,
                    password: password
                }).then(function (data) {

                    // fire off successful login event
                    $log.debug("Firing off authentication success event");
                    $rootScope.$emit(eventConstants.authentication, {username: username, loginType: "Manual"});

                    self.getUser(success, error);
                }, function (data) {
                    $log.warn("Authentication failure: " + data.statusText);
                    self.clearAuth();

                    if (error) {
                        error("Could not verify email and password.");
                    }
                });

            },

            register: function (user, success, error) {
                $log.debug('Registering new user....');
                //$log.debug(user);

                // authenticate with the server
                AuthRestangular.one('user/register').customPOST(user).then(function (data) {

                    // fire off successful login event
                    $rootScope.$emit(eventConstants.registration, {
                        username: user.username,
                        registerType: "Manual"
                    });

                    // fire off success event
                    success();
                }, function (data) {
                    $log.error("Registration failure: " + data.statusText);

                    if (error) {
                        error("There was a problem with your registration.");
                    }
                });
            },

            logout: function (success) {
                $log.debug("Logging out user from session and server...");

                AuthRestangular.one('logout').get().then(function (data) {
                    $log.debug("User logged out from server successfully");
                }, function () {
                    $log.debug("Server logout failure");
                });

                // clear out everything on the front-end side related to the user session
                self.clearAuth();

                $rootScope.$emit(eventConstants.logout);

                if (success) {
                    success();
                }
            },

            remember: function (success, error) {
                var authToken = ApplicationContext.getAuthToken();
                if (authToken) {
                    $log.info("Checking for remember me user with token: " + authToken);
                    // Update the Auth headers
                    AuthRestangular.setDefaultHeaders(ApplicationContext.getHeaders());

                    self.getUser(success, error);
                }
            },

            resetPassword: function (email) {
                var promise = AuthRestangular.all('password/reset').post({email: email});
                return promise;
            },

            getUser: function (success, error) {
                // Get the logged in user information
//            $log.debug(ApplicationContext.getHeaders());
                $log.debug("Attempting to retrieve user");

                AuthRestangular.one('secured/user').get().then(function (data) {
                    $log.debug('Retrieved user successfully');
                    //$log.debug(data);
                    ApplicationContext.setUser({username: data.username, roles: data.roles});

                    if (success) {
                        // dispatch login success event
                        success(data);
                    }
                }, function (err) {
                    $log.error("getUser() failure: " + err.statusText);
                    self.clearAuth();

                    // DUBIOUS - probably want to move this into a controller
                    $state.go("home");

                    if (error) {
                        error("Could not verify email and password.  Please try again", err);
                    }
                });
            },

            clearAuth: function () {
                // Reset the values
                ApplicationContext.clear();

                // Reset the AuthRestangular headers
                AuthRestangular.setDefaultHeaders(ApplicationContext.getHeaders());
            },

            facebookLogin: function (success, error) {
                ezfb.login(function (res) {
                    if (res.authResponse) {
                        updateLoginStatus(updateApiMe, success, error);
                    }
                }, {scope: 'email'});
            }
        };

        /**
         * Update loginStatus result
         */
        function updateLoginStatus(more, success, error) {
            ezfb.getLoginStatus(function (res) {
                //$log.debug(res);

                (more || angular.noop)(success, error);
            });
        }

        /**
         * Retrieve facebook user's object and sync it with the server
         */
        function updateApiMe(success, error) {
            ezfb.api('/me?fields=id,email,name,first_name,last_name,picture{url},gender,link,locale,timezone,verified', function (res) {
                // authenticate with the server
                AuthRestangular.one('facebook').customPOST(res).then(function (data) {

                    // fire off successful login event
                    $rootScope.$emit(eventConstants.authentication, {username: res.email, loginType: "Facebook"});

                    self.getUser(success, error);
                }, function (data) {
                    $log.error("Failure: " + data.statusText);
                    self.clearAuth();

                    if (error) {
                        error("There was a problem with Facebook.");
                    }
                });
            });
        }

        //
        // EVENTS
        //
        $rootScope.$on("event.login.unauthorized", function () {
            $log.warn("Caught unauthorized event, redirect to login");
            self.clearAuth();
            $state.go("home");
        });

        return self;
    }

}());