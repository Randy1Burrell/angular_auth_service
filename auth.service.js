/**
 * Author: Randy Burrell
 * Date: 2017/08/11
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
    }
}) ();
