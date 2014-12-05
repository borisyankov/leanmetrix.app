angular.module('leanMetrix').controller('signInCtrl', function(AuthService) {

    var model = this;

    this.message = "";

    this.user = {
        email: "",
        password: ""
    };

    this.submit = function(isValid) {
        if (isValid) {
            AuthService.signIn(model.user.email, model.user.password);
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
