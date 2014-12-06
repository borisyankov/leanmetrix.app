angular.module('leanMetrix').factory('AuthService', function($firebase, $http, $rootScope) {

    var apiRoot = 'http://localhost:3000';
    //var firebase = new Firebase("https://leanmetrix.firebaseio.com/");

    return {
        signIn: function(email, password) {
            firebase.authWithPassword({
                email: email,
                password: password,
            }, function(error, authData) {
                if (error === null) {
                    console.log(authData);
                } else {
                    console.log("Error authenticating user:", error);
                }
            });
        },
        create: function(email, password) {

            var account = {
                email: email,
                password: password,
            };

            firebase.createUser(account, function(error) {
                console.log(error);
            });

             $http.post(apiRoot + '/createaccount/', account);
        },
        exist: function(email) {
            return $http.get(apiRoot + '/users/?email=' + email);
        },
        currentUser: function() {
            return $rootScope.authData.password.email;
        }
    }
});
