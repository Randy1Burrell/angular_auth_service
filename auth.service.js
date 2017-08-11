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

        var login_or_registration_success = function(data, name) {
            /**
             * @name : login_or_registration_success
             * @desc : saves token as param tokenName
             * @param : Object data - data returned from http call to api
             *          string name - name of the token to be saved
             */
             saveToken(data.token, name)
        };

        var generic_login_or_register_user = function(user, apiUrl, tokenName, error) {
            /**
             * @name : generic_login_or_register_user
             * @desc : Used to post data to your api's login/registration url and save
             * any tokens returned
             * @param : Object - user's login data
             *          string apiUrl - url of the api to post to
             *          string tokenName - name to save token as
             *          object error - callback function to invoke if there's an error @params should be error object
             * @return : Api response - JSON web token or Error
             */
             return $http({
                method : 'POST',
                url : apiUrl,
                user : user
             }.then(
                login_or_registration_success(data, tokenName),
                error(err)
             );
        };

        var logout = function(tokenName) {
            /**
             * @name : logout
             * @desc : removes token on an item from browser's local storage
             * @params : string tokenName - name of item to be removed from storage
             * @return : no data
             */
             $window.localStorage.removeItem(tokenName);
        };

        var isLoggedIn = function(tokenName) {
            /**
             * @name : isLoggedIn
             * @desc : ckecks to see if user with token is logged in
             * @params : string tokenName - name of token for user data
             * @return : bool - true user logged in or false user annonymous
             */
             var token = getToken(tokenName);

             if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                if (payload) {
                    if (payload.exp > Date.now() / 1000) {
                        // return true if valid token is found
                        return true;
                    } else {
                        /**
                         * Delete the token if it has been expired
                         * then return false
                         */
                        logout(tokenName);
                        return false;
                    }
                } else {
                    // return false is no payload is found
                    return false;
                }
             } else {
                // return false if no token is found
                return false;
             }
        };

        var currentUser = function(tokenName) {
            /**
             * @name : currentUser
             * @desc : gets current user
             * @params : string tokenName - name of token for user data
             * @return : Object JSON - logged in user's data
             */
            if (isLoggedIn(tokenName)) {
                var token = getToken(tokenName);
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    name : payload.name,
                    email : payload.email
                }
            }
        };
        // Expose auth functions for public use here
        return {
            saveToken : saveToken,
            getToken : getToken,
            generic_login_or_register_user : generic_login_or_register_user,
            logout : logout,
            isLoggedIn : isLoggedIn,
            currentUser : currentUser
        };
    }
}) ();
