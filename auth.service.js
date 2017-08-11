/**
 * Author: Randy Burrell
 * Date: 2017/08/11
 *
 * Description: Angularjs service used for user authentication
 * through JWT.
 *
 * Usage: Copy this file to your angular client services folder
 * and change the module name below to the module you would like
 * to use it as.
 */
(function (){
    angular
        .module('CHANGE ME!!!!');
        .service('authentication');

    // Inject browser window property into authentication service
    authentication.inject = ['$window'];
    // Use authentication service as closure for auth methods
    function authentication($window) {

        var saveToken = function(token, name) {
            /**
             * @name : saveToken
             * @desc : Used to save JSON web token to browse's local storage
             * @param : Object - JSON web token
             * @return : no value
             */
            $window.localStorage[name] = token;
        };

        var getToken = function(name) {
            /**
             * @name : getToken
             * @desc : Used to get tokens stored in browser's local storage
             * @param : string name - name of token to return
             * @return : JSON web token from local storage
             */
            return $window.localStorage[name];
        };

        var login = function(data, api, success, error) {
            /**
             * @name : login
             * @desc : Used to post data to your login api
             * @param : Object - user's login data
             *          api - url of the api to post to
             *          success - callback function to invoke if successfull
             *          error - callback function to invoke if there's an error
             * @return : Api response - JSON web token or Error
             */
             return $http({
                method : 'POST',
                url : api,
                data : data
             }.then(
                success,
                error
             );
        };

        // Expose auth functions for public use here
        return {
            saveToken : saveToken,
            getToken : getToken
        };
    }
}) ();
