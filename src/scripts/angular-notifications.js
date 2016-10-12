angular.module('angular-notifications',[]);

angular.module('angular-notifications').provider('Notification', function() {

    this.$get = ["$timeout", "$http", "$compile", "$templateCache","$rootScope", "$injector", "$sce", "$q", "$window",function($timeout, $http, $compile, $templateCache, $rootScope, $injector, $sce, $q, $window) {
        
        var notificationList = [];
        
        var notify = function(args, notify_type){
            /*
              notify_type - success, info, warning, danger  
            */
            /*
                args = {
                    'delay' : 0, //mean that timer is not working
                    'text' : '', //text for notification
                }
            */
            var text = "";
            if (typeof(args) === "string"){
                text = args;
            }else if(args.text){
                text = args.text;
            }else{
                text = 'Oops!';
            }

            var timer = undefined;
            var scope =  $rootScope.$new();
            var template = '<div class="notification clickable alert alert-'+notify_type+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+text+'</div>'; 
            var templateElement = $compile(template)(scope);

            var reposition = function(){
                var lastBottom = 0,
                    lastHeight = 0;

                for(var i=notificationList.length; i>0; i--){
                    var notification = notificationList[i-1];
                    var newBottom =  lastBottom + lastHeight + 5;

                    lastBottom = newBottom;
                    lastHeight = parseInt(notification[0].offsetHeight);

                    var bottom = newBottom + 'px';
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

               
            templateElement.bind('click', closeNotification);
            
            if (!angular.isUndefined(args.delay) && 
                angular.isNumber(args.delay) &&
                args.delay != 0){
                    timer = $timeout(function() {
                        closeNotification();
                        console.log("12331");
                    }, 5000);                
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