angular.module('leanMetrix').controller('authCtrl', function($rootScope) {

    var model = this;

    firebase.onAuth(function(authData) {
        console.log(authData);
        $rootScope.authData = authData;
    });

    this.signOut = function() {
        firebase.unauth();
    }
});
