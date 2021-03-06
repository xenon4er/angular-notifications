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

                for(var i=notificationList.length; i>0; i--){
                    notification = notificationList[i-1];
                    newBottom =  lastBottom + lastHeight + 5;

                    lastBottom = newBottom;
                    lastHeight = parseInt(notification[0].offsetHeight);

                    bottom = newBottom + 'px';
                    notification.css('bottom', bottom);
                }
            }
            var canselTimer = function(){
                if (!angular.isUndefined(timer)){
                    $timeout.cancel(timer);
                    timer = undefined;
                }
            }
            var startTimer = function(){
                if (args.delay && angular.isUndefined(timer)){
                    console.log("start timer");
                    timer = $timeout(function() {
                        closeNotification();
                    }, 5000);                
                }
            }

            var closeNotification = function(){
                notificationList.splice(notificationList.indexOf(templateElement), 1);
                templateElement.remove();
                scope.$destroy();
                canselTimer();
                reposition();
            }
            templateElement.closeCurrentNotification = function(){
                closeNotification();
            }
               
            templateElement.bind('click', closeNotification);
            templateElement.bind('mouseover', canselTimer);
            templateElement.bind('mouseout', startTimer);
            
            startTimer();
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