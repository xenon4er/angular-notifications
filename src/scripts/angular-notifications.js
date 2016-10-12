angular.module('angular-notifications',[]);

angular.module('angular-notifications').provider('Notification', function() {

    this.$get = ["$timeout", "$compile", "$rootScope", function($timeout, $compile, $rootScope) {
        
        var notificationList = [];
        
        var notify = function(args, notify_type){
            /*
                notify_type can be: success, info, warning, danger  
                args = {
                    'delay' : 0, // 0 mean that timer is not working
                    'text' : '', //text for notification
                }
            */
            var text = "";
            if (typeof(args) === "string"){
                text = args;
            }else if(!angular.isUndefined(args.text)){
                text = args.text;
            }else{
                text = 'Oops!';
            }

            if(angular.isUndefined(args.delay) || !angular.isNumber(args.delay)){
                args.delay = 0;
            }

            var timer = undefined;
            var scope =  $rootScope.$new();
            var template = '<div class="notification clickable alert alert-'+notify_type+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+text+'</div>'; 
            var templateElement = $compile(template)(scope);

            var reposition = function(){
                var lastBottom = 0,
                    lastHeight = 0,
                    bottom = 0,
                    newBottom = 0,
                    notification = undefined;

                for(var i=notificationList.length, j=0; j<i; j++){
                    notification = notificationList[j];
                    newBottom =  lastBottom + lastHeight + 5;

                    lastBottom = newBottom;
                    lastHeight = parseInt(notification[0].offsetHeight);

                    bottom = newBottom + 'px';
                    notification.css('bottom', bottom);
                }
            }

            var closeNotification = function(){
                notificationList.splice(notificationList.indexOf(templateElement), 1);
                templateElement.remove();
                scope.$destroy();
                if (timer){
                    $timeout.cancel(timer);
                }
                reposition();
            }
            templateElement.closeCurrentNotification = function(){
                closeNotification();
            }
               
            templateElement.bind('click', closeNotification);
            
            if (args.delay){
                timer = $timeout(function() {
                    closeNotification();
                }, 5000);                
            }
            if(notificationList.length > 4){
                notificationList[0].closeCurrentNotification();
            }
            angular.element(document.querySelector('body')).append(templateElement);
            notificationList.push(templateElement);
            reposition();           
        }

        notify.success = function(args){
            return this(args, 'success');
        }
        notify.info = function(args){
            return this(args, 'info');
        }
        notify.warning = function(args){
            return this(args, 'warning');
        }
        notify.error = function(args){
            return this(args, 'danger');
        }

        return notify;

    }];


});