angular.module('angularNotificationsTest',['angular-notifications']);

angular.module('angularNotificationsTest').controller('notificationController',function(Notification){
    var self = this;
    self.hello = "Hi!";
   

    self.showSuccessNotification = function(){
        self.date = new Date();
        Notification.success(self.date.toString());
        self.hello = "Hi! " + self.date;
    }
    self.showInfoNotification = function(){
        self.date = new Date();
        Notification.info(self.date.toString());
        self.hello = "Hi! " + self.date;
    }
    self.showWarningNotification = function(){
        self.date = new Date();
        Notification.warning('some text');
        self.hello = "Hi! " + self.date;
    }
    self.showErrorNotification = function(){
        self.date = new Date();
        Notification.error({
            'text': 'some text from args',
            'delay': 5000,
        });
        self.hello = "Hi! " + self.date;
    }
});