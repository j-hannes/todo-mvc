/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        backboneLocalstorage: '../bower_components/backbone.localstorage/' +
                              'backbone.localStorage',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
    'backbone',
    'views/app',
    'collections/todo'
], function (Backbone, App, TodoCollection) {
    window.ENTER_KEY = 13;

    var todos = new TodoCollection();
    var app = new App({collection: todos});
    app.render();
    todos.fetch();

    Backbone.history.start();
});
