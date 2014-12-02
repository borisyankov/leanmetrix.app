
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
