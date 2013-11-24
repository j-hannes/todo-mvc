/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var TodoView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',

        template: JST['app/scripts/templates/todo.ejs'],

        events: {
            'click .destroy': 'destroy',
            'click .toggle': 'toggleCompleted'
        },

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            return this;
        },

        destroy: function() {
            this.model.destroy();
        },

        toggleCompleted: function() {
            this.model.toggle();
        }
    });

    return TodoView;
});