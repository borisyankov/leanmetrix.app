angular.module('leanMetrix').factory('AuthService', function($firebase, $http, $rootScope) {

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
            firebase.createUser({
                email: email,
                password: password,
            }, function(error) {
                console.log(error);
            });
        },
        exist: function(email) {
            return $http.get('http://localhost:3000/users/?email=' + email);
        },
        currentUser: function() {
            return $rootScope.authData.password.email;
        }
    }
});
