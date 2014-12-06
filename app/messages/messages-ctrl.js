angular.module('leanMetrix').controller('messagesCtrl', function($scope, $firebase, FirebaseService) {

    var ctrl = this,
        firebaseDomains = FirebaseService.getInstance('/domains/');

    ctrl.domains = $firebase(firebaseDomains).$asArray();

    $scope.$watch('currentDomain', function(newValue, oldValue) {

        if (!newValue) return;

        var url = newValue.$value.replace('.', '@') + '/messages/';
        var firebaseMessages = FirebaseService.getInstance(url);
        ctrl.messages = $firebase(firebaseMessages).$asArray();
    });

});
