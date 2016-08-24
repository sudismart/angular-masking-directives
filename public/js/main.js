(function(){

    require.config({

        paths: {
            'angular' : '/bower_components/angular/angular.min',

            'app' : '/js/app'
        },
        shim:{
            'app': {
                deps: ['angular']
            }
        }

    });

    require(['app'], function(){

        angular.bootstrap(document, ['app']);

    })

})();
