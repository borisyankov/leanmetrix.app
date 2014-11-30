'use strict';

var firebase = new Firebase("https://leanmetrix.firebaseio.com");

angular.module('leanMetrix', ['ngMessages', 'firebase'])

.run(function() {

});

angular.module('leanMetrix').controller('authCtrl', function($rootScope) {
    var model = this;
    firebase.onAuth(function(authData) {
        model.data = authData;
        $rootScope.authData = authData;
    });

    this.signOut = function() {
        firebase.unauth();
    }
});

angular.module('leanMetrix').controller('signInCtrl', function(AccountService) {

    var model = this;

    this.message = "";

    this.user = {
        email: "",
        password: ""
    };

    this.submit = function(isValid) {
        if (isValid) {
            AccountService.signIn(model.user.email, model.user.password).success(function(data) {
                AuthenticationService.isLogged = true;
                $window.sessionStorage.token = data.token;
                $location.path("/admin");
            }).error(function(status, data) {
                console.log(status, data);
            });
        } else {
            model.message = "There are still invalid fields below";
        }
    };

    this.logout = function logout() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $location.path("/");
        }
    }

});

angular.module('leanMetrix').controller('createAccountCtrl', function(AccountService) {

    var model = this;

    this.message = "";

    this.user = {
        email: "bobtester@mailinator.com",
        password: "123123",
        confirmPassword: "123123"
    };

    this.submit = function(isValid) {
        if (isValid) {
            AccountService.create(model.user.email, model.user.password).success(function(data) {
                AuthenticationService.isLogged = true;
                $window.sessionStorage.token = data.token;
                $location.path("/admin");
            }).error(function(status, data) {
                console.log(status, data);
            });
        } else {
            model.message = "There are still invalid fields below";
        }
    };
});


angular.module('leanMetrix').controller('messagesCtrl', function($firebase) {
    var firebase = new Firebase("https://leanmetrix.firebaseio.com/messages/");
    var sync = $firebase(firebase);

    this.data = sync.$asArray();
});



angular.module('leanMetrix').directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

angular.module('leanMetrix').directive('usernameAvailableValidator', function($q, AccountService) {
    return {
        require: 'ngModel',
        link: function($scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.usernameAvailable = function(email) {
                var deferred = $q.defer();
                deferred.resolve(false);
                return deferred.promise;
                return AccountService.exist(email);
            };
        }
    }
});

angular.module('leanMetrix').factory('AccountService', function($firebase, $http) {

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
        }
    }
});
