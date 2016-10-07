angular.module('angularNotificationsTest',['angular-notifications']);

angular.module('angularNotificationsTest').controller('notificationController',function(Notification){
    var self = this;
    self.hello = "Hi!";
   

    self.showNotification = function(){
        self.date = new Date();
        Notification();
        self.hello = "Hi! " + self.date;
    }
});