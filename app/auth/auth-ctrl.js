angular.module('leanMetrix').controller('authCtrl', function($rootScope) {

    var model = this;

    firebase.onAuth(function(authData) {

        $rootScope.authData = authData;

        if (!$rootScope.$$phase) $rootScope.$apply();        
    });

    this.signOut = function() {
        firebase.unauth();
    }
});
