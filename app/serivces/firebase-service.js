angular.module('leanMetrix').factory('FirebaseService', function(Firebase, AuthService) {

    function firebaseUserUrl() {
        return 'https://leanmetrix.firebaseio.com/' + AuthService.currentUser().replace('.', '@') + '/';
    }

    function getInstance(path) {
        console.log('isntance', firebaseUserUrl() + path)
        return new Firebase(firebaseUserUrl() + path);
    }

    return {
        firebaseUserUrl: firebaseUserUrl,
        getInstance: getInstance
    }
});
