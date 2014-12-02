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