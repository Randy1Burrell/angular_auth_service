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

    authentication.inject = ['$window'];
    function authentication($window) {
        var saveToken = function(token) {
            $window.localStorage['CHANGE ME!!!!'] = token;
        };

        return {
            saveToken : saveToken
        };
    }
}) ();
