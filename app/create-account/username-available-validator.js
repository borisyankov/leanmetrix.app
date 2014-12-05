
angular.module('leanMetrix').directive('usernameAvailableValidator', function($q, AuthService) {
    return {
        require: 'ngModel',
        link: function($scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.usernameAvailable = function(email) {
                var deferred = $q.defer();
                deferred.resolve(false);
                return deferred.promise;
                return AuthService.exist(email);
            };
        }
    }
});
