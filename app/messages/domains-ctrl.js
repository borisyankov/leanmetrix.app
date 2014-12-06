angular.module('leanMetrix').controller('domainsCtrl', function($firebase, FirebaseService) {

    var model = this;

    var firebase = FirebaseService.getInstance('/domains/');
    var sync = $firebase(firebase);


    console.log(this.domains);

    this.addDomain = function() {
        firebase.push().set(model.newDomain);
        model.newDomain = '';
    };
});
