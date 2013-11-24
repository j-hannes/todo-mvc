/*global define*/

define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/todo'
], function (_, Backbone, Store, TodoModel) {
    'use strict';

    var TodoCollection = Backbone.Collection.extend({
        model: TodoModel,

        localStorage: new Store('todos')
    });

    return TodoCollection;
});