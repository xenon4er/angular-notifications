angular.module('angularNotificationsTest',['angular-notifications']);

angular.module('angularNotificationsTest').controller('notificationController',function(Notification){
    var self = this;
    self.hello = "Hi!";
   

    self.showSuccessNotification = function(){
        self.date = new Date();
        Notification.success(self.date);
        self.hello = "Hi! " + self.date;
    }
    self.showInfoNotification = function(){
        self.date = new Date();
        Notification.info(self.date);
        self.hello = "Hi! " + self.date;
    }
    self.showWarningNotification = function(){
        self.date = new Date();
        Notification.warning(self.date);
        self.hello = "Hi! " + self.date;
    }
    self.showErrorNotification = function(){
        self.date = new Date();
        Notification.error(self.date);
        self.hello = "Hi! " + self.date;
    }
});