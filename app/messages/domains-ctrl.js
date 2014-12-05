angular.module('leanMetrix').controller('domainsCtrl', function($firebase, AuthService) {

    var model = this;

    var firebaseUserUrl = 'https://leanmetrix.firebaseio.com/' + AuthService.currentUser().replace('.', '@');
    var firebase = new Firebase(firebaseUserUrl + '/domains/');
    var sync = $firebase(firebase);

    this.domains = sync.$asArray();
    console.log(this.domains);

    this.addDomain = function() {
        firebase.push().set(model.newDomain);
        model.newDomain = '';
    };
});
