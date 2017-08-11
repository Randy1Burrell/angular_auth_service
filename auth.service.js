/**
 * Author: Randy Burrell
 * Date: 2017/08/11
 *
 * Description: Angularjs service used for user authentication
 * through JWT.
 *
 * Usage: Copy this file to your angular client services folder
 * and change the module name below tothe module you would like
 * to use it as. Also change the token name in saveToken, getToken
 * and logout function to your prefered JSON Web Token
 */
(function (){
    angular
        .module('CHANGE ME!!!!');
        .service('authentication');

    // Inject browser window property into authentication service
    authentication.inject = ['$window'];
    // Use authentication service as closure for auth methods
    function authentication($window) {
        var saveToken = function(token) {
            $window.localStorage['CHANGE ME!!!!'] = token;
        };

        var getToken = function() {
            // localStorage name should be the same as saveToken localStorage name
            return $window.localStorage['CHANGE ME!!!!'];
        };
        // Expose auth functions for public use here
        return {
            saveToken : saveToken
        };
    }
}) ();
