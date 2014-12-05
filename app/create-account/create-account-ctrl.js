angular.module('leanMetrix').controller('createAccountCtrl', function(AuthService) {

    var model = this;

    this.message = "";

    this.user = {
        email: "bobtester@mailinator.com",
        password: "123123",
        confirmPassword: "123123"
    };

    this.submit = function(isValid) {
        if (isValid) {
            AuthService.create(model.user.email, model.user.password).success(function(data) {
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
