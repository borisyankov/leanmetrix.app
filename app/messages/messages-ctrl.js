angular.module('leanMetrix').controller('messagesCtrl', function($firebase) {
    var firebase = new Firebase("https://leanmetrix.firebaseio.com/messages/");
    var sync = $firebase(firebase);

    this.data = sync.$asArray();
});