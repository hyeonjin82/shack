(function() {
    "use strict"

    angular.module('shack')
        .controller('LoginController' , LoginController)
        .controller('LogoutController' , LogoutController);


    LoginController.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        '$timeout',
        '$log',
        'AuthSharedService',
        'AuthenticationFactory'

    ];

    LogoutController.$inject = [
        'AuthSharedService'
    ];

    function LoginController($rootScope, $scope, $mdDialog, $timeout, $log, AuthSharedService, AuthenticationFactory) {

        $scope.rememberMe = true;
        $scope.login = function () {
                      // $rootScope.authenticationError = false;
            // AuthSharedService.login(
            //     $scope.username,
            //     $scope.password,
            //     $scope.rememberMe
            // );

            $log.debug('Logging in with username: ' + $scope.username + ', password: ' + $scope.password);
            AuthenticationFactory.login($scope.username, $scope.password, onLoginSuccess, onLoginFailure);
        }



        $scope.save = function () {
            $mdDialog.hide(this.car);
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        var onLoginSuccess = function () {
            $log.debug('Login was successful. Handling success workflow.');

            $timeout(function () {
                // Check for a pre-login state
                var preLoginState = ApplicationContext.getPreLoginState();
                if (preLoginState) {
                    $log.debug('Found pre login state ' + preLoginState.toState);
                    $state.go(preLoginState.toState, preLoginState.toParams, {reload: true});
                } else {
                    $state.reload();
                }
            });
        };

        var onLoginFailure = function (message) {
            SweetAlert.error("Incorrect credentials", message);
        };


    }

    function LogoutController(AuthSharedService) {

        AuthSharedService.logout();

    }

}());