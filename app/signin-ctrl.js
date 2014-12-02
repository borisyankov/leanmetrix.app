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