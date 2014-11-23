'use strict';

angular.module('leanMetrix', [])

.run(function() {
    console.log('run'); //debug
    //simpleLogin.getUser();
});

angular.module('leanMetrix').controller('signinCtrl', function($scope) {

    var model = this;

    model.message = "";

    model.user = {
        email: "",
        password: ""
    };

    model.submit = function(isValid) {
        if (isValid) {
            model.message = "Submitted " + model.user.username;
        } else {
            model.message = "There are still invalid fields below";
        }
    };
});

angular.module('leanMetrix').controller('signupCtrl', function($scope) {

    var model = this;

    model.message = "";

    model.user = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    model.submit = function(isValid) {
        console.log("hello");
        if (isValid) {
            model.message = "Submitted " + model.user.username;
        } else {
            model.message = "There are still invalid fields below";
        }
    };
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
