angular.module('angular-notifications',[]);

angular.module('angular-notifications').provider('Notification', function() {
    this.$get = ["$timeout", "$http", "$compile", "$templateCache","$rootScope", "$injector", "$sce", "$q", "$window",function($timeout, $http, $compile, $templateCache, $rootScope, $injector, $sce, $q, $window) {
        
        var notify = function(){
            var scope =  $rootScope.$new();
            
            var closeNotification = function(notification){
                notification.remove();
                scope.$destroy();
                $timeout.cancel(timer);
            }

            var closeEvent = function(e){
                var notification = this;
                closeNotification(notification);
            }

            var date = new Date();
                
            var template = '<div class="notification-body">'+date+'</div>';
            var templateElement = $compile(template)(scope);
            templateElement.bind('click', closeEvent);

            var timer = $timeout(function() {
                closeNotification(templateElement);
                console.log("12331");
            }, 5000);

            angular.element(document.querySelector('body')).append(templateElement);            
        }

        return notify;

    }];


});